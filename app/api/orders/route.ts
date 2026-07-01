import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import { sendOrderConfirmation, sendPaymentNotificationEmail } from '@/lib/email/service'
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

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: { userId: decoded.userId },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, price: true },
            },
          },
        },
        payment: true,
        shipping: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('[v0] Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
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

    const body = await request.json()
    const {
      items,
      subtotal,
      shippingCost,
      tax,
      paymentMethod,
      shippingInfo,
    } = body

    // Validate required fields
    if (!items || !items.length || !shippingInfo || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['jazz_cash', 'cod'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    // Calculate total
    const total = subtotal + shippingCost + tax

    // Generate unique order number
    const orderNumber = `SECRUM-${Date.now()}`

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: decoded.userId,
        orderNumber,
        status: 'pending',
        paymentMethod,
        paymentStatus: 'pending',
        shippingStatus: 'pending',
        subtotal,
        shippingCost,
        tax,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        shipping: {
          create: {
            name: shippingInfo.name,
            phone: shippingInfo.phone,
            email: shippingInfo.email,
            address: shippingInfo.address,
            city: shippingInfo.city,
            province: shippingInfo.province,
            postalCode: shippingInfo.postalCode,
          },
        },
        payment: {
          create: {
            paymentMethod,
            amount: total,
            status: 'pending',
          },
        },
      },
      include: {
        items: { include: { product: true } },
        shipping: true,
        payment: true,
      },
    })

    // Send confirmation email
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { email: true },
    })

    if (user?.email) {
      await sendOrderConfirmation(user.email, orderNumber, total)
      await sendPaymentNotificationEmail(user.email, paymentMethod, total, order.id)
    }

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
