"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Trash2, ShoppingBag, CreditCard, ChevronRight, Sparkles, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useCartStore } from "@/store/cart-store"

type CheckoutStep = "review" | "shipping" | "payment" | "completed"

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isCartOpen)
  const cartItems = useCartStore((s) => s.cartItems)
  const onClose = useCartStore((s) => s.closeCart)
  const onUpdateQuantity = useCartStore((s) => s.updateQuantity)
  const onRemoveItem = useCartStore((s) => s.removeItem)
  const onClearCart = useCartStore((s) => s.clearCart)

  const [step, setStep] = useState<CheckoutStep>("review")
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  })
  const [paymentForm, setPaymentForm] = useState({
    cardNum: "",
    cardExpiry: "",
    cardCvc: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [orderId, setOrderId] = useState("")

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingForm((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentForm((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateShipping = () => {
    const errors: Record<string, string> = {}
    if (!shippingForm.fullName.trim()) errors.fullName = "Required"
    if (!shippingForm.email.trim() || !shippingForm.email.includes("@")) errors.email = "Valid email is required"
    if (!shippingForm.address.trim()) errors.address = "Required"
    if (!shippingForm.city.trim()) errors.city = "Required"
    if (!shippingForm.zip.trim()) errors.zip = "Required"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePayment = () => {
    const errors: Record<string, string> = {}
    if (!paymentForm.cardNum.trim() || paymentForm.cardNum.length < 12) errors.cardNum = "Enter valid card"
    if (!paymentForm.cardExpiry.trim()) errors.cardExpiry = "Required"
    if (!paymentForm.cardCvc.trim() || paymentForm.cardCvc.length < 3) errors.cardCvc = "Enter CVC"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const proceedToShipping = () => {
    if (cartItems.length === 0) return
    setStep("shipping")
  }

  const proceedToPayment = () => {
    if (validateShipping()) setStep("payment")
  }

  const completeCheckout = () => {
    if (validatePayment()) {
      const generatedCode = "SR-" + Math.floor(100000 + Math.random() * 900000)
      setOrderId(generatedCode)
      setStep("completed")
    }
  }

  const resetAll = () => {
    onClearCart()
    setStep("review")
    setShippingForm({ fullName: "", email: "", address: "", city: "", zip: "" })
    setPaymentForm({ cardNum: "", cardExpiry: "", cardCvc: "" })
    setFormErrors({})
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#222222] z-50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-[#f5f5f0] z-50 shadow-2xl flex flex-col overflow-hidden"
            id="cart-drawer-container"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[#e8e2d9] flex items-center justify-between bg-[#f5f5f0]">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-[#222222]" />
                <h2 className="font-serif text-xl font-normal tracking-wide text-[#222222]">
                  {step === "review" && "Your Botanical Selection"}
                  {step === "shipping" && "Atelier Shipping"}
                  {step === "payment" && "Apothecary Payment"}
                  {step === "completed" && "Ritual Acknowledged"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#e8e2d9]/60 rounded-full transition-colors duration-300 cursor-pointer text-[#222222]"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps Progress */}
            {step !== "completed" && (
              <div className="bg-[#e8e2d9]/40 px-8 py-2.5 flex justify-between items-center text-[10px] font-sans font-semibold tracking-widest text-[#4a4a4a] border-b border-[#e8e2d9]/60">
                <span className={step === "review" ? "text-[#222222]" : "opacity-50"}>01. BAG</span>
                <ChevronRight className="w-3 h-3 opacity-35" />
                <span className={step === "shipping" ? "text-[#222222]" : "opacity-50"}>02. SHIPPING</span>
                <ChevronRight className="w-3 h-3 opacity-35" />
                <span className={step === "payment" ? "text-[#222222]" : "opacity-50"}>03. VERIFY</span>
              </div>
            )}

            {/* Scrollable contents */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8">
              {step === "review" && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16">
                      <div className="w-16 h-16 bg-[#e8e2d9]/40 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-6 h-6 text-[#4a4a4a] stroke-[1.2]" />
                      </div>
                      <p className="font-serif text-lg text-[#222222] italic">Your bag is empty.</p>
                      <p className="text-xs text-[#4a4a4a] mt-2 max-w-[240px] font-light leading-relaxed">
                        We invite you to explore our selection of fine botanical elixirs, oils, and sea silts.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-8 py-3 px-8 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        Explore Formulas
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex space-x-4 pb-6 border-b border-[#e8e2d9]/60">
                          <div className="relative w-20 h-24 bg-[#e8e2d9]/20 rounded-xs overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-grow flex flex-col justify-between text-left">
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-serif text-[11px] text-[#4a4a4a] uppercase">
                                  {item.product.number}
                                </span>
                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-[#4a4a4a] hover:text-[#222222] p-1 rounded-full transition-colors duration-200 cursor-pointer"
                                  title="Remove formula"
                                  aria-label="Remove formula"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <h4 className="font-serif text-md text-[#222222] font-normal tracking-wide mt-0.5">
                                {item.product.name}
                              </h4>
                              <p className="text-[10px] text-[#4a4a4a] font-mono tracking-wider mt-0.5">
                                {item.product.volume}
                              </p>
                            </div>

                            <div className="flex justify-between items-end mt-2">
                              <div className="flex items-center border border-[#e8e2d9] rounded-sm bg-[#f5f5f0]">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2.5 py-1 text-xs text-[#4a4a4a] hover:text-[#222222] transition-colors cursor-pointer"
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="px-2.5 text-xs text-[#222222] font-mono leading-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2.5 py-1 text-xs text-[#4a4a4a] hover:text-[#222222] transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-sans text-[13px] font-semibold text-[#222222]">
                                ${item.product.price * item.quantity}.00
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === "shipping" && (
                <div className="space-y-6 text-left">
                  <p className="text-xs text-[#4a4a4a] font-light leading-relaxed italic mb-4">
                    Kindly share your shipment coordinates. Premium ground shipping is complimentary for orders
                    exceeding $150.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                        RECEIVER FULL NAME
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingForm.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Lady Clara Sterling"
                        className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                      />
                      {formErrors.fullName && <p className="text-red-500 text-[10px] mt-1">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                        EMAIL FOR RITUAL CORRESPONDENCE
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingForm.email}
                        onChange={handleInputChange}
                        placeholder="clara@sterling-atelier.com"
                        className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                      />
                      {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                        STREET ADDRESS
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingForm.address}
                        onChange={handleInputChange}
                        placeholder="72 Rue de l'Apotheke"
                        className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                      />
                      {formErrors.address && <p className="text-red-500 text-[10px] mt-1">{formErrors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                          CITY
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingForm.city}
                          onChange={handleInputChange}
                          placeholder="Geneva"
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        {formErrors.city && <p className="text-red-500 text-[10px] mt-1">{formErrors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                          POST CODE / ZIP
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={shippingForm.zip}
                          onChange={handleInputChange}
                          placeholder="CH-1201"
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        {formErrors.zip && <p className="text-red-500 text-[10px] mt-1">{formErrors.zip}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-6 text-left">
                  <div className="bg-[#e8e2d9]/40 p-4 rounded-sm mb-4">
                    <p className="text-[11px] text-[#4a4a4a] leading-relaxed flex items-start">
                      <Sparkles className="w-3.5 h-3.5 text-[#222222] mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Your shipping is routed to{" "}
                        <strong>
                          {shippingForm.city}, {shippingForm.zip}
                        </strong>
                        . Next, provide authorization. This is a fully secure, client-side demo sandbox.
                      </span>
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                        DEFERRED OR CARD PLACEMENT
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNum"
                          value={paymentForm.cardNum}
                          onChange={handlePaymentChange}
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 pl-9 pr-2 text-xs text-[#222222] font-mono placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        <CreditCard className="w-4 h-4 text-[#4a4a4a]/60 absolute left-1 top-2.5" />
                      </div>
                      {formErrors.cardNum && <p className="text-red-500 text-[10px] mt-1">{formErrors.cardNum}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                          EXPIRY DATE
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={paymentForm.cardExpiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-mono placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        {formErrors.cardExpiry && (
                          <p className="text-red-500 text-[10px] mt-1">{formErrors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                          SECURE CVC / CODE
                        </label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={paymentForm.cardCvc}
                          onChange={handlePaymentChange}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-mono placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        {formErrors.cardCvc && <p className="text-red-500 text-[10px] mt-1">{formErrors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#e8e2d9]/40 text-center">
                    <p className="text-[10px] text-[#4a4a4a] leading-relaxed">
                      S E C R U M encrypted. Your bank statement will reflect a luxury botanical order.
                    </p>
                  </div>
                </div>
              )}

              {step === "completed" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-6 text-[#222222]">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-600 mb-6 stroke-[1.2]" />
                  </motion.div>

                  <h3 className="font-serif text-2xl font-normal mt-2">Transmitted to the Apothecary</h3>
                  <p className="text-xs text-[#4a4a4a] font-sans font-light tracking-wide mt-2 max-w-[280px]">
                    We&apos;ve acknowledged your skincare collection. A confirmation email and tracking link have
                    been dispatched.
                  </p>

                  <div className="w-full bg-[#e8e2d9]/50 rounded-sm p-5 mt-8 border border-[#e8e2d9] text-left space-y-3.5">
                    <div className="flex justify-between items-center text-[10.5px] font-semibold text-[#4a4a4a] font-sans tracking-wider border-b border-[#e8e2d9] pb-2">
                      <span>INVOICE REFERENCE:</span>
                      <span className="font-mono text-xs">{orderId}</span>
                    </div>

                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-xs text-[#222222]">
                          <span>
                            {item.product.name} <span className="text-[#4a4a4a] font-mono">x{item.quantity}</span>
                          </span>
                          <span className="font-semibold">${item.product.price * item.quantity}.00</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#e8e2d9] pt-2 space-y-1.5 text-xs">
                      <div className="flex justify-between font-light text-[#4a4a4a]">
                        <span>Botanical Subtotal:</span>
                        <span>${subtotal}.00</span>
                      </div>
                      <div className="flex justify-between font-light text-[#4a4a4a]">
                        <span>Eco-Packaging & Shipping:</span>
                        <span>{shipping === 0 ? "Complimentary" : `$${shipping}.00`}</span>
                      </div>
                      <div className="flex justify-between text-[#222222] font-semibold pt-1 border-t border-[#e8e2d9]/50">
                        <span>Total Ritual Cost:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetAll}
                    className="mt-8 w-full py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    Return to Atelier
                  </button>
                </div>
              )}
            </div>

            {/* Sticky checkout footer */}
            {cartItems.length > 0 && step !== "completed" && (
              <div className="p-6 md:p-8 bg-[#e8e2d9]/35 border-t border-[#e8e2d9] space-y-4">
                <div className="space-y-2.5 text-xs text-[#4a4a4a]">
                  <div className="flex justify-between">
                    <span className="font-light">Sourcing Subtotal</span>
                    <span className="font-semibold text-[#222222]">${subtotal}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light">Premium Parcel Shipping</span>
                    <span className="font-semibold text-[#222222]">
                      {shipping === 0 ? "Complimentary" : `$${shipping}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light">Vat & Apothecary Tax (8%)</span>
                    <span className="font-semibold text-[#222222]">${tax.toFixed(2)}</span>
                  </div>

                  {subtotal < 150 && (
                    <div className="text-[10.5px] text-amber-800 italic mt-1 font-light">
                      Add ${150 - subtotal} more to unlock complimentary premium shipping.
                    </div>
                  )}

                  <div className="flex justify-between text-base text-[#222222] font-semibold pt-3.5 border-t border-[#e8e2d9]">
                    <span>GRAND TOTAL</span>
                    <span className="tracking-wide">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  {step === "review" && (
                    <button
                      onClick={proceedToShipping}
                      className="w-full py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>PROCEED TO SHIPPING</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === "shipping" && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setStep("review")}
                        className="py-4 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        BACK TO BAG
                      </button>
                      <button
                        onClick={proceedToPayment}
                        className="py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        CONTINUE
                      </button>
                    </div>
                  )}

                  {step === "payment" && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setStep("shipping")}
                        className="py-4 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        onClick={completeCheckout}
                        className="py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                        id="authorize-payment-btn"
                      >
                        <span>AUTHORIZE</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
