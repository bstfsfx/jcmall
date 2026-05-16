<?php
require_once 'config.php';
$orderNum = $_GET['no'] ?? 'JK' . date('YmdHis');
$pageTitle = '訂單完成 — JC mall';
include 'includes/header.php';
?>

<section class="section-padding" style="min-height: 80vh; display: flex; align-items: center;">
  <div class="container text-center reveal">
    <!-- Success Animation Icon -->
    <div class="success-checkmark">
      <div class="check-icon">
        <span class="icon-line line-tip"></span>
        <span class="icon-line line-long"></span>
        <div class="icon-circle"></div>
        <div class="icon-fix"></div>
      </div>
    </div>

    <p class="section-tag">感謝您的訂購</p>
    <h1 style="font-family: var(--font-display); font-size: 3rem; font-weight: 300; margin-bottom: 20px;">
      訂單已成功提交
    </h1>
    <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 40px; line-height: 1.8;">
      我們已收到您的訂單。專業團隊正在為您精心包裝商品，完成出貨後我們將透過電子郵件通知您。
    </p>

    <div style="background: var(--bg-secondary); padding: 30px; border-radius: 12px; display: inline-block; border: 1px solid var(--border); margin-bottom: 40px;">
      <p style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">訂單追蹤編號</p>
      <p style="font-size: 1.5rem; font-family: var(--font-ui); color: var(--gold); letter-spacing: 2px; font-weight: 600;">
        <?= htmlspecialchars($orderNum) ?>
      </p>
    </div>

    <div style="display: flex; gap: 20px; justify-content: center;">
      <a href="index.php" class="btn btn-primary">返回首頁</a>
      <a href="products.php" class="btn btn-outline">繼續購物</a>
    </div>
  </div>
</section>

<style>
/* Success Checkmark Animation */
.success-checkmark {
    width: 80px; height: 80px; margin: 0 auto 30px;
}
.check-icon {
    width: 80px; height: 80px; position: relative; border-radius: 50%; box-sizing: content-box; border: 4px solid var(--gold);
}
.check-icon::before {
    top: 3px; left: -2px; width: 30px; transform-origin: 100% 50%; border-radius: 100px 0 0 100px;
}
.check-icon::after {
    top: 0; left: 30px; width: 60px; transform-origin: 0 50%; border-radius: 0 100px 100px 0; animation: rotate-circle 4.25s ease-in;
}
.icon-line {
    height: 5px; background-color: var(--gold); display: block; border-radius: 2px; position: absolute; z-index: 10;
}
.line-tip {
    top: 46px; left: 14px; width: 25px; transform: rotate(45deg); animation: icon-line-tip 0.75s;
}
.line-long {
    top: 38px; right: 8px; width: 47px; transform: rotate(-45deg); animation: icon-line-long 0.75s;
}
.icon-circle {
    top: -4px; left: -4px; z-index: 10; width: 80px; height: 80px; border-radius: 50%; border: 4px solid rgba(201,169,110,0.2); position: absolute; box-sizing: content-box;
}

@keyframes icon-line-tip {
    0% { width: 0; left: 1px; top: 19px; }
    54% { width: 0; left: 1px; top: 19px; }
    70% { width: 50px; left: -8px; top: 37px; }
    84% { width: 17px; left: 21px; top: 48px; }
    100% { width: 25px; left: 14px; top: 46px; }
}
@keyframes icon-line-long {
    0% { width: 0; right: 46px; top: 54px; }
    65% { width: 0; right: 46px; top: 54px; }
    84% { width: 55px; right: 0px; top: 35px; }
    100% { width: 47px; right: 8px; top: 38px; }
}
</style>

<?php include 'includes/footer.php'; ?>
