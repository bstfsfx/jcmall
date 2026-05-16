'use client';

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'YOUR CART' }]} />
        
        <div className="mb-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Review Selections</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight leading-tight">您的購物車</h1>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>
        
        {items.length === 0 ? (
          <div className="bg-[#111111] border border-[#2a2725] p-20 text-center rounded-sm reveal visible">
            <p className="text-[#9a958e] text-xl font-light italic mb-10">您的購物車目前是空的。</p>
            <Link href="/shop" className="inline-block bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl">
              繼續選購商品 / CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-20 pb-32">
            {/* Cart Items */}
            <div className="flex-grow space-y-12">
              {items.map((item) => (
                <div key={item.id} className="flex gap-10 border-b border-white/5 pb-12 group">
                  <div className="w-32 h-44 bg-[#111111] border border-[#2a2725] relative flex-shrink-0 rounded-sm overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#5a5650] text-[10px] tracking-[2px] uppercase">No Image</div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <Link href={`/product/${item.productId}`} className="font-serif text-2xl text-white hover:text-gold transition-colors tracking-wide">
                          {item.name}
                        </Link>
                        <p className="font-ui text-xl text-white font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-6 text-[10px] tracking-[2px] uppercase text-[#5a5650] font-bold">
                        <p>Color: <span className="text-[#9a958e]">{item.color || 'Default'}</span></p>
                        <p>Size: <span className="text-[#9a958e]">{item.size || 'M'}</span></p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-8">
                      <div className="flex items-center border border-[#2a2725] bg-[#111111]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 text-white hover:text-gold transition-colors text-lg"
                        >
                          −
                        </button>
                        <span className="w-12 text-center text-xs text-white font-ui border-x border-[#2a2725] py-2">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 text-white hover:text-gold transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] tracking-[2px] uppercase font-bold text-[#5a5650] hover:text-red-500 transition-colors border-b border-[#5a5650]/30 pb-1"
                      >
                        移除項目 / Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-[400px] flex-shrink-0">
              <div className="bg-[#161616] border border-[#2a2725] p-12 rounded-sm sticky top-32">
                <h2 className="text-2xl font-serif text-white mb-10 pb-6 border-b border-white/5">結帳摘要 / Summary</h2>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[10px] tracking-[3px] uppercase font-bold">
                    <span className="text-[#5a5650]">小計 / Subtotal</span>
                    <span className="text-white">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] tracking-[3px] uppercase font-bold">
                    <span className="text-[#5a5650]">配送 / Shipping</span>
                    <span className="text-gold">FREE</span>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex justify-between items-baseline">
                    <span className="text-white font-serif text-xl">總計 / Total</span>
                    <span className="text-white font-ui text-3xl font-bold">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <Link 
                  href="/checkout" 
                  className="block w-full bg-gold text-black text-center py-6 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl"
                >
                  前往結帳 / PROCEED TO CHECKOUT
                </Link>
                <div className="mt-8 flex items-center justify-center gap-3 text-[9px] tracking-[2px] uppercase text-[#5a5650] font-bold">
                  <span>🔒 安全加密支付</span>
                  <span>•</span>
                  <span>全球免運</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
