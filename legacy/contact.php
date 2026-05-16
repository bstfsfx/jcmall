<?php
$pageTitle = '聯繫我們';
$pageDesc = '有任何問題嗎？歡迎隨時與 JC mall 聯繫。';
$msgSent = false;
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!$name) $errors[] = '請輸入您的姓名';
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = '請輸入有效的電子郵件';
    if (!$message) $errors[] = '請輸入您的訊息';

    if (empty($errors)) {
        // In production, save to DB or send email
        $msgSent = true;
    }
}

include 'includes/header.php';
?>

<!-- Page Hero -->
<section class="page-hero">
  <div class="container">
    <p class="section-tag">與我們對話</p>
    <h1 class="page-hero-title">聯繫我們</h1>
    <div class="breadcrumb">
      <a href="index.php">首頁</a><span>/</span><span>聯繫我們</span>
    </div>
  </div>
</section>

<section class="section-padding">
  <div class="container">
    <div class="contact-layout">
      <!-- Contact Info -->
      <div class="contact-info">
        <h2 class="contact-info-title">我們樂意為您服務</h2>
        <p class="contact-info-desc">無論您有任何問題、建議，或希望了解更多關於我們的商品與服務，都歡迎隨時與我們聯繫。</p>

        <div class="contact-cards">
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h4>門市地址</h4>
            <p>台北市信義區松仁路100號<br>JC mall 旗艦店 1F</p>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-phone-alt"></i></div>
            <h4>聯繫電話</h4>
            <p>+886 2-2345-6789<br>週一至週五 10:00 – 19:00</p>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
            <h4>電子郵件</h4>
            <p>service@jacky-fashion.com<br>我們將於24小時內回覆</p>
          </div>
          <div class="contact-card">
            <div class="contact-card-icon"><i class="fab fa-instagram"></i></div>
            <h4>社群媒體</h4>
            <p>@jacky.fashion<br>追蹤我們獲取最新動態</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form-wrap">
        <?php if ($msgSent): ?>
          <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>訊息已送出！</h3>
            <p>感謝您的來信，我們將盡快與您聯繫。</p>
          </div>
        <?php else: ?>
          <?php if ($errors): ?>
            <div class="form-errors">
              <?php foreach ($errors as $e): ?>
                <p><i class="fas fa-exclamation-circle"></i> <?= htmlspecialchars($e) ?></p>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>

          <form method="POST" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">姓名 <span>*</span></label>
                <input type="text" id="name" name="name" placeholder="您的姓名" value="<?= htmlspecialchars($name ?? '') ?>" required>
              </div>
              <div class="form-group">
                <label for="email">電子郵件 <span>*</span></label>
                <input type="email" id="email" name="email" placeholder="your@email.com" value="<?= htmlspecialchars($email ?? '') ?>" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="phone">聯繫電話</label>
                <input type="tel" id="phone" name="phone" placeholder="09xx-xxx-xxx" value="<?= htmlspecialchars($phone ?? '') ?>">
              </div>
              <div class="form-group">
                <label for="subject">主題</label>
                <select id="subject" name="subject">
                  <option value="">請選擇主題</option>
                  <option value="order" <?= ($subject??'')==='order'?'selected':'' ?>>訂單查詢</option>
                  <option value="product" <?= ($subject??'')==='product'?'selected':'' ?>>商品諮詢</option>
                  <option value="return" <?= ($subject??'')==='return'?'selected':'' ?>>退換貨</option>
                  <option value="cooperation" <?= ($subject??'')==='cooperation'?'selected':'' ?>>商業合作</option>
                  <option value="other" <?= ($subject??'')==='other'?'selected':'' ?>>其他</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="message">訊息內容 <span>*</span></label>
              <textarea id="message" name="message" rows="6" placeholder="請輸入您的訊息..." required><?= htmlspecialchars($message ?? '') ?></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full">
              <i class="fas fa-paper-plane"></i> 送出訊息
            </button>
          </form>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
