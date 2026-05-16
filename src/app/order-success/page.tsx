import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function OrderSuccessPage() {
  const orderNumber = "JCM-" + Math.floor(Math.random() * 90000 + 10000);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'ORDER SUCCESS' }]} />
        
        <div className="flex flex-col items-center justify-center py-32 text-center reveal visible">
          <div className="w-24 h-24 rounded-full border border-gold flex items-center justify-center text-gold text-4xl mb-12 animate-bounce">
            ✓
          </div>
          
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Transaction Confirmed</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight mb-8">訂單已成立</h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-12" />
          
          <div className="max-w-xl space-y-6 text-[#9a958e] font-light leading-loose tracking-wide mb-16 italic">
            <p>感謝您的選購。您的訂單 <span className="text-white font-bold font-ui not-italic">{orderNumber}</span> 已經正式成立。</p>
            <p>我們已將訂單確認信與配送資訊發送至您的電子郵件信箱。您可以隨時登入會員中心查看訂單處理進度。</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/account/orders" className="bg-transparent border border-white/20 text-white px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-white hover:text-black transition-all duration-500">
              查看訂單狀態 / VIEW ORDER
            </Link>
            <Link href="/shop" className="bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl">
              繼續探索商品 / CONTINUE SHOPPING
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto border-t border-white/5 pt-20 pb-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center reveal visible">
          <div>
            <h4 className="text-white text-[10px] tracking-[3px] uppercase font-bold mb-4">預計送達 / Estimated Delivery</h4>
            <p className="text-[#5a5650] text-sm">3-5 個工作天 / Business Days</p>
          </div>
          <div>
            <h4 className="text-white text-[10px] tracking-[3px] uppercase font-bold mb-4">配送方式 / Shipping</h4>
            <p className="text-[#5a5650] text-sm">全台免運配送 / Free Global Shipping</p>
          </div>
          <div>
            <h4 className="text-white text-[10px] tracking-[3px] uppercase font-bold mb-4">客服支援 / Support</h4>
            <p className="text-[#5a5650] text-sm">service@jcmall.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
