<?php
$currentPage = 'products';
$id = $_GET['id'] ?? null;
$adminTitle = $id ? '編輯商品' : '新增商品';
require_once 'includes/header.php';
$db = getDB();

$product = [
    'name' => '', 'slug' => '', 'category_id' => '', 'price' => '', 
    'sale_price' => '', 'image' => '', 'description' => '', 
    'stock' => 0, 'status' => 'active', 'is_featured' => 0, 'is_new' => 1
];

if ($id) {
    $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $product = $stmt->get_result()->fetch_assoc();
}

// 獲取分類
$categories = $db->query("SELECT * FROM categories ORDER BY sort_order");

// 處理提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $slug = $_POST['slug'] ?: strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    $cat_id = $_POST['category_id'];
    $price = $_POST['price'];
    $sale_price = $_POST['sale_price'] ?: null;
    $image = $_POST['image'];
    $desc = $_POST['description'];
    $stock = $_POST['stock'];
    $status = $_POST['status'];
    $featured = isset($_POST['is_featured']) ? 1 : 0;
    $new = isset($_POST['is_new']) ? 1 : 0;

    if ($id) {
        $stmt = $db->prepare("UPDATE products SET name=?, slug=?, category_id=?, price=?, sale_price=?, image=?, description=?, stock=?, status=?, is_featured=?, is_new=? WHERE id=?");
        $stmt->bind_param("ssiddssisiii", $name, $slug, $cat_id, $price, $sale_price, $image, $desc, $stock, $status, $featured, $new, $id);
    } else {
        $stmt = $db->prepare("INSERT INTO products (name, slug, category_id, price, sale_price, image, description, stock, status, is_featured, is_new) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("ssiddssisii", $name, $slug, $cat_id, $price, $sale_price, $image, $desc, $stock, $status, $featured, $new);
    }
    $stmt->execute();
    header('Location: products.php');
    exit;
}
?>

<div style="max-width: 800px;">
    <form method="POST" class="checkout-form" style="background:#111; padding:40px; border-radius:12px;">
        <div class="form-group">
            <label>商品名稱 <span>*</span></label>
            <input type="text" name="name" required value="<?= htmlspecialchars($product['name']) ?>" placeholder="例如：經典絲綢洋裝">
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>網址路徑 (Slug)</label>
                <input type="text" name="slug" value="<?= htmlspecialchars($product['slug']) ?>" placeholder="留空將自動生成">
            </div>
            <div class="form-group">
                <label>商品分類 <span>*</span></label>
                <select name="category_id" required style="background:#1a1a1a; color:#fff; border:1px solid #333; padding:14px; width:100%; border-radius:8px;">
                    <option value="">請選擇分類</option>
                    <?php while($c = $categories->fetch_assoc()): ?>
                        <option value="<?= $c['id'] ?>" <?= $product['category_id']==$c['id']?'selected':'' ?>>
                            <?= htmlspecialchars($c['name']) ?>
                        </option>
                    <?php endwhile; ?>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>原價 <span>*</span></label>
                <input type="number" name="price" step="0.01" required value="<?= $product['price'] ?>">
            </div>
            <div class="form-group">
                <label>特價 (選填)</label>
                <input type="number" name="sale_price" step="0.01" value="<?= $product['sale_price'] ?>">
            </div>
        </div>

        <div class="form-group">
            <label>圖片網址 <span>*</span></label>
            <input type="text" name="image" required value="<?= htmlspecialchars($product['image']) ?>" placeholder="https://...">
        </div>

        <div class="form-group">
            <label>商品描述</label>
            <textarea name="description" rows="5" style="background:#1a1a1a; color:#fff; border:1px solid #333; padding:14px; width:100%; border-radius:8px;"><?= htmlspecialchars($product['description']) ?></textarea>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>庫存數量</label>
                <input type="number" name="stock" value="<?= $product['stock'] ?>">
            </div>
            <div class="form-group">
                <label>上架狀態</label>
                <select name="status" style="background:#1a1a1a; color:#fff; border:1px solid #333; padding:14px; width:100%; border-radius:8px;">
                    <option value="active" <?= $product['status']==='active'?'selected':'' ?>>上架中</option>
                    <option value="inactive" <?= $product['status']==='inactive'?'selected':'' ?>>已下架</option>
                </select>
            </div>
        </div>

        <div style="display: flex; gap: 30px; margin: 20px 0;">
            <label class="checkbox-label">
                <input type="checkbox" name="is_featured" <?= $product['is_featured']?'checked':'' ?>> 精選商品 (顯示於首頁)
            </label>
            <label class="checkbox-label">
                <input type="checkbox" name="is_new" <?= $product['is_new']?'checked':'' ?>> 新品標記
            </label>
        </div>

        <div style="display: flex; gap: 15px; margin-top: 30px;">
            <button type="submit" class="btn btn-primary" style="flex:1">儲存商品</button>
            <a href="products.php" class="btn btn-outline" style="flex:1; text-align:center; padding:18px;">取消</a>
        </div>
    </form>
</div>

</main>
</body>
</html>
