'use client';

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-serif mb-12">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="bg-white p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
          <Link href="/shop" className="inline-block bg-foreground text-white px-8 py-3 font-semibold tracking-wider hover:bg-[#333] transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-grow space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b pb-8">
                <div className="w-24 h-32 bg-gray-100 relative flex-shrink-0">
                  {/* Placeholder for item image */}
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">Image</div>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <Link href={`/product/${item.productId}`} className="font-serif text-lg hover:underline">
                        {item.name}
                      </Link>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Color: {item.color}</p>
                    <p className="text-sm text-gray-500 mb-4">Size: {item.size}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex border border-gray-300">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        readOnly 
                        className="w-12 text-center text-sm border-x border-gray-300 focus:outline-none"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-gray-500 hover:text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-gray-50 p-8 border border-gray-100">
              <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between border-t pt-4 font-medium text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link 
                href="/checkout" 
                className="block w-full bg-foreground text-white text-center py-4 font-semibold tracking-wider hover:bg-[#333] transition-colors"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
