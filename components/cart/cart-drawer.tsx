"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Trash2, ShoppingBag, CreditCard, ChevronRight, Sparkles, CheckCircle, AlertCircle, Loader } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useCartStore } from "@/store/cart-store"
import Link from "next/link"

type CheckoutStep = "review" | "shipping" | "payment-method" | "payment" | "completed"
type PaymentMethod = "jazz_cash" | "cod"

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isCartOpen)
  const cartItems = useCartStore((s) => s.cartItems)
  const onClose = useCartStore((s) => s.closeCart)
  const onUpdateQuantity = useCartStore((s) => s.updateQuantity)
  const onRemoveItem = useCartStore((s) => s.removeItem)
  const onClearCart = useCartStore((s) => s.clearCart)

  const [step, setStep] = useState<CheckoutStep>("review")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zip: "",
  })
  const [paymentForm, setPaymentForm] = useState({
    cardNum: "",
    cardExpiry: "",
    cardCvc: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [orderId, setOrderId] = useState("")
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [orderError, setOrderError] = useState("")

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    // Pakistani format: +92XXXXXXXXXX or 0XXXXXXXXX
    const phoneRegex = /^(\+92|0)[0-9]{9,10}$/
    return phoneRegex.test(phone.replace(/\s+/g, ""))
  }

  const validateShipping = () => {
    const errors: Record<string, string> = {}
    if (!shippingForm.fullName.trim() || shippingForm.fullName.trim().length < 3) {
      errors.fullName = "Name must be at least 3 characters"
    }
    if (!shippingForm.email.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(shippingForm.email)) {
      errors.email = "Enter a valid email address"
    }
    if (!shippingForm.phone.trim()) {
      errors.phone = "Phone is required"
    } else if (!validatePhone(shippingForm.phone)) {
      errors.phone = "Enter Pakistani phone number (+92 or 0)"
    }
    if (!shippingForm.address.trim() || shippingForm.address.trim().length < 5) {
      errors.address = "Enter valid street address"
    }
    if (!shippingForm.city.trim()) errors.city = "City is required"
    if (!shippingForm.province.trim()) errors.province = "Province is required"
    if (!shippingForm.zip.trim() || shippingForm.zip.trim().length < 3) {
      errors.zip = "Enter valid postal code"
    }
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

  const proceedToPaymentMethod = () => {
    if (validateShipping()) setStep("payment-method")
  }

  const proceedToPaymentForm = () => {
    if (!paymentMethod) {
      setFormErrors({ paymentMethod: "Please select a payment method" })
      return
    }
    if (paymentMethod === "jazz_cash") {
      setStep("payment")
    } else {
      // For COD, skip card form and go directly to complete
      completeCheckout()
    }
  }

  const completeCheckout = async () => {
    if (paymentMethod === "jazz_cash" && !validatePayment()) return

    setIsCreatingOrder(true)
    setOrderError("")

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          subtotal,
          shippingCost: shipping,
          tax,
          paymentMethod,
          shippingInfo: {
            name: shippingForm.fullName,
            email: shippingForm.email,
            phone: shippingForm.phone,
            address: shippingForm.address,
            city: shippingForm.city,
            province: shippingForm.province,
            postalCode: shippingForm.zip,
          },
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      const { order } = await response.json()
      setOrderId(order.id)
      setStep("completed")
      onClearCart()
    } catch (error) {
      console.error("[v0] Order creation error:", error)
      setOrderError(error instanceof Error ? error.message : "Failed to create order")
      setIsCreatingOrder(false)
    }
  }

  const resetAll = () => {
    onClearCart()
    setStep("review")
    setPaymentMethod(null)
    setShippingForm({ fullName: "", email: "", phone: "", address: "", city: "", province: "", zip: "" })
    setPaymentForm({ cardNum: "", cardExpiry: "", cardCvc: "" })
    setFormErrors({})
    setOrderError("")
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
                  {step === "payment-method" && "Payment Method"}
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
                <span className={["payment-method", "payment"].includes(step) ? "text-[#222222]" : "opacity-50"}>03. PAYMENT</span>
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
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingForm.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                      />
                      {formErrors.phone && <p className="text-red-500 text-[10px] mt-1">{formErrors.phone}</p>}
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
                          placeholder="Karachi"
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        {formErrors.city && <p className="text-red-500 text-[10px] mt-1">{formErrors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#222222] uppercase mb-1">
                          PROVINCE
                        </label>
                        <input
                          type="text"
                          name="province"
                          value={shippingForm.province}
                          onChange={handleInputChange}
                          placeholder="Sindh"
                          className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                        />
                        {formErrors.province && <p className="text-red-500 text-[10px] mt-1">{formErrors.province}</p>}
                      </div>
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
                        placeholder="75500"
                        className="w-full bg-transparent border-b border-[#e8e2d9] focus:border-[#222222] py-2 px-1 text-xs text-[#222222] font-sans font-light placeholder-[#4a4a4a]/40 outline-none transition-colors duration-300"
                      />
                      {formErrors.zip && <p className="text-red-500 text-[10px] mt-1">{formErrors.zip}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === "payment-method" && (
                <div className="space-y-6 text-left">
                  <p className="text-xs text-[#4a4a4a] font-light leading-relaxed italic mb-4">
                    Select your preferred payment method to proceed with this botanical order.
                  </p>

                  {orderError && (
                    <div className="bg-red-50 border border-red-300 rounded-sm p-3 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-red-700">{orderError}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-[#e8e2d9] rounded-sm cursor-pointer hover:bg-[#e8e2d9]/20 transition-colors"
                      onClick={() => {
                        setPaymentMethod("jazz_cash")
                        setFormErrors({})
                      }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="jazz_cash"
                        checked={paymentMethod === "jazz_cash"}
                        onChange={() => {}}
                        className="w-4 h-4 mr-3 cursor-pointer"
                      />
                      <div className="flex-grow">
                        <p className="text-xs font-semibold text-[#222222]">Jazz Cash / Card Payment</p>
                        <p className="text-[10px] text-[#4a4a4a] mt-0.5">Quick payment via Jazz Cash or credit card</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-[#e8e2d9] rounded-sm cursor-pointer hover:bg-[#e8e2d9]/20 transition-colors"
                      onClick={() => {
                        setPaymentMethod("cod")
                        setFormErrors({})
                      }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => {}}
                        className="w-4 h-4 mr-3 cursor-pointer"
                      />
                      <div className="flex-grow">
                        <p className="text-xs font-semibold text-[#222222]">Cash on Delivery</p>
                        <p className="text-[10px] text-[#4a4a4a] mt-0.5">Pay when your order arrives at your door</p>
                      </div>
                    </label>
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

                    <div className="text-[10.5px] text-[#4a4a4a] bg-amber-50 border border-amber-200 rounded-xs p-2">
                      <p className="font-semibold text-amber-900 mb-1">Payment Method: {paymentMethod === "cod" ? "Cash on Delivery" : "Jazz Cash"}</p>
                      {paymentMethod === "cod" && (
                        <p className="text-[9px] leading-relaxed">Pay the driver when your order arrives. Keep this reference number for verification.</p>
                      )}
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

                  <div className="space-y-2 mt-6">
                    {orderId && (
                      <Link
                        href={`/orders/${orderId}`}
                        className="block w-full py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 text-center cursor-pointer"
                      >
                        View Order Details
                      </Link>
                    )}
                    <button
                      onClick={resetAll}
                      className="w-full py-4 border border-[#222222] hover:bg-[#e8e2d9]/50 text-[#222222] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      Return to Atelier
                    </button>
                  </div>
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
                        onClick={proceedToPaymentMethod}
                        className="py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        CONTINUE
                      </button>
                    </div>
                  )}

                  {step === "payment-method" && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setStep("shipping")}
                        className="py-4 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        onClick={proceedToPaymentForm}
                        disabled={!paymentMethod || isCreatingOrder}
                        className="py-4 bg-[#222222] hover:bg-[#4a4a4a] disabled:bg-[#4a4a4a]/50 disabled:cursor-not-allowed text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        {isCreatingOrder ? (
                          <>
                            <Loader className="w-3 h-3 animate-spin" />
                            <span>PROCESSING</span>
                          </>
                        ) : (
                          <span>CONTINUE</span>
                        )}
                      </button>
                    </div>
                  )}

                  {step === "payment" && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setStep("payment-method")}
                        className="py-4 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        onClick={completeCheckout}
                        disabled={isCreatingOrder}
                        className="py-4 bg-[#222222] hover:bg-[#4a4a4a] disabled:bg-[#4a4a4a]/50 disabled:cursor-not-allowed text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                        id="authorize-payment-btn"
                      >
                        {isCreatingOrder ? (
                          <>
                            <Loader className="w-3 h-3 animate-spin" />
                            <span>PROCESSING</span>
                          </>
                        ) : (
                          <span>AUTHORIZE</span>
                        )}
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
