import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Basic role check - in a real app, ensure session.user.role === 'ADMIN'
  if (!session?.user) {
    redirect('/login?redirectTo=/admin');
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 py-8 px-6 hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-serif">Admin Panel</h2>
          <p className="text-sm text-gray-500">Welcome, {session.user.name || 'Admin'}</p>
        </div>
        <nav className="space-y-2">
          <Link href="/admin" className="block py-2 px-4 bg-gray-200 rounded font-medium">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Products
          </Link>
          <Link href="/admin/orders" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Orders
          </Link>
          <Link href="/admin/customers" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Customers
          </Link>
          <Link href="/admin/settings" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        {children}
      </main>
    </div>
  );
}
