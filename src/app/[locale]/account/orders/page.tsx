import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB may not be connected yet; show empty state
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-serif mb-12">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white border border-gray-100 p-12 text-center">
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link
            href="/shop"
            className="inline-block bg-foreground text-white px-8 py-3 font-semibold tracking-wider hover:bg-[#333] transition-colors"
          >
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">Order #{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
