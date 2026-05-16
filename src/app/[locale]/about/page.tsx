'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function AboutPage() {
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1558603668-6570496b66f8?w=1920&q=80" 
            alt="About JC Mall" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center container px-4">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-6">{locale === 'zh' ? '在指尖與布料之間尋找靈魂' : 'The Soul Behind the Stitch'}</p>
          <h1 className="font-serif text-6xl md:text-9xl font-light tracking-[15px] text-white uppercase">JC MALL</h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-8 opacity-60" />
        </div>
      </section>

      {/* Origin Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1590553063947-1c9f708238d3?w=800&q=80" 
                className="w-full rounded-sm shadow-[20px_20px_0_rgba(201,169,110,0.05)] transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"
              />
              <p className="absolute -bottom-8 -right-8 font-serif text-8xl text-gold/5 pointer-events-none">1995</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gold text-[10px] tracking-[4px] uppercase mb-4">{locale === 'zh' ? '起源' : 'Origins'}</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-10 text-white">
                {locale === 'zh' ? <>在指尖與布料之間<br /><span className="text-gold">尋找靈魂的溫度</span></> : <>Finding the Heartbeat<br /><span className="text-gold">Within the Fabric</span></>}
              </h2>
              <div className="text-[#9a958e] text-lg leading-loose tracking-wide space-y-8 font-light">
                <p>
                  {locale === 'zh' 
                    ? 'JC mall 的故事並非始於閃耀的伸展台，而是源於一間充滿著老舊裁縫機聲、滿地碎布的小工坊。那時的 JC mall 相信，每一塊布料都有自己的靈魂，而裁縫師的使命，就是透過雙手的溫度，賦予它們生命。'
                    : 'The JC mall story didn\'t begin on a glittering runway, but in a small workshop filled with the sound of antique sewing machines and fragments of silk. We believed that every fabric has a soul, and a tailor\'s mission is to breathe life into it through the warmth of their hands.'}
                </p>
                <p>
                  {locale === 'zh'
                    ? '「衣服不應只是穿在身上的布料，而是一段記憶、一種心情，更是自我價值的延伸。」這是 JC mall 最初的堅持，也是品牌至今不變的基石。'
                    : '"Garments should not merely be fabric on the body, but a memory, a mood, and an extension of self-worth." This was the original conviction of JC mall, and remains the cornerstone of our brand today.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-48 bg-[#050505] text-center border-y border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-gold text-4xl mb-12 block opacity-30 italic">"</span>
          <h3 className="text-2xl md:text-3xl font-serif font-light italic text-white leading-relaxed">
            {locale === 'zh' 
              ? '「我不追求轉瞬即逝的流行，我只在意能否讓你在穿上它的那一刻，感受到前所未有的自信與寧靜。」'
              : '"I do not chase fleeting trends; I only care if, at the moment you wear it, you feel an unprecedented sense of confidence and serenity."'}
          </h3>
          <p className="mt-10 tracking-[5px] text-gold uppercase text-[10px] font-bold">─ JC MALL</p>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col items-start lg:order-1 order-2">
              <p className="text-gold text-[10px] tracking-[4px] uppercase mb-4">{locale === 'zh' ? '極致工藝' : 'Exquisite Craft'}</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-10 text-white">
                {locale === 'zh' ? <>拒絕妥協的<br /><span className="text-gold">精確美學</span></> : <>Uncompromising<br /><span className="text-gold">Precision Aesthetics</span></>}
              </h2>
              <div className="text-[#9a958e] text-lg leading-loose tracking-wide space-y-8 font-light">
                <p>
                  {locale === 'zh'
                    ? '在 JC mall 的世界裡，一公釐的誤差都是對品味的輕視。我們橫跨半個地球尋找最珍稀的羊絨，並與傳承數代的義大利工坊合作。每一道縫線、每一顆鈕扣，都經過無數次的推敲與試驗。'
                    : 'In the world of JC mall, a single millimeter of error is a slight against taste. We travel across the globe to find the rarest cashmere and collaborate with Italian workshops spanning generations. Every stitch and button is the result of countless refinements.'}
                </p>
                <p>
                  {locale === 'zh'
                    ? '這種近乎瘋狂的偏執，是為了確保每一件掛上「JC mall」標誌的服飾，都能經得起時間的洗鍊，成為陪伴您一生的經典。'
                    : 'This near-obsessive persistence is to ensure that every garment bearing the "JC mall" mark can withstand the test of time and become a classic that accompanies you for a lifetime.'}
                </p>
              </div>
            </div>
            <div className="lg:order-2 order-1 relative group">
              <img 
                src="https://images.unsplash.com/photo-1558603668-6570496b66f8?w=800&q=80" 
                className="w-full rounded-sm shadow-[-20px_20px_0_rgba(201,169,110,0.05)] transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-48 bg-[#0a0a0a] text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-gold text-[10px] tracking-[4px] uppercase mb-6">{locale === 'zh' ? '未來願景' : 'Our Vision'}</p>
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-12 text-white">
            {locale === 'zh' ? <>與您一同書寫<br />風尚的新篇章</> : <>Writing the Next Chapter<br />of Elegance Together</>}
          </h2>
          <div className="text-[#9a958e] text-lg md:text-xl leading-loose tracking-wider space-y-10 font-light italic">
            <p>
              {locale === 'zh'
                ? 'JC mall 品牌不僅僅是關於服裝，它是一種生活方式，一種對美的無盡追求。未來，我們將繼續堅持環保與永續工藝，讓美不僅存在於當下，更綻放於未來。'
                : 'The JC mall brand is more than just clothing; it is a lifestyle and an endless pursuit of beauty. Moving forward, we will continue our commitment to environmental responsibility and sustainable craft.'}
            </p>
            <p>
              {locale === 'zh'
                ? '感謝您成為 JC mall 故事的一部分。在未來的每一場雨、每一縷陽光中，JC mall 都將溫柔地包裹著您，陪伴您走向每一個重要時刻。'
                : 'Thank you for being part of the JC mall story. In every future rain and every ray of sunshine, JC mall will gently envelop you, accompanying you through every significant moment.'}
            </p>
          </div>
          <div className="mt-20">
            <Link 
              href={`/${locale}/shop`}
              className="inline-block bg-gold text-black px-16 py-6 text-[10px] font-bold tracking-[5px] uppercase hover:bg-gold-light transition-all duration-300"
            >
              {locale === 'zh' ? '探索最新系列' : 'Explore Latest Collections'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
