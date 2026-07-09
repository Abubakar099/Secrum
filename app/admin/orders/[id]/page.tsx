'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save, AlertCircle } from 'lucide-react'
interface OrderDetail {
  id: string
  orderNumber: string
  status: string
  paymentMethod: string
  paymentStatus: string
  shippingStatus: string
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  createdAt: string
  isDuplicate: boolean
  duplicateOrderId?: string | null
  user: { id: string; email: string; name: string | null }
  items: Array<{
    id: string
    productId: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      images: Array<{ imageUrl: string }>
    }
  }>
  shipping: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    province: string
    postalCode: string
  }
  payment: { paymentMethod: string; amount: number; status: string }
  originalOrder?: { id: string; orderNumber: string } | null
  duplicates?: Array<{ id: string; orderNumber: string; createdAt: string }>
}

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSaving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [showDuplicateComparison, setShowDuplicateComparison] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch order')

      const data = await response.json()
      setOrder(data.order)
      setStatus(data.order.status)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching order')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!order || status === order.status) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Failed to update order')

      const data = await response.json()
      setOrder(data.order)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating order')
    } finally {
      setSaving(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) return <div className="p-8 text-center text-[#4a4a4a]">Loading order...</div>

  if (error)
    return (
      <div className="space-y-4">
        <Link href="/admin/orders" className="inline-flex items-center gap-2 text-[#222222] hover:underline">
          <ChevronLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    )

  if (!order) return <div className="p-8 text-center text-[#4a4a4a]">Order not found</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/orders" className="inline-flex items-center gap-2 text-[#222222] hover:underline text-sm mb-3">
            <ChevronLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="font-serif text-3xl font-normal text-[#222222]">{order.orderNumber}</h1>
          <p className="text-[#4a4a4a] text-sm mt-1">Placed on {formatDate(order.createdAt)}</p>
        </div>
        {order.isDuplicate && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-right">
            <p className="text-red-700 font-semibold text-sm mb-2">Possible Duplicate</p>
            {order.originalOrder && (
              <Link
                href={`/admin/orders/${order.originalOrder.id}`}
                className="text-red-600 hover:underline text-sm"
              >
                View Original: {order.originalOrder.orderNumber}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Section */}
          <div className="bg-white rounded-lg border border-[#e8e2d9] p-6">
            <h2 className="font-semibold text-[#222222] mb-4">Order Status</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#222222] block mb-2">Status</label>
                <div className="flex gap-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#e8e2d9] rounded-sm focus:outline-none focus:border-[#222222]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isSaving || status === order.status}
                    className="px-6 py-2 bg-[#222222] hover:bg-[#4a4a4a] disabled:bg-[#4a4a4a]/50 text-white font-semibold rounded-sm transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#4a4a4a] mb-1">Payment Status</p>
                  <p className="font-semibold text-[#222222]">{order.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-[#4a4a4a] mb-1">Shipping Status</p>
                  <p className="font-semibold text-[#222222]">{order.shippingStatus}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-white rounded-lg border border-[#e8e2d9] p-6">
            <h2 className="font-semibold text-[#222222] mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[#e8e2d9] last:border-0">
                  {item.product.images[0] && (
                    <img
                      src={item.product.images[0].imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-[#222222]">{item.product.name}</p>
                    <div className="text-sm text-[#4a4a4a] mt-1 space-y-0.5">
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {formatCurrency(item.price)}</p>
                      <p className="font-semibold text-[#222222]">Subtotal: {formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Section */}
          <div className="bg-white rounded-lg border border-[#e8e2d9] p-6">
            <h2 className="font-semibold text-[#222222] mb-4">Shipping Address</h2>
            <div className="text-sm space-y-2 text-[#4a4a4a]">
              <p className="font-semibold text-[#222222]">{order.shipping.name}</p>
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city}, {order.shipping.province} {order.shipping.postalCode}
              </p>
              <p>Phone: {order.shipping.phone}</p>
              <p>Email: {order.shipping.email}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-[#e8e2d9] p-6 sticky top-6">
            <h2 className="font-semibold text-[#222222] mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#4a4a4a]">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#4a4a4a]">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'Free' : formatCurrency(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-[#4a4a4a]">
                <span>Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="border-t border-[#e8e2d9] pt-3 flex justify-between font-semibold text-[#222222]">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div>
                <p className="text-[#4a4a4a] mb-1">Payment Method</p>
                <p className="font-semibold text-[#222222]">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Jazz Cash'}</p>
              </div>
              <div>
                <p className="text-[#4a4a4a] mb-1">Customer</p>
                <p className="font-semibold text-[#222222]">{order.user?.name || 'Guest'}</p>
                <p className="text-[#4a4a4a]">{order.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Duplicate Info */}
          {order.isDuplicate && order.originalOrder && (
            <div className="bg-amber-50 rounded-lg border border-amber-300 p-6">
              <h3 className="font-semibold text-amber-900 mb-3">Duplicate Information</h3>
              <p className="text-sm text-amber-800 mb-3">This order appears to be a duplicate of:</p>
              <Link
                href={`/admin/orders/${order.originalOrder.id}`}
                className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-sm transition-colors"
              >
                View Original Order: {order.originalOrder.orderNumber}
              </Link>
            </div>
          )}

          {/* Related Duplicates */}
          {order.duplicates && order.duplicates.length > 0 && (
            <div className="bg-blue-50 rounded-lg border border-blue-300 p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Related Duplicates</h3>
              <p className="text-sm text-blue-800 mb-3">{order.duplicates.length} order(s) flagged as duplicate of this</p>
              <div className="space-y-2">
                {order.duplicates.slice(0, 3).map((dup) => (
                  <Link
                    key={dup.id}
                    href={`/admin/orders/${dup.id}`}
                    className="block px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-semibold rounded-sm transition-colors"
                  >
                    {dup.orderNumber}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
