import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'trending';
    const userId = searchParams.get('userId');
    const city = searchParams.get('city');

    let properties;

    switch (type) {
      case 'trending':
        properties = await prisma.property.findMany({
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: [
            { rating: 'desc' },
            { createdAt: 'desc' },
          ],
          take: 8,
        });
        break;

      case 'top-rated':
        properties = await prisma.property.findMany({
          where: { rating: { gte: 4.5 } },
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
        break;

      case 'budget':
        properties = await prisma.property.findMany({
          where: { pricePerNight: { lte: 3000 } },
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
        break;

      case 'luxury':
        properties = await prisma.property.findMany({
          where: { pricePerNight: { gte: 5000 } },
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
        break;

      case 'family':
        properties = await prisma.property.findMany({
          where: { guests: { gte: 4 } },
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
        break;

      case 'nearby':
        if (!city) {
          return NextResponse.json(
            { error: 'City parameter required for nearby recommendations' },
            { status: 400 }
          );
        }
        properties = await prisma.property.findMany({
          where: { city: { contains: city, mode: 'insensitive' } },
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
        break;

      case 'personalized':
        if (!userId) {
          return NextResponse.json(
            { error: 'User ID required for personalized recommendations' },
            { status: 400 }
          );
        }
        // Get user's wishlist and bookings to find preferences
        const [wishlist, bookings] = await Promise.all([
          prisma.wishlist.findMany({
            where: { userId },
            include: { property: true },
          }),
          prisma.booking.findMany({
            where: { userId },
            include: { property: true },
          }),
        ]);

        // Extract cities and price ranges from user history
        const preferredCities = new Set<string>();
        const avgPrice = wishlist.length + bookings.length > 0
          ? [...wishlist, ...bookings].reduce((sum, item) => sum + item.property.pricePerNight, 0) /
            (wishlist.length + bookings.length)
          : 3000;

        wishlist.forEach((w) => preferredCities.add(w.property.city));
        bookings.forEach((b) => preferredCities.add(b.property.city));

        properties = await prisma.property.findMany({
          where: {
            OR: [
              { city: { in: Array.from(preferredCities) } },
              { pricePerNight: { lte: avgPrice * 1.2, gte: avgPrice * 0.8 } },
            ],
          },
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
        break;

      default:
        properties = await prisma.property.findMany({
          include: {
            host: { select: { id: true, name: true, avatar: true } },
            _count: { select: { reviews: true, bookings: true } },
          },
          orderBy: { rating: 'desc' },
          take: 8,
        });
    }

    const propertiesWithStats = properties.map((property) => ({
      ...property,
      averageRating: property.rating,
    }));

    return NextResponse.json({ properties: propertiesWithStats });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}
