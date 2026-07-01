import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import { initiateJazzCashPayment, createCODOrder } from '@/lib/payment/service'
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
    const { orderId, paymentMethod } = body

    if (!orderId || !paymentMethod) {
      return NextResponse.json(
        { error: 'Order ID and payment method are required' },
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

    let paymentResponse

    if (paymentMethod === 'jazz_cash') {
      // Initiate Jazz Cash payment
      paymentResponse = await initiateJazzCashPayment({
        amount: order.total,
        orderId: order.orderNumber,
        email: order.user.email,
        phone: order.user.phone || '',
        returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}/verify`,
      })

      if (paymentResponse.success && order.payment) {
        // Update payment record
        await prisma.payment.update({
          where: { id: order.payment.id },
          data: {
            transactionId: paymentResponse.transactionId,
            verificationUrl: paymentResponse.verificationUrl,
          },
        })
      }
    } else if (paymentMethod === 'cod') {
      // Handle Cash on Delivery
      paymentResponse = await createCODOrder(orderId)

      if (paymentResponse.success) {
        // Update order status for COD
        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'pending_collection',
            shippingStatus: 'processing',
          },
        })
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: paymentResponse.success,
      message: paymentResponse.message,
      redirectUrl: paymentResponse.redirectUrl,
      verificationUrl: paymentResponse.verificationUrl,
    })
  } catch (error) {
    console.error('[v0] Error initiating payment:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}
