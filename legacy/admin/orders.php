<?php
$currentPage = 'orders';
$adminTitle = '訂單管理';
require_once 'includes/header.php';
$db = getDB();

// 處理狀態更新
if (isset($_POST['update_status'])) {
    $oid = $_POST['order_id'];
    $newStatus = $_POST['status'];
    $stmt = $db->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $newStatus, $oid);
    $stmt->execute();
    header('Location: orders.php?msg=updated');
    exit;
}

// 獲取訂單列表
$orders = $db->query("SELECT * FROM orders ORDER BY created_at DESC");
?>

<div style="margin-bottom: 30px;">
    <h3 style="font-weight: 300; letter-spacing: 1px;">訂單列表 (<?= $orders->num_rows ?>)</h3>
</div>

<?php if(isset($_GET['msg']) && $_GET['msg'] === 'updated'): ?>
    <div style="background: rgba(46,204,113,0.1); color: #2ecc71; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
        訂單狀態已更新
    </div>
<?php endif; ?>

<div class="admin-table-wrap">
    <table>
        <thead>
            <tr>
                <th>日期</th>
                <th>訂單編號</th>
                <th>客戶姓名</th>
                <th>總金額</th>
                <th>當前狀態</th>
                <th>快速更新</th>
                <th>詳情</th>
            </tr>
        </thead>
        <tbody>
            <?php while($o = $orders->fetch_assoc()): ?>
            <tr>
                <td><?= date('Y/m/d H:i', strtotime($o['created_at'])) ?></td>
                <td style="color:#fff;"><?= $o['order_number'] ?></td>
                <td><?= htmlspecialchars($o['shipping_name']) ?></td>
                <td style="color:#c9a96e;">$<?= number_format($o['total'], 0) ?></td>
                <td>
                    <span class="badge" style="background: <?= 
                        $o['status']==='pending'?'rgba(201,169,110,0.1)':
                        ($o['status']==='shipped'?'rgba(46,204,113,0.1)':'rgba(90,86,80,0.1)') ?>; color: <?= 
                        $o['status']==='pending'?'#c9a96e':
                        ($o['status']==='shipped'?'#2ecc71':'#5a5650') ?>;">
                        <?= $o['status'] === 'pending' ? '待處理' : ($o['status']==='shipped'?'已出貨':'已取消') ?>
                    </span>
                </td>
                <td>
                    <form method="POST" style="display: flex; gap: 5px;">
                        <input type="hidden" name="order_id" value="<?= $o['id'] ?>">
                        <select name="status" style="background:#1a1a1a; color:#ccc; border:1px solid #333; font-size:0.75rem; padding:4px 8px; border-radius:4px;">
                            <option value="pending" <?= $o['status']==='pending'?'selected':'' ?>>待處理</option>
                            <option value="shipped" <?= $o['status']==='shipped'?'selected':'' ?>>已出貨</option>
                            <option value="cancelled" <?= $o['status']==='cancelled'?'selected':'' ?>>已取消</option>
                        </select>
                        <button type="submit" name="update_status" class="btn-sm btn-primary" style="padding:4px 10px;">更新</button>
                    </form>
                </td>
                <td>
                    <a href="order_detail.php?id=<?= $o['id'] ?>" class="btn-sm btn-outline">查看細節</a>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

</main>
</body>
</html>
