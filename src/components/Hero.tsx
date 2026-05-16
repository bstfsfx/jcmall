'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) / 40;
      const y = (clientY - innerHeight / 2) / 40;
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-gray-100 overflow-hidden"
    >
      {/* Background Image with subtle zoom/scale */}
      <div className="absolute inset-0 z-0 scale-110 transition-transform duration-[10000ms] ease-out hover:scale-125">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" 
          alt="JC mall Fashion Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content with Parallax Effect */}
      <div 
        className="relative z-10 text-center text-white px-4 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <p className="text-[10px] tracking-[0.6em] uppercase mb-6 opacity-80 font-medium reveal">
          2026 Summer / Autumn Collection
        </p>
        <h1 
          className="text-6xl md:text-9xl font-serif mb-10 tracking-widest drop-shadow-2xl transition-all duration-300"
          style={{ textShadow: `${-mousePos.x / 2}px ${-mousePos.y / 2}px 30px rgba(201,169,110,0.3)` }}
        >
          品味<em>永恆</em>風尚
        </h1>
        <p className="text-sm md:text-base mb-12 max-w-xl mx-auto font-light tracking-[0.1em] leading-loose opacity-90 drop-shadow-sm">
          Discover our curated collection of luxury fashion, designed for those who appreciate elegance and craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/shop"
            className="inline-block bg-white text-foreground px-12 py-5 text-[10px] font-bold tracking-[0.4em] hover:bg-gray-100 transition-all duration-300 shadow-2xl uppercase"
          >
            Shop Collection
          </Link>
          <Link
            href="/shop/new-arrivals"
            className="inline-block border border-white/40 text-white px-12 py-5 text-[10px] font-bold tracking-[0.4em] hover:bg-white hover:text-foreground transition-all duration-300 uppercase backdrop-blur-sm"
          >
            Explore More
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
        <span className="text-[8px] tracking-[0.4em] uppercase font-bold vertical-text">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
