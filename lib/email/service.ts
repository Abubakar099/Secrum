import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'orders@secrum-apothecary.com'

export interface OrderConfirmationData {
  orderNumber: string
  customerName: string
  email: string
  phone: string
  shippingAddress: {
    street: string
    city: string
    province: string
    postalCode: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  paymentMethod: 'jazz_cash' | 'cod'
  orderDate?: string
  estimatedDelivery?: string
}

export async function sendOrderConfirmation(
  email: string,
  orderNumber: string,
  total: number,
  orderData?: OrderConfirmationData
) {
  try {
    // If orderData is provided, send comprehensive email with all details
    if (orderData) {
      const itemsHtml = orderData.items
        .map(
          (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e8e2d9;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e8e2d9; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e8e2d9; text-align: right;">PKR ${item.price.toFixed(2)}</td>
        </tr>
      `
        )
        .join('')

      const methodDisplay = orderData.paymentMethod === 'jazz_cash' ? 'Jazz Cash' : 'Cash on Delivery'

      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Order Confirmed - ${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f5f5f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin-top: 0; color: #222222;">Order Confirmed!</h2>
              <p>Thank you for your order, <strong>${orderData.customerName}</strong>!</p>
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e8e2d9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #222222; border-bottom: 2px solid #e8e2d9; padding-bottom: 10px;">Order Details</h3>
              <p><strong>Order Number:</strong> ${orderNumber}</p>
              <p><strong>Order Date:</strong> ${orderData.orderDate || new Date().toLocaleDateString()}</p>
              ${orderData.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>` : ''}
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e8e2d9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #222222; border-bottom: 2px solid #e8e2d9; padding-bottom: 10px;">Products Ordered</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f5f5f0;">
                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e8e2d9;">Product</th>
                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e8e2d9;">Qty</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 1px solid #e8e2d9;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e8e2d9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #222222; border-bottom: 2px solid #e8e2d9; padding-bottom: 10px;">Shipping Address</h3>
              <p>
                ${orderData.shippingAddress.street}<br/>
                ${orderData.shippingAddress.city}, ${orderData.shippingAddress.province} ${orderData.shippingAddress.postalCode}
              </p>
            </div>

            <div style="background-color: #ffffff; border: 1px solid #e8e2d9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #222222; border-bottom: 2px solid #e8e2d9; padding-bottom: 10px;">Order Summary</h3>
              <table style="width: 100%; text-align: right;">
                <tr>
                  <td style="padding: 8px; text-align: left;">Subtotal</td>
                  <td style="padding: 8px;">PKR ${orderData.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; text-align: left;">Shipping</td>
                  <td style="padding: 8px;">PKR ${orderData.shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; text-align: left;">Tax</td>
                  <td style="padding: 8px;">PKR ${orderData.tax.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #e8e2d9; font-weight: bold; font-size: 16px;">
                  <td style="padding: 8px; text-align: left;">Total</td>
                  <td style="padding: 8px;">PKR ${orderData.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: ${methodDisplay === 'Cash on Delivery' ? '#fff3cd' : '#e3f2fd'}; border: 1px solid #ffc107; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #222222;">Payment Method: ${methodDisplay}</h3>
              ${
                methodDisplay === 'Cash on Delivery'
                  ? `
                <p>Please prepare <strong>PKR ${orderData.total.toFixed(2)}</strong> in cash.</p>
                <p>Our delivery partner will collect the payment upon delivery.</p>
                <p><strong>Important:</strong> Please keep this order number for reference: <strong>${orderNumber}</strong></p>
              `
                  : `
                <p>Please complete your payment using Jazz Cash.</p>
                <p>Amount: <strong>PKR ${orderData.total.toFixed(2)}</strong></p>
              `
              }
            </div>

            <div style="background-color: #f5f5f0; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="color: #4a4a4a; margin-top: 0;">Questions? Reply to this email or contact us at support@secrum-apothecary.com</p>
              <p style="color: #4a4a4a; margin-bottom: 0;">Best regards,<br/><strong>Secrum Apothecary Team</strong></p>
            </div>
          </div>
        `,
      })
      console.log('[v0] Detailed order confirmation email sent to:', email)
    } else {
      // Fallback to basic confirmation email
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Order Confirmation - ${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Order Confirmed</h2>
            <p>Thank you for your order!</p>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Total Amount:</strong> PKR ${total.toFixed(2)}</p>
            <p>We'll send you a shipping notification as soon as your order is dispatched.</p>
            <p>Best regards,<br/>Secrum Apothecary Team</p>
          </div>
        `,
      })
      console.log('[v0] Basic order confirmation email sent to:', email)
    }
  } catch (error) {
    console.error('[v0] Failed to send order confirmation:', error)
    throw error
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password - Secrum Apothecary',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Click the link below to proceed:</p>
          <p><a href="${resetLink}" style="color: #222222; text-decoration: none;">Reset Password</a></p>
          <p style="color: #999;">This link expires in 24 hours.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br/>Secrum Apothecary Team</p>
        </div>
      `,
    })
    console.log('[v0] Password reset email sent to:', email)
  } catch (error) {
    console.error('[v0] Failed to send password reset email:', error)
  }
}

export async function sendReviewApprovalEmail(email: string, productName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your Review for ${productName} Was Approved`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Review Approved</h2>
          <p>Great news! Your review for <strong>${productName}</strong> has been approved and is now visible on our website.</p>
          <p>Thank you for helping our community make informed purchasing decisions!</p>
          <p>Best regards,<br/>Secrum Apothecary Team</p>
        </div>
      `,
    })
    console.log('[v0] Review approval email sent to:', email)
  } catch (error) {
    console.error('[v0] Failed to send review approval email:', error)
  }
}

export async function sendPaymentNotificationEmail(email: string, paymentMethod: string, amount: number, orderId: string) {
  try {
    const methodDisplay = paymentMethod === 'jazz_cash' ? 'Jazz Cash' : 'Cash on Delivery'
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Payment Instructions - Order ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Payment Instructions</h2>
          <p><strong>Payment Method:</strong> ${methodDisplay}</p>
          <p><strong>Amount Due:</strong> PKR ${amount.toFixed(2)}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          ${paymentMethod === 'jazz_cash' ? `
            <p>Please complete your Jazz Cash payment using the amount above. You'll receive a verification link via SMS.</p>
          ` : `
            <p>Please prepare the exact amount in cash. Our delivery partner will collect payment on delivery.</p>
          `}
          <p>Best regards,<br/>Secrum Apothecary Team</p>
        </div>
      `,
    })
    console.log('[v0] Payment notification email sent to:', email)
  } catch (error) {
    console.error('[v0] Failed to send payment notification email:', error)
  }
}
