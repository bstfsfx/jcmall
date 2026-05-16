'use client';

import { useTranslations } from 'next-intl';

export default function Marquee() {
  const t = useTranslations('Home.marquee');
  
  const ITEMS = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4')
  ];

  return (
    <div className="bg-[#111111] border-y border-[#2a2725] py-4 overflow-hidden relative">
      <div className="flex gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, index) => (
          <div key={index} className="flex items-center gap-5 text-[10px] tracking-[4px] font-ui uppercase text-[#5a5650]">
            <span className="w-1 h-1 rounded-full bg-[#c9a96e]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
