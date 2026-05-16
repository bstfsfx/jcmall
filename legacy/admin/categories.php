<?php
$currentPage = 'categories';
$adminTitle = '分類管理';
require_once 'includes/header.php';
$db = getDB();

// 處理刪除
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    // 先檢查是否有商品屬於此分類
    $chk = $db->prepare("SELECT COUNT(*) FROM products WHERE category_id = ?");
    $chk->bind_param("i", $id);
    $chk->execute();
    $count = $chk->get_result()->fetch_row()[0];

    if ($count > 0) {
        $error = "無法刪除：尚有 $count 個商品屬於此分類，請先更改商品的分類。";
    } else {
        $stmt = $db->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        header('Location: categories.php?msg=deleted');
        exit;
    }
}

// 獲取分類列表
$categories = $db->query("SELECT * FROM categories ORDER BY sort_order ASC");
?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
    <h3 style="font-weight: 300; letter-spacing: 1px;">商品分類 (<?= $categories->num_rows ?>)</h3>
    <a href="category_edit.php" class="btn btn-primary" style="padding: 10px 24px; font-size: 0.8rem;">+ 新增分類</a>
</div>

<?php if(isset($error)): ?>
    <div style="background: rgba(231,76,60,0.1); color: #e74c3c; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
        <?= $error ?>
    </div>
<?php endif; ?>

<?php if(isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?>
    <div style="background: rgba(46,204,113,0.1); color: #2ecc71; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
        分類已成功刪除
    </div>
<?php endif; ?>

<div class="admin-table-wrap">
    <table>
        <thead>
            <tr>
                <th>排序</th>
                <th>圖示</th>
                <th>名稱</th>
                <th>Slug</th>
                <th>描述</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <?php while($c = $categories->fetch_assoc()): ?>
            <tr>
                <td><?= $c['sort_order'] ?></td>
                <td><img src="<?= htmlspecialchars($c['image']) ?>" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;"></td>
                <td style="color:#fff; font-weight: 600;"><?= htmlspecialchars($c['name']) ?></td>
                <td><code style="background:#1a1a1a; padding:2px 6px; border-radius:4px;"><?= htmlspecialchars($c['slug']) ?></code></td>
                <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <?= htmlspecialchars($c['description']) ?>
                </td>
                <td>
                    <div style="display: flex; gap: 10px;">
                        <a href="category_edit.php?id=<?= $c['id'] ?>" class="btn-sm btn-outline" style="color:#c9a96e; border-color:#c9a96e;">編輯</a>
                        <a href="categories.php?delete=<?= $c['id'] ?>" class="btn-sm btn-outline" style="color:#e74c3c; border-color:#e74c3c;" onclick="return confirm('確定要刪除此分類嗎？')">刪除</a>
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
