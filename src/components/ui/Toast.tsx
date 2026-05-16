'use client';

import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`fixed bottom-10 right-10 z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="bg-foreground/95 backdrop-blur-xl border border-white/10 text-background px-8 py-5 shadow-2xl flex items-center gap-4">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <p className="text-[10px] tracking-[0.2em] font-bold uppercase">{message}</p>
        <button 
          onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}
          className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
