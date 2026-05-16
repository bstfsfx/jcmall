import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions/product";
import ProductForm from "@/components/ProductForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTranslations, useLocale } from "next-intl";

export async function generateMetadata(props: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getProductBySlug(id);
  if (!product) return { title: "Product Not Found | JC Mall" };
  return {
    title: `${product.name} | JC Mall`,
    description: product.description,
  };
}

import { getTranslations, getLocale } from "next-intl/server";

export default async function ProductDetailPage(props: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await props.params;
  const product = await getProductBySlug(id);
  const t = await getTranslations('Product');

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'SHOP', href: `/${locale}/shop` }, 
          { label: (locale === 'en' ? product.category.slug.toUpperCase() : product.category.name.toUpperCase()), href: `/${locale}/shop/${product.category.slug}` },
          { label: product.name.toUpperCase() }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-[3/4] bg-[#111111] relative rounded-sm overflow-hidden border border-[#2a2725]">
               {product.images[0] ? (
                 <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                 />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-[#5a5650] text-[10px] tracking-[4px] uppercase font-bold">
                   No Image
                 </div>
               )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <div key={index} className="aspect-square bg-[#111111] relative cursor-pointer hover:border-gold border border-[#2a2725] rounded-sm overflow-hidden transition-colors">
                   <img src={img} alt={`${product.name} thumbnail ${index}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{t('selection')}</p>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-white leading-tight mb-8">{product.name}</h1>
            <div className="flex items-baseline gap-6 mb-10 pb-10 border-b border-white/5">
              <p className="text-3xl font-ui font-medium text-white">${product.price.toLocaleString()}</p>
              <p className="text-[#5a5650] text-xs tracking-[2px] uppercase">{t('freeShipping')}</p>
            </div>
            
            <div className="prose prose-invert prose-sm text-[#9a958e] mb-12 max-w-none leading-loose tracking-wide">
              <p className="italic">{product.description}</p>
            </div>

            <ProductForm 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0]
              }} 
            />

            {/* Details Accordion */}
            <div className="mt-16 space-y-0 border-t border-white/5">
               <details className="group border-b border-white/5 py-6">
                  <summary className="flex justify-between items-center font-ui text-[10px] tracking-[3px] uppercase font-bold text-white cursor-pointer list-none">
                    <span>{t('details')}</span>
                    <span className="text-gold transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="text-[#9a958e] mt-6 text-sm font-light leading-relaxed space-y-4">
                    <p>{locale === 'zh' ? '這款單品體現了 JC mall 對品質的極致追求。採用頂級天然材質，並由經驗豐富的工匠手工製作而成。' : 'This piece embodies JC mall\'s pursuit of absolute quality. Crafted from the finest natural materials by experienced artisans.'}</p>
                    <ul className="list-disc list-inside space-y-2 opacity-70">
                      <li>{locale === 'zh' ? '高品質永續材質' : 'High-quality sustainable materials'}</li>
                      <li>{locale === 'zh' ? '精確手工剪裁' : 'Precise handcrafted tailoring'}</li>
                      <li>{locale === 'zh' ? '透氣舒適質地' : 'Breathable and comfortable texture'}</li>
                    </ul>
                  </div>
               </details>
               <details className="group border-b border-white/5 py-6">
                  <summary className="flex justify-between items-center font-ui text-[10px] tracking-[3px] uppercase font-bold text-white cursor-pointer list-none">
                    <span>{t('shipping')}</span>
                    <span className="text-gold transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="text-[#9a958e] mt-6 text-sm font-light leading-relaxed">
                    <p>{locale === 'zh' ? '我們提供全球免運配送服務。所有訂單均享有 30 天無憂鑑賞期，若您對商品不滿意，我們將提供免費退換貨服務。' : 'We offer free global shipping. All orders come with a 30-day worry-free satisfaction guarantee.'}</p>
                  </div>
               </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
