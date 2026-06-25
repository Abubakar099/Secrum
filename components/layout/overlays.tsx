"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useUIStore } from "@/store/ui-store"

const CartDrawer = dynamic(() => import("@/components/cart/cart-drawer"), {
  loading: () => null,
})

const ProductDetailModal = dynamic(() => import("@/components/modals/product-detail-modal"), {
  loading: () => null,
})

const ApothecaryQuiz = dynamic(() => import("@/components/modals/apothecary-quiz"), {
  loading: () => null,
})

export function Overlays() {
  const isQuizModalOpen = useUIStore((s) => s.isQuizModalOpen)

  return (
    <Suspense fallback={null}>
      <CartDrawer />
      <ProductDetailModal />
      {isQuizModalOpen && <ApothecaryQuiz />}
    </Suspense>
  )
}
