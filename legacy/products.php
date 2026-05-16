<?php
$pageTitle = '全部商品';
$pageDesc = '瀏覽 JC mall 全系列精品服飾與配件';

require_once 'config.php';
$db = getDB();

// Get category filter
$catSlug = isset($_GET['cat']) ? trim($_GET['cat']) : '';
$search = isset($_GET['q']) ? trim($_GET['q']) : '';
$sort = isset($_GET['sort']) ? trim($_GET['sort']) : 'newest';

// Build query
$where = ["p.status = 'active'"];
$params = [];
$types = '';

if ($catSlug) {
    $where[] = "c.slug = ?";
    $params[] = $catSlug;
    $types .= 's';
    // Get category name for title
    $catStmt = $db->prepare("SELECT name FROM categories WHERE slug = ?");
    $catStmt->bind_param("s", $catSlug);
    $catStmt->execute();
    $catResult = $catStmt->get_result()->fetch_assoc();
    if ($catResult) $pageTitle = $catResult['name'];
}

if ($search) {
    $where[] = "(p.name LIKE ? OR p.description LIKE ?)";
    $searchTerm = "%{$search}%";
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $types .= 'ss';
    $pageTitle = "搜尋：{$search}";
}

$orderBy = match($sort) {
    'price_low' => 'COALESCE(p.sale_price, p.price) ASC',
    'price_high' => 'COALESCE(p.sale_price, p.price) DESC',
    'name' => 'p.name ASC',
    default => 'p.created_at DESC',
};

$sql = "SELECT p.*, c.name AS category_name, c.slug AS category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE " . implode(' AND ', $where) . "
        ORDER BY {$orderBy}";

$stmt = $db->prepare($sql);
if ($params) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$products = $stmt->get_result();

// Get all categories for sidebar
$categories = $db->query("SELECT * FROM categories ORDER BY sort_order");

include 'includes/header.php';
?>

<!-- Page Hero -->
<section class="page-hero">
  <div class="container">
    <p class="section-tag">精選商品</p>
    <h1 class="page-hero-title"><?= htmlspecialchars($pageTitle) ?></h1>
    <div class="breadcrumb">
      <a href="index.php">首頁</a>
      <span>/</span>
      <?php if ($catSlug && $catResult): ?>
        <a href="products.php">全部商品</a>
        <span>/</span>
        <span><?= htmlspecialchars($catResult['name']) ?></span>
      <?php else: ?>
        <span>全部商品</span>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- Products Section -->
<section class="section-padding">
  <div class="container">
    <!-- Toolbar -->
    <div class="products-toolbar">
      <p class="results-count">共 <?= $products->num_rows ?> 件商品</p>
      <div class="toolbar-right">
        <form class="search-inline" action="products.php" method="get">
          <input type="text" name="q" placeholder="搜尋商品..." value="<?= htmlspecialchars($search) ?>">
          <button type="submit"><i class="fas fa-search"></i></button>
        </form>
        <div class="sort-select">
          <select onchange="location.href=this.value">
            <option value="products.php?cat=<?= urlencode($catSlug) ?>&sort=newest" <?= $sort=='newest'?'selected':'' ?>>最新上架</option>
            <option value="products.php?cat=<?= urlencode($catSlug) ?>&sort=price_low" <?= $sort=='price_low'?'selected':'' ?>>價格：低到高</option>
            <option value="products.php?cat=<?= urlencode($catSlug) ?>&sort=price_high" <?= $sort=='price_high'?'selected':'' ?>>價格：高到低</option>
            <option value="products.php?cat=<?= urlencode($catSlug) ?>&sort=name" <?= $sort=='name'?'selected':'' ?>>名稱排序</option>
          </select>
        </div>
      </div>
    </div>

    <div class="products-layout">
      <!-- Sidebar -->
      <aside class="products-sidebar">
        <h3>商品分類</h3>
        <ul class="cat-list">
          <li><a href="products.php" class="<?= !$catSlug ? 'active' : '' ?>">全部商品</a></li>
          <?php while ($cat = $categories->fetch_assoc()): ?>
          <li><a href="products.php?cat=<?= urlencode($cat['slug']) ?>" class="<?= $catSlug == $cat['slug'] ? 'active' : '' ?>"><?= htmlspecialchars($cat['name']) ?></a></li>
          <?php endwhile; ?>
        </ul>
      </aside>

      <!-- Grid -->
      <div class="products-grid products-grid-3">
        <?php if ($products->num_rows > 0): ?>
          <?php while ($product = $products->fetch_assoc()): ?>
          <a href="product.php?slug=<?= urlencode($product['slug']) ?>" class="product-card">
            <div class="product-img">
              <img src="<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
              <?php if ($product['is_new']): ?>
                <span class="product-badge badge-new">新品</span>
              <?php elseif ($product['sale_price']): ?>
                <span class="product-badge badge-sale">特價</span>
              <?php endif; ?>
              <div class="product-actions">
                <button title="加入收藏" onclick="event.preventDefault()"><i class="fas fa-heart"></i></button>
                <button title="加入購物車" onclick="event.preventDefault()"><i class="fas fa-shopping-bag"></i></button>
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
        <?php else: ?>
          <div class="empty-state">
            <i class="fas fa-search" style="font-size:3rem;color:var(--text-muted);margin-bottom:20px"></i>
            <h3>找不到相關商品</h3>
            <p>請嘗試其他搜尋條件或瀏覽其他分類</p>
            <a href="products.php" class="btn btn-outline" style="margin-top:20px">瀏覽全部商品</a>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
