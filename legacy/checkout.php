<?php
require_once 'config.php';
$db = getDB();
$sid = session_id();

// 獲取購物車項目
$q = $db->prepare("
    SELECT c.*, p.name, p.image, COALESCE(p.sale_price, p.price) AS unit_price, p.description
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.session_id = ?
");
$q->bind_param("s", $sid);
$q->execute();
$items = $q->get_result()->fetch_all(MYSQLI_ASSOC);

if (empty($items)) {
    header('Location: cart.php');
    exit;
}

$subtotal = 0;
foreach ($items as $it) {
    $subtotal += $it['quantity'] * $it['unit_price'];
}
$shipping = $subtotal > 2000 ? 0 : 150;
$total = $subtotal + $shipping;

$pageTitle = '結帳 — JC mall';
include 'includes/header.php';
?>

<section class="section-padding" style="background: #0a0a0a; color: #f5f0eb;">
  <div class="container">
    <form action="process_checkout.php" method="POST" class="checkout-container" style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px;">
      
      <!-- 左側：流程與資訊 -->
      <div class="checkout-left">
        <!-- 1. 收件資訊 -->
        <div class="checkout-section" style="margin-bottom: 50px;">
          <h2 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 30px; display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-map-marker-alt" style="color: var(--gold);"></i> 收件資訊
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div class="field">
              <label style="font-size: 0.8rem; color: #9a958e; margin-bottom: 8px; display: block;">收件人姓名 <span style="color: var(--gold);">*</span></label>
              <input type="text" name="name" required placeholder="請輸入姓名" style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none;">
            </div>
            <div class="field">
              <label style="font-size: 0.8rem; color: #9a958e; margin-bottom: 8px; display: block;">聯絡電話 <span style="color: var(--gold);">*</span></label>
              <input type="tel" name="phone" required placeholder="09xx-xxx-xxx" style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none;">
            </div>
          </div>

          <div class="field" style="margin-bottom: 20px;">
            <label style="font-size: 0.8rem; color: #9a958e; margin-bottom: 8px; display: block;">電子郵件 <span style="color: var(--gold);">*</span></label>
            <input type="email" name="email" required placeholder="用於接收訂單確認信" style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none;">
          </div>

          <div class="field" style="margin-bottom: 20px;">
            <label style="font-size: 0.8rem; color: #9a958e; margin-bottom: 8px; display: block;">收件地址 <span style="color: var(--gold);">*</span></label>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 12px; margin-bottom: 12px;">
              <select id="county" name="county" required style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none;">
                <option value="">選擇縣市</option>
              </select>
              <select id="district" name="district" required style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none;">
                <option value="">選擇地區</option>
              </select>
              <select id="road_select" name="road_select" required style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none;">
                <option value="">選擇道路</option>
              </select>
              <input type="hidden" name="road" id="road_hidden">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
              <div style="display: flex; align-items: center; background: #161616; border: 1px solid #2a2725; border-radius: 6px; padding: 0 10px;">
                <input type="text" name="lane" placeholder="巷" style="width: 100%; background: transparent; border: none; padding: 14px 0; color: #fff; outline: none; text-align: center;">
                <span style="color: #5a5650; font-size: 0.8rem;">巷</span>
              </div>
              <div style="display: flex; align-items: center; background: #161616; border: 1px solid #2a2725; border-radius: 6px; padding: 0 10px;">
                <input type="text" name="number" required placeholder="號" style="width: 100%; background: transparent; border: none; padding: 14px 0; color: #fff; outline: none; text-align: center;">
                <span style="color: #5a5650; font-size: 0.8rem;">號</span>
              </div>
              <div style="display: flex; align-items: center; background: #161616; border: 1px solid #2a2725; border-radius: 6px; padding: 0 10px;">
                <input type="text" name="floor" placeholder="樓" style="width: 100%; background: transparent; border: none; padding: 14px 0; color: #fff; outline: none; text-align: center;">
                <span style="color: #5a5650; font-size: 0.8rem;">樓</span>
              </div>
            </div>
          </div>

          <div class="field">
            <label style="font-size: 0.8rem; color: #9a958e; margin-bottom: 8px; display: block;">訂單備註</label>
            <textarea name="notes" rows="4" placeholder="如有特殊需求請在此備註..." style="width: 100%; background: #161616; border: 1px solid #2a2725; padding: 14px; border-radius: 6px; color: #fff; outline: none; resize: none;"></textarea>
          </div>
        </div>

        <!-- 2. 付款方式 -->
        <div class="checkout-section">
          <h2 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 30px; display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-credit-card" style="color: var(--gold);"></i> 付款方式
          </h2>
          <div class="payment-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <label class="payment-card active">
              <input type="radio" name="payment" value="credit" checked style="display: none;">
              <div class="pay-icon"><i class="fas fa-credit-card"></i></div>
              <div class="pay-info"><p class="pay-name">信用卡</p><p class="pay-desc">Visa / Mastercard / JCB</p></div>
            </label>
            <label class="payment-card">
              <input type="radio" name="payment" value="atm" style="display: none;">
              <div class="pay-icon"><i class="fas fa-university"></i></div>
              <div class="pay-info"><p class="pay-name">ATM 轉帳</p><p class="pay-desc">銀行匯款</p></div>
            </label>
            <label class="payment-card">
              <input type="radio" name="payment" value="linepay" style="display: none;">
              <div class="pay-icon"><i class="fab fa-line"></i></div>
              <div class="pay-info"><p class="pay-name">LINE Pay</p><p class="pay-desc">即時線上支付</p></div>
            </label>
            <label class="payment-card">
              <input type="radio" name="payment" value="cod" style="display: none;">
              <div class="pay-icon"><i class="fas fa-truck"></i></div>
              <div class="pay-info"><p class="pay-name">貨到付款</p><p class="pay-desc">現金交易</p></div>
            </label>
          </div>
        </div>
      </div>

      <!-- 右側：摘要 -->
      <div class="checkout-right">
        <div class="summary-box" style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 30px; position: sticky; top: 120px;">
          <h3 style="font-size: 1.1rem; font-weight: 500; margin-bottom: 25px;">訂單商品</h3>
          <div class="order-items-list" style="margin-bottom: 30px; max-height: 400px; overflow-y: auto;">
            <?php foreach ($items as $it): ?>
            <div style="display: flex; gap: 15px; margin-bottom: 20px; align-items: center;">
              <img src="<?= htmlspecialchars($it['image']) ?>" style="width: 70px; height: 80px; object-fit: cover; border-radius: 6px;">
              <div style="flex: 1;">
                <p style="font-size: 0.9rem; color: #fff; margin-bottom: 4px;"><?= htmlspecialchars($it['name']) ?></p>
                <p style="font-size: 0.75rem; color: #5a5650;">數量：<?= $it['quantity'] ?></p>
              </div>
              <p style="font-size: 0.95rem; color: #fff; font-weight: 500;">NT$<?= number_format($it['unit_price'] * $it['quantity'], 0) ?></p>
            </div>
            <?php endforeach; ?>
          </div>
          <div class="summary-details" style="border-top: 1px solid #222; padding-top: 25px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem;">
              <span style="color: #9a958e;">商品小計</span><span>NT$<?= number_format($subtotal, 0) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 0.95rem;">
              <span style="color: #9a958e;">運費</span><span style="color: <?= $shipping === 0 ? '#4caf50' : '#fff' ?>;"><?= $shipping === 0 ? '免運費' : 'NT$'.number_format($shipping, 0) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px;">
              <span style="font-size: 1.1rem; color: var(--gold); font-weight: 500;">應付總計</span><span style="font-size: 1.4rem; color: var(--gold); font-weight: 600;">NT$<?= number_format($total, 0) ?></span>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; height: 56px; border-radius: 6px;">確認下單</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>

<style>
.payment-card { background: #161616; border: 1px solid #2a2725; border-radius: 8px; padding: 20px; display: flex; align-items: center; gap: 20px; cursor: pointer; transition: 0.3s; }
.payment-card.active { border-color: var(--gold); background: rgba(201,169,110,0.05); }
.pay-name { font-size: 0.95rem; color: #fff; font-weight: 500; }
.pay-desc { font-size: 0.75rem; color: #5a5650; }
</style>

<script>
const twAddress = {
  "台北市": {
    "中正區": ["忠孝西路", "中華路", "重慶南路", "凱達格蘭大道", "中山南路", "羅斯福路", "杭州南路", "金山南路", "仁愛路", "信義路"],
    "萬華區": ["西寧南路", "成都路", "昆明街", "廣州街", "康定路", "桂林路", "和平西路", "艋舺大道"],
    "信義區": ["基隆路", "松山路", "忠孝東路", "仁愛路", "信義路", "吳興街", "松仁路", "松智路", "松高路"],
    "大安區": ["忠孝東路", "信義路", "和平東路", "復興南路", "建國南路", "新生南路", "敦化南路", "安和路"]
  },
  "新北市": {
    "板橋區": ["文化路", "縣民大道", "中山路", "四川路", "館前路", "民生路", "雙十路"],
    "三重區": ["重新路", "正義北路", "三和路", "重陽路", "自強路", "中正北路"]
  },
  "台中市": {
    "西屯區": ["台灣大道", "黎明路", "文心路", "惠來路", "市政路", "河南路", "福科路"],
    "北區": ["健行路", "崇德路", "進化北路", "中清路", "英才路", "學士路"]
  }
};

const countyS = document.getElementById('county');
const districtS = document.getElementById('district');
const roadS = document.getElementById('road_select');
const roadH = document.getElementById('road_hidden');

// 初始化
for (let c in twAddress) {
  let opt = document.createElement('option'); opt.value = c; opt.textContent = c; countyS.appendChild(opt);
}

countyS.addEventListener('change', function() {
  const ds = twAddress[this.value] || {};
  districtS.innerHTML = '<option value="">選擇地區</option>';
  roadS.innerHTML = '<option value="">選擇道路</option>';
  for (let d in ds) {
    let opt = document.createElement('option'); opt.value = d; opt.textContent = d; districtS.appendChild(opt);
  }
});

districtS.addEventListener('change', function() {
  const c = countyS.value;
  const rs = (twAddress[c] && twAddress[c][this.value]) ? twAddress[c][this.value] : [];
  roadS.innerHTML = '<option value="">選擇道路</option>';
  rs.forEach(r => {
    let opt = document.createElement('option'); opt.value = r; opt.textContent = r; roadS.appendChild(opt);
  });
  let other = document.createElement('option'); other.value = "other"; other.textContent = "─ 其他 (手動) ─"; roadS.appendChild(other);
});

roadS.addEventListener('change', function() {
  if (this.value === 'other') {
    const res = prompt('請輸入道路名稱：');
    if (res) {
      let opt = document.createElement('option'); opt.value = res; opt.textContent = res;
      this.insertBefore(opt, this.firstChild); this.value = res; roadH.value = res;
    }
  } else { roadH.value = this.value; }
});

document.querySelectorAll('.payment-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.payment-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active'); card.querySelector('input').checked = true;
  });
});
</script>
<?php include 'includes/footer.php'; ?>
