import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const hostId = searchParams.get('hostId');

    if (!hostId) {
      return NextResponse.json(
        { error: 'Host ID required' },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId,
        },
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching host bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
