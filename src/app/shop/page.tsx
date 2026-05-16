import Link from "next/link";
import { getProducts } from "@/app/actions/product";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif mb-12 text-center tracking-wide">Shop All Collections</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link href={`/product/${product.slug}`} key={product.id} className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative">
               <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent flex justify-center">
                  <button className="bg-white text-foreground px-6 py-2 text-sm font-medium w-full shadow-sm hover:bg-gray-50">
                    View Details
                  </button>
               </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-sm md:text-base">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{product.category.name}</p>
              </div>
              <p className="text-foreground text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {products.length === 0 && (
        <p className="text-gray-500 col-span-full text-center">No products found.</p>
      )}
    </div>
  );
}
