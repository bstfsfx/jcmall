<?php
require_once '../config.php';
$errors = [];

if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin') {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = getDB();
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    // 直接從資料庫搜尋身分
    $stmt = $db->prepare("SELECT id, name, role, password FROM users WHERE email = ? AND role = 'admin'");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = 'admin';
        header('Location: index.php');
        exit;
    }
    $errors[] = '帳號或密碼錯誤';
}
?>
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>JC mall Admin — 管理員登入</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        body { background: #050505; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .login-box { background: #111; border: 1px solid #222; padding: 50px; border-radius: 16px; width: 100%; max-width: 400px; text-align: center; }
        .login-logo { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; letter-spacing: 10px; color: #c9a96e; margin-bottom: 30px; display: block; }
        .form-group { text-align: left; margin-bottom: 20px; }
        .form-group label { color: #999; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; display: block; }
        .form-group input { width: 100%; background: #1a1a1a; border: 1px solid #333; padding: 14px; color: #fff; border-radius: 8px; }
        .form-group input:focus { border-color: #c9a96e; outline: none; }
        .btn-admin { background: #c9a96e; color: #000; width: 100%; padding: 16px; border-radius: 8px; font-weight: 600; letter-spacing: 2px; margin-top: 10px; }
        .error-msg { color: #e74c3c; font-size: 0.9rem; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="login-box">
        <a href="../index.php" class="login-logo">JC MALL</a>
        <h2 style="color:#fff; margin-bottom:30px; font-weight:300;">後台管理系統</h2>
        
        <?php if($errors): ?>
            <div class="error-msg"><?= $errors[0] ?></div>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label>管理員帳號</label>
                <input type="text" name="username" required placeholder="admin">
            </div>
            <div class="form-group">
                <label>密碼</label>
                <input type="password" name="password" required placeholder="admin">
            </div>
            <button type="submit" class="btn-admin">登入系統</button>
        </form>
    </div>
</body>
</html>
