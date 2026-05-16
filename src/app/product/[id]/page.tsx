import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/actions/product";
import ProductForm from "@/components/ProductForm";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.id);
  if (!product) return { title: "Product Not Found | JC Mall" };
  return {
    title: `${product.name} | JC Mall`,
    description: product.description,
    openGraph: {
      title: `${product.name} | JC Mall`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductBySlug(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link href="/shop" className="hover:text-foreground">Shop</Link> /{" "}
        <Link href={`/shop/${product.category.slug}`} className="hover:text-foreground">{product.category.name}</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 relative">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
               {/* Later: next/image component */}
               Main Image
             </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((thumb) => (
              <div key={thumb} className="aspect-square bg-gray-100 relative cursor-pointer hover:opacity-80">
                 <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                   Thumb {thumb}
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
          <p className="text-2xl font-light mb-6">${product.price.toFixed(2)}</p>
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <ProductForm 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: '/images/placeholder.jpg' // Default image or product.images[0]
            }} 
          />

          {/* Details Accordion */}
          <div className="mt-12 border-t pt-8 space-y-4">
             <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Product Details</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-500 mt-3 text-sm">Made from 100% premium materials. Hand wash recommended.</p>
             </details>
             <details className="group border-t pt-4">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Shipping & Returns</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-500 mt-3 text-sm">Free standard shipping on orders over $200. Returns accepted within 30 days.</p>
             </details>
          </div>
        </div>
      </div>
    </div>
  );
}
