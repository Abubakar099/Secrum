import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'orders@secrum-apothecary.com'

export async function sendOrderConfirmation(email: string, orderNumber: string, total: number) {
  try {
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
    console.log('[v0] Order confirmation email sent to:', email)
  } catch (error) {
    console.error('[v0] Failed to send order confirmation:', error)
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
