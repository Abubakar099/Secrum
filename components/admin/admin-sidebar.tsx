"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: Package },
    { label: "Products", href: "/admin/products", icon: ShoppingCart },
    { label: "Customers", href: "/admin/customers", icon: Users },
  ]

  const handleLogout = async () => {
    // Clear auth token and redirect to home
    document.cookie = "auth-token=; path=/; max-age=0"
    router.push("/")
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 hover:bg-[#e8e2d9] rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-[#e8e2d9] flex flex-col ${
          isOpen ? "fixed inset-0 z-40 md:relative md:inset-auto" : "hidden md:flex"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#e8e2d9] mt-16 md:mt-0">
          <Link href="/" className="text-2xl font-serif tracking-wide text-[#222222]">
            SECRUM
          </Link>
          <p className="text-[10px] text-[#4a4a4a] font-mono tracking-[0.15em] uppercase mt-2">
            Admin Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-[#222222] text-[#f5f5f0]"
                    : "text-[#222222] hover:bg-[#e8e2d9]/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[#e8e2d9] space-y-4">
          <Link
            href="/shop"
            className="flex items-center gap-3 px-4 py-2 text-[#4a4a4a] hover:text-[#222222] text-sm font-light transition-colors"
          >
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-semibold text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
