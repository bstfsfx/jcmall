import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory, getCategoryBySlug } from "@/app/actions/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const [products, category] = await Promise.all([
    getProductsByCategory(categorySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!category && products.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif mb-4 tracking-wide">
          {category?.name ?? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
        </h1>
        {category?.description && (
          <p className="text-gray-500 max-w-2xl mx-auto">{category.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link href={`/product/${product.slug}`} key={product.id} className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative">
               {product.images[0] ? (
                 <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                 />
               ) : (
                 <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 group-hover:scale-105" />
               )}
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
        <p className="text-gray-500 col-span-full text-center py-20">No products found in this category.</p>
      )}
    </div>
  );
}
