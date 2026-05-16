<?php
require_once 'config.php';
$db = getDB();

// Get product by slug
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if (!$slug) { header('Location: products.php'); exit; }

$stmt = $db->prepare("SELECT p.*, c.name AS category_name, c.slug AS category_slug
                       FROM products p
                       LEFT JOIN categories c ON p.category_id = c.id
                       WHERE p.slug = ? AND p.status = 'active'");
$stmt->bind_param("s", $slug);
$stmt->execute();
$product = $stmt->get_result()->fetch_assoc();

if (!$product) { header('Location: products.php'); exit; }

$pageTitle = $product['name'];
$pageDesc = mb_substr(strip_tags($product['description']), 0, 160);

// Get related products
$relStmt = $db->prepare("SELECT * FROM products WHERE category_id = ? AND id != ? AND status = 'active' ORDER BY RAND() LIMIT 4");
$relStmt->bind_param("ii", $product['category_id'], $product['id']);
$relStmt->execute();
$related = $relStmt->get_result();

$sizes = $product['sizes'] ? explode(',', $product['sizes']) : [];
$colors = $product['colors'] ? explode(',', $product['colors']) : [];

include 'includes/header.php';
?>

<!-- Breadcrumb -->
<section style="padding:20px 0 0">
  <div class="container">
    <div class="breadcrumb">
      <a href="index.php">首頁</a><span>/</span>
      <a href="products.php">全部商品</a><span>/</span>
      <?php if ($product['category_name']): ?>
        <a href="products.php?cat=<?= urlencode($product['category_slug']) ?>"><?= htmlspecialchars($product['category_name']) ?></a><span>/</span>
      <?php endif; ?>
      <span><?= htmlspecialchars($product['name']) ?></span>
    </div>
  </div>
</section>

<!-- Product Detail -->
<section class="section-padding" style="padding-top:40px">
  <div class="container">
    <div class="product-detail">
      <!-- Image Gallery -->
      <div class="pd-gallery">
        <div class="pd-main-img">
          <img src="<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>" id="mainImg">
          <?php if ($product['is_new']): ?>
            <span class="product-badge badge-new">新品</span>
          <?php elseif ($product['sale_price']): ?>
            <span class="product-badge badge-sale">特價</span>
          <?php endif; ?>
        </div>
      </div>

      <!-- Product Info -->
      <div class="pd-info">
        <p class="product-brand">JC MALL COLLECTION</p>
        <h1 class="pd-title"><?= htmlspecialchars($product['name']) ?></h1>

        <div class="pd-price">
          <?php if ($product['sale_price']): ?>
            <span class="pd-price-current">$<?= number_format($product['sale_price'], 0) ?></span>
            <span class="pd-price-original">$<?= number_format($product['price'], 0) ?></span>
            <?php
              $discount = round((1 - $product['sale_price'] / $product['price']) * 100);
            ?>
            <span class="pd-discount">-<?= $discount ?>%</span>
          <?php else: ?>
            <span class="pd-price-current">$<?= number_format($product['price'], 0) ?></span>
          <?php endif; ?>
        </div>

        <div class="pd-desc">
          <p><?= nl2br(htmlspecialchars($product['description'])) ?></p>
        </div>

        <?php if ($colors): ?>
        <div class="pd-option">
          <label>顏色</label>
          <div class="pd-colors">
            <?php foreach ($colors as $i => $color): ?>
              <button class="color-btn <?= $i===0?'active':'' ?>" data-color="<?= htmlspecialchars(trim($color)) ?>">
                <?= htmlspecialchars(trim($color)) ?>
              </button>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>

        <?php if ($sizes): ?>
        <div class="pd-option">
          <label>尺寸</label>
          <div class="pd-sizes">
            <?php foreach ($sizes as $i => $size): ?>
              <button class="size-btn <?= $i===0?'active':'' ?>" data-size="<?= htmlspecialchars(trim($size)) ?>">
                <?= htmlspecialchars(trim($size)) ?>
              </button>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>

        <div class="pd-option">
          <label>數量</label>
          <div class="pd-qty">
            <button onclick="changeQty(-1)">−</button>
            <input type="number" id="qty" value="1" min="1" max="<?= $product['stock'] ?>">
            <button onclick="changeQty(1)">+</button>
          </div>
          <span class="stock-info">庫存：<?= $product['stock'] ?> 件</span>
        </div>

        <div class="pd-actions">
          <button class="btn btn-primary btn-full" onclick="handleAddToCart()">
            <i class="fas fa-shopping-bag"></i> 加入購物車
          </button>
          <button class="btn btn-outline" onclick="this.classList.toggle('wishlisted')" title="加入收藏">
            <i class="fas fa-heart"></i>
          </button>
        </div>

        <div class="pd-features">
          <div class="pd-feat"><i class="fas fa-shipping-fast"></i> 全球免運配送</div>
          <div class="pd-feat"><i class="fas fa-undo-alt"></i> 30天無憂退換</div>
          <div class="pd-feat"><i class="fas fa-shield-alt"></i> 正品保證</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Related Products -->
<?php if ($related->num_rows > 0): ?>
<section class="section-padding" style="background:var(--bg-secondary)">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">您可能也會喜歡</p>
      <h2 class="section-title">相關商品</h2>
      <div class="section-line"></div>
    </div>
    <div class="products-grid">
      <?php while ($rel = $related->fetch_assoc()): ?>
      <a href="product.php?slug=<?= urlencode($rel['slug']) ?>" class="product-card">
        <div class="product-img">
          <img src="<?= htmlspecialchars($rel['image']) ?>" alt="<?= htmlspecialchars($rel['name']) ?>">
          <?php if ($rel['is_new']): ?>
            <span class="product-badge badge-new">新品</span>
          <?php elseif ($rel['sale_price']): ?>
            <span class="product-badge badge-sale">特價</span>
          <?php endif; ?>
        </div>
        <div class="product-info">
          <p class="product-brand">JC mall</p>
          <h3 class="product-name"><?= htmlspecialchars($rel['name']) ?></h3>
          <div class="product-price">
            <?php if ($rel['sale_price']): ?>
              <span class="price-current">$<?= number_format($rel['sale_price'], 0) ?></span>
              <span class="price-original">$<?= number_format($rel['price'], 0) ?></span>
            <?php else: ?>
              <span class="price-current">$<?= number_format($rel['price'], 0) ?></span>
            <?php endif; ?>
          </div>
        </div>
      </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<script>
// Quantity control
function changeQty(d) {
  const inp = document.getElementById('qty');
  let v = parseInt(inp.value) + d;
  if (v < 1) v = 1;
  if (v > parseInt(inp.max)) v = parseInt(inp.max);
  inp.value = v;
}

// Size & Color selection
document.querySelectorAll('.size-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
});
document.querySelectorAll('.color-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.color-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
});

function handleAddToCart() {
  const productId = <?= $product['id'] ?>;
  const qty = parseInt(document.getElementById('qty').value);
  if (typeof addToCart === 'function') {
    addToCart(productId, qty);
  }
}
</script>

<?php include 'includes/footer.php'; ?>
