"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingBag, Menu, X, ArrowRight, Heart, User } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useCartStore } from "@/store/cart-store"
import { useUIStore } from "@/store/ui-store"

const navItems = [
  { href: "/", label: "Home", index: "01. Home" },
  { href: "/shop", label: "Shop", index: "02. Shop" },
  { href: "/about", label: "About", index: "03. About" },
] as const

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartItems = useCartStore((s) => s.cartItems)
  const openCart = useCartStore((s) => s.openCart)
  const savedCount = useUIStore((s) => s.savedProductIds.length)

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  // Monitor scroll height to apply dynamic frosting backdrop effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#f5f5f0]/95 backdrop-blur-md border-[#e8e2d9] py-4 shadow-[0_10px_30px_rgba(74,74,74,0.03)]"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Identity */}
          <button
            onClick={() => {
              router.push("/")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex flex-col items-start text-left focus:outline-none cursor-pointer group"
            aria-label="Secrum home"
          >
            <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.16em] uppercase text-[#222222] transition-colors duration-300 group-hover:text-[#4a4a4a]">
              Secrum
            </span>
            <span className="text-[8px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4a4a4a] mt-0.5 opacity-80">
              botanical apotheke
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-1 text-xs font-semibold tracking-[0.15em] text-[#4a4a4a] hover:text-[#222222] transition-colors duration-300 focus:outline-none cursor-pointer"
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#222222]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Utility Tools */}
          <div className="flex items-center space-x-5">
            {/* Profile Link */}
            <Link
              href="/profile"
              className="p-2.5 rounded-full border border-transparent hover:border-[#e8e2d9] bg-transparent hover:bg-[#e8e2d9]/40 transition-all duration-300 cursor-pointer text-[#222222]"
              aria-label="Go to profile"
            >
              <User className="w-4 h-4 stroke-[1.8]" />
            </Link>

            {/* Soft Favorite Quick Status */}
            <div className="hidden sm:flex items-center text-xs tracking-widest text-[#4a4a4a]">
              <Heart className="w-3.5 h-3.5 text-[#4a4a4a] mr-1.5" />
              <span className="font-sans text-[11px] font-medium">{savedCount}</span>
            </div>

            {/* Shopping Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full border border-transparent hover:border-[#e8e2d9] bg-[#e8e2d9]/40 hover:bg-[#e8e2d9]/75 transition-all duration-300 cursor-pointer text-[#222222]"
              aria-label="Open cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#222222] text-[#f5f5f0] text-[9px] font-sans font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#f5f5f0] shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden hover:bg-[#e8e2d9]/50 rounded-full transition-colors duration-300 cursor-pointer text-[#222222]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#222222] z-50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-[#f5f5f0] z-50 px-8 py-10 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl tracking-widest text-[#222222] uppercase">Secrum</span>
                    <span className="text-[7.5px] font-semibold tracking-widest text-[#4a4a4a] mt-0.5">
                      BOTANICAL APOTHEKE
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-[#e8e2d9]/50 rounded-full transition-colors duration-300 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-[#222222]" />
                  </button>
                </div>

                {/* Vertical menu navigation */}
                <div className="flex flex-col space-y-7">
                  {navItems.map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      key={item.href}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-left py-2 font-serif text-lg tracking-wider text-[#4a4a4a] hover:text-[#222222] border-b border-[#e8e2d9]/40 flex items-center justify-between group cursor-pointer"
                      >
                        <span className={isActive(item.href) ? "text-[#222222] font-semibold" : ""}>
                          {item.index}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-[#222222]" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer Botanical Footer Accent */}
              <div className="text-left border-t border-[#e8e2d9] pt-6 opacity-80">
                <p className="text-[9px] font-sans font-semibold tracking-[0.2em] text-[#4a4a4a] uppercase">
                  Studio Atelier Hours
                </p>
                <p className="font-serif text-[13px] text-[#222222] mt-1 italic">Mon – Sat, 10am – 6pm</p>
                <p className="text-[10px] font-light text-[#4a4a4a] mt-2">72 Rue de l&apos;Apotheke, Geneva</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
