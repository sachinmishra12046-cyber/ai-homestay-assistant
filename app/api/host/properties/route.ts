import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/apiAuth';

export async function GET(req: NextRequest) {
  // Verify NextAuth session
  const authResult = await withAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = authResult;

  try {
    const properties = await prisma.property.findMany({
      where: { hostId: userId },
      include: {
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching host properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Verify NextAuth session
  const authResult = await withAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = authResult;

  try {
    const body = await req.json();
    const {
      title,
      description,
      city,
      country,
      address,
      pricePerNight,
      bedrooms,
      bathrooms,
      guests,
      images,
      amenities,
    } = body;

    if (!title || !city || !pricePerNight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        hostId: userId,
        title,
        description,
        city,
        country: country || 'India',
        address,
        pricePerNight,
        bedrooms,
        bathrooms,
        guests,
        images,
        amenities,
        rating: 0,
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
