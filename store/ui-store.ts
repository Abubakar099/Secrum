"use client"

import { create } from "zustand"
import type { Product } from "@/lib/types"

interface UIState {
  selectedProduct: Product | null
  savedProductIds: string[]
  isQuizModalOpen: boolean
  setSelectedProduct: (product: Product | null) => void
  toggleSaveProduct: (productId: string) => void
  openQuizModal: () => void
  closeQuizModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedProduct: null,
  savedProductIds: [],
  isQuizModalOpen: false,

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  toggleSaveProduct: (productId) =>
    set((state) => ({
      savedProductIds: state.savedProductIds.includes(productId)
        ? state.savedProductIds.filter((id) => id !== productId)
        : [...state.savedProductIds, productId],
    })),

  openQuizModal: () => set({ isQuizModalOpen: true }),
  closeQuizModal: () => set({ isQuizModalOpen: false }),
}))
