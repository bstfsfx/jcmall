import { getProducts } from "@/app/actions/product";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
          <h3 className="text-2xl font-semibold">$12,450.00</h3>
        </div>
        <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Total Orders</p>
          <h3 className="text-2xl font-semibold">142</h3>
        </div>
        <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Products</p>
          <h3 className="text-2xl font-semibold">{products.length}</h3>
        </div>
        <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Active Customers</p>
          <h3 className="text-2xl font-semibold">89</h3>
        </div>
      </div>

      <h2 className="text-2xl font-serif mb-6">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 px-6 font-medium text-gray-600">Order ID</th>
              <th className="py-4 px-6 font-medium text-gray-600">Customer</th>
              <th className="py-4 px-6 font-medium text-gray-600">Date</th>
              <th className="py-4 px-6 font-medium text-gray-600">Total</th>
              <th className="py-4 px-6 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((order) => (
              <tr key={order} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">#JC{1000 + order}</td>
                <td className="py-4 px-6">Customer {order}</td>
                <td className="py-4 px-6">Oct {20 - order}, 2026</td>
                <td className="py-4 px-6">${(120 * order).toFixed(2)}</td>
                <td className="py-4 px-6">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Paid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
