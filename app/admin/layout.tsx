import { redirect } from "next/navigation"
import { verifyAdmin } from "@/lib/auth/verify"
import AdminSidebar from "@/components/admin/admin-sidebar"

export const metadata = {
  title: "Admin Dashboard - Secrum",
  description: "Manage orders, products, and customer data",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verify admin access
  const session = await verifyAdmin()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="flex h-screen bg-[#f5f5f0]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
