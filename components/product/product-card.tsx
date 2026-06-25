"use client"

import Image from "next/image"
import { Eye, Plus, Heart } from "lucide-react"
import { motion } from "motion/react"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/store/cart-store"
import { useUIStore } from "@/store/ui-store"

interface ProductCardProps {
  product: Product
}

function categoryLabel(category: Product["category"]) {
  if (category === "moisturizers") return "moisturizer"
  if (category === "serums") return "serum"
  if (category === "cleansers") return "cleanser"
  if (category === "exfoliants") return "exfoliant"
  return category
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart)
  const setSelectedProduct = useUIStore((s) => s.setSelectedProduct)
  const savedProductIds = useUIStore((s) => s.savedProductIds)
  const toggleSaveProduct = useUIStore((s) => s.toggleSaveProduct)
  const saved = savedProductIds.includes(product.id)

  // Determine if there is a NEW or BESTSELLER badge matching the reference
  const badgeText =
    product.id === "secrum-01" ? "NEW" : product.id === "secrum-03" ? "BESTSELLER" : null

  // Check if product has sale/discount status
  const hasSale = (product as any).hasDiscount === true
  const salePrice = (product as any).salePrice
  const originalPrice = (product as any).originalPrice

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full bg-white hover:bg-[#fcfcfa] rounded-[4px] overflow-hidden p-3 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(74,74,74,0.04)] border border-transparent hover:border-[#e8e2d9]/40"
      id={`product-card-${product.id}`}
    >
      {/* Visual Image container with subtle zoom effect */}
      <div
        className="relative overflow-hidden aspect-[4/5] bg-[#e8e2d9]/15 rounded-[3px] mb-4 cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transform transition-transform duration-[1200ms] ease-out group-hover:scale-103"
        />

        {/* Ambient Dark Overlay on hover */}
        <div className="absolute inset-0 bg-[#222222]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedProduct(product)
            }}
            className="p-3 bg-[#f5f5f0] hover:bg-[#222222] text-[#222222] hover:text-[#f5f5f0] rounded-[3px] transition-all duration-300 shadow-sm cursor-pointer"
            title="Inspect formula"
            aria-label="Inspect formula"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product, 1)
            }}
            className="p-3 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] rounded-[3px] transition-all duration-300 shadow-sm cursor-pointer"
            title="Quick add to bag"
            aria-label="Quick add to bag"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* NEW or BESTSELLER badge overlay */}
        {badgeText && (
          <div className="absolute top-3 left-3">
            <span className="text-[8px] font-sans font-bold tracking-[0.2em] bg-[#222222]/90 backdrop-blur-xs text-[#f5f5f0] py-1 px-2.5 uppercase rounded-xs shadow-xs">
              {badgeText}
            </span>
          </div>
        )}

        {/* SALE badge overlay */}
        {hasSale && (
          <div className="absolute top-3 right-3">
            <span className="text-[8px] font-sans font-bold tracking-[0.2em] bg-[#d946a6]/90 backdrop-blur-xs text-[#f5f5f0] py-1 px-2.5 uppercase rounded-xs shadow-xs">
              Sale
            </span>
          </div>
        )}

        {/* Favorite heart toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleSaveProduct(product.id)
          }}
          aria-label={saved ? "Remove from saved" : "Save product"}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs transition-colors duration-300 ${
            saved
              ? "bg-[#222222]/90 text-red-400"
              : "bg-[#f5f5f0]/80 text-[#4a4a4a] hover:bg-[#f5f5f0] hover:text-red-400"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
        </button>

        {/* Volume badge in footer corner */}
        <div className="absolute bottom-3 left-3">
          <span className="font-mono text-[8px] tracking-wider text-[#f5f5f0]/90 bg-[#222222]/40 backdrop-blur-xs py-0.5 px-2 rounded-xs">
            {product.volume}
          </span>
        </div>
      </div>

      {/* Editorial Title & details */}
      <div className="flex flex-col flex-grow text-center px-2 pb-2">
        {/* Category */}
        <span className="font-sans text-[9px] font-semibold tracking-[0.2em] text-[#8c8c88] uppercase mb-1">
          {categoryLabel(product.category)}
        </span>

        {/* Product Name */}
        <h3
          onClick={() => setSelectedProduct(product)}
          className="font-serif text-[17px] font-normal leading-snug text-[#222222] hover:text-[#4a4a4a] transition-colors duration-300 cursor-pointer mb-1 line-clamp-2 min-h-[44px] flex items-center justify-center"
        >
          {product.name}
        </h3>

        {/* Star Rating line */}
        <div className="flex items-center justify-center space-x-1 mb-2">
          <div className="flex items-center text-[#ffc107]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] font-sans text-gray-500 font-light">({product.reviewsCount})</span>
        </div>

        {/* Footer: price and CTA */}
        <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-[#e8e2d9]/50">
          {/* Pricing Section */}
          {hasSale ? (
            <div className="flex items-center gap-2">
              <span className="font-sans text-[13px] font-bold text-[#d946a6]">{salePrice}</span>
              <span className="font-sans text-[11px] text-[#8c8c88] line-through">{originalPrice}</span>
            </div>
          ) : (
            <span className="font-sans text-[13px] font-medium text-[#222222]">
              {salePrice || `Rs.${(product.price * 100).toLocaleString('en-PK')}.00 PKR`}
            </span>
          )}

          <button
            onClick={() => addToCart(product, 1)}
            className="text-[9px] font-sans font-bold tracking-[0.12em] text-[#222222] hover:text-[#4a4a4a] flex items-center justify-center space-x-1 uppercase focus:outline-none cursor-pointer group/btn"
          >
            <span>ADD TO BAG</span>
            <span className="transform group-hover/btn:translate-x-0.5 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
