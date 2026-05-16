import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'RETURNS & EXCHANGES' }]} />
        
        <div className="max-w-4xl mx-auto py-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Customer Care</p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-white tracking-tight mb-12">退換貨說明</h1>
          <div className="w-16 h-[1px] bg-gold mb-16" />
          
          <div className="space-y-16 text-[#9a958e] font-light leading-loose tracking-wide italic">
            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">30 天無憂鑑賞期</h2>
              <p>我們希望您對所購買的商品感到完全滿意。如果您因任何原因對商品不滿意，可以在收到商品後的 30 天內申請退換貨。</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">退貨條件</h2>
              <p>為了確保退貨順利，請確認您的商品符合以下條件：</p>
              <ul className="list-disc list-inside space-y-4 ml-4">
                <li>商品必須保持全新狀態（未經使用、未下水）。</li>
                <li>所有原始標籤、包裝與配件必須完整保留。</li>
                <li>貼身衣物、耳環與部分客製化商品除品質瑕疵外，恕不接受退換。</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">退款流程</h2>
              <p>在我們收到並確認商品狀況後，將在 5-7 個工作天內處理您的退款。退款將直接退回到您原始的支付方式。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
