"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, FileText, ShoppingBag, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      router.push("/shop")
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (response.ok) {
          const data = await response.json()
          setOrderDetails(data.order)
        }
      } catch (error) {
        console.error("[v0] Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f5f5f0] to-[#e8e2d9]/20 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e8e2d9]/50 mb-4">
            <div className="w-6 h-6 border-2 border-[#222222]/20 border-t-[#222222] rounded-full animate-spin" />
          </div>
          <p className="text-[#4a4a4a] text-sm">Loading order details...</p>
        </div>
      </main>
    )
  }

  if (!orderId) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f5f5f0] to-[#e8e2d9]/20 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[#4a4a4a]">Order not found.</p>
          <Link href="/shop" className="text-[#222222] font-semibold hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f5f0] to-[#e8e2d9]/20 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="w-20 h-20 text-emerald-600 stroke-[1.2]" />
          </motion.div>

          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#222222] mb-4 tracking-wide">
            Order Confirmed
          </h1>
          <p className="text-base md:text-lg text-[#4a4a4a] font-light max-w-xl mx-auto">
            Thank you for your purchase. Your botanical collection is being prepared with care.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-[8px] p-8 md:p-12 shadow-[0_10px_30px_rgba(74,74,74,0.06)] border border-[#e8e2d9]/40 mb-8"
        >
          {/* Order Number and Status */}
          <div className="mb-8 pb-8 border-b border-[#e8e2d9]">
            <p className="text-xs font-mono tracking-[0.2em] text-[#4a4a4a] uppercase mb-3">
              Order Reference
            </p>
            <p className="font-mono text-2xl md:text-3xl font-semibold text-[#222222] mb-4 break-all">
              {orderId}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-mono tracking-wider text-[#4a4a4a] uppercase mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="font-semibold text-[#222222] capitalize">
                    {orderDetails?.status === "confirmed" ? "Confirmed - Ready to Ship" : orderDetails?.status}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono tracking-wider text-[#4a4a4a] uppercase mb-1">Payment</p>
                <span className="font-semibold text-[#222222] capitalize">
                  {orderDetails?.paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {orderDetails?.items && orderDetails.items.length > 0 && (
            <div className="mb-8 pb-8 border-b border-[#e8e2d9]">
              <p className="text-xs font-mono tracking-[0.2em] text-[#4a4a4a] uppercase mb-4">
                Items Ordered
              </p>
              <div className="space-y-3">
                {orderDetails.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-3">
                    <div className="flex-grow">
                      <p className="font-semibold text-[#222222]">{item.product.name}</p>
                      <p className="text-xs text-[#4a4a4a] mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-[#222222]">
                      Rs.{(item.price * item.quantity).toLocaleString("en-PK")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {orderDetails?.shipping && (
            <div className="mb-8 pb-8 border-b border-[#e8e2d9]">
              <p className="text-xs font-mono tracking-[0.2em] text-[#4a4a4a] uppercase mb-4">
                Delivery Address
              </p>
              <div className="bg-[#e8e2d9]/20 rounded-sm p-4 space-y-2">
                <p className="font-semibold text-[#222222]">{orderDetails.shipping.name}</p>
                <p className="text-sm text-[#4a4a4a]">{orderDetails.shipping.address}</p>
                <p className="text-sm text-[#4a4a4a]">
                  {orderDetails.shipping.city}, {orderDetails.shipping.province} {orderDetails.shipping.postalCode}
                </p>
                <p className="text-sm text-[#4a4a4a]">Phone: {orderDetails.shipping.phone}</p>
              </div>
            </div>
          )}

          {/* Order Total */}
          <div className="space-y-2.5 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4a4a]">Subtotal</span>
              <span className="font-semibold text-[#222222]">
                Rs.{orderDetails?.subtotal?.toLocaleString("en-PK")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4a4a]">Shipping</span>
              <span className="font-semibold text-[#222222]">
                {orderDetails?.shippingCost === 0 ? "Complimentary" : `Rs.${orderDetails?.shippingCost?.toLocaleString("en-PK")}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4a4a]">Tax (8%)</span>
              <span className="font-semibold text-[#222222]">
                Rs.{orderDetails?.tax?.toLocaleString("en-PK")}
              </span>
            </div>
            <div className="flex justify-between text-lg border-t border-[#e8e2d9] pt-3">
              <span className="font-semibold text-[#222222]">Total</span>
              <span className="font-bold text-[#222222] text-xl">
                Rs.{orderDetails?.total?.toLocaleString("en-PK")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-[8px] p-6 border border-[#e8e2d9]/40 hover:shadow-[0_10px_30px_rgba(74,74,74,0.06)] transition-shadow">
            <Package className="w-6 h-6 text-[#222222] mb-3" />
            <h3 className="font-semibold text-[#222222] mb-1">Next Steps</h3>
            <p className="text-xs text-[#4a4a4a] font-light">
              We'll prepare your order and send tracking updates to your email.
            </p>
          </div>

          <div className="bg-white rounded-[8px] p-6 border border-[#e8e2d9]/40 hover:shadow-[0_10px_30px_rgba(74,74,74,0.06)] transition-shadow">
            <FileText className="w-6 h-6 text-[#222222] mb-3" />
            <h3 className="font-semibold text-[#222222] mb-1">Confirmation Email</h3>
            <p className="text-xs text-[#4a4a4a] font-light">
              A detailed receipt has been sent to your email address.
            </p>
          </div>

          <div className="bg-white rounded-[8px] p-6 border border-[#e8e2d9]/40 hover:shadow-[0_10px_30px_rgba(74,74,74,0.06)] transition-shadow">
            <ShoppingBag className="w-6 h-6 text-[#222222] mb-3" />
            <h3 className="font-semibold text-[#222222] mb-1">Continue Shopping</h3>
            <p className="text-xs text-[#4a4a4a] font-light">
              Explore more botanical formulas to enhance your ritual.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/profile"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-6 py-4 rounded-[4px] font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300"
          >
            View Order History
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/30 px-6 py-4 rounded-[4px] font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
