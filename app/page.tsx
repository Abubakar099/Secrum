"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronUp, ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { ProductCard } from "@/components/product/product-card"
import { useUIStore } from "@/store/ui-store"
import { useShopStore } from "@/store/shop-store"
import { PRODUCTS, NEW_ARRIVALS, BEST_DEALS, TESTIMONIALS, FAQS } from "@/lib/data"

const SKIN_CONCERNS = [
  {
    name: "Hydration",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    tag: "Hydration",
  },
  {
    name: "Anti-Aging",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    tag: "Anti-Aging",
  },
  {
    name: "Glow Skin",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",
    tag: "Glow Skin",
  },
  {
    name: "Acne Care",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600",
    tag: "Acne Care",
  },
  {
    name: "Dark Spots / Pigmentation",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    tag: "Dark Spots / Pigmentation",
  },
  {
    name: "Sensitive Skin",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
    tag: "Sensitive Skin",
  },
]

export default function HomePage() {
  const newArrivalsRef = useRef<HTMLDivElement>(null)
  const bestDealsRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null)

  const setConcerns = useShopStore((s) => s.setConcerns)
  const openQuizModal = useUIStore((s) => s.openQuizModal)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref && ref.current) {
      const scrollAmount = direction === "left" ? -350 : 350
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleConcernClick = (concern: string) => {
    setConcerns([concern])
    window.location.href = "/shop"
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] uppercase mb-4">
              BOTANICAL APOTHECARY
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-normal text-[#222222] mb-6 tracking-wide">
              Quiet Luxury Skincare
            </h1>
            <p className="text-sm md:text-base text-[#4a4a4a] leading-relaxed mb-8 max-w-md">
              Secrum distills bio-active nutrients from glacier-grown alpine flora and fjord-drawn marine silts,
              sealed in photoprotective twilight violet glass. Rejecting fast chemical noise since 2021.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/shop"
                className="inline-block bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-8 py-3 rounded-sm text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
              >
                Explore Collection
              </Link>
              <button
                onClick={openQuizModal}
                className="inline-block border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/50 px-8 py-3 rounded-sm text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
              >
                Take Quiz
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
              alt="Featured product"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#e8e2d9]/25 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
            <div className="text-left">
              <span className="font-mono text-[10.5px] tracking-[0.25em] text-[#4a4a4a] uppercase block mb-1">
                CURATED RITUAL
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222] tracking-wide">
                Featured Skincare Formulas
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold tracking-widest text-[#222222] hover:text-[#4a4a4a] flex items-center mt-4 md:mt-0 uppercase group"
            >
              <span>VIEW FULL SELECTION ATELIER</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#4a4a4a] uppercase">
              FRESH OUT OF THE LAB
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#222222] tracking-wide mt-1">
              New arrivals
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => scrollCarousel(newArrivalsRef as React.RefObject<HTMLDivElement>, "left")}
              className="w-9 h-9 border border-[#e8e2d9] hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel(newArrivalsRef as React.RefObject<HTMLDivElement>, "right")}
              className="w-9 h-9 border border-[#e8e2d9] hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={newArrivalsRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NEW_ARRIVALS.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[300px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Best Deals Carousel */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#e8e2d9]/40">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#4a4a4a] uppercase">
              LIMITED SEASON BUNDLES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#222222] tracking-wide mt-1">
              Best Deals This Month
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => scrollCarousel(bestDealsRef as React.RefObject<HTMLDivElement>, "left")}
              className="w-9 h-9 border border-[#e8e2d9] hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel(bestDealsRef as React.RefObject<HTMLDivElement>, "right")}
              className="w-9 h-9 border border-[#e8e2d9] hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={bestDealsRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {BEST_DEALS.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[300px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Skin Concerns Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#e8e2d9]/40 text-left">
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222] tracking-wide">
            Common Concerns
          </h2>
          <p className="text-sm text-[#4a4a4a] font-light mt-2">
            Not sure where to begin? Here are some common skin concerns.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {SKIN_CONCERNS.map((concern) => (
            <motion.div
              key={concern.name}
              onClick={() => handleConcernClick(concern.tag)}
              className="group cursor-pointer flex flex-col text-left"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-[#e8e2d9]/10 border border-[#e8e2d9]/25 mb-3">
                <Image
                  src={concern.image}
                  alt={concern.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#222222]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-sans font-medium text-xs md:text-sm text-[#222222] group-hover:text-[#4a4a4a] transition-colors flex items-center">
                {concern.name}
                <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#e8e2d9]/15 py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] uppercase">TESTIMONIALS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222] mt-2">Trusted by Botanists</h2>
          </div>

          <motion.div
            key={activeTestimonialIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-8 md:p-12 text-center shadow-sm"
          >
            <div className="flex justify-center mb-4">
              {[...Array(TESTIMONIALS[activeTestimonialIndex].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <p className="font-serif text-xl md:text-2xl italic text-[#222222] mb-6">
              "{TESTIMONIALS[activeTestimonialIndex].quote}"
            </p>
            <p className="font-semibold text-[#222222]">{TESTIMONIALS[activeTestimonialIndex].author}</p>
            <p className="text-sm text-[#4a4a4a]">{TESTIMONIALS[activeTestimonialIndex].role}</p>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeTestimonialIndex ? "bg-[#222222] w-6" : "bg-[#e8e2d9]"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222]">Frequently Asked</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.id}
              className="border border-[#e8e2d9] rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => setActiveFaqId(activeFaqId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#e8e2d9]/10 transition-colors"
              >
                <span className="font-semibold text-[#222222] text-left">{faq.question}</span>
                <span className={`text-[#4a4a4a] transition-transform ${activeFaqId === faq.id ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {activeFaqId === faq.id && (
                <div className="px-6 py-4 border-t border-[#e8e2d9] bg-[#f5f5f0]/50">
                  <p className="text-[#4a4a4a] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 p-3 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] rounded-full shadow-lg transition-all duration-300 cursor-pointer z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </>
  )
}
