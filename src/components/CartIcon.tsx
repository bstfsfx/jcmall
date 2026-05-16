'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { ShoppingBag } from 'lucide-react';

export default function CartIcon() {
  const { totalItems } = useCart();
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsPopping(true);
      const timer = setTimeout(() => setIsPopping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);
  
  return (
    <Link href="/cart" className="relative group p-2">
      <ShoppingBag className="w-5 h-5 text-white group-hover:text-gold transition-colors duration-300" />
      <span 
        className={`absolute -top-1 -right-1 bg-gold text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all duration-300 ${
          isPopping ? 'scale-150 bg-white' : 'scale-100'
        }`}
      >
        {totalItems}
      </span>
    </Link>
  );
}
