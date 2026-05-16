<?php require_once __DIR__ . '/../config.php'; ?>
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= isset($pageTitle) ? $pageTitle . ' — JC mall' : 'JC mall — 精品時尚與生活風格' ?></title>
  <meta name="description" content="<?= isset($pageDesc) ? $pageDesc : '探索 JC mall 精心策劃的奢華時尚。選購頂級設計師服飾、配件及生活精品，全球免運配送。' ?>">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- Advanced Preloader -->
<div id="preloader">
  <div class="loader-content">
    <div class="loader-brand">JC mall</div>
    <div class="loader-line"></div>
    <div class="loader-tagline">Timeless Elegance & Sustainable Craft</div>
  </div>
</div>
<nav class="navbar scrolled" id="navbar">
  <div class="container">
    <a href="index.php" class="navbar-logo">JC mall</a>
    <ul class="navbar-menu" id="navMenu">
      <li class="has-dropdown">
        <a href="products.php">全部商品 <i class="fas fa-chevron-down" style="font-size: 0.6rem; margin-left: 5px;"></i></a>
        <ul class="dropdown-menu">
          <?php
          $navCats = getDB()->query("SELECT * FROM categories ORDER BY sort_order");
          while($nc = $navCats->fetch_assoc()):
          ?>
            <li><a href="products.php?cat=<?= $nc['slug'] ?>"><?= htmlspecialchars($nc['name']) ?></a></li>
          <?php endwhile; ?>
        </ul>
      </li>
      <li><a href="about.php">關於 JC mall</a></li>
      <li><a href="contact.php">聯繫我們</a></li>
    </ul>
    <div class="navbar-actions">
      <a href="products.php" title="搜尋"><i class="fas fa-search"></i></a>
      <?php if (isset($_SESSION['user_id'])): ?>
        <a href="account.php" title="會員中心" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--gold);">
          <i class="fas fa-user-check"></i>
          <span style="font-family: var(--font-ui); font-weight: 500;"><?= htmlspecialchars($_SESSION['user_name']) ?></span>
        </a>
        <a href="logout.php" title="登出" style="margin-left: 10px; opacity: 0.7;"><i class="fas fa-sign-out-alt"></i></a>
      <?php else: ?>
        <a href="login.php" title="會員登入"><i class="fas fa-user"></i></a>
      <?php endif; ?>
      <a href="cart.php" title="購物車">
        <i class="fas fa-shopping-bag"></i>
        <span class="cart-count">0</span>
      </a>
      <div class="menu-toggle" id="menuToggle" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>

<div style="height:70px"></div>
