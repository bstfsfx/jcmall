'use client';

import Breadcrumbs from '@/components/ui/Breadcrumbs';

const FAQS = [
  {
    category: "訂單與付款",
    questions: [
      {
        q: "如何查詢我的訂單狀態？",
        a: "您可以登入您的 JC mall 帳戶並前往「我的訂單」頁面查看。我們也會在訂單出貨時發送電子郵件通知您。"
      },
      {
        q: "接受哪些付款方式？",
        a: "我們接受 Visa、MasterCard、American Express 等主要信用卡，以及 Apple Pay、Google Pay 與 LINE Pay。"
      }
    ]
  },
  {
    category: "配送與運費",
    questions: [
      {
        q: "配送需要多久時間？",
        a: "標準配送通常在 3-5 個工作天內送達。國際訂單可能需要 7-14 個工作天，具體取決於目的地與海關流程。"
      },
      {
        q: "運費如何計算？",
        a: "單筆訂單滿 $3,000 即享免運服務。未滿額訂單將收取 $150 的基本運費。"
      }
    ]
  },
  {
    category: "退換貨政策",
    questions: [
      {
        q: "我可以退換貨嗎？",
        a: "是的，所有商品（除貼身衣物與部分特惠商品外）均享有 30 天鑑賞期。請確保商品標籤完整且未經使用。"
      },
      {
        q: "如何辦理退貨？",
        a: "請聯繫我們的客戶服務團隊或在您的帳戶頁面提交退貨申請。我們將安排快遞到府收件。"
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* Page Hero */}
      <section className="bg-[#111111] border-b border-white/5 py-24">
        <div className="container mx-auto px-6 text-center">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">常見問題</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">常見問題解答</h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-8 opacity-60" />
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-24">
            {FAQS.map((cat, idx) => (
              <div key={idx} className="reveal visible">
                <h2 className="text-gold text-[10px] tracking-[4px] uppercase font-bold mb-12 border-b border-white/5 pb-4">{cat.category}</h2>
                <div className="space-y-4">
                  {cat.questions.map((faq, fIdx) => (
                    <details key={fIdx} className="group bg-[#111111] border border-[#2a2725] rounded-sm overflow-hidden">
                      <summary className="flex justify-between items-center p-8 cursor-pointer list-none hover:bg-[#161616] transition-colors">
                        <span className="font-serif text-xl text-white tracking-wide">{faq.q}</span>
                        <span className="text-gold transition-transform duration-500 group-open:rotate-180">↓</span>
                      </summary>
                      <div className="px-8 pb-8 text-[#9a958e] font-light leading-loose tracking-wide border-t border-white/5 pt-6 italic animate-[fadeIn_0.5s_forwards]">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center reveal visible">
            <p className="text-[#5a5650] mb-8 italic">還有其他問題嗎？</p>
            <a 
              href="/contact" 
              className="inline-block bg-gold text-black px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300"
            >
              聯繫客服中心
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
