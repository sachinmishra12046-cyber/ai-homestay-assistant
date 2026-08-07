import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const requestSchema = z.object({
  destination: z.string().trim().min(1, 'Destination is required').max(100),
  budget: z.coerce.number().positive('Budget must be greater than zero').max(1_000_000),
  guests: z.coerce.number().int().positive('Guests must be at least one').max(100),
  preferences: z.string().trim().max(500).optional(),
});

const restrictedTerms = /\b(hotel|resort|hostel)\b/i;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const request = requestSchema.parse(await req.json());
    
    // Search by city OR address (address often contains state names like "Arambol, Goa")
    const properties = await prisma.property.findMany({
      where: {
        country: { equals: 'India', mode: 'insensitive' },
        pricePerNight: { lte: request.budget },
        guests: { gte: request.guests },
        OR: [
          { city: { contains: request.destination, mode: 'insensitive' } },
          { address: { contains: request.destination, mode: 'insensitive' } },
        ],
      },
      orderBy: [{ rating: 'desc' }, { pricePerNight: 'asc' }],
      select: { id: true, title: true, description: true, pricePerNight: true, rating: true, amenities: true, city: true, address: true },
    });

    const homestays = properties
      .filter((property) => !restrictedTerms.test(`${property.title} ${property.description}`))
      .slice(0, 3);

    if (homestays.length === 0) {
      return NextResponse.json(
        { error: `No matching Indian homestays found in ${request.destination} within ₹${request.budget}/night for ${request.guests} guest${request.guests === 1 ? '' : 's'}. Try a different budget, guest count, or destination.` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      recommendations: homestays.map((property) => ({
        id: property.id,
        name: property.title,
        description: property.description,
        approximatePrice: property.pricePerNight,
        rating: property.rating,
        keyAmenities: property.amenities.slice(0, 5),
        whyItMatches: `Located in ${property.city}, ${property.address}, accommodates ${request.guests} guest${request.guests === 1 ? '' : 's'}, and is within your ₹${request.budget}/night budget.${request.preferences ? ` It also provides a good base for: ${request.preferences}.` : ''}`,
      })),
      travelTips: [
        'Confirm dates and availability with the host before booking.',
        'Review the listed amenities and house rules before you travel.',
      ],
      nearbyAttractions: [],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Please provide a valid Indian destination, budget, and guest count.' }, { status: 400 });
    }
    console.error('AI recommendation request failed', error);
    return NextResponse.json({ error: 'Recommendations are temporarily unavailable. Please try again shortly.' }, { status: 503 });
  }
}
