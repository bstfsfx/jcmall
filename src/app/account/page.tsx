import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-serif mb-12">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="col-span-1">
          <div className="bg-gray-50 p-6 border border-gray-100 mb-6">
            <p className="font-medium text-lg">{session.user.name}</p>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
          <nav className="space-y-2 text-sm font-medium">
            <Link href="/account" className="block px-4 py-2 bg-foreground text-white">
              Profile
            </Link>
            <Link href="/account/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              Orders
            </Link>
            <Link href="/account/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              Settings
            </Link>
            <form action={async () => {
              "use server";
              const { signOut } = await import("@/auth");
              await signOut({ redirectTo: "/" });
            }}>
              <button type="submit" className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                Logout
              </button>
            </form>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="col-span-3">
          <div className="bg-white border border-gray-100 p-8">
            <h2 className="text-2xl font-serif mb-6">Profile Information</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={session.user.name ?? ""}
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={session.user.email ?? ""}
                    readOnly
                    className="w-full border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-foreground text-white px-8 py-3 font-semibold tracking-wider hover:bg-[#333] transition-colors"
              >
                SAVE CHANGES
              </button>
            </form>
          </div>

          {/* Recent Orders Snapshot */}
          <div className="mt-8 bg-white border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-accent underline">View all</Link>
            </div>
            <p className="text-gray-500 text-sm">No orders yet. <Link href="/shop" className="underline hover:text-foreground">Start shopping</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
