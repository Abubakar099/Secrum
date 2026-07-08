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

    // Server-side validation for shipping info
    const phoneRegex = /^(\+92|0)[0-9]{9,10}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validationErrors: Record<string, string> = {}

    if (!shippingInfo.name || shippingInfo.name.trim().length < 3) {
      validationErrors.name = 'Name must be at least 3 characters'
    }

    if (!shippingInfo.email || !emailRegex.test(shippingInfo.email)) {
      validationErrors.email = 'Valid email is required'
    }

    if (!shippingInfo.phone || !phoneRegex.test(shippingInfo.phone.replace(/\s+/g, ''))) {
      validationErrors.phone = 'Valid phone number is required'
    }

    if (!shippingInfo.address || shippingInfo.address.trim().length < 5) {
      validationErrors.address = 'Valid street address is required'
    }

    if (!shippingInfo.city) {
      validationErrors.city = 'City is required'
    }

    if (!shippingInfo.province) {
      validationErrors.province = 'Province is required'
    }

    if (!shippingInfo.postalCode || shippingInfo.postalCode.trim().length < 3) {
      validationErrors.postalCode = 'Valid postal code is required'
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }

    // Server-side delivery charge validation
    const expectedShipping = subtotal > 150 || subtotal === 0 ? 0 : 12
    if (shippingCost !== expectedShipping) {
      return NextResponse.json(
        { error: 'Invalid shipping cost calculated' },
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
