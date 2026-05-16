import Link from "next/link";
import { getProducts } from "@/app/actions/product";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query } = await searchParams;
  const products = await getProducts(query);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'SHOP' }]} />
        
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8 reveal visible">
          <div className="text-left">
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Collections</p>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight leading-tight">
              {query ? `搜尋結果: "${query}"` : "全部商品"}
            </h1>
            <div className="w-16 h-[1px] bg-gold mt-8" />
          </div>

          <form action="/shop" className="relative group w-full md:w-80">
            <input 
              type="text" 
              name="q"
              placeholder="搜尋商品..." 
              defaultValue={query}
              className="bg-transparent border-b border-white/10 py-3 w-full focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/20 font-ui text-[10px] tracking-[3px] uppercase"
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-32">
          {products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group flex flex-col bg-[#161616] border border-[#2a2725] rounded-sm overflow-hidden hover:border-[#3a3735] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="aspect-[3/4] relative overflow-hidden">
                 {product.images[0] ? (
                   <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110"
                   />
                 ) : (
                   <div className="absolute inset-0 bg-[#222]" />
                 )}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                 
                 <div className="absolute bottom-6 left-0 right-0 px-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30">
                    <button className="bg-white text-black px-8 py-4 text-[10px] font-bold tracking-[3px] w-full shadow-2xl hover:bg-gold transition-colors uppercase">
                      查看詳情
                    </button>
                 </div>
              </div>
              <div className="p-8 flex flex-col gap-2">
                <p className="text-gold text-[10px] tracking-[3px] uppercase font-bold opacity-60">JC mall</p>
                <h3 className="font-serif text-xl text-white tracking-tight group-hover:text-gold transition-colors">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-white font-ui text-lg font-medium">${product.price.toLocaleString()}</p>
                  <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">{product.category.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="py-32 text-center reveal visible">
            <p className="text-[#5a5650] text-lg font-light italic">找不到與您的搜尋條件相符的商品。</p>
            <Link href="/shop" className="inline-block mt-8 text-gold text-[10px] tracking-[4px] uppercase font-bold border-b border-gold/30 pb-2">
              瀏覽所有商品 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
