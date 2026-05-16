'use client';

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useLocale } from "next-intl";

export default function ShippingPage() {
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: locale === 'zh' ? '配送政策' : 'SHIPPING POLICY' }]} />
        
        <div className="max-w-4xl mx-auto py-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{locale === 'zh' ? '配送服務' : 'Delivery Services'}</p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-white tracking-tight mb-12">{locale === 'zh' ? '配送政策' : 'Shipping Policy'}</h1>
          <div className="w-16 h-[1px] bg-gold mb-16" />
          
          <div className="space-y-16 text-[#9a958e] font-light leading-loose tracking-wide italic">
            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">{locale === 'zh' ? '配送方式與時間' : 'Methods & Timing'}</h2>
              <p>{locale === 'zh' ? '我們致力於為您提供全球最迅速且安全的配送服務。所有訂單均由我們的物流夥伴（如 FedEx, DHL, SF Express）負責運送。' : 'We are committed to providing the fastest and most secure delivery service worldwide. All orders are handled by our logistics partners including FedEx, DHL, and SF Express.'}</p>
              <ul className="list-disc list-inside space-y-4 ml-4">
                <li>{locale === 'zh' ? '台灣本島：2-3 個工作天' : 'Taiwan: 2-3 Business Days'}</li>
                <li>{locale === 'zh' ? '亞洲地區：3-7 個工作天' : 'Asia Pacific: 3-7 Business Days'}</li>
                <li>{locale === 'zh' ? '其他國際地區：7-14 個工作天' : 'International: 7-14 Business Days'}</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">{locale === 'zh' ? '運費計算' : 'Shipping Fees'}</h2>
              <p>{locale === 'zh' ? 'JC mall 提供全球免運服務。無論您的所在地點為何，只要單筆訂單滿額，即可享有免費配送服務。' : 'JC mall offers global shipping options. Regardless of your location, orders meeting the minimum threshold enjoy complimentary delivery.'}</p>
              <ul className="list-disc list-inside space-y-4 ml-4">
                <li>{locale === 'zh' ? '台灣訂單：全館免運' : 'Taiwan Orders: Free Shipping'}</li>
                <li>{locale === 'zh' ? '國際訂單：滿 US$300 免運，未滿額將收取固定運費 US$30' : 'International: Free over US$300, otherwise US$30 flat rate'}</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">{locale === 'zh' ? '追蹤您的訂單' : 'Order Tracking'}</h2>
              <p>{locale === 'zh' ? '在您的訂單出貨後，我們將發送一封包含追蹤號碼的電子郵件。您也可以登入會員中心，在「我的訂單」頁面查看最新的物流狀態。' : 'Once your order has shipped, we will send an email with a tracking number. You can also log in to your account and view status under "My Orders".'}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
