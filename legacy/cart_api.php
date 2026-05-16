<?php
/**
 * Cart API — handles add / update / remove / get via AJAX (JSON)
 */
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

$db = getDB();
$sid = session_id();
$uid = $_SESSION['user_id'] ?? null;
$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {

    // ── Add to cart ──
    case 'add':
        $productId = intval($_POST['product_id'] ?? 0);
        $qty       = max(1, intval($_POST['quantity'] ?? 1));
        $size      = trim($_POST['size'] ?? '');
        $color     = trim($_POST['color'] ?? '');

        if (!$productId) { echo json_encode(['success'=>false,'message'=>'缺少商品ID']); exit; }

        // Check if same item already in cart
        $chk = $db->prepare("SELECT id, quantity FROM cart WHERE session_id=? AND product_id=? AND size=? AND color=?");
        $chk->bind_param("siss", $sid, $productId, $size, $color);
        $chk->execute();
        $exist = $chk->get_result()->fetch_assoc();

        if ($exist) {
            $newQty = $exist['quantity'] + $qty;
            $upd = $db->prepare("UPDATE cart SET quantity=? WHERE id=?");
            $upd->bind_param("ii", $newQty, $exist['id']);
            $upd->execute();
        } else {
            $ins = $db->prepare("INSERT INTO cart (session_id, user_id, product_id, size, color, quantity) VALUES (?,?,?,?,?,?)");
            $ins->bind_param("siissi", $sid, $uid, $productId, $size, $color, $qty);
            $ins->execute();
        }

        echo json_encode(['success'=>true, 'message'=>'已加入購物車', 'count'=>getCartCount($db, $sid)]);
        break;

    // ── Update quantity ──
    case 'update':
        $cartId = intval($_POST['cart_id'] ?? 0);
        $qty    = max(1, intval($_POST['quantity'] ?? 1));
        $upd = $db->prepare("UPDATE cart SET quantity=? WHERE id=? AND session_id=?");
        $upd->bind_param("iis", $qty, $cartId, $sid);
        $upd->execute();
        echo json_encode(['success'=>true, 'count'=>getCartCount($db, $sid)]);
        break;

    // ── Remove item ──
    case 'remove':
        $cartId = intval($_POST['cart_id'] ?? 0);
        $del = $db->prepare("DELETE FROM cart WHERE id=? AND session_id=?");
        $del->bind_param("is", $cartId, $sid);
        $del->execute();
        echo json_encode(['success'=>true, 'message'=>'已從購物車移除', 'count'=>getCartCount($db, $sid)]);
        break;

    // ── Get cart data ──
    case 'get':
        $items = getCartItems($db, $sid);
        $total = 0;
        foreach ($items as &$it) {
            $it['subtotal'] = $it['quantity'] * $it['unit_price'];
            $total += $it['subtotal'];
        }
        echo json_encode(['success'=>true, 'items'=>$items, 'total'=>$total, 'count'=>getCartCount($db, $sid)]);
        break;

    // ── Count only ──
    case 'count':
        echo json_encode(['success'=>true, 'count'=>getCartCount($db, $sid)]);
        break;

    // ── Update quantity delta (for +/- buttons) ──
    case 'update_delta':
        $cartId = intval($_POST['cart_id'] ?? 0);
        $delta  = intval($_POST['delta'] ?? 0);
        
        $curr = $db->prepare("SELECT quantity FROM cart WHERE id=? AND session_id=?");
        $curr->bind_param("is", $cartId, $sid);
        $curr->execute();
        $res = $curr->get_result()->fetch_assoc();
        
        if ($res) {
            $newQty = max(1, $res['quantity'] + $delta);
            $upd = $db->prepare("UPDATE cart SET quantity=? WHERE id=?");
            $upd->bind_param("ii", $newQty, $cartId);
            $upd->execute();
            echo json_encode(['success'=>true, 'count'=>getCartCount($db, $sid)]);
        } else {
            echo json_encode(['success'=>false, 'message'=>'找不到項目']);
        }
        break;

    // ── Clear cart ──
    case 'clear':
        $db->query("DELETE FROM cart WHERE session_id = '$sid'");
        echo json_encode(['success'=>true, 'message'=>'購物車已清空']);
        break;

    default:
        echo json_encode(['success'=>false, 'message'=>'未知操作']);
}

// ── Helper: get total item count (only for existing products) ──
function getCartCount($db, $sid) {
    $r = $db->prepare("
        SELECT COALESCE(SUM(c.quantity), 0) AS cnt 
        FROM cart c 
        JOIN products p ON c.product_id = p.id 
        WHERE c.session_id = ?
    ");
    $r->bind_param("s", $sid);
    $r->execute();
    return (int)$r->get_result()->fetch_assoc()['cnt'];
}

// ── Helper: get cart items with product info ──
function getCartItems($db, $sid) {
    $q = $db->prepare("
        SELECT c.id AS cart_id, c.product_id, c.size, c.color, c.quantity,
               p.name, p.slug, p.image,
               COALESCE(p.sale_price, p.price) AS unit_price,
               p.price AS original_price, p.sale_price, p.stock
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.session_id = ?
        ORDER BY c.created_at DESC
    ");
    $q->bind_param("s", $sid);
    $q->execute();
    return $q->get_result()->fetch_all(MYSQLI_ASSOC);
}
