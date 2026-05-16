'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const t = useTranslations('Nav');
  const locale = useLocale();

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
          <Breadcrumbs items={[{ label: t('contact').toUpperCase() }]} />
          <p className="text-gold text-[10px] tracking-[5px] uppercase mb-4 font-bold">{locale === 'zh' ? '與我們對話' : 'Connect with Us'}</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">{t('contact')}</h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-8 opacity-60" />
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div className="reveal visible">
              <h2 className="text-4xl font-serif font-light text-white mb-8 leading-tight">
                {locale === 'zh' ? <>我們樂意<br /><span className="text-gold">為您服務</span></> : <>We Are At<br /><span className="text-gold">Your Service</span></>}
              </h2>
              <p className="text-[#9a958e] text-lg font-light leading-relaxed mb-12 italic">
                {locale === 'zh' ? '無論您有任何問題、建議，或希望了解更多關於我們的商品與服務，都歡迎隨時與我們聯繫。' : 'Whether you have questions, suggestions, or wish to learn more about our products, we are here to assist you.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">📍</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">{locale === 'zh' ? '門市地址' : 'Boutique Address'}</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">
                    {locale === 'zh' ? '台北市信義區松仁路100號\nJC mall 旗艦店 1F' : '100 Songren Rd, Xinyi District, Taipei\nJC mall Flagship 1F'}
                  </p>
                </div>
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">📞</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">{locale === 'zh' ? '聯繫電話' : 'Phone'}</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">+886 2-2345-6789<br />{locale === 'zh' ? '週一至週五 10:00 – 19:00' : 'Mon-Fri 10:00 – 19:00'}</p>
                </div>
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">✉</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">{locale === 'zh' ? '電子郵件' : 'Email'}</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">service@jcmall.com<br />{locale === 'zh' ? '我們將於24小時內回覆' : 'We respond within 24 hours'}</p>
                </div>
                <div className="flex flex-col gap-4 group">
                  <div className="text-gold text-2xl group-hover:translate-x-2 transition-transform duration-500">📱</div>
                  <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white">{locale === 'zh' ? '社群媒體' : 'Social'}</h4>
                  <p className="text-[#5a5650] text-sm leading-loose">@jcmall.official<br />{locale === 'zh' ? '追蹤我們獲取最新動態' : 'Follow for updates'}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#161616] border border-[#2a2725] rounded-sm p-10 md:p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 font-serif text-8xl text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-all duration-700">?</div>
              
              {status === 'success' ? (
                <div className="text-center py-20 flex flex-col items-center gap-6 animate-[fadeIn_0.6s_forwards]">
                  <div className="text-6xl text-gold">✓</div>
                  <h3 className="text-2xl font-serif text-white">{locale === 'zh' ? '訊息已送出！' : 'Message Sent!'}</h3>
                  <p className="text-[#9a958e] font-light">{locale === 'zh' ? '感謝您的來信，我們的團隊將盡快與您聯繫。' : 'Thank you for contacting us. Our team will get back to you shortly.'}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-gold text-[10px] tracking-[4px] uppercase font-bold border-b border-gold/30 pb-2 hover:text-white transition-colors"
                  >
                    {locale === 'zh' ? '再傳送一則訊息' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '姓名' : 'Name'} <span className="text-gold">*</span></label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10"
                        placeholder={locale === 'zh' ? "您的姓名" : "Your Name"}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="email" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '電子郵件' : 'Email'} <span className="text-gold">*</span></label>
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
                      <label htmlFor="phone" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '聯繫電話' : 'Phone'}</label>
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
                      <label htmlFor="subject" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '主題' : 'Subject'}</label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white appearance-none"
                      >
                        <option value="" className="bg-[#161616]">{locale === 'zh' ? '請選擇主題' : 'Select Subject'}</option>
                        <option value="order" className="bg-[#161616]">{locale === 'zh' ? '訂單查詢' : 'Order Inquiry'}</option>
                        <option value="product" className="bg-[#161616]">{locale === 'zh' ? '商品諮詢' : 'Product Inquiry'}</option>
                        <option value="return" className="bg-[#161616]">{locale === 'zh' ? '退換貨' : 'Returns'}</option>
                        <option value="other" className="bg-[#161616]">{locale === 'zh' ? '其他' : 'Other'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label htmlFor="message" className="text-[10px] tracking-[3px] uppercase font-bold text-white/40">{locale === 'zh' ? '訊息內容' : 'Message'} <span className="text-gold">*</span></label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/10 resize-none"
                      placeholder={locale === 'zh' ? "請輸入您的訊息..." : "How can we help?"}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gold text-black py-5 text-[10px] font-bold tracking-[4px] uppercase hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                  >
                    {status === 'submitting' ? (
                      <span className="animate-pulse">{locale === 'zh' ? '傳送中...' : 'SENDING...'}</span>
                    ) : (
                      <>
                        {locale === 'zh' ? '傳送訊息' : 'SEND MESSAGE'} <span className="group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
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
