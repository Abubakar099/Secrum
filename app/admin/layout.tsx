import { redirect } from 'next/navigation'
import { decodeToken } from '@/lib/auth/jwt'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { BarChart3, Package } from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard - Secrum',
  description: 'Manage orders and inventory',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check admin access
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  const decoded = decodeToken(token)
  if (!decoded?.isAdmin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Admin Navigation */}
      <nav className="bg-[#222222] text-[#f5f5f0] p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="font-serif text-xl font-normal tracking-wide">
            Secrum Admin
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/admin/orders"
              className="flex items-center space-x-2 hover:text-[#e8e2d9] transition-colors"
            >
              <Package className="w-4 h-4" />
              <span className="text-sm font-semibold">Orders</span>
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold hover:text-[#e8e2d9] transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}
