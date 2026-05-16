import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-gray-200">
          <div className="w-full h-full object-cover bg-gradient-to-r from-gray-300 to-gray-200" />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide drop-shadow-md">
            THE FALL COLLECTION
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light drop-shadow-sm">
            Discover our latest arrivals featuring premium materials, elevated tailoring, and a refined international aesthetic.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-foreground px-8 py-4 font-semibold tracking-wider hover:bg-gray-100 transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Categories</h2>
            <Link href="/shop" className="text-sm font-semibold hover:text-accent border-b border-transparent hover:border-accent transition-all pb-1 hidden md:block">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Women's Apparel", href: "/shop/women" },
              { title: "Men's Apparel", href: "/shop/men" },
              { title: "Accessories", href: "/shop/accessories" },
            ].map((category, index) => (
              <Link href={category.href} key={index} className="group relative h-96 overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-serif">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Quality Statement */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-6">Uncompromising Quality</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            At JC Mall, we believe in the power of understated elegance. Every piece in our collection is crafted with meticulous attention to detail, using only the finest materials sourced from around the world. We don't just follow trends; we create timeless staples designed to last a lifetime.
          </p>
          <Link href="/about" className="text-sm font-semibold hover:text-accent border-b border-foreground hover:border-accent transition-all pb-1">
            DISCOVER OUR STORY
          </Link>
        </div>
      </section>
      
      {/* New Arrivals (Placeholder) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* Generating 4 placeholder product cards */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent flex justify-center">
                      <button className="bg-white text-foreground px-6 py-2 text-sm font-medium w-full shadow-sm hover:bg-gray-50">
                        Quick Add
                      </button>
                   </div>
                </div>
                <h3 className="font-medium text-sm md:text-base">Premium Essential {item}</h3>
                <p className="text-gray-500 text-sm">$120.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
