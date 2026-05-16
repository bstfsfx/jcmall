import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-4xl font-serif mb-4 text-foreground">Thank you for your purchase!</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Your order <span className="font-semibold">#JC{Math.floor(Math.random() * 100000)}</span> has been confirmed. 
        We'll send you an email with the tracking information once your item has shipped.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/shop" 
          className="bg-foreground text-white px-8 py-4 font-semibold tracking-wider hover:bg-[#333] transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
        <Link 
          href="/account" 
          className="border border-foreground text-foreground px-8 py-4 font-semibold tracking-wider hover:bg-gray-50 transition-colors"
        >
          VIEW ORDER HISTORY
        </Link>
      </div>
    </div>
  );
}
