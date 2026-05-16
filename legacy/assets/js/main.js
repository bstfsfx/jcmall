/**
 * JC mall - Main JavaScript
 * Handles animations, navbar, interactions
 */

// ========== PRELOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 1000); // 1 Second Brand Animation
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// Close menu on link click
document.querySelectorAll('.navbar-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});



// ========== REAL CART LOGIC ==========
function addToCart(productId, quantity = 1) {
  const formData = new FormData();
  formData.append('action', 'add');
  formData.append('product_id', productId);
  formData.append('quantity', quantity);

  fetch('cart_api.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      updateCartCount(); // 更新導覽列數字
      showToast('已加入購物車 ✓');
    } else {
      showToast('加入失敗：' + (data.message || '請重試'));
    }
  })
  .catch(err => {
    console.error('Cart Error:', err);
    showToast('連線錯誤，請檢查網路');
  });
}

function updateCartCount() {
  fetch('cart_api.php?action=get')
  .then(res => res.json())
  .then(data => {
    const badge = document.querySelector('.cart-count');
    if (badge) {
      const count = data.items ? data.items.reduce((sum, item) => sum + parseInt(item.quantity), 0) : 0;
      badge.textContent = count;
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => badge.style.transform = '', 300);
    }
  });
}

// 頁面載入時同步購物車數字
window.addEventListener('DOMContentLoaded', updateCartCount);

// ========== TOAST NOTIFICATION ==========
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    background: 'rgba(22,22,22,0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid #2a2725',
    color: '#f5f0eb',
    padding: '16px 28px',
    borderRadius: '8px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: '500',
    letterSpacing: '1px',
    zIndex: '9999',
    transform: 'translateY(20px)',
    opacity: '0',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
  });
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ========== NEWSLETTER ==========
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail');
  if (email.value) {
    showToast('歡迎加入 JC mall 菁英圈！✉');
    email.value = '';
  }
}

// ========== PARALLAX HERO (subtle) ==========
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg img');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `scale(${1.05 + window.scrollY * 0.0001})`;
  }
});

// ========== HERO SLIDER ==========
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const heroText = document.querySelector('.hero-content');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  
  // 重新觸發文字動畫
  if (heroText) {
    heroText.classList.remove('animate');
    void heroText.offsetWidth; // 強制重繪
    heroText.classList.add('animate');
  }

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

if (slides.length > 0) {
  // 初始化第一張
  setTimeout(() => showSlide(0), 500);
  
  // 自動輪播
  slideInterval = setInterval(nextSlide, 5000);
  
  // 點擊控制
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(idx);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });
}

// ========== HERO INTERACTION (MOUSE PARALLAX) ==========
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // 計算偏移量 (細微的視差效果)
    const moveX = (clientX - innerWidth / 2) / 30;
    const moveY = (clientY - innerHeight / 2) / 30;
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // 標題內部的細微傾斜
    const title = heroContent.querySelector('.hero-title');
    if (title) {
      title.style.textShadow = `${-moveX / 2}px ${-moveY / 2}px 20px rgba(201,169,110,0.2)`;
    }
  });

  // 滑鼠離開後復位
  hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = `translate(0, 0)`;
    const title = heroContent.querySelector('.hero-title');
    if (title) title.style.textShadow = '';
  });
}

console.log('%c✦ JC MALL %c 精品時尚與生活風格', 
  'color:#c9a96e;font-size:20px;font-weight:300;letter-spacing:6px;',
  'color:#9a958e;font-size:12px;font-weight:400;'
);
