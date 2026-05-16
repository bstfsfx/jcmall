<?php
$currentPage = 'categories';
$id = $_GET['id'] ?? null;
$adminTitle = $id ? '編輯分類' : '新增分類';
require_once 'includes/header.php';
$db = getDB();

$category = [
    'name' => '', 'slug' => '', 'description' => '', 
    'image' => '', 'sort_order' => 0
];

if ($id) {
    $stmt = $db->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $category = $stmt->get_result()->fetch_assoc();
}

// 處理提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $slug = $_POST['slug'] ?: strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    $desc = $_POST['description'];
    $image = $_POST['image'];
    $sort = intval($_POST['sort_order']);

    if ($id) {
        $stmt = $db->prepare("UPDATE categories SET name=?, slug=?, description=?, image=?, sort_order=? WHERE id=?");
        $stmt->bind_param("ssssii", $name, $slug, $desc, $image, $sort, $id);
    } else {
        $stmt = $db->prepare("INSERT INTO categories (name, slug, description, image, sort_order) VALUES (?,?,?,?,?)");
        $stmt->bind_param("ssssi", $name, $slug, $desc, $image, $sort);
    }
    $stmt->execute();
    header('Location: categories.php');
    exit;
}
?>

<div style="max-width: 800px;">
    <form method="POST" class="checkout-form" style="background:#111; padding:40px; border-radius:12px;">
        <div class="form-group">
            <label>分類名稱 <span>*</span></label>
            <input type="text" name="name" required value="<?= htmlspecialchars($category['name']) ?>" placeholder="例如：秋冬系列">
        </div>
        
        <div class="form-group">
            <label>網址路徑 (Slug) <span>*</span></label>
            <input type="text" name="slug" required value="<?= htmlspecialchars($category['slug']) ?>" placeholder="例如：winter-collection">
        </div>

        <div class="form-group">
            <label>描述</label>
            <textarea name="description" rows="3" style="background:#1a1a1a; color:#fff; border:1px solid #333; padding:14px; width:100%; border-radius:8px;"><?= htmlspecialchars($category['description']) ?></textarea>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>分類圖片 URL</label>
                <input type="text" name="image" value="<?= htmlspecialchars($category['image']) ?>" placeholder="https://...">
            </div>
            <div class="form-group">
                <label>顯示排序 (數字越小越前面)</label>
                <input type="number" name="sort_order" value="<?= $category['sort_order'] ?>">
            </div>
        </div>

        <div style="display: flex; gap: 15px; margin-top: 30px;">
            <button type="submit" class="btn btn-primary" style="flex:1">儲存分類</button>
            <a href="categories.php" class="btn btn-outline" style="flex:1; text-align:center; padding:18px;">取消</a>
        </div>
    </form>
</div>

</main>
</body>
</html>
