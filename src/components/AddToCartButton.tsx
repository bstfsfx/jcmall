'use client';

import { useCart } from './CartProvider';
import { useState } from 'react';
import { useLocale } from 'next-intl';

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  selectedSize: string;
  selectedColor: string;
};

export default function AddToCartButton({ product, selectedSize, selectedColor }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const locale = useLocale();

  const handleAdd = () => {
    // Basic variant ID generation for cart
    const variantId = `${product.id}-${selectedColor}-${selectedSize}`;
    
    addItem({
      id: variantId,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full py-6 text-[10px] font-bold tracking-[4px] uppercase transition-all duration-500 rounded-sm shadow-2xl ${
        added 
          ? 'bg-green-600 text-white' 
          : 'bg-gold text-black hover:bg-gold-light'
      }`}
    >
      {added 
        ? (locale === 'zh' ? '已加入購物車 / ADDED' : 'ADDED TO CART') 
        : (locale === 'zh' ? '加入購物車 / ADD TO CART' : 'ADD TO CART')}
    </button>
  );
}
