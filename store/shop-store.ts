"use client"

import { create } from "zustand"
import type { SortOrder } from "@/lib/types"

export const MAX_PRICE_LIMIT = 250

interface ShopState {
  searchQuery: string
  selectedConcerns: string[]
  selectedCategories: string[]
  maxPrice: number
  sortOrder: SortOrder
  setSearchQuery: (query: string) => void
  toggleConcern: (concern: string) => void
  toggleCategory: (category: string) => void
  setConcerns: (concerns: string[]) => void
  setCategories: (categories: string[]) => void
  setMaxPrice: (price: number) => void
  setSortOrder: (order: SortOrder) => void
  resetFilters: () => void
}

export const useShopStore = create<ShopState>((set) => ({
  searchQuery: "",
  selectedConcerns: [],
  selectedCategories: [],
  maxPrice: MAX_PRICE_LIMIT,
  sortOrder: "default",

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  toggleConcern: (concern) =>
    set((state) => ({
      selectedConcerns: state.selectedConcerns.includes(concern)
        ? state.selectedConcerns.filter((c) => c !== concern)
        : [...state.selectedConcerns, concern],
    })),

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  setConcerns: (selectedConcerns) => set({ selectedConcerns }),
  setCategories: (selectedCategories) => set({ selectedCategories }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setSortOrder: (sortOrder) => set({ sortOrder }),

  resetFilters: () =>
    set({
      selectedConcerns: [],
      selectedCategories: [],
      maxPrice: MAX_PRICE_LIMIT,
      searchQuery: "",
      sortOrder: "default",
    }),
}))
