"use client"

import { Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react"
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

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
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
