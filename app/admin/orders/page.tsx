'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface OrderWithRelations {
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
  isDuplicate: boolean
  duplicateOrderId?: string | null
  createdAt: Date
  updatedAt: Date
  user: { id: string; email: string; name: string | null }
  items: Array<any>
  shipping: any
  payment: any
  originalOrder?: { id: string; orderNumber: string } | null
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithRelations[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [isDuplicate, setIsDuplicate] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [status, isDuplicate, page])

  const fetchOrders = async () => {
    setIsLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (status) params.append('status', status)
      if (isDuplicate) params.append('isDuplicate', isDuplicate)
      params.append('page', page.toString())

      const response = await fetch(`/api/admin/orders?${params}`)
      if (!response.ok) throw new Error('Failed to fetch orders')

      const data = await response.json()
      setOrders(data.orders)
      setTotalPages(data.pagination.pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching orders')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const filteredOrders = orders.filter((order) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      order.orderNumber.toLowerCase().includes(searchLower) ||
      (order.user?.name?.toLowerCase().includes(searchLower) || false) ||
      (order.user?.email?.toLowerCase().includes(searchLower) || false) ||
      (order.shipping?.city?.toLowerCase().includes(searchLower) || false)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-normal text-[#222222] mb-2">Orders</h1>
        <p className="text-[#4a4a4a] text-sm">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-[#e8e2d9] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#4a4a4a]" />
            <input
              type="text"
              placeholder="Search order #, customer, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e8e2d9] rounded-sm focus:outline-none focus:border-[#222222] text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2 border border-[#e8e2d9] rounded-sm focus:outline-none focus:border-[#222222] text-sm"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Duplicate Filter */}
          <select
            value={isDuplicate}
            onChange={(e) => {
              setIsDuplicate(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2 border border-[#e8e2d9] rounded-sm focus:outline-none focus:border-[#222222] text-sm"
          >
            <option value="">All Orders</option>
            <option value="true">Duplicates Only</option>
            <option value="false">Non-Duplicates</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#e8e2d9] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[#4a4a4a]">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-[#4a4a4a]">No orders found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f5f5f0] border-b border-[#e8e2d9]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]">Order #</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]">Total</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]">Payment</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#222222]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e2d9]">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#f5f5f0]/50 transition-colors cursor-pointer"
                      onClick={() => (window.location.href = `/admin/orders/${order.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-[#222222]">{order.orderNumber}</span>
                          {order.isDuplicate && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold bg-red-100 text-red-700">
                              DUPLICATE
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-[#222222]">{order.user?.name || 'Guest'}</p>
                          <p className="text-[#4a4a4a] text-xs">{order.user?.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#4a4a4a]">{formatDate(order.createdAt)}</td>
                      <td className="px-4 py-3 font-semibold text-[#222222]">{formatCurrency(order.total)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'shipped'
                                  ? 'bg-purple-100 text-purple-800'
                                  : order.status === 'delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#4a4a4a] text-xs">
                        {order.paymentMethod === 'cod' ? 'COD' : 'Jazz Cash'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ChevronRight className="w-4 h-4 text-[#4a4a4a]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-[#f5f5f0] px-4 py-3 flex items-center justify-between border-t border-[#e8e2d9]">
                <p className="text-sm text-[#4a4a4a]">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 hover:bg-[#e8e2d9] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 hover:bg-[#e8e2d9] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
