"use client"

import { create } from "zustand"

interface ProductState {
  customMixIngredients: string[]
  mixingStep: "idle" | "mixing" | "completed"
  customBlendName: string
  setCustomMixIngredients: (ingredients: string[]) => void
  setMixingStep: (step: "idle" | "mixing" | "completed") => void
  setCustomBlendName: (name: string) => void
  addIngredient: (ingredient: string) => void
  removeIngredient: (ingredient: string) => void
  resetMixer: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  customMixIngredients: [],
  mixingStep: "idle",
  customBlendName: "",

  setCustomMixIngredients: (customMixIngredients) => set({ customMixIngredients }),
  setMixingStep: (mixingStep) => set({ mixingStep }),
  setCustomBlendName: (customBlendName) => set({ customBlendName }),

  addIngredient: (ingredient) =>
    set((state) => ({
      customMixIngredients: [...state.customMixIngredients, ingredient],
    })),

  removeIngredient: (ingredient) =>
    set((state) => ({
      customMixIngredients: state.customMixIngredients.filter((i) => i !== ingredient),
    })),

  resetMixer: () =>
    set({
      customMixIngredients: [],
      mixingStep: "idle",
      customBlendName: "",
    }),
}))
