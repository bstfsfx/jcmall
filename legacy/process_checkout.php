<?php
require_once 'config.php';
$db = getDB();
$sid = session_id();
$uid = $_SESSION['user_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: checkout.php');
    exit;
}

// 獲取表單數據
$name    = trim($_POST['name']);
$phone   = trim($_POST['phone']);
$email   = trim($_POST['email']);
$notes   = trim($_POST['notes']);

// 整合台灣地址資訊
$county   = trim($_POST['county']);
$district = trim($_POST['district']);
$road     = trim($_POST['road']);
$lane     = trim($_POST['lane']);
$number   = trim($_POST['number']);
$floor    = trim($_POST['floor']);

$address = $county . $district . $road;
if ($lane) $address .= $lane . "巷";
$address .= $number . "號";
if ($floor) $address .= $floor . "樓";

// 獲取購物車項目
$q = $db->prepare("
    SELECT c.*, p.name AS p_name, COALESCE(p.sale_price, p.price) AS unit_price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.session_id = ?
");
$q->bind_param("s", $sid);
$q->execute();
$items = $q->get_result()->fetch_all(MYSQLI_ASSOC);

if (empty($items)) {
    die("購物車為空，無法下單");
}

// 計算總金額
$subtotal = 0;
foreach ($items as $it) {
    $subtotal += $it['quantity'] * $it['unit_price'];
}
$shipping = $subtotal > 2000 ? 0 : 150;
$total = $subtotal + $shipping;
$orderNo = 'JK' . date('YmdHis') . rand(10, 99);

// 1. 建立訂單主檔
$stmt = $db->prepare("INSERT INTO orders (user_id, order_number, total, shipping_fee, shipping_name, shipping_phone, shipping_address, order_notes, status) VALUES (?,?,?,?,?,?,?,?, 'pending')");
$stmt->bind_param("isddssss", $uid, $orderNo, $total, $shipping, $name, $phone, $address, $notes);
$stmt->execute();
$orderId = $db->insert_id;

// 2. 建立訂單項目明細
$itemStmt = $db->prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?,?,?,?,?)");
foreach ($items as $it) {
    $itemStmt->bind_param("iissd", $orderId, $it['product_id'], $it['p_name'], $it['quantity'], $it['unit_price']);
    $itemStmt->execute();
}

// 3. 清空購物車
$db->query("DELETE FROM cart WHERE session_id = '$sid'");

// 4. 跳轉至成功頁面
header("Location: order_success.php?no=$orderNo");
exit;
