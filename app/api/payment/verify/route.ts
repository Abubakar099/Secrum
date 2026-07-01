import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import { verifyJazzCashPayment } from '@/lib/payment/service'
import prisma from '@/lib/prisma'

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

    const body = await request.json()
    const { orderId, transactionId } = body

    if (!orderId || !transactionId) {
      return NextResponse.json(
        { error: 'Order ID and Transaction ID are required' },
        { status: 400 }
      )
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true, user: true },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Verify order belongs to user
    if (order.userId !== decoded.userId && !decoded.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    if (order.paymentMethod !== 'jazz_cash') {
      return NextResponse.json(
        { error: 'Payment verification only available for Jazz Cash' },
        { status: 400 }
      )
    }

    // Verify payment with Jazz Cash
    const verifyResponse = await verifyJazzCashPayment(transactionId)

    if (!verifyResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Payment verification failed',
        },
        { status: 400 }
      )
    }

    // Update order and payment status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'paid',
        shippingStatus: 'processing',
        status: 'confirmed',
      },
      include: {
        payment: true,
        items: true,
        user: true,
      },
    })

    if (order.payment) {
      await prisma.payment.update({
        where: { id: order.payment.id },
        data: {
          status: 'completed',
          transactionId: verifyResponse.transactionId,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      order: updatedOrder,
    })
  } catch (error) {
    console.error('[v0] Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

// GET endpoint to check payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        paymentStatus: true,
        paymentMethod: true,
        total: true,
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
    console.error('[v0] Error checking payment status:', error)
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    )
  }
}
