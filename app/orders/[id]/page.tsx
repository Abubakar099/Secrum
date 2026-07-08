'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Loader, AlertCircle, CheckCircle2, Package, Truck, CreditCard } from 'lucide-react'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    image: string
  }
}

interface ShippingInfo {
  id: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  province: string
  postalCode: string
}

interface Payment {
  id: string
  paymentMethod: string
  amount: number
  status: string
}

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  shippingStatus: string
  paymentMethod: string
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  createdAt: string
  items: OrderItem[]
  shipping: ShippingInfo
  payment: Payment
}

export default function OrderPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError('Order not found')
          } else if (response.status === 401) {
            setError('Please log in to view your order')
          } else {
            setError('Failed to load order details')
          }
          return
        }
        const data = await response.json()
        setOrder(data.order)
      } catch (err) {
        console.error('[v0] Error fetching order:', err)
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-[#222222] mx-auto mb-4" />
          <p className="text-[#4a4a4a]">Loading your order...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const isCOD = order.paymentMethod === 'cod'
  const createdDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#f5f5f0] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#222222] hover:text-[#4a4a4a] mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back to Shop</span>
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-serif font-normal text-[#222222] mb-2">Order Confirmed</h1>
              <p className="text-[#4a4a4a]">Thank you for your botanical selection. We&apos;re preparing your order.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Order Summary */}
          <div className="md:col-span-2 bg-white rounded-lg border border-[#e8e2d9] p-6">
            <h2 className="font-serif text-lg font-normal text-[#222222] mb-6 border-b border-[#e8e2d9] pb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-[#e8e2d9]/20 rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.image || '/placeholder.svg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-[#222222] text-sm">{item.product.name}</h3>
                    <p className="text-[13px] text-[#4a4a4a] mt-1">
                      Qty: <span className="font-mono">{item.quantity}</span>
                    </p>
                    <p className="text-sm font-semibold text-[#222222] mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-[#e8e2d9] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#4a4a4a]">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#4a4a4a]">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'Complimentary' : `$${order.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-[#4a4a4a]">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#222222] border-t border-[#e8e2d9] pt-2 mt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-lg border border-[#e8e2d9] p-6">
            <h3 className="font-semibold text-[#222222] mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Shipping Address
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">Name</p>
                <p className="text-[#222222] font-medium">{order.shipping.name}</p>
              </div>
              <div>
                <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">Phone</p>
                <p className="text-[#222222] font-medium">{order.shipping.phone}</p>
              </div>
              <div>
                <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">Email</p>
                <p className="text-[#222222] font-medium break-all">{order.shipping.email}</p>
              </div>
              <div>
                <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">Address</p>
                <p className="text-[#222222] font-medium">{order.shipping.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">City</p>
                  <p className="text-[#222222] font-medium">{order.shipping.city}</p>
                </div>
                <div>
                  <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">Province</p>
                  <p className="text-[#222222] font-medium">{order.shipping.province}</p>
                </div>
              </div>
              <div>
                <p className="text-[#4a4a4a] text-xs uppercase tracking-wide">Postal Code</p>
                <p className="text-[#222222] font-medium">{order.shipping.postalCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details and COD Instructions */}
        <div className="bg-white rounded-lg border border-[#e8e2d9] p-6">
          <h3 className="font-semibold text-[#222222] mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-start justify-between pb-4 border-b border-[#e8e2d9]">
              <div>
                <p className="text-sm font-semibold text-[#222222]">
                  {isCOD ? 'Cash on Delivery' : 'Jazz Cash / Card Payment'}
                </p>
                <p className="text-xs text-[#4a4a4a] mt-1">
                  {isCOD ? 'Payment due upon delivery' : 'Online payment method'}
                </p>
              </div>
              <span className="text-sm font-semibold text-[#222222]">${order.total.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-[#222222]" />
              <span className="text-[#222222]">Order Number: <span className="font-mono font-semibold">{order.orderNumber}</span></span>
            </div>

            <p className="text-xs text-[#4a4a4a]">
              Ordered on <span className="font-semibold">{createdDate}</span>
            </p>

            {isCOD && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-3 text-sm">Cash on Delivery Instructions</h4>
                <ul className="text-xs text-amber-900 space-y-2 list-disc list-inside">
                  <li>The delivery driver will call you at <span className="font-semibold">{order.shipping.phone}</span></li>
                  <li>Payment amount: <span className="font-semibold">${order.total.toFixed(2)}</span></li>
                  <li>Please have exact cash ready for the driver</li>
                  <li>Keep your order number <span className="font-mono font-semibold">{order.orderNumber}</span> for verification</li>
                  <li>Verify the package before making payment</li>
                  <li>Request an invoice/receipt from the driver</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="flex-1 py-3 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] font-semibold rounded-lg text-center transition-colors"
          >
            Continue Shopping
          </Link>
          <a
            href={`mailto:${order.shipping.email}`}
            className="flex-1 py-3 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/30 font-semibold rounded-lg text-center transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
