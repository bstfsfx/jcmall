<?php
require_once dirname(__DIR__, 2) . '/config.php';
if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $adminTitle ?? '控制台' ?> — JC mall Admin</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        :root { --sidebar-width: 260px; }
        body { background: #0a0a0a; color: #f5f0eb; display: flex; min-height: 100vh; }
        
        /* Sidebar */
        .admin-sidebar { width: var(--sidebar-width); background: #111; border-right: 1px solid #222; position: fixed; height: 100vh; padding: 40px 0; display: flex; flex-direction: column; }
        .admin-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; letter-spacing: 8px; color: #c9a96e; text-align: center; margin-bottom: 50px; display: block; }
        .admin-nav { flex: 1; }
        .admin-nav-item { display: flex; align-items: center; gap: 15px; padding: 16px 30px; color: #9a958e; transition: 0.3s; font-family: 'Outfit', sans-serif; font-size: 0.9rem; letter-spacing: 1px; }
        .admin-nav-item:hover, .admin-nav-item.active { background: #1a1a1a; color: #c9a96e; border-right: 3px solid #c9a96e; }
        .admin-nav-item i { width: 20px; text-align: center; }
        
        /* Main Content */
        .admin-main { flex: 1; margin-left: var(--sidebar-width); padding: 40px 60px; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .admin-user { display: flex; align-items: center; gap: 12px; }
        
        /* Cards */
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 40px; }
        .stat-card { background: #161616; border: 1px solid #222; padding: 30px; border-radius: 12px; }
        .stat-card h4 { color: #5a5650; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        .stat-card .value { font-size: 2rem; font-family: 'Outfit', sans-serif; color: #f5f0eb; }
        
        /* Table Style */
        .admin-table-wrap { background: #111; border: 1px solid #222; border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1a1a1a; padding: 16px 20px; text-align: left; font-size: 0.75rem; color: #5a5650; text-transform: uppercase; letter-spacing: 1px; }
        td { padding: 16px 20px; border-bottom: 1px solid #222; font-size: 0.9rem; color: #9a958e; }
        tr:last-child td { border-bottom: none; }
        
        .badge { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
        .badge-pending { background: rgba(201,169,110,0.1); color: #c9a96e; }
        .badge-success { background: rgba(46,204,113,0.1); color: #2ecc71; }
        
        .btn-sm { padding: 8px 16px; font-size: 0.75rem; border-radius: 4px; }
    </style>
</head>
<body>

<aside class="admin-sidebar">
    <a href="../index.php" class="admin-logo">JC MALL</a>
    <nav class="admin-nav">
        <a href="index.php" class="admin-nav-item <?= ($currentPage??'')==='dashboard'?'active':'' ?>">
            <i class="fas fa-th-large"></i> 控制台
        </a>
        <a href="products.php" class="admin-nav-item <?= ($currentPage??'')==='products'?'active':'' ?>">
            <i class="fas fa-shopping-bag"></i> 商品管理
        </a>
        <a href="categories.php" class="admin-nav-item <?= ($currentPage??'')==='categories'?'active':'' ?>">
            <i class="fas fa-list"></i> 分類管理
        </a>
        <a href="orders.php" class="admin-nav-item <?= ($currentPage??'')==='orders'?'active':'' ?>">
            <i class="fas fa-file-invoice-dollar"></i> 訂單管理
        </a>
        <a href="users.php" class="admin-nav-item <?= ($currentPage??'')==='users'?'active':'' ?>">
            <i class="fas fa-users"></i> 會員管理
        </a>
    </nav>
    <a href="../logout.php" class="admin-nav-item" style="margin-top:auto;">
        <i class="fas fa-sign-out-alt"></i> 安全登出
    </a>
</aside>

<main class="admin-main">
    <header class="admin-header">
        <h2 style="font-weight: 300; letter-spacing: 2px;"><?= $adminTitle ?? '控制台概覽' ?></h2>
        <div class="admin-user">
            <span style="color: #5a5650; font-size: 0.85rem;">管理員：</span>
            <span style="color: #c9a96e; font-weight: 600;"><?= $_SESSION['user_name'] ?></span>
        </div>
    </header>
