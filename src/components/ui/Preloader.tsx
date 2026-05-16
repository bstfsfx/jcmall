'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Match legacy 1s + some buffer

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-800 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none -translate-y-full'
      }`}
    >
      <div className="text-center relative">
        <div 
          className="font-serif text-4xl md:text-6xl text-[#c9a96e] uppercase tracking-[25px] mr-[-25px] opacity-0 animate-[brandReveal_0.6s_cubic-bezier(0.19,1,0.22,1)_forwards]"
        >
          JC mall
        </div>
        <div 
          className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mt-5 mx-auto opacity-0 animate-[lineExpand_0.7s_0.1s_cubic-bezier(0.19,1,0.22,1)_forwards]"
        />
        <div 
          className="mt-4 font-sans text-[10px] tracking-[5px] uppercase text-[#5a5650] opacity-0 animate-[fadeIn_0.4s_0.5s_forwards]"
        >
          Timeless Elegance & Sustainable Craft
        </div>
      </div>
    </div>
  );
}
