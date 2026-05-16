<?php
$currentPage = 'orders';
$id = $_GET['id'] ?? null;
$adminTitle = '訂單詳情';
require_once 'includes/header.php';
$db = getDB();

if (!$id) {
    header('Location: orders.php');
    exit;
}

// 獲取訂單主資訊
$stmt = $db->prepare("SELECT * FROM orders WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$order = $stmt->get_result()->fetch_assoc();

if (!$order) {
    echo "<h3>找不到該訂單</h3>";
    exit;
}

// 獲取訂單項目
$items = $db->query("
    SELECT oi.*, p.image 
    FROM order_items oi 
    LEFT JOIN products p ON oi.product_id = p.id 
    WHERE oi.order_id = $id
");
?>

<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 30px; margin-bottom: 40px;">
    <!-- 左側：商品清單 -->
    <div style="flex: 2;">
        <h3 style="font-weight: 300; letter-spacing: 1px; margin-bottom: 20px;">購買項目</h3>
        <div class="admin-table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>圖片</th>
                        <th>商品名稱</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($item = $items->fetch_assoc()): ?>
                    <tr>
                        <td><img src="<?= htmlspecialchars($item['image']) ?>" style="width: 50px; border-radius: 4px;"></td>
                        <td style="color:#fff;"><?= htmlspecialchars($item['product_name']) ?></td>
                        <td>$<?= number_format($item['price'], 0) ?></td>
                        <td>x <?= $item['quantity'] ?></td>
                        <td style="color:#c9a96e;">$<?= number_format($item['price'] * $item['quantity'], 0) ?></td>
                    </tr>
                    <?php endwhile; ?>
                    <tr>
                        <td colspan="4" style="text-align: right; font-weight: 600;">運費：</td>
                        <td style="color:#c9a96e;">$<?= number_format($order['shipping_fee'], 0) ?></td>
                    </tr>
                    <tr style="background: rgba(201,169,110,0.05);">
                        <td colspan="4" style="text-align: right; font-weight: 600; color: #fff;">總計金額：</td>
                        <td style="color:#c9a96e; font-size: 1.2rem; font-weight: 700;">$<?= number_format($order['total'], 0) ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 30px;">
            <a href="orders.php" class="btn btn-outline">← 返回訂單列表</a>
        </div>
    </div>

    <!-- 右側：收件資訊與狀態 -->
    <div style="flex: 1; background: #111; padding: 30px; border-radius: 12px; border: 1px solid #222;">
        <h3 style="font-weight: 300; letter-spacing: 1px; margin-bottom: 20px; color: #c9a96e;">訂單資訊</h3>
        
        <div style="margin-bottom: 25px;">
            <p style="font-size: 0.75rem; color: #5a5650; text-transform: uppercase; letter-spacing: 1px;">訂單編號</p>
            <p style="color: #fff; font-size: 1.1rem; font-weight: 600;"><?= $order['order_number'] ?></p>
        </div>

        <div style="margin-bottom: 25px;">
            <p style="font-size: 0.75rem; color: #5a5650; text-transform: uppercase; letter-spacing: 1px;">當前狀態</p>
            <span class="badge" style="background: rgba(201,169,110,0.1); color: #c9a96e; font-size: 0.9rem; padding: 8px 15px;">
                <?= $order['status'] === 'pending' ? '待處理' : ($order['status']==='shipped'?'已出貨':'已取消') ?>
            </span>
        </div>

        <hr style="border: 0; border-top: 1px solid #222; margin: 25px 0;">

        <h4 style="font-weight: 400; margin-bottom: 15px; color: #fff;">收件人詳情</h4>
        <div style="font-size: 0.9rem; color: #9a958e; line-height: 1.8;">
            <p><strong>姓名：</strong> <?= htmlspecialchars($order['shipping_name']) ?></p>
            <p><strong>電話：</strong> <?= htmlspecialchars($order['shipping_phone']) ?></p>
            <p><strong>地址：</strong> <?= htmlspecialchars($order['shipping_address']) ?></p>
            <p><strong>備註：</strong> <?= nl2br(htmlspecialchars($order['order_notes'] ?? '無')) ?></p>
        </div>

        <div style="margin-top: 30px;">
            <form action="orders.php" method="POST">
                <input type="hidden" name="order_id" value="<?= $order['id'] ?>">
                <label style="font-size: 0.75rem; color: #5a5650; display: block; margin-bottom: 8px;">更改狀態</label>
                <select name="status" style="width: 100%; background: #1a1a1a; color: #fff; border: 1px solid #333; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                    <option value="pending" <?= $order['status']==='pending'?'selected':'' ?>>待處理</option>
                    <option value="shipped" <?= $order['status']==='shipped'?'selected':'' ?>>已出貨</option>
                    <option value="cancelled" <?= $order['status']==='cancelled'?'selected':'' ?>>已取消</option>
                </select>
                <button type="submit" name="update_status" class="btn btn-primary" style="width: 100%; justify-content: center;">更新訂單</button>
            </form>
        </div>
    </div>
</div>

</main>
</body>
</html>
