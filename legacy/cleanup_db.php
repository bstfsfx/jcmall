<?php
require_once 'config.php';
$db = getDB();

echo "<h2>開始清理資料庫不完整數據...</h2><br>";

// 1. 清理沒有訂單項目的訂單
$db->query("DELETE FROM orders WHERE id NOT IN (SELECT DISTINCT order_id FROM order_items)");
$deletedOrders = $db->affected_rows;
echo "● 已清理無商品訂單：$deletedOrders 筆<br>";

// 2. 清理購物車中商品已失效的項目
$db->query("DELETE FROM cart WHERE product_id NOT IN (SELECT id FROM products)");
$deletedCart = $db->affected_rows;
echo "● 已清理無效購物車項目：$deletedCart 筆<br>";

// 3. 清理過期的匿名購物車 (例如 30 天前)
$db->query("DELETE FROM cart WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) AND user_id IS NULL");
$expiredCart = $db->affected_rows;
echo "● 已清理過期匿名購物車：$expiredCart 筆<br>";

// 4. 清理沒有姓名的使用者
$db->query("DELETE FROM users WHERE name IS NULL OR name = ''");
$deletedUsers = $db->affected_rows;
echo "● 已清理無名使用者：$deletedUsers 筆<br>";

echo "<br><strong>清理完成！</strong>";
echo "<br><br><a href='index.php'>返回首頁</a>";
