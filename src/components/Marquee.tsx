'use client';

const ITEMS = [
  "全球免運配送",
  "頂級精選材質",
  "30天輕鬆退換",
  "會員專屬優惠",
  "永續時尚理念",
  "匠心手工製作"
];

export default function Marquee() {
  return (
    <div className="bg-[#111111] border-y border-[#2a2725] py-4 overflow-hidden relative">
      <div className="flex gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
        {[...ITEMS, ...ITEMS].map((item, index) => (
          <div key={index} className="flex items-center gap-5 text-[10px] tracking-[4px] font-ui uppercase text-[#5a5650]">
            <span className="w-1 h-1 rounded-full bg-[#c9a96e]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
