import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getTranslations, getLocale } from "next-intl/server";

export default async function AccountPage() {
  const session = await auth();
  const locale = await getLocale();
  const t = await getTranslations('Nav');

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <Breadcrumbs items={[{ label: t('account').toUpperCase() }]} />
        
        <div className="mb-20 reveal visible">
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{locale === 'zh' ? '個人中心' : 'Personal Dashboard'}</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">{locale === 'zh' ? '會員中心' : 'Account'}</h1>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 pb-32">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-12">
            <div className="bg-[#161616] border border-[#2a2725] p-10 rounded-sm group relative overflow-hidden">
               <div className="absolute -top-4 -right-4 font-serif text-6xl text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">A</div>
               <p className="text-white font-serif text-2xl mb-2">{session.user.name}</p>
               <p className="text-[#5a5650] text-[10px] tracking-[2px] uppercase">{session.user.email}</p>
            </div>
            
            <nav className="flex flex-col gap-4 text-[10px] tracking-[3px] font-bold uppercase">
              <Link href={`/${locale}/account`} className="px-8 py-5 bg-gold text-black rounded-sm shadow-2xl">
                {locale === 'zh' ? '基本資料 / Profile' : 'Profile'}
              </Link>
              <Link href={`/${locale}/account/orders`} className="px-8 py-5 bg-[#111111] border border-[#2a2725] text-[#9a958e] hover:text-white hover:border-white/20 transition-all rounded-sm">
                {locale === 'zh' ? '我的訂單 / Orders' : 'Orders'}
              </Link>
              <Link href={`/${locale}/account/settings`} className="px-8 py-5 bg-[#111111] border border-[#2a2725] text-[#9a958e] hover:text-white hover:border-white/20 transition-all rounded-sm">
                {locale === 'zh' ? '帳號設定 / Settings' : 'Settings'}
              </Link>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: `/${locale}` });
              }}>
                <button type="submit" className="w-full text-left px-8 py-5 bg-[#111111] border border-[#2a2725] text-[#9a958e] hover:text-white hover:border-white/20 transition-all rounded-sm">
                  {locale === 'zh' ? '登出系統 / Logout' : 'Logout'}
                </button>
              </form>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            <div className="bg-[#111111] border border-[#2a2725] p-12 rounded-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-12 font-serif text-8xl text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">P</div>
              <h2 className="text-3xl font-serif text-white mb-10 pb-6 border-b border-white/5">{locale === 'zh' ? '基本資料 / Profile' : 'Profile Settings'}</h2>
              
              <form className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '真實姓名 / Full Name' : 'Full Name'}</label>
                    <input
                      type="text"
                      defaultValue={session.user.name ?? ""}
                      className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white font-ui"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '電子郵件 / Email' : 'Email'}</label>
                    <input
                      type="email"
                      defaultValue={session.user.email ?? ""}
                      readOnly
                      className="bg-transparent border-b border-white/5 py-3 text-[#5a5650] cursor-not-allowed font-ui"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-[#161616] border border-[#2a2725] text-white px-12 py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold hover:text-black hover:border-gold transition-all duration-500 shadow-xl"
                  >
                    {locale === 'zh' ? '儲存變更 / SAVE CHANGES' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Orders Snapshot */}
            <div className="bg-[#111111] border border-[#2a2725] p-12 rounded-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-12 font-serif text-8xl text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">O</div>
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <h2 className="text-3xl font-serif text-white">{locale === 'zh' ? '近期訂單 / Recent Orders' : 'Recent Orders'}</h2>
                <Link href={`/${locale}/account/orders`} className="text-gold text-[10px] tracking-[3px] uppercase font-bold hover:text-white transition-colors">{locale === 'zh' ? '查看全部 →' : 'View All →'}</Link>
              </div>
              
              <div className="py-20 text-center border border-dashed border-white/10 rounded-sm">
                <p className="text-[#5a5650] italic font-light mb-8">{locale === 'zh' ? '目前尚無訂單紀錄。' : 'No order history available.'}</p>
                <Link href={`/${locale}/shop`} className="text-gold text-[10px] tracking-[4px] uppercase font-bold border-b border-gold/30 pb-2 hover:text-white transition-colors">
                  {locale === 'zh' ? '開始購物 / START SHOPPING' : 'Start Shopping'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
