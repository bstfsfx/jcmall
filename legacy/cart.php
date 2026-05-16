<?php
require_once 'config.php';
$db = getDB();
$sid = session_id();

// 獲取購物車項目
$q = $db->prepare("
    SELECT c.id AS cart_id, c.quantity, p.id AS p_id, p.name, p.image, p.slug, 
           COALESCE(p.sale_price, p.price) AS unit_price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.session_id = ?
    ORDER BY c.created_at DESC
");
$q->bind_param("s", $sid);
$q->execute();
$items = $q->get_result()->fetch_all(MYSQLI_ASSOC);

$subtotal = 0;
foreach ($items as $it) {
    $subtotal += $it['quantity'] * $it['unit_price'];
}
$shipping = ($subtotal > 2000 || $subtotal == 0) ? 0 : 150;
$total = $subtotal + $shipping;

$pageTitle = '購物車 — JC mall';
include 'includes/header.php';
?>

<section class="section-padding" style="background: #0a0a0a; min-height: 90vh;">
  <div class="container">
    <div class="cart-wrapper" style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 30px; align-items: flex-start;">
      
      <!-- 左側：商品清單 -->
      <div class="cart-items-box" style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 40px;">
        <div class="cart-header" style="display: grid; grid-template-columns: 2.5fr 1fr 1fr 1fr 40px; padding-bottom: 20px; border-bottom: 1px solid #222; color: #5a5650; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">
          <span>商品</span>
          <span style="text-align: center;">單價</span>
          <span style="text-align: center;">數量</span>
          <span style="text-align: center; color: var(--gold);">小計</span>
          <span></span>
        </div>

        <div class="cart-body">
          <?php if (empty($items)): ?>
            <div style="text-align: center; padding: 100px 0;">
              <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #222; margin-bottom: 20px; display: block;"></i>
              <p style="color: #9a958e;">您的購物車目前是空的</p>
              <a href="products.php" class="btn btn-primary" style="margin-top: 30px;">前往購物</a>
            </div>
          <?php else: foreach ($items as $it): ?>
            <div class="cart-row" style="display: grid; grid-template-columns: 2.5fr 1fr 1fr 1fr 40px; align-items: center; padding: 30px 0; border-bottom: 1px solid #1a1a1a;">
              <!-- 商品資訊 -->
              <div style="display: flex; gap: 20px; align-items: center;">
                <img src="<?= htmlspecialchars($it['image']) ?>" style="width: 80px; height: 100px; object-fit: cover; border-radius: 6px; background: #161616;">
                <div>
                  <p style="font-size: 0.7rem; color: #5a5650; letter-spacing: 1px; margin-bottom: 5px;">JC MALL 精選系列</p>
                  <a href="product.php?slug=<?= $it['slug'] ?>" style="color: #fff; font-size: 1rem; text-decoration: none; font-weight: 500;"><?= htmlspecialchars($it['name']) ?></a>
                </div>
              </div>
              
              <!-- 單價 -->
              <div style="text-align: center; font-size: 0.95rem; color: #fff;">
                NT$<?= number_format($it['unit_price'], 0) ?>
              </div>

              <!-- 數量控制 -->
              <div style="display: flex; justify-content: center;">
                <div class="qty-control" style="display: flex; align-items: center; background: #1a1a1a; border-radius: 4px; padding: 5px;">
                  <button onclick="updateQty(<?= $it['cart_id'] ?>, -1)" style="background:none; border:none; color:#5a5650; padding:0 10px; cursor:pointer;">−</button>
                  <span style="width: 30px; text-align: center; color: #fff; font-size: 0.9rem;"><?= $it['quantity'] ?></span>
                  <button onclick="updateQty(<?= $it['cart_id'] ?>, 1)" style="background:none; border:none; color:#5a5650; padding:0 10px; cursor:pointer;">+</button>
                </div>
              </div>

              <!-- 小計 -->
              <div style="text-align: center; font-size: 1rem; color: var(--gold); font-weight: 600;">
                NT$<?= number_format($it['unit_price'] * $it['quantity'], 0) ?>
              </div>

              <!-- 移除 -->
              <div style="text-align: right;">
                <button onclick="removeItem(<?= $it['cart_id'] ?>)" style="background:none; border:none; color:#333; cursor:pointer; font-size: 1.1rem; transition: 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#333'">×</button>
              </div>
            </div>
          <?php endforeach; endif; ?>
        </div>

        <div class="cart-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px;">
          <a href="products.php" style="color: #9a958e; font-size: 0.85rem; text-decoration: none; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-arrow-left"></i> 繼續購物
          </a>
          <button onclick="clearCart()" style="background: none; border: none; color: #333; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#333'">
            <i class="fas fa-trash-alt"></i> 清空購物車
          </button>
        </div>
      </div>

      <!-- 右側：訂單摘要 -->
      <div class="cart-summary-box" style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 40px; position: sticky; top: 120px;">
        <h3 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 30px; color: #fff;">訂單摘要</h3>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 0.95rem;">
          <span style="color: #9a958e;">商品小計</span>
          <span style="color: #fff;">NT$<?= number_format($subtotal, 0) ?></span>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 0.95rem;">
          <span style="color: #9a958e;">運費</span>
          <span style="color: <?= $shipping == 0 ? '#4caf50' : '#fff' ?>;"><?= $shipping == 0 ? '免運費' : 'NT$'.number_format($shipping, 0) ?></span>
        </div>

        <hr style="border: 0; border-top: 1px solid #222; margin-bottom: 30px;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
          <span style="font-size: 1.1rem; color: #fff;">總計</span>
          <span style="font-size: 1.4rem; color: var(--gold); font-weight: 600;">NT$<?= number_format($total, 0) ?></span>
        </div>

        <a href="checkout.php" class="btn btn-primary" style="width: 100%; justify-content: center; height: 60px; font-size: 1.05rem; letter-spacing: 1px;">
          前往結帳 <i class="fas fa-arrow-right" style="margin-left: 10px;"></i>
        </a>

        <p style="text-align: center; color: #5a5650; font-size: 0.75rem; margin-top: 20px;">
          <i class="fas fa-shield-alt"></i> 安全加密結帳
        </p>
      </div>

    </div>
  </div>
</section>

<script>
function updateQty(cartId, delta) {
    const formData = new FormData();
    formData.append('action', 'update_delta');
    formData.append('cart_id', cartId);
    formData.append('delta', delta);

    fetch('cart_api.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
        if (data.success) location.reload();
    });
}

function removeItem(cartId) {
    const formData = new FormData();
    formData.append('action', 'remove');
    formData.append('cart_id', cartId);

    fetch('cart_api.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
        if (data.success) location.reload();
    });
}

function clearCart() {
    if (!confirm('確定要清空購物車嗎？')) return;
    const formData = new FormData();
    formData.append('action', 'clear');

    fetch('cart_api.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
        if (data.success) location.reload();
    });
}
</script>

<?php include 'includes/footer.php'; ?>
