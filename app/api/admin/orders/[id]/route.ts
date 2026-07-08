import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, email: true, name: true } },
        items: {
          include: {
            product: {
              include: { images: { take: 1, orderBy: { order: 'asc' } } },
            },
          },
        },
        payment: true,
        shipping: true,
        originalOrder: {
          select: { id: true, orderNumber: true },
        },
        duplicates: {
          select: { id: true, orderNumber: true, createdAt: true },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('[v0] Error fetching order detail:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status, paymentStatus, shippingStatus, notes } = body

    // Validate status values if provided
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus
    if (shippingStatus) updateData.shippingStatus = shippingStatus
    if (notes !== undefined) updateData.notes = notes

    const order = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: { select: { id: true, email: true, name: true } },
        items: { include: { product: true } },
        payment: true,
        shipping: true,
        originalOrder: { select: { id: true, orderNumber: true } },
      },
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error('[v0] Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
