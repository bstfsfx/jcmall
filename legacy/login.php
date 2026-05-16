<?php
$pageTitle = '會員登入';
$errors = [];

require_once 'config.php';
if (isset($_SESSION['user_id'])) { header('Location: index.php'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = getDB();
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email) $errors[] = '請輸入電子郵件';
    if (!$password) $errors[] = '請輸入密碼';

    if (empty($errors)) {
        $stmt = $db->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            header('Location: index.php');
            exit;
        } else {
            $errors[] = '電子郵件或密碼錯誤';
        }
    }
}

include 'includes/header.php';
?>

<section class="auth-section">
  <div class="auth-container">
    <div class="auth-visual">
      <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" alt="JC mall Fashion">
      <div class="auth-visual-overlay">
        <h2>歡迎回來</h2>
        <p>登入以享受專屬會員優惠與個人化購物體驗</p>
      </div>
    </div>

    <div class="auth-form-wrap">
      <div class="auth-form-inner">
        <a href="index.php" class="auth-logo">JC mall</a>
        <h1 class="auth-title">會員登入</h1>
        <p class="auth-subtitle">輸入您的帳號資訊以登入</p>

        <?php if ($errors): ?>
          <div class="form-errors">
            <?php foreach ($errors as $e): ?>
              <p><i class="fas fa-exclamation-circle"></i> <?= htmlspecialchars($e) ?></p>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <form method="POST" class="auth-form">
          <div class="form-group">
            <label for="email">電子郵件</label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" name="email" placeholder="your@email.com" value="<?= htmlspecialchars($email ?? '') ?>" required>
            </div>
          </div>
          <div class="form-group">
            <label for="password">密碼</label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password" name="password" placeholder="請輸入密碼" required>
            </div>
          </div>
          <div class="form-row-between">
            <label class="checkbox-label">
              <input type="checkbox" name="remember"> 記住我
            </label>
            <a href="#" class="form-link">忘記密碼？</a>
          </div>
          <button type="submit" class="btn btn-primary btn-full">登入</button>
        </form>

        <div class="auth-divider"><span>或</span></div>

        <div class="social-login">
          <button class="social-btn"><i class="fab fa-google"></i> Google 登入</button>
          <button class="social-btn"><i class="fab fa-facebook-f"></i> Facebook 登入</button>
        </div>

        <p class="auth-switch">還沒有帳號？<a href="register.php">立即註冊</a></p>
      </div>
    </div>
  </div>
</section>

<script src="assets/js/main.js"></script>
</body>
</html>
