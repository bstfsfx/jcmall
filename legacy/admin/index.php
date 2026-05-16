<?php
$currentPage = 'dashboard';
$adminTitle = '控制台概覽';
require_once 'includes/header.php';
$db = getDB();

// 獲取統計數據
$totalProducts = $db->query("SELECT COUNT(*) FROM products")->fetch_row()[0];
$totalOrders = $db->query("SELECT COUNT(*) FROM orders")->fetch_row()[0];
$totalRevenue = $db->query("SELECT SUM(total) FROM orders WHERE status != 'cancelled'")->fetch_row()[0] ?? 0;
$totalUsers = $db->query("SELECT COUNT(*) FROM users WHERE role = 'customer'")->fetch_row()[0];

// 獲取最新訂單
$latestOrders = $db->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5");
?>

<div class="stat-grid">
    <div class="stat-card">
        <h4>總商品數</h4>
        <div class="value"><?= $totalProducts ?></div>
    </div>
    <div class="stat-card">
        <h4>總訂單數</h4>
        <div class="value"><?= $totalOrders ?></div>
    </div>
    <div class="stat-card">
        <h4>總營收</h4>
        <div class="value">$<?= number_format($totalRevenue, 0) ?></div>
    </div>
    <div class="stat-card">
        <h4>註冊會員</h4>
        <div class="value"><?= $totalUsers ?></div>
    </div>
</div>

<h3 style="margin-bottom: 20px; font-weight: 300; letter-spacing: 1px;">最近訂單</h3>
<div class="admin-table-wrap">
    <table>
        <thead>
            <tr>
                <th>訂單編號</th>
                <th>收件人</th>
                <th>金額</th>
                <th>狀態</th>
                <th>日期</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <?php while($order = $latestOrders->fetch_assoc()): ?>
            <tr>
                <td style="color:#fff;"><?= $order['order_number'] ?></td>
                <td><?= htmlspecialchars($order['shipping_name']) ?></td>
                <td>$<?= number_format($order['total'], 0) ?></td>
                <td>
                    <span class="badge badge-<?= $order['status']==='pending'?'pending':'success' ?>">
                        <?= $order['status'] ?>
                    </span>
                </td>
                <td><?= date('Y/m/d', strtotime($order['created_at'])) ?></td>
                <td>
                    <a href="orders.php?id=<?= $order['id'] ?>" class="btn-sm btn-outline">查看</a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

</main>
</body>
</html>
