<?php
$pageTitle = '會員註冊';
$errors = [];
$success = false;

require_once 'config.php';
if (isset($_SESSION['user_id'])) { header('Location: index.php'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = getDB();
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $password2 = $_POST['password2'] ?? '';

    if (!$name) $errors[] = '請輸入姓名';
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = '請輸入有效的電子郵件';
    if (strlen($password) < 6) $errors[] = '密碼至少需要6個字元';
    if ($password !== $password2) $errors[] = '兩次密碼輸入不一致';

    // Check duplicate email
    if (empty($errors)) {
        $chk = $db->prepare("SELECT id FROM users WHERE email = ?");
        $chk->bind_param("s", $email);
        $chk->execute();
        if ($chk->get_result()->num_rows > 0) {
            $errors[] = '此電子郵件已被註冊';
        }
    }

    if (empty($errors)) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'customer')");
        $stmt->bind_param("ssss", $name, $email, $phone, $hash);
        if ($stmt->execute()) {
            $_SESSION['user_id'] = $stmt->insert_id;
            $_SESSION['user_name'] = $name;
            $_SESSION['user_email'] = $email;
            $_SESSION['user_role'] = 'customer';
            $success = true;
        } else {
            $errors[] = '註冊失敗，請稍後再試';
        }
    }
}

if ($success) {
    header('Location: index.php');
    exit;
}

include 'includes/header.php';
?>

<section class="auth-section">
  <div class="auth-container">
    <div class="auth-visual">
      <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="JC mall Fashion">
      <div class="auth-visual-overlay">
        <h2>加入 JC mall</h2>
        <p>成為會員即享專屬折扣、新品搶先看與個人化推薦</p>
      </div>
    </div>

    <div class="auth-form-wrap">
      <div class="auth-form-inner">
        <a href="index.php" class="auth-logo">JC mall</a>
        <h1 class="auth-title">建立帳號</h1>
        <p class="auth-subtitle">只需幾步即可開始您的時尚旅程</p>

        <?php if ($errors): ?>
          <div class="form-errors">
            <?php foreach ($errors as $e): ?>
              <p><i class="fas fa-exclamation-circle"></i> <?= htmlspecialchars($e) ?></p>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <form method="POST" class="auth-form">
          <div class="form-group">
            <label for="name">姓名 <span>*</span></label>
            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input type="text" id="name" name="name" placeholder="您的姓名" value="<?= htmlspecialchars($name ?? '') ?>" required>
            </div>
          </div>
          <div class="form-group">
            <label for="email">電子郵件 <span>*</span></label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" name="email" placeholder="your@email.com" value="<?= htmlspecialchars($email ?? '') ?>" required>
            </div>
          </div>
          <div class="form-group">
            <label for="phone">聯繫電話</label>
            <div class="input-icon">
              <i class="fas fa-phone"></i>
              <input type="tel" id="phone" name="phone" placeholder="09xx-xxx-xxx" value="<?= htmlspecialchars($phone ?? '') ?>">
            </div>
          </div>
          <div class="form-group">
            <label for="password">密碼 <span>*</span></label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password" name="password" placeholder="至少6個字元" required minlength="6">
            </div>
          </div>
          <div class="form-group">
            <label for="password2">確認密碼 <span>*</span></label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password2" name="password2" placeholder="再次輸入密碼" required>
            </div>
          </div>
          <label class="checkbox-label" style="margin-bottom:20px">
            <input type="checkbox" required> 我已閱讀並同意 <a href="#" class="form-link">服務條款</a> 與 <a href="#" class="form-link">隱私權政策</a>
          </label>
          <button type="submit" class="btn btn-primary btn-full">建立帳號</button>
        </form>

        <p class="auth-switch">已有帳號？<a href="login.php">立即登入</a></p>
      </div>
    </div>
  </div>
</section>

<script src="assets/js/main.js"></script>
</body>
</html>
