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
const RECOMMENDATION_TERMS = /\b(recommend|suggest|find|show|stay|homestay|honeymoon|weekend)\b/i;

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

function formatRecommendations(properties: Array<{
  title: string;
  city: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  description: string;
}>) {
  const recommendations = properties.slice(0, 3).map((property, index) => [
    `**Property ${index + 1}**`,
    `Name: ${property.title}`,
    `Location: ${property.city}, India`,
    `Price: ₹${property.pricePerNight}/night`,
    `Rating: ${property.rating}/5`,
    `Amenities: ${property.amenities.slice(0, 5).join(', ') || 'Not listed'}`,
    `Why it matches: ${property.description}`,
  ].join('\n')).join('\n\n');

  return `${recommendations}\n\n**Travel Tips**\n- Confirm dates and availability with the host before booking.\n- Review the listed amenities and house rules before you travel.`;
}

function clarificationMessage(message: string, destination?: string, budget?: number) {
  if (/weekend\s+trip\s+from\s+/i.test(message)) {
    const start = message.match(/weekend\s+trip\s+from\s+([^,?.!]+)/i)?.[1]?.trim();
    return `Which destination would you like to visit from ${start || 'your starting city'}?\nOr would you like me to suggest nearby weekend destinations?`;
  }
  if (/honeymoon/i.test(message) && !destination && !budget) {
    return 'Which Indian destination are you planning for your honeymoon, and what is your nightly budget?';
  }
  if (!destination && !budget) {
    return 'Which destination are you planning to visit, and what is your maximum nightly budget?';
  }
  if (!destination) {
    return 'Which destination are you planning to visit? (For example: Manali, Mussoorie, Nainital or Munnar)';
  }
  return 'What is your maximum budget per night in ₹?';
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
    const payload = chatRequestSchema.parse(await req.json());

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

    const isRecommendationRequest = RECOMMENDATION_TERMS.test(payload.message);
    const properties = destination && budget && isRecommendationRequest
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
          if (isRecommendationRequest && (!destination || !budget)) {
            controller.enqueue(encoder.encode(clarificationMessage(payload.message, destination, budget)));
            return;
          }

          if (isRecommendationRequest && matchingHomestays.length < 3) {
            controller.enqueue(encoder.encode("I couldn't find three verified homestays matching your request.\nWould you like to increase your budget or choose another destination?"));
            return;
          }

          if (isRecommendationRequest) {
            // This response is deterministic so a model can never substitute a property, city, price, or rating.
            controller.enqueue(encoder.encode(formatRecommendations(matchingHomestays)));
            return;
          }

          // Non-recommendation requests may use Gemini. It receives no unfiltered listings.
          for await (const chunk of streamChatWithAI(payload.message, payload.conversationHistory, [])) controller.enqueue(encoder.encode(chunk));
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Please send a valid message.', { status: 400 });
    }
    logChatError('Chat API request failed', error);
    return new Response(serviceErrorMessage(error), { status: 503 });
  }
}
