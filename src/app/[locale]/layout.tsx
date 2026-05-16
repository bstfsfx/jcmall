import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/components/CartProvider";
import Preloader from "@/components/ui/Preloader";
import { auth } from "@/auth";
import Link from "next/link";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

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

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: "JC Mall | Premium Fashion Destination",
    description: "Experience high-end fashion and sustainable luxury at JC Mall.",
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { children } = props;
  const session = await auth();

  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'zh'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable} ${outfit.variable} font-sans antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Preloader />
            <Header session={session} locale={locale} />
            <main className="flex-grow">{children}</main>

            <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12">
              <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="flex flex-col items-start">
                  <h3 className="text-2xl font-serif font-light tracking-[0.4em] mb-8 text-white uppercase">JC MALL</h3>
                  <p className="text-[#9a958e] text-sm font-light leading-loose tracking-wide mb-8 max-w-xs italic">
                    {locale === 'zh' ? '為追求卓越與永續工藝的您，提供超越時光的極致時尚單品。' : 'Providing timeless fashion pieces for those who pursue excellence and sustainable craftsmanship.'}
                  </p>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9a958e] hover:border-gold hover:text-gold transition-all cursor-pointer">IG</div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9a958e] hover:border-gold hover:text-gold transition-all cursor-pointer">FB</div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9a958e] hover:border-gold hover:text-gold transition-all cursor-pointer">TW</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[4px] font-ui font-bold text-white uppercase mb-8">{locale === 'zh' ? '購物探索 / SHOP' : 'SHOP'}</h4>
                  <ul className="space-y-4 text-[10px] tracking-[2px] font-ui font-bold text-[#5a5650] uppercase">
                    <li><Link href={`/${locale}/shop`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '全部商品' : 'All Products'}</Link></li>
                    <li><Link href={`/${locale}/shop/women`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '女裝系列' : 'Women'}</Link></li>
                    <li><Link href={`/${locale}/shop/men`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '男裝系列' : 'Men'}</Link></li>
                    <li><Link href={`/${locale}/shop/accessories`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '精品配件' : 'Accessories'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[4px] font-ui font-bold text-white uppercase mb-8">{locale === 'zh' ? '品牌故事 / ABOUT' : 'ABOUT'}</h4>
                  <ul className="space-y-4 text-[10px] tracking-[2px] font-ui font-bold text-[#5a5650] uppercase">
                    <li><Link href={`/${locale}/about`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '我們的故事' : 'Our Story'}</Link></li>
                    <li><Link href={`/${locale}/sustainability`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '永續發展' : 'Sustainability'}</Link></li>
                    <li><Link href={`/${locale}/contact`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '聯繫我們' : 'Contact Us'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[4px] font-ui font-bold text-white uppercase mb-8">{locale === 'zh' ? '顧客服務 / SUPPORT' : 'SUPPORT'}</h4>
                  <ul className="space-y-4 text-[10px] tracking-[2px] font-ui font-bold text-[#5a5650] uppercase">
                    <li><Link href={`/${locale}/faq`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '常見問題' : 'FAQ'}</Link></li>
                    <li><Link href={`/${locale}/shipping`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '配送政策' : 'Shipping'}</Link></li>
                    <li><Link href={`/${locale}/returns`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '退換貨說明' : 'Returns'}</Link></li>
                    <li><Link href={`/${locale}/privacy`} className="hover:text-gold transition-all hover:pl-2 block">{locale === 'zh' ? '隱私政策' : 'Privacy'}</Link></li>
                  </ul>
                </div>
              </div>
              <div className="container mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] tracking-[2px] text-[#5a5650] uppercase">
                  &copy; {new Date().getFullYear()} JC MALL. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-10 text-[10px] tracking-[2px] text-[#5a5650] uppercase">
                  <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors">{locale === 'zh' ? '隱私權政策' : 'Privacy Policy'}</Link>
                  <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors">{locale === 'zh' ? '服務條款' : 'Terms of Service'}</Link>
                </div>
              </div>
            </footer>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
