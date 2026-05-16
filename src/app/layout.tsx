import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/components/CartProvider";
import Preloader from "@/components/ui/Preloader";
import { auth } from "@/auth";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "JC Mall | Premium Fashion Destination",
  description: "Experience high-end fashion and sustainable luxury at JC Mall.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable} ${outfit.variable} font-sans antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col`}>
        <CartProvider>
          <Preloader />
          <Header session={session} />
          <main className="flex-grow">{children}</main>

          <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12">
            <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
              <div className="flex flex-col items-start">
                <h3 className="text-2xl font-serif font-light tracking-[0.4em] mb-8 text-white uppercase">JC MALL</h3>
                <p className="text-[#9a958e] text-sm font-light leading-loose tracking-wide mb-8 max-w-xs italic">
                  為追求卓越與永續工藝的您，提供超越時光的極致時尚單品。
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9a958e] hover:border-gold hover:text-gold transition-all cursor-pointer">IG</div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9a958e] hover:border-gold hover:text-gold transition-all cursor-pointer">FB</div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9a958e] hover:border-gold hover:text-gold transition-all cursor-pointer">TW</div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[4px] font-ui font-bold text-white uppercase mb-8">購物探索 / SHOP</h4>
                <ul className="space-y-4 text-[10px] tracking-[2px] font-ui font-bold text-[#5a5650] uppercase">
                  <li><Link href="/shop" className="hover:text-gold transition-all hover:pl-2 block">全部商品</Link></li>
                  <li><Link href="/shop/women" className="hover:text-gold transition-all hover:pl-2 block">女裝系列</Link></li>
                  <li><Link href="/shop/men" className="hover:text-gold transition-all hover:pl-2 block">男裝系列</Link></li>
                  <li><Link href="/shop/accessories" className="hover:text-gold transition-all hover:pl-2 block">精品配件</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[4px] font-ui font-bold text-white uppercase mb-8">品牌故事 / ABOUT</h4>
                <ul className="space-y-4 text-[10px] tracking-[2px] font-ui font-bold text-[#5a5650] uppercase">
                  <li><Link href="/about" className="hover:text-gold transition-all hover:pl-2 block">我們的故事</Link></li>
                  <li><Link href="/sustainability" className="hover:text-gold transition-all hover:pl-2 block">永續發展</Link></li>
                  <li><Link href="/contact" className="hover:text-gold transition-all hover:pl-2 block">聯繫我們</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[4px] font-ui font-bold text-white uppercase mb-8">顧客服務 / SUPPORT</h4>
                <ul className="space-y-4 text-[10px] tracking-[2px] font-ui font-bold text-[#5a5650] uppercase">
                  <li><Link href="/faq" className="hover:text-gold transition-all hover:pl-2 block">常見問題</Link></li>
                  <li><Link href="/shipping" className="hover:text-gold transition-all hover:pl-2 block">配送政策</Link></li>
                  <li><Link href="/returns" className="hover:text-gold transition-all hover:pl-2 block">退換貨說明</Link></li>
                  <li><Link href="/privacy" className="hover:text-gold transition-all hover:pl-2 block">隱私政策</Link></li>
                </ul>
              </div>
            </div>
            <div className="container mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] tracking-[2px] text-[#5a5650] uppercase">
                &copy; {new Date().getFullYear()} JC MALL. ALL RIGHTS RESERVED.
              </p>
              <div className="flex gap-10 text-[10px] tracking-[2px] text-[#5a5650] uppercase">
                <Link href="/privacy" className="hover:text-gold transition-colors">隱私權政策</Link>
                <Link href="/terms" className="hover:text-gold transition-colors">使用條款</Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
