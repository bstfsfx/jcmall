'use client';

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createOrder } from "@/app/actions/order";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Call server action to create order
    await createOrder(items, totalPrice);
    
    // Simulate payment processing delay for UX
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push('/order-success');
    }, 1000);
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-serif mb-6">Your Cart is Empty</h1>
        <Link href="/shop" className="text-accent underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-serif mb-12 text-center">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:flex-row-reverse">
        
        {/* Order Summary Sidebar */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-gray-50 p-8 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-serif mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 text-sm">
                  <div className="w-16 h-20 bg-gray-200 flex-shrink-0 relative">
                     <span className="absolute -top-2 -right-2 bg-foreground text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                       {item.quantity}
                     </span>
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.color} / {item.size}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-4 text-sm border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{step > 1 ? 'Free' : 'Calculated next step'}</span>
              </div>
            </div>
            <div className="flex justify-between border-t pt-4 font-medium text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Steps */}
        <div className="flex-grow space-y-8">
          {/* Breadcrumbs for steps */}
          <div className="flex gap-4 text-sm font-medium border-b pb-4 text-gray-400">
            <span className={step >= 1 ? "text-foreground" : ""}>1. Information</span>
            <span>&gt;</span>
            <span className={step >= 2 ? "text-foreground" : ""}>2. Shipping</span>
            <span>&gt;</span>
            <span className={step >= 3 ? "text-foreground" : ""}>3. Payment</span>
          </div>

          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <h2 className="text-2xl font-serif">Contact Information</h2>
              <div>
                <input type="email" placeholder="Email" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
              </div>
              <h2 className="text-2xl font-serif pt-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First name" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                <input type="text" placeholder="Last name" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
              </div>
              <input type="text" placeholder="Address" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="City" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                <input type="text" placeholder="State" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                <input type="text" placeholder="ZIP code" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
              </div>
              <button type="submit" className="w-full bg-foreground text-white py-4 font-semibold tracking-wider hover:bg-[#333] transition-colors mt-8">
                CONTINUE TO SHIPPING
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
               <div className="border border-gray-200 rounded p-4 text-sm space-y-4">
                 <div className="flex justify-between border-b pb-4">
                    <span className="text-gray-500">Contact</span>
                    <span>user@example.com</span>
                    <button type="button" onClick={() => setStep(1)} className="text-accent underline">Change</button>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Ship to</span>
                    <span>123 Fashion Ave, New York, NY 10001</span>
                    <button type="button" onClick={() => setStep(1)} className="text-accent underline">Change</button>
                 </div>
               </div>

               <h2 className="text-2xl font-serif pt-4">Shipping Method</h2>
               <div className="border border-gray-200 rounded p-4 flex justify-between items-center bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked readOnly className="text-foreground focus:ring-foreground" />
                    <span>Standard Shipping (3-5 Business Days)</span>
                  </div>
                  <span className="font-medium">Free</span>
               </div>

               <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-300 py-4 font-semibold hover:bg-gray-50 transition-colors">
                   BACK
                 </button>
                 <button type="submit" className="flex-1 bg-foreground text-white py-4 font-semibold tracking-wider hover:bg-[#333] transition-colors">
                   CONTINUE TO PAYMENT
                 </button>
               </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePayment} className="space-y-6">
              <h2 className="text-2xl font-serif">Payment</h2>
              <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-200 p-6 space-y-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                   <span className="font-medium">Credit Card</span>
                   <div className="flex gap-1 text-xs">
                     <span className="bg-white border px-2 py-1">Visa</span>
                     <span className="bg-white border px-2 py-1">MC</span>
                   </div>
                </div>
                <input type="text" placeholder="Card number" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                <input type="text" placeholder="Name on card" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Expiration date (MM / YY)" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                  <input type="text" placeholder="Security code" required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-foreground" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setStep(2)} disabled={isProcessing} className="flex-1 border border-gray-300 py-4 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50">
                   BACK
                 </button>
                 <button type="submit" disabled={isProcessing} className="flex-1 bg-foreground text-white py-4 font-semibold tracking-wider hover:bg-[#333] transition-colors disabled:opacity-50">
                   {isProcessing ? 'PROCESSING...' : 'PAY NOW'}
                 </button>
               </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
