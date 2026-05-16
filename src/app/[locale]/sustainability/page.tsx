import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function SustainabilityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'SUSTAINABILITY' }]} />
        
        <div className="mb-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Ethical Excellence</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight leading-tight">永續發展</h1>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-12 items-center reveal visible">
          <div className="aspect-square bg-[#111111] relative rounded-sm overflow-hidden border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200" 
              alt="Sustainability" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl font-serif text-white italic">對地球的承諾</h2>
            <p className="text-[#9a958e] text-lg font-light leading-loose tracking-wide italic">
              在 JC mall，我們相信時尚不應以犧牲地球為代價。我們致力於減少碳足跡，並確保我們的供應鏈在各個層面上都是透明且符合倫理的。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-4">
                <h4 className="text-gold text-[10px] tracking-[3px] uppercase font-bold">100% 有機材質</h4>
                <p className="text-[#5a5650] text-sm leading-relaxed">我們僅選用經過認證的有機棉、永續羊毛與環保再生纖維。</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-gold text-[10px] tracking-[3px] uppercase font-bold">公平貿易工廠</h4>
                <p className="text-[#5a5650] text-sm leading-relaxed">確保所有參與製作的工匠都享有公平的薪資與安全的工作環境。</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-32 grid grid-cols-1 md:grid-cols-3 gap-16 reveal visible border-t border-white/5 mt-20">
          <div className="text-center space-y-6">
            <div className="text-4xl text-gold/30 font-serif italic">01</div>
            <h3 className="text-white font-serif text-2xl tracking-wide">意識採購</h3>
            <p className="text-[#9a958e] font-light leading-relaxed text-sm italic">每一寸布料都經過嚴格挑選，確保其來源可追溯且對環境友善。</p>
          </div>
          <div className="text-center space-y-6">
            <div className="text-4xl text-gold/30 font-serif italic">02</div>
            <h3 className="text-white font-serif text-2xl tracking-wide">精簡包裝</h3>
            <p className="text-[#9a958e] font-light leading-relaxed text-sm italic">我們使用 100% 可回收與可生物分解的包裝材料，將廢棄物降至最低。</p>
          </div>
          <div className="text-center space-y-6">
            <div className="text-4xl text-gold/30 font-serif italic">03</div>
            <h3 className="text-white font-serif text-2xl tracking-wide">永恆設計</h3>
            <p className="text-[#9a958e] font-light leading-relaxed text-sm italic">透過打造高品質、超越潮流的設計，我們鼓勵客戶減少過度消費。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
