import Link from "next/link";
import { registerUser } from "@/actions/auth";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: 'REGISTER' }]} />
        
        <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-[#161616] border border-[#2a2725] p-10 md:p-16 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 font-serif text-[10rem] text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">R</div>
            
            <div className="relative z-10 text-center mb-12">
              <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">Join the Elite</p>
              <h2 className="text-4xl font-serif text-white tracking-tight">建立帳號</h2>
              <div className="w-12 h-[1px] bg-gold mx-auto mt-6 opacity-40" />
            </div>
            
            <form className="mt-8 space-y-8 relative z-10" action={registerUser}>
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">真實姓名 / Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10 font-ui"
                    placeholder="您的姓名"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email-address" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">電子郵件 / Email</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10 font-ui"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="password" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">密碼 / Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10 font-ui"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="text-[9px] text-[#5a5650] leading-relaxed tracking-wider">
                註冊即表示您同意我們的 <Link href="/terms" className="text-white hover:text-gold transition-colors">服務條款</Link> 與 <Link href="/privacy" className="text-white hover:text-gold transition-colors">隱私權政策</Link>。
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gold text-black py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl"
                >
                  建立帳號 / CREATE ACCOUNT
                </button>
              </div>
            </form>
            
            <div className="text-center mt-12 text-[10px] tracking-[2px] uppercase text-[#5a5650] relative z-10">
              已經有帳號了？{" "}
              <Link href="/login" className="text-white hover:text-gold transition-colors underline underline-offset-4">
                立即登入
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
