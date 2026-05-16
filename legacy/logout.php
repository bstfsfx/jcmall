<?php
require_once 'config.php';

// 清除所有 Session 變數
$_SESSION = array();

// 如果要銷毀 Session，也必須清除 Session Cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// 最後徹底銷毀 Session
session_destroy();

// 重新導向至首頁
header('Location: index.php');
exit;
