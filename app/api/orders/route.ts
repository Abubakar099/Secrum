import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@/lib/auth/jwt'
import { sendOrderConfirmationEmail } from '@/lib/email/send-email'
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

    // Update product stock and validate availability
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        )
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${product.stock}` },
          { status: 400 }
        )
      }

      // Deduct stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    }

    // Determine order status based on payment method
    const orderStatus = paymentMethod === 'cod' ? 'confirmed' : 'pending'
    const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'pending'

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: decoded.userId,
        orderNumber,
        status: orderStatus,
        paymentMethod,
        paymentStatus,
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
            status: paymentStatus,
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
      select: { email: true, name: true },
    })

    if (user?.email) {
      try {
        await sendOrderConfirmationEmail(user.email, {
          orderNumber,
          customerName: user.name || "Valued Customer",
          items: order.items.map((item: any) => ({
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal,
          shippingCost: shipping,
          tax,
          total,
          shippingAddress: {
            address: shippingInfo.address,
            city: shippingInfo.city,
            postalCode: shippingInfo.postalCode,
          },
          paymentMethod,
        })
        console.log("[v0] Order confirmation email sent to:", user.email)
      } catch (emailError) {
        console.error("[v0] Failed to send order confirmation email:", emailError)
        // Don't fail the order creation if email fails
      }
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
