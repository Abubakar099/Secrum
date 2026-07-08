"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ChevronRight, Search, Filter, Eye, Edit2, Trash2 } from "lucide-react"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/admin/orders")
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Filter and search
  useEffect(() => {
    let filtered = orders

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus)
    }

    // Search by order number or email
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.includes(searchTerm.toUpperCase()) ||
          order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [orders, searchTerm, filterStatus])

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif text-[#222222] tracking-wide">Orders</h1>
          <div className="text-sm text-[#4a4a4a]">
            Total: <span className="font-semibold">{filteredOrders.length}</span>
          </div>
        </div>
        <p className="text-[#4a4a4a] font-light">Manage and track all customer orders</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-[#4a4a4a]" />
          <input
            type="text"
            placeholder="Search by order ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#e8e2d9] rounded-lg focus:border-[#222222] focus:ring-1 focus:ring-[#222222] outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#4a4a4a]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "confirmed")}
            className="px-4 py-2 border border-[#e8e2d9] rounded-lg focus:border-[#222222] focus:ring-1 focus:ring-[#222222] outline-none transition-colors bg-white"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#e8e2d9]/50 mb-4">
            <div className="w-5 h-5 border-2 border-[#222222]/20 border-t-[#222222] rounded-full animate-spin" />
          </div>
          <p className="text-[#4a4a4a]">Loading orders...</p>
        </div>
      ) : paginatedOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-[#e8e2d9]">
          <p className="text-[#4a4a4a] font-light">No orders found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg border border-[#e8e2d9] shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e2d9] bg-[#f5f5f0]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order: any) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-[#e8e2d9] hover:bg-[#f5f5f0] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-[#222222]">{order.orderNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-[#222222]">{order.user.name}</p>
                        <p className="text-sm text-[#4a4a4a]">{order.user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4a4a4a]">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#222222]">
                      <span className="font-semibold">{order.items.length}</span>
                      <span className="text-[#4a4a4a] font-light"> item{order.items.length !== 1 ? "s" : ""}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#222222]">
                      ${order.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                      >
                        {order.status === "confirmed" ? "Ready to Ship" : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/order/success?orderId=${order.orderNumber}`}
                          className="p-2 hover:bg-[#e8e2d9] rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4 text-[#222222]" />
                        </Link>
                        <button
                          className="p-2 hover:bg-[#e8e2d9] rounded-lg transition-colors"
                          title="Edit order"
                        >
                          <Edit2 className="w-4 h-4 text-[#222222]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#4a4a4a]">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-[#e8e2d9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e8e2d9] transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-[#222222] text-[#f5f5f0]"
                        : "border border-[#e8e2d9] hover:bg-[#e8e2d9]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-[#e8e2d9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e8e2d9] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
