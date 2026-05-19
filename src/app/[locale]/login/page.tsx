import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
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
            
            <LoginForm locale={locale} />
            
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