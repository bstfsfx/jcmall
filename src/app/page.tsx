import Link from "next/link";
import { getProducts, getCategories } from "@/app/actions/product";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Marquee />

      {/* Featured Categories */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
            <div className="reveal visible">
              <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">探索</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-white">精選系列</h2>
              <div className="w-16 h-[1px] bg-gold mt-6" />
            </div>
            <Link href="/shop" className="text-[10px] font-bold tracking-[3px] uppercase text-gold hover:text-white transition-colors border-b border-gold/30 pb-2">
              瀏覽所有系列 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.filter(c => c.slug !== 'new-arrivals').slice(0, 3).map((category, index) => (
              <Link href={`/shop/${category.slug}`} key={index} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#111111]">
                <div className="absolute inset-0 transition-transform duration-[1.5s] cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-110">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.5] transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#161616]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
                  <h3 className="text-white text-3xl font-serif font-light mb-3 tracking-wide">{category.name}</h3>
                  <p className="text-[#9a958e] text-xs font-light mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {category.description || "探索更多精心設計的單品"}
                  </p>
                  <span className="text-gold text-[10px] tracking-[4px] uppercase font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    探索更多 <span className="text-xs">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-[#111111]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 reveal visible">
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">為您精選</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">精選單品</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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
                   
                   {/* Badges (Logic based on name for now as mock) */}
                   <span className="absolute top-4 left-4 bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-sm z-20">
                     新品
                   </span>
                   
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

          <div className="text-center mt-24">
            <Link href="/shop" className="inline-block border border-[#5a5650] text-white px-16 py-6 text-[10px] font-bold tracking-[5px] uppercase hover:border-gold hover:text-gold transition-all duration-500">
              瀏覽所有商品
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story / Philosophy Banner */}
      <section className="py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative min-h-[600px] flex items-center rounded-sm overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80" 
                alt="Brand Philosophy" 
                className="w-full h-full object-cover brightness-[0.3] transition-transform duration-[20s] group-hover:scale-110"
              />
            </div>
            <div className="relative z-10 px-12 md:px-24 max-w-2xl text-left">
              <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">品牌核心</p>
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-8 text-white leading-tight">
                以永續工藝<br />打造時尚未來
              </h2>
              <p className="text-[#9a958e] text-lg md:text-xl font-light mb-10 leading-relaxed italic">
                我們致力於使用高品質、可追溯的永續材質。每一件 JC mall 產品都是對匠心工藝與環境責任的體現。
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-500"
              >
                探索更多故事
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Row */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 border-y border-white/5 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">✈</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">免費配送</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">訂單滿 $3,000 即享免運</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">⟲</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">輕鬆退換</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">30 天無憂鑑賞期</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">🔒</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">安全付款</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">最高等級加密防護</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">☏</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">全天候客服</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">專業團隊隨時為您服務</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-[#111111] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-[#161616] border border-[#2a2725] rounded-sm p-16 md:p-32 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 font-serif text-[20rem] text-gold/5 pointer-events-none select-none italic">@</div>
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-6 font-bold">訂閱我們</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-white">獲取最新優惠與新品資訊</h2>
            <p className="text-[#9a958e] mb-12 max-w-lg mx-auto font-light leading-loose tracking-wide">
              加入我們的菁英圈，第一時間掌握最新系列發佈與僅限會員的專屬驚喜。
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10 shadow-2xl">
              <input
                type="email"
                placeholder="您的電子郵件"
                className="bg-[#0a0a0a] border border-[#2a2725] px-8 py-5 w-full text-sm text-white focus:outline-none focus:border-gold transition-colors font-ui tracking-wider"
              />
              <button className="bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[3px] hover:bg-gold-light transition-all duration-300 whitespace-nowrap uppercase">
                立即訂閱
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
