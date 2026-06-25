"use client"

import { useEffect, useMemo, useState } from "react"
import { Sliders, X } from "lucide-react"
import { motion } from "motion/react"
import { ProductCard } from "@/components/product/product-card"
import { useShopStore } from "@/store/shop-store"
import { PRODUCTS } from "@/lib/data"

const CATEGORIES = [
  "cleansers",
  "serums",
  "moisturizers",
  "exfoliants",
  "elixirs",
  "oils",
  "clays",
  "essences",
]

const SKIN_CONCERNS = [
  "Hydration",
  "Glow Skin",
  "Brightening",
  "Sensitive Skin",
  "Anti-Aging",
  "Dark Spots / Pigmentation",
  "Acne Care",
]

export default function ShopPage() {
  const {
    searchQuery,
    selectedConcerns,
    selectedCategories,
    maxPrice,
    sortOrder,
    setSearchQuery,
    toggleConcern,
    toggleCategory,
    setMaxPrice,
    setSortOrder,
    resetFilters,
  } = useShopStore()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    if (selectedConcerns.length > 0) {
      result = result.filter((p) =>
        p.skinConcerns.some((concern) => selectedConcerns.includes(concern))
      )
    }

    result = result.filter((p) => p.price <= maxPrice)

    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [searchQuery, selectedCategories, selectedConcerns, maxPrice, sortOrder])

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm focus:outline-none focus:border-[#222222]"
              />
            </div>

            <div>
              <h3 className="font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 border border-[#e8e2d9] rounded accent-[#222222] cursor-pointer"
                    />
                    <span className="ml-2 text-xs text-[#4a4a4a] group-hover:text-[#222222] capitalize">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide">Skin Concerns</h3>
              <div className="space-y-2">
                {SKIN_CONCERNS.map((concern) => (
                  <label key={concern} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedConcerns.includes(concern)}
                      onChange={() => toggleConcern(concern)}
                      className="w-4 h-4 border border-[#e8e2d9] rounded accent-[#222222] cursor-pointer"
                    />
                    <span className="ml-2 text-xs text-[#4a4a4a] group-hover:text-[#222222]">{concern}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide">Price Range</h3>
              <input
                type="range"
                min="0"
                max="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <p className="text-xs text-[#4a4a4a] mt-2">Up to ${maxPrice}</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide">Sort</h3>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm focus:outline-none focus:border-[#222222]"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {(searchQuery || selectedCategories.length > 0 || selectedConcerns.length > 0) && (
              <button
                onClick={resetFilters}
                className="w-full py-2 border border-charcoal text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold rounded-sm transition-all duration-300 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6 flex items-center justify-between">
            <h1 className="font-serif text-2xl text-[#222222]">Shop</h1>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-[#e8e2d9] rounded-sm"
            >
              <Sliders className="w-4 h-4" />
              <span className="text-xs font-semibold">Filters</span>
            </button>
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mb-6 p-4 bg-[#e8e2d9]/10 rounded-lg space-y-4"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm"
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-[#222222] text-[#f5f5f0] text-xs font-semibold rounded-sm"
              >
                Reset
              </button>
            </motion.div>
          )}

          {/* Results Header */}
          <div className="mb-8">
            <h1 className="hidden md:block font-serif text-3xl text-[#222222] mb-2">Shop</h1>
            <p className="text-sm text-[#4a4a4a]">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-[#222222] mb-2">No products found</p>
              <p className="text-sm text-[#4a4a4a] mb-4">Try adjusting your filters</p>
              <button
                onClick={resetFilters}
                className="inline-block bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-6 py-2 rounded-sm text-xs font-semibold uppercase transition-all duration-300 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
