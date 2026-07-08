import { NextRequest, NextResponse } from "next/server"
import { decodeToken } from "@/lib/auth/jwt"
import { sendShippingNotificationEmail } from "@/lib/email/send-email"
import prisma from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin permission
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = decodeToken(token)

    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      )
    }

    const { id } = await params
    const { trackingNumber, estimatedDelivery } = await request.json()

    // Get order
    const order = await prisma.order.findUnique({
      where: { id },
      include: { user: { select: { email: true, name: true } } },
    })

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // Send shipping notification email
    if (order.user?.email) {
      await sendShippingNotificationEmail(order.user.email, {
        orderNumber: order.orderNumber,
        customerName: order.user.name || "Valued Customer",
        trackingNumber,
        estimatedDelivery,
      })

      // Update order shipping status
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { shippingStatus: "shipped" },
      })

      return NextResponse.json({
        message: "Shipping notification sent successfully",
        order: updatedOrder,
      })
    }

    return NextResponse.json(
      { error: "Unable to send notification - no email address found" },
      { status: 400 }
    )
  } catch (error) {
    console.error("[v0] Error sending shipping notification:", error)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}
