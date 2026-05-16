'use client';

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useLocale } from "next-intl";

export default function ReturnsPage() {
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: locale === 'zh' ? '退換貨說明' : 'RETURNS & EXCHANGES' }]} />
        
        <div className="max-w-4xl mx-auto py-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{locale === 'zh' ? '客戶服務' : 'Customer Care'}</p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-white tracking-tight mb-12">{locale === 'zh' ? '退換貨說明' : 'Returns & Exchanges'}</h1>
          <div className="w-16 h-[1px] bg-gold mb-16" />
          
          <div className="space-y-16 text-[#9a958e] font-light leading-loose tracking-wide italic">
            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">{locale === 'zh' ? '30 天無憂鑑賞期' : '30-Day Satisfaction Period'}</h2>
              <p>{locale === 'zh' ? '我們希望您對所購買的商品感到完全滿意。如果您因任何原因對商品不滿意，可以在收到商品後的 30 天內申請退換貨。' : 'We want you to be completely satisfied with your purchase. If for any reason you are not satisfied, you may request a return or exchange within 30 days of receipt.'}</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">{locale === 'zh' ? '退貨條件' : 'Conditions for Return'}</h2>
              <p>{locale === 'zh' ? '為了確保退貨順利，請確認您的商品符合以下條件：' : 'To ensure a smooth return process, please verify that your items meet the following criteria:'}</p>
              <ul className="list-disc list-inside space-y-4 ml-4">
                <li>{locale === 'zh' ? '商品必須保持全新狀態（未經使用、未下水）。' : 'Items must be in brand new condition (unused, unwashed).'}</li>
                <li>{locale === 'zh' ? '所有原始標籤、包裝與配件必須完整保留。' : 'All original tags, packaging, and accessories must be intact.'}</li>
                <li>{locale === 'zh' ? '貼身衣物、耳環與部分客製化商品除品質瑕疵外，恕不接受退換。' : 'Intimate apparel, earrings, and custom items cannot be returned unless defective.'}</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">{locale === 'zh' ? '退款流程' : 'Refund Process'}</h2>
              <p>{locale === 'zh' ? '在我們收到並確認商品狀況後，將在 5-7 個工作天內處理您的退款。退款將直接退回到您原始的支付方式。' : 'Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds are issued to the original payment method.'}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
