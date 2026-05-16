import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/layout/Header";
import { auth } from "@/auth";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "JC Mall | Premium Fashion", template: "%s | JC Mall" },
  description: "Discover the latest premium fashion collections at JC Mall. Shop women, men, and accessories.",
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  robots: { index: true, follow: true },
  openGraph: { siteName: "JC Mall", type: "website" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <CartProvider>
          <Header session={session} />
          <main className="flex-grow">{children}</main>

          <footer className="bg-foreground text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-serif mb-4">JC MALL</h3>
                <p className="text-sm text-gray-400">Premium fashion for the modern individual.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/shop/new">New Arrivals</Link></li>
                  <li><Link href="/shop/women">Women</Link></li>
                  <li><Link href="/shop/men">Men</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/shipping">Shipping &amp; Returns</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Newsletter</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Subscribe to receive updates, access to exclusive deals, and more.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-transparent border border-gray-600 px-4 py-2 w-full text-sm focus:outline-none focus:border-white"
                  />
                  <button className="bg-white text-foreground px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} JC Mall. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
