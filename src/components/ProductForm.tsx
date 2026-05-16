'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

type ProductFormProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function ProductForm({ product }: ProductFormProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');

  const colors = [
    { id: 'black', class: 'bg-black' },
    { id: 'gray', class: 'bg-gray-400' },
    { id: 'white', class: 'bg-white border' },
  ];

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium mb-3">Color</h3>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setSelectedColor(color.id)}
              className={`w-10 h-10 rounded-full ${color.class} focus:outline-none ring-2 ring-offset-2 transition-all ${
                selectedColor === color.id ? 'ring-accent' : 'ring-transparent'
              }`}
              aria-label={`Select ${color.id}`}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium">Size</h3>
          <button type="button" className="text-sm text-gray-500 underline">Size Guide</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`border py-3 text-sm transition-colors ${
                selectedSize === size
                  ? 'border-foreground bg-foreground text-white'
                  : 'border-gray-300 hover:border-foreground'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6">
        <AddToCartButton 
          product={product} 
          selectedSize={selectedSize} 
          selectedColor={selectedColor} 
        />
        <button
          type="button"
          className="w-full border border-foreground text-foreground py-4 font-semibold tracking-wider hover:bg-gray-50 transition-colors"
        >
          FAVORITE
        </button>
      </div>
    </form>
  );
}
