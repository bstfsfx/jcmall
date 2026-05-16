<?php
$pageTitle = '首頁 — JC mall 精品時尚';
require_once 'config.php';
$db = getDB();

// 獲取精選商品
$featured = $db->query("SELECT * FROM products WHERE is_featured = 1 AND status = 'active' ORDER BY created_at DESC LIMIT 8");

// 獲取分類資訊 (用於分類方格)
$categories = $db->query("SELECT * FROM categories ORDER BY sort_order LIMIT 3");

include 'includes/header.php';
?>



<!-- Hero Section -->
<section class="hero" id="hero">
  <div class="hero-slider">
    <div class="hero-slide active">
      <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" alt="JC mall Fashion 1">
    </div>
    <div class="hero-slide">
      <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80" alt="JC mall Fashion 2">
    </div>
    <div class="hero-slide">
      <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80" alt="JC mall Fashion 3">
    </div>
  </div>
  
  <div class="hero-overlay"></div>
  
  <div class="hero-content">
    <div class="hero-text-wrap">
      <p class="hero-tag">2026 夏季 / 秋季</p>
      <h1 class="hero-title">品味<br><em>永恆</em>風尚</h1>
      <p class="hero-subtitle">探索我們精心策劃的奢華時尚系列，專為追求優雅與匠心工藝的您而設計。</p>
      <div class="hero-buttons">
        <a href="products.php" class="btn btn-primary">選購系列</a>
        <a href="products.php?cat=new-arrivals" class="btn btn-outline">探索更多 →</a>
      </div>
    </div>
  </div>

  <div class="hero-nav">
    <span class="hero-dot active"></span>
    <span class="hero-dot"></span>
    <span class="hero-dot"></span>
  </div>

  <div class="hero-scroll"><span></span></div>
</section>

<!-- Marquee Bar -->
<div class="marquee-bar">
  <div class="marquee-track">
    <span class="marquee-item"><span class="dot"></span> 全球免運配送</span>
    <span class="marquee-item"><span class="dot"></span> 頂級精選材質</span>
    <span class="marquee-item"><span class="dot"></span> 30天輕鬆退換</span>
    <span class="marquee-item"><span class="dot"></span> 會員專屬優惠</span>
    <span class="marquee-item"><span class="dot"></span> 永續時尚理念</span>
    <span class="marquee-item"><span class="dot"></span> 匠心手工製作</span>
    <!-- Duplicate for seamless loop -->
    <span class="marquee-item"><span class="dot"></span> 全球免運配送</span>
    <span class="marquee-item"><span class="dot"></span> 頂級精選材質</span>
    <span class="marquee-item"><span class="dot"></span> 30天輕鬆退換</span>
    <span class="marquee-item"><span class="dot"></span> 會員專屬優惠</span>
    <span class="marquee-item"><span class="dot"></span> 永續時尚理念</span>
    <span class="marquee-item"><span class="dot"></span> 匠心手工製作</span>
  </div>
</div>

<!-- Categories Section -->
<section class="section-padding" id="categories">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-tag">探索</p>
      <h2 class="section-title">精選系列</h2>
      <div class="section-line"></div>
    </div>
    <div class="categories-grid">
      <?php if ($categories && $categories->num_rows > 0): ?>
        <?php while ($cat = $categories->fetch_assoc()): ?>
        <div class="category-card reveal" onclick="location.href='products.php?cat=<?= $cat['slug'] ?>'">
          <img src="<?= htmlspecialchars($cat['image']) ?>" alt="<?= htmlspecialchars($cat['name']) ?>">
          <div class="category-card-overlay">
            <h3><?= htmlspecialchars($cat['name']) ?></h3>
            <p><?= htmlspecialchars($cat['description']) ?></p>
            <span class="card-link">探索更多 →</span>
          </div>
        </div>
        <?php endwhile; ?>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- Featured Products -->
<section class="section-padding" id="featured" style="background:var(--bg-secondary)">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-tag">為您精選</p>
      <h2 class="section-title">精選單品</h2>
      <div class="section-line"></div>
    </div>
    <div class="products-grid">
      <?php if ($featured && $featured->num_rows > 0): ?>
        <?php while ($product = $featured->fetch_assoc()): ?>
        <a href="product.php?slug=<?= urlencode($product['slug']) ?>" class="product-card reveal">
          <div class="product-img">
            <img src="<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
            <?php if ($product['is_new']): ?>
              <span class="product-badge badge-new">新品</span>
            <?php elseif ($product['sale_price']): ?>
              <span class="product-badge badge-sale">特價</span>
            <?php endif; ?>
            <div class="product-actions">
              <button title="加入收藏" onclick="event.preventDefault(); addToWishlist(<?= $product['id'] ?>)"><i class="fas fa-heart"></i></button>
              <button title="加入購物車" onclick="event.preventDefault(); addToCart(<?= $product['id'] ?>)" data-id="<?= $product['id'] ?>">
                <i class="fas fa-shopping-bag"></i>
              </button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-brand">JC mall</p>
            <h3 class="product-name"><?= htmlspecialchars($product['name']) ?></h3>
            <div class="product-price">
              <?php if ($product['sale_price']): ?>
                <span class="price-current">$<?= number_format($product['sale_price'], 0) ?></span>
                <span class="price-original">$<?= number_format($product['price'], 0) ?></span>
              <?php else: ?>
                <span class="price-current">$<?= number_format($product['price'], 0) ?></span>
              <?php endif; ?>
            </div>
          </div>
        </a>
        <?php endwhile; ?>
      <?php endif; ?>
    </div>
    <div class="text-center" style="margin-top: 60px;">
      <a href="products.php" class="btn btn-outline reveal">瀏覽所有商品</a>
    </div>
  </div>
</section>

<!-- About Section (Feature Banner) -->
<section class="section-padding reveal" id="about">
  <div class="container">
    <div class="feature-banner">
      <div class="feature-banner-bg">
        <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80" alt="Design Philospohy">
      </div>
      <div class="feature-banner-content">
        <p class="section-tag">品牌核心</p>
        <h2>以永續工藝<br>打造時尚未來</h2>
        <p>我們致力於使用高品質、可追溯的永續材質。每一件 JC mall 產品都是對匠心工藝與環境責任的體現。</p>
        <a href="contact.php" class="btn btn-primary">聯絡我們</a>
      </div>
    </div>
  </div>
</section>

<!-- Services Row -->
<section class="section-padding reveal">
  <div class="container">
    <div class="features-row">
      <div class="feature-item">
        <div class="feature-icon"><i class="fas fa-shipping-fast"></i></div>
        <h4>免費配送</h4>
        <p>訂單滿 $3,000 即享免運</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon"><i class="fas fa-undo-alt"></i></div>
        <h4>輕鬆退換</h4>
        <p>30 天無憂鑑賞期</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon"><i class="fas fa-lock"></i></div>
        <h4>安全付款</h4>
        <p>最高等級加密防護</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon"><i class="fas fa-headset"></i></div>
        <h4>全天候客服</h4>
        <p>專業團隊隨時為您服務</p>
      </div>
    </div>
  </div>
</section>

<!-- Newsletter Section -->
<section class="section-padding reveal" style="padding-top: 0;">
  <div class="container">
    <div class="newsletter">
      <p class="section-tag">訂閱我們</p>
      <h2>獲取最新優惠與新品資訊</h2>
      <p>加入我們的菁英圈，第一時間掌握最新系列發佈與僅限會員的專屬驚喜。</p>
      <form class="newsletter-form" onsubmit="handleNewsletter(event)">
        <input type="email" id="newsletterEmail" placeholder="您的電子郵件" required>
        <button type="submit" class="btn btn-primary">立即訂閱</button>
      </form>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
