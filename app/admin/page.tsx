"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { motion } from "motion/react"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  })
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/orders")
        if (response.ok) {
          const data = await response.json()
          const orders = data.orders || []

          // Calculate stats
          const totalOrders = orders.length
          const pendingOrders = orders.filter((o: any) => o.status === "pending").length
          const confirmedOrders = orders.filter((o: any) => o.status === "confirmed").length
          const totalRevenue = orders.reduce((sum: number, o: any) => sum + o.total, 0)
          const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

          setStats({
            totalOrders,
            pendingOrders,
            confirmedOrders,
            totalRevenue,
            averageOrderValue,
          })

          // Prepare chart data (last 7 days)
          const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - (6 - i))
            return date.toISOString().split("T")[0]
          })

          const dailyData = last7Days.map((date) => {
            const dayOrders = orders.filter(
              (o: any) => o.createdAt.split("T")[0] === date
            )
            return {
              date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              orders: dayOrders.length,
              revenue: dayOrders.reduce((sum: number, o: any) => sum + o.total, 0),
            }
          })

          setChartData(dailyData)
        }
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ icon: Icon, label, value, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-[#e8e2d9]/50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#222222]" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            {trend}
          </span>
        )}
      </div>
      <p className="text-[#4a4a4a] text-sm font-light mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#222222]">{value}</p>
    </motion.div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif text-[#222222] tracking-wide mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#4a4a4a] font-light">
          Overview of orders, revenue, and customer activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon={Package}
          label="Total Orders"
          value={stats.totalOrders.toLocaleString()}
        />
        <StatCard
          icon={ShoppingCart}
          label="Pending Orders"
          value={stats.pendingOrders}
          trend={`${Math.round((stats.pendingOrders / stats.totalOrders) * 100)}%`}
        />
        <StatCard
          icon={ShoppingCart}
          label="Confirmed Orders"
          value={stats.confirmedOrders}
          trend={`${Math.round((stats.confirmedOrders / stats.totalOrders) * 100)}%`}
        />
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Order Value"
          value={`$${stats.averageOrderValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
        />
      </div>

      {/* Charts */}
      {!loading && chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6"
          >
            <h2 className="text-lg font-semibold text-[#222222] mb-6">Orders & Revenue (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e2d9" />
                <XAxis dataKey="date" stroke="#4a4a4a" />
                <YAxis stroke="#4a4a4a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f5f5f0",
                    border: "1px solid #e8e2d9",
                    borderRadius: "4px",
                  }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#222222" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#e8e2d9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Order Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6"
          >
            <h2 className="text-lg font-semibold text-[#222222] mb-6">Order Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Pending", value: stats.pendingOrders, fill: "#f59e0b" },
                    { name: "Confirmed", value: stats.confirmedOrders, fill: "#10b981" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          href="/admin/orders"
          className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 hover:shadow-md transition-shadow group"
        >
          <Package className="w-8 h-8 text-[#222222] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-[#222222] mb-2">Manage Orders</h3>
          <p className="text-sm text-[#4a4a4a] font-light">View and update order status</p>
        </motion.a>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          href="/admin/products"
          className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 hover:shadow-md transition-shadow group"
        >
          <ShoppingCart className="w-8 h-8 text-[#222222] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-[#222222] mb-2">Manage Products</h3>
          <p className="text-sm text-[#4a4a4a] font-light">Add, edit, or remove products</p>
        </motion.a>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          href="/admin/customers"
          className="bg-white rounded-lg shadow-sm border border-[#e8e2d9] p-6 hover:shadow-md transition-shadow group"
        >
          <Users className="w-8 h-8 text-[#222222] mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-[#222222] mb-2">Customers</h3>
          <p className="text-sm text-[#4a4a4a] font-light">View customer information</p>
        </motion.a>
      </div>
    </div>
  )
}
