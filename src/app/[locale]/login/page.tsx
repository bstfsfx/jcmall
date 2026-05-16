import Link from "next/link";
import { signIn } from "@/auth";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTranslations, useLocale } from "next-intl";

export default function LoginPage() {
  const locale = useLocale();
  const t = useTranslations('Nav');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: t('signIn').toUpperCase() }]} />
        
        <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-[#161616] border border-[#2a2725] p-10 md:p-16 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 font-serif text-[10rem] text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">L</div>
            
            <div className="relative z-10 text-center mb-12">
              <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{locale === 'zh' ? '歡迎回來' : 'Welcome Back'}</p>
              <h2 className="text-4xl font-serif text-white tracking-tight">{locale === 'zh' ? '會員登入' : 'Sign In'}</h2>
              <div className="w-12 h-[1px] bg-gold mx-auto mt-6 opacity-40" />
            </div>
            
            <form className="mt-8 space-y-8 relative z-10" action={async (formData) => {
              'use server';
              await signIn("credentials", formData);
            }}>
              <input type="hidden" name="redirectTo" value={`/${locale}/account`} />
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label htmlFor="email-address" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '電子郵件 / Email' : 'Email'}</label>
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
                  <label htmlFor="password" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '密碼 / Password' : 'Password'}</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10 font-ui"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-[#0a0a0a] border-[#2a2725] text-gold focus:ring-gold rounded transition-colors"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-[10px] tracking-[2px] uppercase text-[#9a958e]">
                    {locale === 'zh' ? '記住我' : 'Remember me'}
                  </label>
                </div>

                <div className="text-[10px] tracking-[2px] uppercase">
                  <a href="#" className="text-gold hover:text-white transition-colors">
                    {locale === 'zh' ? '忘記密碼？' : 'Forgot password?'}
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gold text-black py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl"
                >
                  {locale === 'zh' ? '登入系統 / SIGN IN' : 'SIGN IN'}
                </button>
              </div>
            </form>
            
            <div className="text-center mt-12 text-[10px] tracking-[2px] uppercase text-[#5a5650] relative z-10">
              {locale === 'zh' ? '還沒有帳號嗎？' : "Don't have an account?"}{" "}
              <Link href={`/${locale}/register`} className="text-white hover:text-gold transition-colors underline underline-offset-4">
                {locale === 'zh' ? '立即註冊' : 'Register Now'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
