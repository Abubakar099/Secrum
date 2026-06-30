"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const HERO_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1920&h=1080",
    alt: "Premium skincare hero image 1",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1920&h=1080",
    alt: "Premium skincare hero image 2",
    quality: 75
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=1920&h=1080",
    alt: "Premium skincare hero image 3",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  // Autoplay functionality
  useEffect(() => {
    if (!autoplayEnabled) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplayEnabled])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoplayEnabled(false)
    // Re-enable autoplay after 1 second of user interaction
    const timeout = setTimeout(() => setAutoplayEnabled(true), 1000)
    return () => clearTimeout(timeout)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % HERO_IMAGES.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#f5f5f0]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentIndex].url}
            alt={HERO_IMAGES[currentIndex].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
          {/* Subtle dark overlay for better contrast */}
          <div className="absolute inset-0 bg-[#222222]/5" />
        </motion.div>
      </AnimatePresence>

      {/* Left Navigation Arrow */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-[#f5f5f0]/80 hover:bg-[#f5f5f0] text-[#222222] transition-all duration-300 backdrop-blur-sm border border-[#f5f5f0]/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Right Navigation Arrow */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-[#f5f5f0]/80 hover:bg-[#f5f5f0] text-[#222222] transition-all duration-300 backdrop-blur-sm border border-[#f5f5f0]/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {HERO_IMAGES.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#222222] w-8 h-2.5"
                : "bg-[#f5f5f0]/70 hover:bg-[#f5f5f0] w-2.5 h-2.5"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 text-[#222222] font-mono text-xs md:text-sm tracking-widest font-semibold bg-[#f5f5f0]/70 px-4 py-2 rounded-full backdrop-blur-sm">
        {String(currentIndex + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}
      </div>
    </section>
  )
}
