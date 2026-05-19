'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm({ locale }: { locale: string }) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      window.location.href = `/${locale}/account`;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8 relative z-10">
      <input type="hidden" name="redirectTo" value={`/${locale}/account`} />
      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="email-address" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">
            {locale === 'zh' ? '電子郵件 / Email' : 'Email'}
          </label>
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
          <label htmlFor="password" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">
            {locale === 'zh' ? '密碼 / Password' : 'Password'}
          </label>
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

      {error && (
        <div className="text-red-500 text-[10px] tracking-[2px] uppercase text-center">
          {error}
        </div>
      )}

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
          disabled={loading}
          className="w-full bg-gold text-black py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 shadow-2xl disabled:opacity-50"
        >
          {loading ? '...' : (locale === 'zh' ? '登入系統 / SIGN IN' : 'SIGN IN')}
        </button>
      </div>
    </form>
  );
}