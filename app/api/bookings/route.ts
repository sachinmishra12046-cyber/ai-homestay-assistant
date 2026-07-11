import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/apiAuth';

export async function GET(req: NextRequest) {
  // Verify NextAuth session
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = authResult;

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            host: {
              select: { id: true, name: true, avatar: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Verify NextAuth session
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = authResult;

  try {
    const body = await req.json();
    const { propertyId, checkIn, checkOut, totalPrice } = body;

    if (!propertyId || !checkIn || !checkOut || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        status: { in: ['CONFIRMED', 'PENDING'] },
        OR: [
          {
            AND: [
              { checkIn: { lte: checkInDate } },
              { checkOut: { gte: checkInDate } },
            ],
          },
          {
            AND: [
              { checkIn: { lte: checkOutDate } },
              { checkOut: { gte: checkOutDate } },
            ],
          },
          {
            AND: [
              { checkIn: { gte: checkInDate } },
              { checkOut: { lte: checkOutDate } },
            ],
          },
        ],
      },
    });

    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'Property is already booked for these dates' },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        propertyId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice,
        status: 'PENDING',
      },
      include: {
        property: true,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
