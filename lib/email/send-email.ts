import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(
  to: string,
  orderData: {
    orderNumber: string
    customerName: string
    items: Array<{ productName: string; quantity: number; price: number }>
    subtotal: number
    shippingCost: number
    tax: number
    total: number
    shippingAddress: {
      address: string
      city: string
      postalCode: string
    }
    paymentMethod: string
  }
) {
  try {
    const itemsHtml = orderData.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e8e2d9;">${item.productName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e8e2d9; text-align: center;">x${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e8e2d9; text-align: right;">$${item.price.toLocaleString()}</td>
      </tr>
    `
      )
      .join("")

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #222222; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #222222; color: #f5f5f0; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background-color: #f5f5f0; padding: 30px; }
            .section { margin-bottom: 30px; }
            .section h2 { font-size: 16px; font-weight: 600; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; }
            .summary { background-color: white; padding: 20px; border: 1px solid #e8e2d9; }
            .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .summary-total { font-weight: 600; font-size: 18px; border-top: 2px solid #222222; padding-top: 12px; margin-top: 12px; }
            .footer { background-color: #e8e2d9; padding: 20px; text-align: center; font-size: 12px; color: #4a4a4a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Thank you for your purchase</p>
            </div>

            <div class="content">
              <p>Hi ${orderData.customerName},</p>
              <p>Your order has been successfully placed! Here's a summary of your order:</p>

              <div class="section">
                <h2>Order Details</h2>
                <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>

              <div class="section">
                <h2>Items Ordered</h2>
                <table>
                  <thead>
                    <tr style="background-color: #e8e2d9;">
                      <th style="padding: 12px; text-align: left;">Product</th>
                      <th style="padding: 12px; text-align: center;">Quantity</th>
                      <th style="padding: 12px; text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
              </div>

              <div class="section">
                <div class="summary">
                  <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div class="summary-row">
                    <span>Shipping:</span>
                    <span>$${orderData.shippingCost.toLocaleString()}</span>
                  </div>
                  <div class="summary-row">
                    <span>Tax:</span>
                    <span>$${orderData.tax.toLocaleString()}</span>
                  </div>
                  <div class="summary-row summary-total">
                    <span>Total:</span>
                    <span>$${orderData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div class="section">
                <h2>Shipping Address</h2>
                <p>
                  ${orderData.shippingAddress.address}<br>
                  ${orderData.shippingAddress.city}, ${orderData.shippingAddress.postalCode}
                </p>
              </div>

              <div class="section">
                <h2>Payment Method</h2>
                <p>
                  ${orderData.paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card"}
                </p>
                ${orderData.paymentMethod === "cod" ? "<p><strong>Please have the exact amount ready when your order arrives.</strong></p>" : ""}
              </div>

              <p>You can track your order status anytime by visiting your account dashboard.</p>
              <p>If you have any questions, please don't hesitate to contact our customer support team.</p>

              <p>Best regards,<br><strong>SECRUM Team</strong></p>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Secrum Botanical. All rights reserved.</p>
              <p>This is an automated email. Please do not reply directly to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "orders@secrum.com",
      to,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html,
    })

    console.log("[v0] Email sent:", result)
    return result
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    throw error
  }
}

export async function sendShippingNotificationEmail(
  to: string,
  orderData: {
    orderNumber: string
    customerName: string
    trackingNumber?: string
    estimatedDelivery?: string
  }
) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #222222; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #222222; color: #f5f5f0; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background-color: #f5f5f0; padding: 30px; }
            .info-box { background-color: #e8e2d9; padding: 20px; border-left: 4px solid #222222; margin: 20px 0; }
            .footer { background-color: #e8e2d9; padding: 20px; text-align: center; font-size: 12px; color: #4a4a4a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Order is on the Way!</h1>
            </div>

            <div class="content">
              <p>Hi ${orderData.customerName},</p>
              <p>Great news! Your order has been shipped and is on its way to you.</p>

              <div class="info-box">
                <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
                ${orderData.trackingNumber ? `<p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>` : ""}
                ${orderData.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>` : ""}
              </div>

              <p>You can track your shipment status in your account dashboard or use the tracking number provided above.</p>
              <p>If you have any questions about your order, please contact our customer support team.</p>

              <p>Best regards,<br><strong>SECRUM Team</strong></p>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Secrum Botanical. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "orders@secrum.com",
      to,
      subject: `Shipment Notification - ${orderData.orderNumber}`,
      html,
    })

    console.log("[v0] Shipping email sent:", result)
    return result
  } catch (error) {
    console.error("[v0] Error sending shipping email:", error)
    throw error
  }
}
