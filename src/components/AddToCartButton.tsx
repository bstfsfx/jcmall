'use client';

import { useCart } from './CartProvider';
import { useState } from 'react';

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
      className={`w-full py-4 font-semibold tracking-wider transition-colors mb-4 ${
        added ? 'bg-green-600 text-white' : 'bg-foreground text-white hover:bg-[#333]'
      }`}
    >
      {added ? 'ADDED TO CART' : 'ADD TO CART'}
    </button>
  );
}
