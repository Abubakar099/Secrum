"use client"

import { create } from "zustand"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
  cartItems: CartItem[]
  isCartOpen: boolean
  addToCart: (product: Product, quantityToAdd?: number, customPrice?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  isCartOpen: false,

  addToCart: (product, quantityToAdd = 1, customPrice) => {
    // If we have custom discount pricing (e.g. from the diagnostic quiz) configure a special version
    const adjustedProduct = customPrice ? { ...product, price: customPrice } : product

    set((state) => {
      const existing = state.cartItems.find((item) => item.product.id === product.id)
      const cartItems = existing
        ? state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item,
          )
        : [...state.cartItems, { product: adjustedProduct, quantity: quantityToAdd }]

      // Auto trigger the slide drawer open, matching original behavior
      return { cartItems, isCartOpen: true }
    })
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.product.id !== productId),
      }))
      return
    }
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    }))
  },

  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    })),

  clearCart: () => set({ cartItems: [] }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}))
