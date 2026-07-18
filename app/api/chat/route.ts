import { NextRequest } from 'next/server';
import { streamChatWithAI } from '@/lib/ai';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(2_000),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().trim().min(1).max(2_000),
  })).max(8).default([]),
});

const NON_HOMESTAY_TERMS = /\b(hotel|resort|hostel)\b/i;

function findRequestedCity(message: string, cities: string[]) {
  const normalizedMessage = message.toLocaleLowerCase('en-IN');
  return cities
    .sort((a, b) => b.length - a.length)
    .find((city) => normalizedMessage.includes(city.toLocaleLowerCase('en-IN')));
}

function findNightlyBudget(message: string) {
  const match = message.match(/(?:under|below|less than|max(?:imum)?|up to|within)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i)
    ?? message.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i);
  return match ? Number(match[1].replaceAll(',', '')) : undefined;
}

function isHomestay(property: { title: string; description: string; category: string | null }) {
  return !NON_HOMESTAY_TERMS.test(`${property.title} ${property.description} ${property.category ?? ''}`);
}

function insufficientMatchesMessage(destination: string, budget: number, count: number) {
  return `I found ${count} Indian homestay${count === 1 ? '' : 's'} in ${destination} at or below ₹${budget}/night. StayNest needs three exact matches, so I won’t substitute another city or an over-budget stay. Would you like to adjust your budget or choose another Indian destination?`;
}

function serviceErrorMessage(error: unknown) {
  if (error instanceof Error && error.message === 'GEMINI_API_KEY is not configured') {
    return 'StayNest AI is not configured right now. Please try again later.';
  }
  return 'StayNest AI is temporarily unavailable. Please try again in a moment.';
}

function logChatError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(context, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return;
  }

  console.error(context, error);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    console.log('Chat API raw payload:', JSON.stringify(rawBody, null, 2));
    const payload = chatRequestSchema.parse(rawBody);
    console.log('Chat API validated payload:', JSON.stringify(payload, null, 2));

    // Resolve the city locally, then apply destination and budget constraints in SQL
    // before any request is sent to Gemini.
    const cityRows = await prisma.property.findMany({
      where: { country: { equals: 'India', mode: 'insensitive' } },
      distinct: ['city'],
      select: { city: true },
    });
    const conversationText = [...payload.conversationHistory.filter((item) => item.role === 'user').map((item) => item.content), payload.message].join('\n');
    const destination = findRequestedCity(conversationText, cityRows.map((row) => row.city));
    const budget = findNightlyBudget(conversationText);

    const properties = destination && budget
      ? await prisma.property.findMany({
        where: {
          country: { equals: 'India', mode: 'insensitive' },
          city: { equals: destination, mode: 'insensitive' },
          pricePerNight: { lte: budget },
        },
        orderBy: [{ rating: 'desc' }, { pricePerNight: 'asc' }],
        select: {
          id: true,
          title: true,
          description: true,
          city: true,
          country: true,
          pricePerNight: true,
          bedrooms: true,
          bathrooms: true,
          guests: true,
          amenities: true,
          rating: true,
          category: true,
          aiTags: true,
        },
      })
      : [];
    const matchingHomestays = properties.filter(isHomestay);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (destination && budget && matchingHomestays.length < 3) {
            controller.enqueue(encoder.encode(insufficientMatchesMessage(destination, budget, matchingHomestays.length)));
            return;
          }

          // Gemini receives only the already-filtered exact-city, in-budget Indian homestays.
          for await (const chunk of streamChatWithAI(payload.message, payload.conversationHistory, matchingHomestays)) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error) {
          logChatError('Chat stream failed', error);
          controller.enqueue(encoder.encode(serviceErrorMessage(error)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
      },
    });
/*
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        city: true,
        country: true,
        pricePerNight: true,
        bedrooms: true,
        bathrooms: true,
        guests: true,
        amenities: true,
        rating: true,
        category: true,
        aiTags: true,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamChatWithAI(payload.message, payload.conversationHistory, properties)) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error) {
          logChatError('Chat stream failed', error);
          controller.enqueue(encoder.encode(serviceErrorMessage(error)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
      },
    });
*/
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Please send a valid message.', { status: 400 });
    }
    logChatError('Chat API request failed', error);
    return new Response(serviceErrorMessage(error), { status: 503 });
  }
}
