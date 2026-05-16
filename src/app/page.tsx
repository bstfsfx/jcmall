import Link from "next/link";
import { getProducts, getCategories } from "@/app/actions/product";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax Effect (CSS based for now) */}
      <section className="relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" 
            alt="JC mall Fashion Hero"
            className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 opacity-90 font-medium">2026 Summer / Autumn Collection</p>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-widest drop-shadow-2xl">
            品味<em>永恆</em>風尚
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light drop-shadow-sm leading-relaxed opacity-90">
            Discover our curated collection of luxury fashion, designed for those who appreciate elegance and craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="inline-block bg-white text-foreground px-10 py-4 text-sm font-semibold tracking-[0.2em] hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              SHOP COLLECTION
            </Link>
            <Link
              href="/shop/new-arrivals"
              className="inline-block border border-white text-white px-10 py-4 text-sm font-semibold tracking-[0.2em] hover:bg-white hover:text-foreground transition-all duration-300"
            >
              EXPLORE MORE
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-70">
          <div className="w-[1px] h-12 bg-white" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <p className="text-accent text-xs tracking-widest uppercase mb-2 font-semibold">Explore</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Curated Collections</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold hover:text-accent border-b border-gray-200 hover:border-accent transition-all pb-1 tracking-widest">
              VIEW ALL COLLECTIONS
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.filter(c => c.slug !== 'new-arrivals').slice(0, 3).map((category, index) => (
              <Link href={`/shop/${category.slug}`} key={index} className="group relative h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                </div>
                <div className="relative z-20 text-center px-6">
                  <h3 className="text-white text-3xl font-serif mb-2 tracking-wide uppercase">{category.name}</h3>
                  <p className="text-white/80 text-sm font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {category.description || "Discover the collection"}
                  </p>
                  <span className="text-white text-xs tracking-widest border-b border-white/50 pb-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Discover More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Quality Statement */}
      <section className="py-32 bg-gray-50 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-accent text-xs tracking-widest uppercase mb-4 font-semibold">Brand Philosophy</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">Crafting the Future with Sustainable Artistry</h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 font-light">
              We are dedicated to using high-quality, traceable, and sustainable materials. Every JC Mall piece is a testament to meticulous craftsmanship and environmental responsibility, designed to stand the test of time and transcend fleeting trends.
            </p>
            <Link href="/about" className="inline-block bg-foreground text-background px-10 py-4 text-sm font-semibold tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-lg">
              DISCOVER OUR STORY
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-accent text-xs tracking-widest uppercase mb-2 font-semibold">Handpicked for you</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Pieces</h2>
            <div className="w-20 h-[1px] bg-accent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.slug}`} key={product.id} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-6 overflow-hidden relative shadow-sm">
                   {product.images[0] ? (
                     <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                   ) : (
                     <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 group-hover:scale-105" />
                   )}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                   <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex justify-center">
                      <button className="bg-white text-foreground px-8 py-3 text-xs font-semibold tracking-widest w-full shadow-xl hover:bg-gray-50 transition-colors uppercase">
                        View Details
                      </button>
                   </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg tracking-tight group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{product.category.name}</p>
                  </div>
                  <p className="text-foreground text-sm font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/shop" className="inline-block border border-foreground text-foreground px-10 py-4 text-sm font-semibold tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300">
              BROWSE ALL PIECES
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-accent text-xs tracking-widest uppercase mb-4 font-semibold">Subscribe</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Stay Informed on New Arrivals</h2>
          <p className="text-gray-400 mb-10 font-light tracking-wide leading-relaxed">
            Join our elite circle to be the first to know about new collection launches and member-only exclusive surprises.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 shadow-2xl">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/5 border border-white/20 px-6 py-4 w-full text-sm focus:outline-none focus:border-white transition-colors"
            />
            <button className="bg-white text-foreground px-10 py-4 text-sm font-semibold tracking-widest hover:bg-gray-200 transition-colors whitespace-nowrap uppercase">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

