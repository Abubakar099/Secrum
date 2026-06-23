"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Star, Wind, Leaf, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useUIStore } from "@/store/ui-store"
import { useCartStore } from "@/store/cart-store"

type TabType = "details" | "ingredients" | "ritual"

export default function ProductDetailModal() {
  const selectedProduct = useUIStore((s) => s.selectedProduct)
  const setSelectedProduct = useUIStore((s) => s.setSelectedProduct)
  const toggleSaveProduct = useUIStore((s) => s.toggleSaveProduct)
  const savedProductIds = useUIStore((s) => s.savedProductIds)
  const addToCart = useCartStore((s) => s.addToCart)

  const [activeTab, setActiveTab] = useState<TabType>("details")
  const [quantity, setQuantity] = useState(1)
  const [isCopied, setIsCopied] = useState(false)

  if (!selectedProduct) return null

  const saved = savedProductIds.includes(selectedProduct.id)

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity)
    setSelectedProduct(null)
    setQuantity(1)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shop?product=${selectedProduct.id}`)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {selectedProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-[#222222] z-50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-4xl bg-[#f5f5f0] rounded-[8px] overflow-hidden shadow-2xl flex flex-col md:flex-row text-left max-h-[90vh]"
              id={`detail-modal-container-${selectedProduct.id}`}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#f5f5f0]/80 backdrop-blur-xs hover:bg-[#222222] text-[#222222] hover:text-[#f5f5f0] rounded-full transition-all duration-300 cursor-pointer shadow-xs"
                aria-label="Close product view"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 bg-[#e8e2d9]/40 relative flex flex-col justify-between overflow-hidden">
                <div className="aspect-[4/5] w-full relative">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/30 to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-5 text-[#f5f5f0]">
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-90">
                      S E C R U M L A B S
                    </p>
                    <p className="font-serif text-lg font-normal italic tracking-wide mt-0.5">
                      Bio-Intelligent Skincare
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-[#e8e2d9]/25 hidden md:grid grid-cols-3 gap-2.5 text-center">
                  <div className="flex flex-col items-center">
                    <Wind className="w-4 h-4 text-[#4a4a4a] mb-1.5 stroke-[1.2]" />
                    <span className="text-[9px] font-sans font-semibold text-[#4a4a4a] uppercase tracking-wider">
                      Alpine Flora
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Leaf className="w-4 h-4 text-[#4a4a4a] mb-1.5 stroke-[1.2]" />
                    <span className="text-[9px] font-sans font-semibold text-[#4a4a4a] uppercase tracking-wider">
                      100% Natural
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Sparkles className="w-4 h-4 text-[#4a4a4a] mb-1.5 stroke-[1.2]" />
                    <span className="text-[9px] font-sans font-semibold text-[#4a4a4a] uppercase tracking-wider">
                      Non-Toxic
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="text-[10px] font-mono font-semibold tracking-[0.3em] text-[#4a4a4a] uppercase">
                    {selectedProduct.number}
                  </span>
                  <h2 className="font-serif text-3xl font-normal text-[#222222] mt-2 mb-1">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-sm text-[#4a4a4a] italic mb-4">{selectedProduct.tagline}</p>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-[#222222] text-[#222222]" />
                      <span className="text-sm font-semibold text-[#222222]">{selectedProduct.rating}</span>
                      <span className="text-xs text-[#4a4a4a]">({selectedProduct.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-[#e8e2d9]">
                    <p className="text-xs text-[#4a4a4a] leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex space-x-4 mb-6 border-b border-[#e8e2d9]">
                      {(["details", "ingredients", "ritual"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                            activeTab === tab
                              ? "text-[#222222] border-b-[2px] border-[#222222]"
                              : "text-[#4a4a4a] hover:text-[#222222]"
                          }`}
                        >
                          {tab === "details" && "Details"}
                          {tab === "ingredients" && "Ingredients"}
                          {tab === "ritual" && "Ritual"}
                        </button>
                      ))}
                    </div>

                    <div className="min-h-[100px]">
                      {activeTab === "details" && (
                        <div className="space-y-3 text-xs text-[#4a4a4a]">
                          <div>
                            <span className="font-semibold text-[#222222]">Volume:</span> {selectedProduct.volume}
                          </div>
                          <div>
                            <span className="font-semibold text-[#222222]">Category:</span>
                            <span className="capitalize"> {selectedProduct.category}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-[#222222]">Usage:</span>
                            <p className="mt-1 leading-relaxed">{selectedProduct.usage}</p>
                          </div>
                        </div>
                      )}

                      {activeTab === "ingredients" && (
                        <div className="space-y-2">
                          {selectedProduct.ingredients.map((ingredient, i) => (
                            <div key={i} className="flex items-start space-x-2">
                              <span className="text-[#4a4a4a] mt-1">•</span>
                              <span className="text-xs text-[#4a4a4a]">{ingredient}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "ritual" && (
                        <div className="text-xs text-[#4a4a4a] leading-relaxed">
                          <p>
                            Incorporate this formulation into your daily apothecary ritual. Apply after cleansing
                            and before moisturizing. Allow 60 seconds of absorption before layering additional
                            products. Best results when used consistently as part of a comprehensive skin ceremony.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-semibold text-[#222222]">
                      ${selectedProduct.price.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleShare()}
                        className="px-3 py-2 text-xs border border-[#e8e2d9] hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] transition-all duration-300 cursor-pointer"
                      >
                        {isCopied ? "Copied!" : "Share"}
                      </button>
                      <button
                        onClick={() => toggleSaveProduct(selectedProduct.id)}
                        className={`px-3 py-2 text-xs border ${
                          saved
                            ? "bg-[#222222] text-[#f5f5f0] border-[#222222]"
                            : "border-[#e8e2d9] text-[#4a4a4a] hover:border-[#222222]"
                        } transition-all duration-300 cursor-pointer`}
                      >
                        {saved ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-[#e8e2d9] rounded-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-sm text-[#4a4a4a] hover:text-[#222222] transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-4 text-sm font-semibold text-[#222222]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-sm text-[#4a4a4a] hover:text-[#222222] transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex-grow bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] py-3 rounded-sm text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
