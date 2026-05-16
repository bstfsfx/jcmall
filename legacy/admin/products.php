<?php
$currentPage = 'products';
$adminTitle = '商品管理';
require_once 'includes/header.php';
$db = getDB();

// 處理刪除
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    header('Location: products.php?msg=deleted');
    exit;
}

// 獲取商品列表
$products = $db->query("
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    ORDER BY p.created_at DESC
");
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
    <h3 style="font-weight: 300; letter-spacing: 1px;">所有商品 (<?= $products->num_rows ?>)</h3>
    <a href="product_edit.php" class="btn btn-primary" style="padding: 10px 24px; font-size: 0.8rem;">+ 新增商品</a>
</div>

<?php if(isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?>
    <div style="background: rgba(231,76,60,0.1); color: #e74c3c; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
        商品已成功刪除
    </div>
<?php endif; ?>

<div class="admin-table-wrap">
    <table>
        <thead>
            <tr>
                <th>圖片</th>
                <th>名稱</th>
                <th>分類</th>
                <th>價格</th>
                <th>庫存</th>
                <th>狀態</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <?php while($p = $products->fetch_assoc()): ?>
            <tr>
                <td><img src="<?= htmlspecialchars($p['image']) ?>" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px;"></td>
                <td style="color:#fff;"><?= htmlspecialchars($p['name']) ?></td>
                <td><?= htmlspecialchars($p['category_name']) ?></td>
                <td>
                    <?php if($p['sale_price']): ?>
                        <span style="color:#c9a96e;">$<?= number_format($p['sale_price'], 0) ?></span>
                        <small style="text-decoration:line-through; font-size:0.7rem; margin-left:5px;">$<?= number_format($p['price'], 0) ?></small>
                    <?php else: ?>
                        $<?= number_format($p['price'], 0) ?>
                    <?php endif; ?>
                </td>
                <td><?= $p['stock'] ?></td>
                <td>
                    <span class="badge" style="background: <?= $p['status']==='active'?'rgba(46,204,113,0.1)':'rgba(90,86,80,0.1)' ?>; color: <?= $p['status']==='active'?'#2ecc71':'#5a5650' ?>;">
                        <?= $p['status']==='active'?'上架中':'已下架' ?>
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 10px;">
                        <a href="product_edit.php?id=<?= $p['id'] ?>" class="btn-sm btn-outline" style="color:#c9a96e; border-color:#c9a96e;">編輯</a>
                        <a href="products.php?delete=<?= $p['id'] ?>" class="btn-sm btn-outline" style="color:#e74c3c; border-color:#e74c3c;" onclick="return confirm('確定要刪除此商品嗎？')">刪除</a>
                    </div>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

</main>
</body>
</html>
