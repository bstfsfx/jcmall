<?php
require_once 'config.php';
$db = getDB();

$username = 'admin';
$password = 'admin';
$hashed = password_hash($password, PASSWORD_DEFAULT);

// 檢查是否已存在 admin 帳號
$check = $db->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $username);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
    // 更新密碼與權限
    $stmt = $db->prepare("UPDATE users SET password = ?, role = 'admin' WHERE email = ?");
    $stmt->bind_param("ss", $hashed, $username);
} else {
    // 新增帳號
    $stmt = $db->prepare("INSERT INTO users (name, email, password, role) VALUES ('Admin', ?, ?, 'admin')");
    $stmt->bind_param("ss", $username, $hashed);
}

if ($stmt->execute()) {
    echo "<h2>管理員帳號修復成功！</h2>";
    echo "<p>帳號：admin</p>";
    echo "<p>密碼：admin</p>";
    echo "<br><a href='admin/login.php'>前往後台登入</a>";
} else {
    echo "修復失敗：" . $db->error;
}
