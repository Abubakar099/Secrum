import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = decodeToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user's wishlist items
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: decoded.userId },
      include: {
        product: {
          include: {
            images: { orderBy: { order: 'asc' }, take: 1 },
          },
        },
      },
    })

    return NextResponse.json({ wishlistItems })
  } catch (error) {
    console.error('[v0] Error fetching wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = decodeToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    try {
      const item = await prisma.wishlistItem.create({
        data: {
          userId: decoded.userId,
          productId,
        },
        include: {
          product: {
            include: {
              images: { orderBy: { order: 'asc' }, take: 1 },
            },
          },
        },
      })

      return NextResponse.json({ item }, { status: 201 })
    } catch (error: any) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Already in wishlist' },
          { status: 409 }
        )
      }
      throw error
    }
  } catch (error) {
    console.error('[v0] Error adding to wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}
