'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartIcon from '@/components/CartIcon';

interface HeaderProps {
  session: any;
}

export default function Header({ session }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SHOP', href: '/shop' },
    { name: 'WOMEN', href: '/shop/women' },
    { name: 'MEN', href: '/shop/men' },
    { name: 'ACCESSORIES', href: '/shop/accessories' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-gray-200 py-3 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className={`text-2xl font-serif font-bold tracking-[0.3em] transition-colors ${
            !isScrolled && pathname === '/' ? 'text-white' : 'text-foreground'
          }`}
        >
          JC MALL
        </Link>
        
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={`text-[10px] tracking-[0.3em] font-semibold transition-all hover:text-accent relative group ${
                !isScrolled && pathname === '/' ? 'text-white/90' : 'text-foreground/80'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full`} />
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-6">
          {session?.user ? (
            <Link 
              href="/account" 
              className={`text-[10px] tracking-[0.2em] font-semibold transition-colors hover:text-accent ${
                !isScrolled && pathname === '/' ? 'text-white' : 'text-foreground'
              }`}
            >
              {session.user.name?.split(" ")[0]?.toUpperCase() ?? "ACCOUNT"}
            </Link>
          ) : (
            <Link 
              href="/login" 
              className={`text-[10px] tracking-[0.2em] font-semibold transition-colors hover:text-accent ${
                !isScrolled && pathname === '/' ? 'text-white' : 'text-foreground'
              }`}
            >
              SIGN IN
            </Link>
          )}
          <div className={`${!isScrolled && pathname === '/' ? 'text-white' : 'text-foreground'}`}>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
