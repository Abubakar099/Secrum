"use client"

import { useEffect, useState } from "react"
import { Mail, MapPin, MessageCircle, ArrowRight, Package, Calendar, DollarSign } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

// Mock user data
const USER_DATA = {
  name: "Sarah Anderson",
  email: "sarah.anderson@email.com",
  address: "72 Rue de l'Apotheke, 1201 Geneva, Switzerland",
  phone: "+41791234567",
  joinedDate: "2024",
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching orders:", error)
      } finally {
        setLoadingOrders(false)
      }
    }

    fetchOrders()
  }, [])

  const whatsappMessage = `Hi, I'd like to know more about Secrum skincare products.`
  const whatsappLink = `https://wa.me/${USER_DATA.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f5f0] to-[#e8e2d9]/20 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] uppercase mb-4">
            USER ACCOUNT
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#222222] mb-4 tracking-wide">
            My Profile
          </h1>
          <p className="text-sm md:text-base text-[#4a4a4a] font-light">
            Member since {USER_DATA.joinedDate}
          </p>
        </motion.div>

        {/* Profile Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-[8px] p-8 md:p-12 shadow-[0_10px_30px_rgba(74,74,74,0.06)] border border-[#e8e2d9]/40"
        >
          {/* Name Section */}
          <div className="mb-10 pb-10 border-b border-[#e8e2d9]">
            <p className="text-xs font-mono tracking-[0.2em] text-[#4a4a4a] uppercase mb-3">
              Full Name
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222] tracking-wide">
              {USER_DATA.name}
            </h2>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Email Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8e2d9]/50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#222222]" />
                </div>
                <p className="font-mono text-xs tracking-[0.15em] text-[#4a4a4a] uppercase">Email</p>
              </div>
              <p className="font-sans text-base md:text-lg text-[#222222]">{USER_DATA.email}</p>
              <a
                href={`mailto:${USER_DATA.email}`}
                className="text-xs font-semibold text-[#d946a6] hover:text-[#222222] mt-3 flex items-center gap-1 group transition-colors"
              >
                Send Email
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8e2d9]/50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#222222]" />
                </div>
                <p className="font-mono text-xs tracking-[0.15em] text-[#4a4a4a] uppercase">Address</p>
              </div>
              <p className="font-sans text-base md:text-lg text-[#222222]">{USER_DATA.address}</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#e8e2d9]">
            <Link
              href="/shop"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-6 py-3 rounded-[4px] font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/30 px-6 py-3 rounded-[4px] font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300"
            >
              Back Home
            </Link>
          </div>
        </motion.div>

        {/* Order History Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-8">
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] uppercase mb-4">
              ORDER HISTORY
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222] tracking-wide">
              Your Orders
            </h2>
          </div>

          {loadingOrders ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#e8e2d9]/50 mb-4">
                <div className="w-5 h-5 border-2 border-[#222222]/20 border-t-[#222222] rounded-full animate-spin" />
              </div>
              <p className="text-[#4a4a4a] text-sm">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-[8px] p-12 shadow-[0_10px_30px_rgba(74,74,74,0.06)] border border-[#e8e2d9]/40 text-center">
              <Package className="w-12 h-12 text-[#e8e2d9] mx-auto mb-4" />
              <p className="font-serif text-lg text-[#222222] mb-2">No Orders Yet</p>
              <p className="text-sm text-[#4a4a4a] font-light mb-6 max-w-md mx-auto">
                Your orders will appear here. Start exploring our botanical collection.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-6 py-3 rounded-[4px] font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[8px] p-6 md:p-8 shadow-[0_10px_30px_rgba(74,74,74,0.06)] border border-[#e8e2d9]/40 hover:shadow-[0_15px_40px_rgba(74,74,74,0.08)] transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-[#e8e2d9]">
                    {/* Order Number */}
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.15em] text-[#4a4a4a] uppercase mb-2">
                        Order ID
                      </p>
                      <p className="font-mono text-sm font-semibold text-[#222222]">{order.orderNumber}</p>
                    </div>

                    {/* Order Date */}
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.15em] text-[#4a4a4a] uppercase mb-2">
                        Date
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#4a4a4a]" />
                        <p className="text-sm text-[#222222]">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Order Status */}
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.15em] text-[#4a4a4a] uppercase mb-2">
                        Status
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            order.status === "confirmed"
                              ? "bg-emerald-600"
                              : order.status === "pending"
                                ? "bg-amber-500"
                                : "bg-slate-400"
                          }`}
                        />
                        <p className="text-sm font-semibold text-[#222222] capitalize">
                          {order.status === "confirmed" ? "Ready to Ship" : order.status}
                        </p>
                      </div>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.15em] text-[#4a4a4a] uppercase mb-2">
                        Total
                      </p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#222222]" />
                        <p className="text-sm font-bold text-[#222222]">
                          {order.total.toLocaleString("en-PK")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <p className="text-[10px] font-mono tracking-[0.15em] text-[#4a4a4a] uppercase mb-3">
                      Items ({order.items.length})
                    </p>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item: any) => (
                        <p key={item.id} className="text-xs text-[#4a4a4a]">
                          {item.product.name} <span className="font-semibold">x{item.quantity}</span>
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-[#4a4a4a] italic">
                          +{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/order/success?orderId=${order.orderNumber}`}
                    className="inline-flex items-center gap-2 text-[#222222] hover:text-[#4a4a4a] font-semibold text-xs tracking-[0.1em] uppercase transition-colors group"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-xs font-mono tracking-[0.15em] text-[#4a4a4a] uppercase mb-2">
            Need Support?
          </p>
          <p className="text-sm text-[#4a4a4a] font-light">
            Contact our customer care team through WhatsApp for instant assistance.
          </p>
        </motion.div>
      </div>

      {/* Fixed WhatsApp Button - Bottom Left */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed left-6 bottom-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#20a652] shadow-lg flex items-center justify-center text-white transition-all duration-300"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
      </motion.a>

      {/* WhatsApp Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed left-24 bottom-8 z-40 bg-[#222222] text-white text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap pointer-events-none hidden md:block"
      >
        Message us
      </motion.div>
    </main>
  )
}
