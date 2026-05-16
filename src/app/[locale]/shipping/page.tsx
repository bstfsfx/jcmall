import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'SHIPPING POLICY' }]} />
        
        <div className="max-w-4xl mx-auto py-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Delivery Services</p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-white tracking-tight mb-12">配送政策</h1>
          <div className="w-16 h-[1px] bg-gold mb-16" />
          
          <div className="space-y-16 text-[#9a958e] font-light leading-loose tracking-wide italic">
            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">配送方式與時間</h2>
              <p>我們致力於為您提供全球最迅速且安全的配送服務。所有訂單均由我們的物流夥伴（如 FedEx, DHL, SF Express）負責運送。</p>
              <ul className="list-disc list-inside space-y-4 ml-4">
                <li>台灣本島：2-3 個工作天</li>
                <li>亞洲地區：3-7 個工作天</li>
                <li>其他國際地區：7-14 個工作天</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">運費計算</h2>
              <p>JC mall 提供全球免運服務。無論您的所在地點為何，只要單筆訂單滿額，即可享有免費配送服務。</p>
              <ul className="list-disc list-inside space-y-4 ml-4">
                <li>台灣訂單：全館免運</li>
                <li>國際訂單：滿 US$300 免運，未滿額將收取固定運費 US$30</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-serif text-white not-italic uppercase tracking-wider">追蹤您的訂單</h2>
              <p>在您的訂單出貨後，我們將發送一封包含追蹤號碼的電子郵件。您也可以登入會員中心，在「我的訂單」頁面查看最新的物流狀態。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
