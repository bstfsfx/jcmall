'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CartIcon from '@/components/CartIcon';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  session: any;
  locale: string;
}

export default function Header({ session, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Nav');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('shop').toUpperCase(), href: `/${locale}/shop` },
    { name: t('women').toUpperCase(), href: `/${locale}/shop/women` },
    { name: t('men').toUpperCase(), href: `/${locale}/shop/men` },
    { name: t('accessories').toUpperCase(), href: `/${locale}/shop/accessories` },
    { name: t('about').toUpperCase(), href: `/${locale}/about` },
    { name: t('contact').toUpperCase(), href: `/${locale}/contact` },
  ];

  const switchLanguage = (newLocale: string) => {
    // Current pathname example: /en/shop or /zh/shop
    // Replace the first part of the path with the new locale
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between">
        <Link 
          href={`/${locale}`} 
          className="text-2xl md:text-3xl font-serif font-light tracking-[0.4em] transition-all hover:text-gold text-white"
        >
          JC MALL
        </Link>
        
        <nav className="hidden lg:flex gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={`text-[10px] tracking-[0.4em] font-ui font-bold transition-all hover:text-white relative group ${
                pathname === link.href ? 'text-gold' : 'text-[#9a958e]'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full ${
                pathname === link.href ? 'w-full' : ''
              }`} />
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-4 border-r border-white/10 pr-6 mr-2">
            <button 
              onClick={() => switchLanguage('en')}
              className={`text-[10px] tracking-[2px] font-bold transition-all ${locale === 'en' ? 'text-gold' : 'text-[#5a5650] hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => switchLanguage('zh')}
              className={`text-[10px] tracking-[2px] font-bold transition-all ${locale === 'zh' ? 'text-gold' : 'text-[#5a5650] hover:text-white'}`}
            >
              ZH
            </button>
          </div>

          <Link href={`/${locale}/shop`} className="text-white hover:text-gold transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </Link>
          {session?.user ? (
            <Link 
              href={`/${locale}/account`} 
              className="text-[10px] tracking-[0.3em] font-ui font-bold text-[#9a958e] hover:text-white transition-colors"
            >
              {session.user.name?.split(" ")[0]?.toUpperCase() ?? t('account').toUpperCase()}
            </Link>
          ) : (
            <Link 
              href={`/${locale}/login`} 
              className="text-[10px] tracking-[0.3em] font-ui font-bold text-[#9a958e] hover:text-white transition-colors"
            >
              {t('signIn').toUpperCase()}
            </Link>
          )}
          <div className="text-white hover:text-gold transition-colors">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
