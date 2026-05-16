import Link from "next/link";
import { getProducts, getCategories } from "@/actions/product";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const featuredProducts = products.slice(0, 8);
  const t = await getTranslations('Home');
  const navT = await getTranslations('Nav');
  const cartT = await getTranslations('Cart');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Marquee />

      {/* Featured Categories */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
            <div className="reveal visible">
              <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{t('categories.tag')}</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-white">{t('categories.title')}</h2>
              <div className="w-16 h-[1px] bg-gold mt-6" />
            </div>
            <Link href={`/${locale}/shop`} className="text-[10px] font-bold tracking-[3px] uppercase text-gold hover:text-white transition-colors border-b border-gold/30 pb-2">
              {locale === 'zh' ? '瀏覽所有系列 →' : 'Browse All Collections →'}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.filter(c => c.slug !== 'new-arrivals').slice(0, 3).map((category, index) => (
              <Link href={`/${locale}/shop/${category.slug}`} key={index} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#111111]">
                <div className="absolute inset-0 transition-transform duration-[1.5s] cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-110">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.5] transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#161616]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
                  <h3 className="text-white text-3xl font-serif font-light mb-3 tracking-wide">
                    {locale === 'en' ? (category.slug.charAt(0).toUpperCase() + category.slug.slice(1)) : category.name}
                  </h3>
                  <p className="text-[#9a958e] text-xs font-light mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {category.description || (locale === 'zh' ? "探索更多精心設計的單品" : "Discover more meticulously crafted pieces")}
                  </p>
                  <span className="text-gold text-[10px] tracking-[4px] uppercase font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {locale === 'zh' ? '探索更多' : 'Explore More'} <span className="text-xs">→</span>
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
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{t('featured.tag')}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">{t('featured.title')}</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/${locale}/product/${product.slug}`} key={product.id} className="group flex flex-col bg-[#161616] border border-[#2a2725] rounded-sm overflow-hidden hover:border-[#3a3735] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
                   
                   <span className="absolute top-4 left-4 bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-sm z-20">
                     {locale === 'zh' ? '新品' : 'NEW'}
                   </span>
                   
                   <div className="absolute bottom-6 left-0 right-0 px-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30">
                      <button className="bg-white text-black px-8 py-4 text-[10px] font-bold tracking-[3px] w-full shadow-2xl hover:bg-gold transition-colors uppercase">
                        {locale === 'zh' ? '查看詳情' : 'VIEW DETAILS'}
                      </button>
                   </div>
                </div>
                <div className="p-8 flex flex-col gap-2">
                  <p className="text-gold text-[10px] tracking-[3px] uppercase font-bold opacity-60">JC mall</p>
                  <h3 className="font-serif text-xl text-white tracking-tight group-hover:text-gold transition-colors">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-white font-ui text-lg font-medium">${product.price.toLocaleString()}</p>
                    <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">
                      {locale === 'en' ? (product.category.slug.charAt(0).toUpperCase() + product.category.slug.slice(1)) : product.category.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-24">
            <Link href={`/${locale}/shop`} className="inline-block border border-[#5a5650] text-white px-16 py-6 text-[10px] font-bold tracking-[5px] uppercase hover:border-gold hover:text-gold transition-all duration-500">
              {locale === 'zh' ? '瀏覽所有商品' : 'Browse All Products'}
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
              <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{t('philosophy.tag')}</p>
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-8 text-white leading-tight">
                {t('philosophy.title')}
              </h2>
              <p className="text-[#9a958e] text-lg md:text-xl font-light mb-10 leading-relaxed italic">
                {t('philosophy.desc')}
              </p>
              <Link 
                href={`/${locale}/about`} 
                className="inline-block bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-500"
              >
                {t('philosophy.cta')}
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
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">{t('services.shipping')}</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">{t('services.shippingDesc')}</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">⟲</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">{t('services.returns')}</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">{t('services.returnsDesc')}</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">🔒</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">{t('services.security')}</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">{t('services.securityDesc')}</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="text-gold text-4xl mb-8 transition-transform duration-500 group-hover:scale-110">☏</div>
              <h4 className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-3">{t('services.support')}</h4>
              <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">{t('services.supportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-[#111111] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-[#161616] border border-[#2a2725] rounded-sm p-16 md:p-32 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 font-serif text-[20rem] text-gold/5 pointer-events-none select-none italic">@</div>
            <p className="text-gold text-[10px] tracking-[5px] uppercase mb-6 font-bold">{locale === 'zh' ? '訂閱我們' : 'SUBSCRIBE'}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-white">{locale === 'zh' ? '獲取最新優惠與新品資訊' : 'JOIN THE INNER CIRCLE'}</h2>
            <p className="text-[#9a958e] mb-12 max-w-lg mx-auto font-light leading-loose tracking-wide">
              {locale === 'zh' ? '加入我們的菁英圈，第一時間掌握最新系列發佈與僅限會員的專屬驚喜。' : 'Receive early access to collections, member-only event invitations, and exclusive brand stories.'}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10 shadow-2xl">
              <input
                type="email"
                placeholder={locale === 'zh' ? '您的電子郵件' : 'Your Email Address'}
                className="bg-[#0a0a0a] border border-[#2a2725] px-8 py-5 w-full text-sm text-white focus:outline-none focus:border-gold transition-colors font-ui tracking-wider"
              />
              <button className="bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[3px] hover:bg-gold-light transition-all duration-300 whitespace-nowrap uppercase">
                {locale === 'zh' ? '立即訂閱' : 'SUBSCRIBE NOW'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
