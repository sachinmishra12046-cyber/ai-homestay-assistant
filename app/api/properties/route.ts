import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const guests = searchParams.get('guests');
    const sort = searchParams.get('sort') || 'rating';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = parseInt(minPrice);
      if (maxPrice) where.pricePerNight.lte = parseInt(maxPrice);
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    if (guests) {
      where.guests = { gte: parseInt(guests) };
    }

    const orderBy: any = {};
    if (sort === 'price-asc') orderBy.pricePerNight = 'asc';
    else if (sort === 'price-desc') orderBy.pricePerNight = 'desc';
    else if (sort === 'rating') orderBy.rating = 'desc';
    else orderBy.createdAt = 'desc';

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          host: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              bookings: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    const propertiesWithStats = properties.map((property) => ({
      ...property,
      averageRating: property.reviews.length > 0
        ? property.reviews.reduce((sum, r) => sum + r.rating, 0) / property.reviews.length
        : property.rating,
    }));

    return NextResponse.json({
      properties: propertiesWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
