'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
    tag: "2026 夏季 / 秋季",
    title: <>品味<br /><em>永恆</em>風尚</>,
    subtitle: "探索我們精心策劃的奢華時尚系列，專為追求優雅與匠心工藝的您而設計。"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80",
    tag: "極致工藝",
    title: <>精確<br /><em>美學</em>定義</>,
    subtitle: "每一道縫線、每一顆鈕扣，都經過無數次的推敲與試驗，確保經得起時間的洗鍊。"
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80",
    tag: "永續時尚",
    title: <>自然<br /><em>純粹</em>質感</>,
    subtitle: "我們致力於使用高品質、可追溯的永續材質。每一件作品都是對環境責任的體現。"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.image}
            alt={`Hero Slide ${index + 1}`}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] linear ${index === currentSlide ? 'scale-100' : 'scale-110'
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
        </div>
      ))}

      {/* Content with Parallax Effect */}
      <div
        className="relative z-10 text-center text-white px-4 transition-transform duration-300 ease-out flex flex-col items-center"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <div className="overflow-hidden">
          <p className={`text-xs tracking-[0.5em] uppercase mb-6 opacity-0 font-ui transition-all duration-800 delay-200 ${currentSlide >= 0 ? 'opacity-80 translate-y-0' : 'translate-y-full'
            }`} key={`tag-${currentSlide}`}>
            {SLIDES[currentSlide].tag}
          </p>
        </div>

        <h1
          key={`title-${currentSlide}`}
          className="text-6xl md:text-9xl font-serif mb-10 tracking-widest drop-shadow-2xl transition-all duration-800 delay-400 opacity-0 translate-y-8 animate-[fadeIn_0.8s_0.4s_forwards] hover:text-gold hover:tracking-[0.3em] hover:text-shadow-premium"
          style={{ textShadow: `${-mousePos.x / 2}px ${-mousePos.y / 2}px 30px rgba(201,169,110,0.3)` }}
        >
          {SLIDES[currentSlide].title}
        </h1>

        <p
          key={`sub-${currentSlide}`}
          className="text-sm md:text-base mb-12 max-w-xl mx-auto font-light tracking-[0.1em] leading-loose opacity-0 translate-y-8 animate-[fadeIn_0.8s_0.6s_forwards]"
        >
          {SLIDES[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 translate-y-8 animate-[fadeIn_0.8s_0.8s_forwards]">
          <Link
            href="/shop"
            className="inline-block bg-gold text-black px-12 py-5 text-xs font-bold tracking-[0.4em] hover:bg-gold-light transition-all duration-300 shadow-2xl uppercase group"
          >
            Shop Collection
          </Link>
          <Link
            href="/shop/new-arrivals"
            className="inline-block border border-white/40 text-white px-12 py-5 text-xs font-bold tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-300 uppercase backdrop-blur-sm"
          >
            Explore More <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-gold scale-150 shadow-[0_0_15px_rgba(201,169,110,0.8)]' : 'bg-white/20'
              }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 z-10 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer group">
        <span className="text-[8px] tracking-[0.4em] uppercase font-bold vertical-text mb-2">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-[scrollLine_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
