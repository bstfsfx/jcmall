<?php
$pageTitle = '關於 JC mall — 匠心工藝與永恆風尚';
require_once 'config.php';
include 'includes/header.php';
?>

<div class="about-page">
  <!-- Hero Section -->
  <section class="about-hero" style="height: 100vh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000;">
    <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.5;">
      <img src="https://images.unsplash.com/photo-1558603668-6570496b66f8?w=1920&q=80" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="container" style="position: relative; z-index: 2; text-align: center;">
      <p style="color: var(--gold); letter-spacing: 5px; text-transform: uppercase; margin-bottom: 20px; font-size: 0.9rem;">The Soul Behind the Stitch</p>
      <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 10vw, 6rem); font-weight: 300; letter-spacing: 15px; color: #fff;">JC MALL</h1>
      <div style="width: 60px; height: 1px; background: var(--gold); margin: 30px auto;"></div>
    </div>
  </section>

  <!-- Story Section 1: The Beginning -->
  <section class="section-padding" style="background: #0a0a0a;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;">
        <div class="about-img reveal" style="position: relative;">
          <img src="https://images.unsplash.com/photo-1590553063947-1c9f708238d3?w=800&q=80" style="width: 100%; border-radius: 4px; box-shadow: 20px 20px 0 rgba(201,169,110,0.1);">
          <p style="position: absolute; bottom: -30px; right: -30px; font-family: var(--font-display); font-size: 5rem; color: rgba(201,169,110,0.05); pointer-events: none;">1995</p>
        </div>
        <div class="about-content">
          <p class="section-tag" style="margin-left: 0;">起源</p>
          <h2 style="font-size: 2.5rem; font-weight: 300; margin-bottom: 30px; line-height: 1.4;">在指尖與布料之間<br><span style="color: var(--gold);">尋找靈魂的溫度</span></h2>
          <div style="color: var(--text-secondary); line-height: 2; font-size: 1.05rem; letter-spacing: 1px;">
            JC mall 的故事並非始於閃耀的伸展台，而是源於一間充滿著老舊裁縫機聲、滿地碎布的小工坊。那時的 JC mall 相信，每一塊布料都有自己的靈魂，而裁縫師的使命，就是透過雙手的溫度，賦予它們生命。<br><br>
            「衣服不應只是穿在身上的布料，而是一段記憶、一種心情，更是自我價值的延伸。」這是 JC mall 最初的堅持，也是品牌至今不變的基石。
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Quote Section -->
  <section style="padding: 150px 0; background: #050505; text-align: center;">
    <div class="container" style="max-width: 800px;">
      <i class="fas fa-quote-left" style="font-size: 2rem; color: var(--gold); margin-bottom: 40px; opacity: 0.5;"></i>
      <h3 style="font-size: 1.8rem; font-weight: 300; line-height: 1.8; font-style: italic; color: #fff;">
        「我不追求轉瞬即逝的流行，我只在意能否讓你在穿上它的那一刻，感受到前所未有的自信與寧靜。」
      </h3>
      <p style="margin-top: 30px; letter-spacing: 3px; color: var(--gold);">─ JC MALL</p>
    </div>
  </section>

  <!-- Story Section 2: Craftsmanship -->
  <section class="section-padding" style="background: #0a0a0a;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center;">
        <div class="about-content">
          <p class="section-tag" style="margin-left: 0;">極致工藝</p>
          <h2 style="font-size: 2.5rem; font-weight: 300; margin-bottom: 30px; line-height: 1.4;">拒絕妥協的<br><span style="color: var(--gold);">精確美學</span></h2>
          <div style="color: var(--text-secondary); line-height: 2; font-size: 1.05rem; letter-spacing: 1px;">
            在 JC mall 的世界裡，一公釐的誤差都是對品味的輕視。我們橫跨半個地球尋找最珍稀的羊絨，並與傳承數代的義大利工坊合作。每一道縫線、每一顆鈕扣，都經過無數次的推敲與試驗。<br><br>
            這種近乎瘋狂的偏執，是為了確保每一件掛上「JC mall」標誌的服飾，都能經得起時間的洗鍊，成為陪伴您一生的經典。
          </div>
        </div>
        <div class="about-img reveal">
          <img src="https://images.unsplash.com/photo-1558603668-6570496b66f8?w=800&q=80" style="width: 100%; border-radius: 4px; box-shadow: -20px 20px 0 rgba(201,169,110,0.1);">
        </div>
      </div>
    </div>
  </section>

  <!-- Parallax Section -->
  <section style="height: 60vh; background: url('https://images.unsplash.com/photo-1523450001312-daa4e2e12446?w=1920&q=80') fixed center center / cover; position: relative; display: flex; align-items: center; justify-content: center;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6);"></div>
    <h2 style="position: relative; z-index: 2; color: #fff; font-size: 2.5rem; font-weight: 200; letter-spacing: 10px;">匠心 · 永恆 · 純粹</h2>
  </section>

  <!-- Final Section: The Future -->
  <section class="section-padding" style="background: #0a0a0a; text-align: center;">
    <div class="container" style="max-width: 900px;">
      <p class="section-tag">未來願景</p>
      <h2 style="font-size: 2.5rem; font-weight: 300; margin-bottom: 40px;">與您一同書寫<br>風尚的新篇章</h2>
      <div style="color: var(--text-secondary); line-height: 2.2; font-size: 1.1rem; letter-spacing: 1px;">
        JC mall 品牌不僅僅是關於服裝，它是一種生活方式，一種對美的無盡追求。未來，我們將繼續堅持環保與永續工藝，讓美不僅存在於當下，更綻放於未來。<br><br>
        感謝您成為 JC mall 故事的一部分。在未來的每一場雨、每一縷陽光中，JC mall 都將溫柔地包裹著您，陪伴您走向每一個重要時刻。
      </div>
      <a href="products.php" class="btn btn-primary" style="margin-top: 60px; padding: 20px 50px;">探索最新系列</a>
    </div>
  </section>
</div>

<style>
.about-page { overflow-x: hidden; }
.reveal { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; }
.reveal.active { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .section-padding { padding: 80px 0; }
  div[style*="grid-template-columns: 1fr 1.2fr"],
  div[style*="grid-template-columns: 1.2fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
}
</style>

<script>
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
window.onload = reveal;
</script>

<?php include 'includes/footer.php'; ?>
