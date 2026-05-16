'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Mock submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* Page Hero */}
      <section className="bg-[#111111] border-b border-white/5 py-24">
        <div className="container mx-auto px-6 text-center">
          <Breadcrumbs items={[{ label: 'CONTACT US' }]} />
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">與我們對話</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">聯繫我們</h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-8 opacity-60" />
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="reveal visible">
              <h2 className="text-4xl font-serif font-light text-white mb-8 leading-tight">
                我們樂意<br />
                <span className="text-gold">為您服務</span>
              </h2>
              <p className="text-[#9a958e] text-lg font-light leading-relaxed mb-12 italic">
                無論您有任何問題、建議，或希望了解更多關於我們的商品與服務，都歡迎隨時與我們聯繫。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">📍</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">門市地址</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">台北市信義區松仁路100號<br />JC mall 旗艦店 1F</p>
                </div>
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">📞</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">聯繫電話</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">+886 2-2345-6789<br />週一至週五 10:00 – 19:00</p>
                </div>
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">✉</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">電子郵件</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">service@jcmall.com<br />我們將於24小時內回覆</p>
                </div>
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">📱</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">社群媒體</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">@jcmall.official<br />追蹤我們獲取最新動態</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#161616] border border-[#2a2725] rounded-sm p-10 md:p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 font-serif text-8xl text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">?</div>
              
              {status === 'success' ? (
                <div className="text-center py-20 flex flex-col items-center gap-6 animate-[fadeIn_0.6s_forwards]">
                  <div className="text-6xl text-gold">✓</div>
                  <h3 className="text-2xl font-serif text-white">訊息已送出！</h3>
                  <p className="text-[#9a958e] font-light">感謝您的來信，我們的團隊將盡快與您聯繫。</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-gold text-[10px] tracking-[4px] uppercase font-bold border-b border-gold/30 pb-2 hover:text-white transition-colors"
                  >
                    再傳送一則訊息
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">姓名 <span className="text-gold">*</span></label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10"
                        placeholder="您的姓名"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="email" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">電子郵件 <span className="text-gold">*</span></label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="phone" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">聯繫電話</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10"
                        placeholder="09xx-xxx-xxx"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="subject" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">主題</label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white appearance-none"
                      >
                        <option value="" className="bg-[#161616]">請選擇主題</option>
                        <option value="order" className="bg-[#161616]">訂單查詢</option>
                        <option value="product" className="bg-[#161616]">商品諮詢</option>
                        <option value="return" className="bg-[#161616]">退換貨</option>
                        <option value="other" className="bg-[#161616]">其他</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label htmlFor="message" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">訊息內容 <span className="text-gold">*</span></label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10 resize-none"
                      placeholder="請輸入您的訊息..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gold text-black py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                  >
                    {status === 'submitting' ? (
                      <span className="animate-pulse">傳送中...</span>
                    ) : (
                      <>
                        傳送訊息 <span className="group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
