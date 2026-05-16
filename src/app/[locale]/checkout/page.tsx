'use client';

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { createOrder } from "@/actions/order";
import { useLocale } from "next-intl";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Call server action to create order
    try {
      await createOrder(items, totalPrice);
      
      // Simulate payment processing delay for UX
      setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        router.push(`/${locale}/order-success`);
      }, 2000);
    } catch (error) {
      console.error("Order failed", error);
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-32 text-center">
          <p className="text-[#5a5650] text-xl font-light italic mb-10">
            {locale === 'zh' ? '您的購物車目前是空的。' : 'Your cart is currently empty.'}
          </p>
          <Link href={`/${locale}/shop`} className="inline-block bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300">
            {locale === 'zh' ? '返回商店 / RETURN TO SHOP' : 'RETURN TO SHOP'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: locale === 'zh' ? '結帳' : 'CHECKOUT' }]} />
        
        <div className="mb-16 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{locale === 'zh' ? '安全結帳' : 'Secure Checkout'}</p>
          <h1 className="text-5xl font-serif font-light text-white tracking-tight">{locale === 'zh' ? '結帳付款' : 'Checkout'}</h1>
          <div className="w-16 h-[1px] bg-gold mt-6" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-20 pb-32">
          {/* Checkout Steps */}
          <div className="flex-grow space-y-12">
            {/* Step Indicators */}
            <div className="flex gap-8 text-[10px] tracking-[3px] font-bold uppercase border-b border-white/5 pb-8">
              <span className={step >= 1 ? "text-white" : "text-[#5a5650]"}>{locale === 'zh' ? '01 聯絡資訊' : '01 Contact'}</span>
              <span className="text-[#2a2725]">/</span>
              <span className={step >= 2 ? "text-white" : "text-[#5a5650]"}>{locale === 'zh' ? '02 配送方式' : '02 Shipping'}</span>
              <span className="text-[#2a2725]">/</span>
              <span className={step >= 3 ? "text-white" : "text-[#5a5650]"}>{locale === 'zh' ? '03 付款資訊' : '03 Payment'}</span>
            </div>

            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-12 animate-[fadeIn_0.5s_forwards]">
                <div className="space-y-8">
                  <h2 className="text-2xl font-serif text-white">{locale === 'zh' ? '聯絡資訊 / Contact' : 'Contact Information'}</h2>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '電子郵件 / Email' : 'Email'}</label>
                    <input type="email" placeholder="your@email.com" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-2xl font-serif text-white pt-8">{locale === 'zh' ? '配送地址 / Shipping' : 'Shipping Address'}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '名字 / First Name' : 'First Name'}</label>
                      <input type="text" placeholder="First name" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '姓氏 / Last Name' : 'Last Name'}</label>
                      <input type="text" placeholder="Last name" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '詳細地址 / Address' : 'Address'}</label>
                    <input type="text" placeholder="Street address" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '城市 / City' : 'City'}</label>
                      <input type="text" placeholder="City" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '州/省 / State' : 'State'}</label>
                      <input type="text" placeholder="State" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '郵遞區號 / ZIP' : 'ZIP'}</label>
                      <input type="text" placeholder="ZIP code" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-gold text-black py-6 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl">
                  {locale === 'zh' ? '繼續配送方式 / CONTINUE TO SHIPPING' : 'CONTINUE TO SHIPPING'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-12 animate-[fadeIn_0.5s_forwards]">
                 <div className="bg-[#111111] border border-[#2a2725] p-8 rounded-sm space-y-6 text-[10px] tracking-[2px] uppercase font-bold">
                   <div className="flex justify-between items-center border-b border-white/5 pb-6">
                      <span className="text-[#5a5650]">{locale === 'zh' ? '聯絡資訊 / Contact' : 'Contact'}</span>
                      <span className="text-white">user@example.com</span>
                      <button type="button" onClick={() => setStep(1)} className="text-gold hover:text-white transition-colors">{locale === 'zh' ? '修改 / Edit' : 'Edit'}</button>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[#5a5650]">{locale === 'zh' ? '配送至 / Ship to' : 'Ship to'}</span>
                      <span className="text-white">123 Fashion Ave, Central, HK</span>
                      <button type="button" onClick={() => setStep(1)} className="text-gold hover:text-white transition-colors">{locale === 'zh' ? '修改 / Edit' : 'Edit'}</button>
                   </div>
                 </div>

                 <div className="space-y-8">
                   <h2 className="text-2xl font-serif text-white pt-8">{locale === 'zh' ? '配送方式 / Shipping Method' : 'Shipping Method'}</h2>
                   <div className="bg-[#161616] border border-gold p-8 flex justify-between items-center rounded-sm group cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className="w-5 h-5 rounded-full border-4 border-gold bg-black" />
                        <div>
                          <p className="text-white text-[10px] tracking-[3px] font-bold uppercase">{locale === 'zh' ? '標準配送 / Standard Shipping' : 'Standard Shipping'}</p>
                          <p className="text-[#5a5650] text-[9px] tracking-[2px] uppercase mt-1">{locale === 'zh' ? '3-5 個工作天 / Business Days' : '3-5 Business Days'}</p>
                        </div>
                      </div>
                      <span className="text-gold font-bold">FREE</span>
                   </div>
                 </div>

                 <div className="flex gap-6 pt-10">
                   <button type="button" onClick={() => setStep(1)} className="flex-1 bg-transparent border border-[#2a2725] text-[#9a958e] py-6 text-[10px] font-bold tracking-[4px] uppercase hover:border-white transition-all">
                     {locale === 'zh' ? '返回 / BACK' : 'BACK'}
                   </button>
                   <button type="submit" className="flex-1 bg-gold text-black py-6 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all shadow-2xl">
                     {locale === 'zh' ? '繼續付款 / CONTINUE TO PAYMENT' : 'CONTINUE TO PAYMENT'}
                   </button>
                 </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handlePayment} className="space-y-12 animate-[fadeIn_0.5s_forwards]">
                <div className="space-y-8">
                  <h2 className="text-2xl font-serif text-white">{locale === 'zh' ? '付款資訊 / Payment' : 'Payment Information'}</h2>
                  <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase font-bold mb-8">{locale === 'zh' ? '所有交易皆經過加密處理，確保安全。' : 'All transactions are secure and encrypted.'}</p>
                  
                  <div className="bg-[#111111] border border-[#2a2725] p-10 space-y-10 rounded-sm">
                    <div className="flex justify-between items-center pb-6 border-b border-white/5">
                       <span className="text-white text-[10px] tracking-[3px] font-bold uppercase">{locale === 'zh' ? '信用卡付款 / Credit Card' : 'Credit Card'}</span>
                       <div className="flex gap-3">
                         <span className="text-[#5a5650] text-[9px] border border-white/10 px-2 py-1 rounded-sm">VISA</span>
                         <span className="text-[#5a5650] text-[9px] border border-white/10 px-2 py-1 rounded-sm">MASTERCARD</span>
                       </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '卡號 / Card Number' : 'Card Number'}</label>
                      <input type="text" placeholder="0000 0000 0000 0000" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '持卡人姓名 / Name on Card' : 'Name on Card'}</label>
                      <input type="text" placeholder="Full name as on card" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '到期日 / Expiry (MM/YY)' : 'Expiry (MM/YY)'}</label>
                        <input type="text" placeholder="MM / YY" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '安全碼 / CVV' : 'CVV'}</label>
                        <input type="text" placeholder="123" required className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-10">
                   <button type="button" onClick={() => setStep(2)} disabled={isProcessing} className="flex-1 bg-transparent border border-[#2a2725] text-[#9a958e] py-6 text-[10px] font-bold tracking-[4px] uppercase hover:border-white transition-all disabled:opacity-30">
                     {locale === 'zh' ? '返回 / BACK' : 'BACK'}
                   </button>
                   <button type="submit" disabled={isProcessing} className="flex-1 bg-gold text-black py-6 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all shadow-2xl disabled:opacity-50">
                     {isProcessing ? <span className="animate-pulse">{locale === 'zh' ? '處理中... / PROCESSING' : 'PROCESSING...'}</span> : (locale === 'zh' ? '立即付款 / PAY NOW' : 'PAY NOW')}
                   </button>
                 </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-[#161616] border border-[#2a2725] p-10 rounded-sm sticky top-32">
              <h2 className="text-2xl font-serif text-white mb-10 pb-6 border-b border-white/5">{locale === 'zh' ? '訂單摘要 / Order Summary' : 'Order Summary'}</h2>
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-16 h-20 bg-[#111111] border border-[#2a2725] flex-shrink-0 relative rounded-sm overflow-hidden">
                       {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60" />}
                       <span className="absolute -top-1 -right-1 bg-gold text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                         {item.quantity}
                       </span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-white text-[10px] tracking-[2px] font-bold uppercase leading-tight mb-1">{item.name}</p>
                      <p className="text-[#5a5650] text-[9px] tracking-[1px] uppercase">{item.color || 'Default'} / {item.size || 'M'}</p>
                    </div>
                    <p className="text-white font-ui text-sm font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mb-10 pt-6 border-t border-white/5">
                <div className="flex justify-between text-[10px] tracking-[3px] uppercase font-bold">
                  <span className="text-[#5a5650]">{locale === 'zh' ? '小計 / Subtotal' : 'Subtotal'}</span>
                  <span className="text-white">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] tracking-[3px] uppercase font-bold">
                  <span className="text-[#5a5650]">{locale === 'zh' ? '配送 / Shipping' : 'Shipping'}</span>
                  <span className="text-gold">{step > 1 ? 'FREE' : (locale === 'zh' ? '計算中...' : 'Calculating...')}</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-white/5 items-baseline">
                  <span className="text-white font-serif text-xl">{locale === 'zh' ? '總計 / Total' : 'Total'}</span>
                  <span className="text-white font-ui text-2xl font-bold">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 text-[9px] tracking-[2px] uppercase text-[#5a5650] font-bold opacity-60">
                <span>🛡️ {locale === 'zh' ? '安全加密連結' : 'Secure Connection'}</span>
                <span>•</span>
                <span>JC MALL OFFICIAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
