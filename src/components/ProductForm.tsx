'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { useTranslations, useLocale } from 'next-intl';

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
  const t = useTranslations('Product');
  const locale = useLocale();

  const colors = [
    { id: 'black', class: 'bg-black' },
    { id: 'gray', class: 'bg-gray-400' },
    { id: 'white', class: 'bg-white border' },
  ];

  return (
    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
      {/* Color Selection */}
      <div>
        <h3 className="text-[10px] tracking-[3px] uppercase font-bold text-white/40 mb-4">
          {locale === 'zh' ? '選擇顏色 / Color' : 'Color'}
        </h3>
        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setSelectedColor(color.id)}
              className={`w-10 h-10 rounded-full ${color.class} focus:outline-none ring-1 ring-offset-4 ring-offset-[#0a0a0a] transition-all duration-300 ${
                selectedColor === color.id ? 'ring-gold scale-110' : 'ring-white/10'
              }`}
              aria-label={`Select ${color.id}`}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">
            {locale === 'zh' ? '選擇尺寸 / Size' : 'Size'}
          </h3>
          <button type="button" className="text-[10px] tracking-[2px] uppercase font-bold text-gold/60 hover:text-gold transition-colors">
            {locale === 'zh' ? '尺寸指南' : 'Size Guide'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`border py-4 text-[10px] font-bold tracking-[2px] transition-all duration-300 rounded-sm ${
                selectedSize === size
                  ? 'border-gold bg-gold text-black shadow-lg shadow-gold/20'
                  : 'border-white/10 text-[#5a5650] hover:border-white/40 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-10 flex flex-col gap-6">
        <AddToCartButton 
          product={product} 
          selectedSize={selectedSize} 
          selectedColor={selectedColor} 
        />
        <button
          type="button"
          className="w-full border border-white/20 text-white py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
        >
          {locale === 'zh' ? '加入願望清單 / FAVORITE' : 'ADD TO FAVORITES'}
        </button>
      </div>
    </form>
  );
}
