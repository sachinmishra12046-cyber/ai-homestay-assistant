import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/apiAuth';

export async function GET(req: NextRequest) {
  // Verify NextAuth session
  const authResult = await withAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = authResult;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId: userId,
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
