import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            host: {
              select: { id: true, name: true, avatar: true },
            },
            _count: {
              select: { reviews: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, propertyId } = body;

    if (!userId || !propertyId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Property already in wishlist' },
        { status: 409 }
      );
    }

    const wishlistItem = await prisma.wishlist.create({
      data: { userId, propertyId },
      include: { property: true },
    });

    return NextResponse.json({ wishlistItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const propertyId = searchParams.get('propertyId');

    if (!userId || !propertyId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    await prisma.wishlist.delete({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    return NextResponse.json({ message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
