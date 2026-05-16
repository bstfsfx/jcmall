'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export default function CartIcon() {
  const { totalItems } = useCart();
  
  return (
    <Link href="/cart" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
      Cart
      <span className="bg-foreground text-background text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    </Link>
  );
}
