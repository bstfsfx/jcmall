<?php
$currentPage = 'users';
$adminTitle = '會員管理';
require_once 'includes/header.php';
$db = getDB();

// 處理刪除
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    
    // 安全檢查：不能刪除自己
    if ($id === $_SESSION['user_id']) {
        $error = "無法刪除：您無法刪除目前登入的帳號。";
    } else {
        $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        header('Location: users.php?msg=deleted');
        exit;
    }
}

// 獲取會員列表
$users = $db->query("SELECT * FROM users ORDER BY created_at DESC");
?>

<div style="margin-bottom: 30px;">
    <h3 style="font-weight: 300; letter-spacing: 1px;">註冊會員 (<?= $users->num_rows ?>)</h3>
</div>

<?php if(isset($error)): ?>
    <div style="background: rgba(231,76,60,0.1); color: #e74c3c; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
        <?= $error ?>
    </div>
<?php endif; ?>

<?php if(isset($_GET['msg']) && $_GET['msg'] === 'deleted'): ?>
    <div style="background: rgba(46,204,113,0.1); color: #2ecc71; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
        會員帳號已成功刪除
    </div>
<?php endif; ?>

<div class="admin-table-wrap">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>電子郵件 (帳號)</th>
                <th>身分</th>
                <th>註冊日期</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <?php while($u = $users->fetch_assoc()): ?>
            <tr>
                <td><?= $u['id'] ?></td>
                <td style="color:#fff; font-weight: 600;"><?= htmlspecialchars($u['name']) ?></td>
                <td><?= htmlspecialchars($u['email']) ?></td>
                <td>
                    <span class="badge" style="background: <?= $u['role']==='admin'?'rgba(201,169,110,0.1)':'rgba(90,86,80,0.1)' ?>; color: <?= $u['role']==='admin'?'#c9a96e':'#9a958e' ?>;">
                        <?= $u['role'] === 'admin' ? '管理員' : '一般客戶' ?>
                    </span>
                </td>
                <td><?= date('Y/m/d', strtotime($u['created_at'])) ?></td>
                <td>
                    <?php if($u['id'] !== $_SESSION['user_id']): ?>
                        <a href="users.php?delete=<?= $u['id'] ?>" class="btn-sm btn-outline" style="color:#e74c3c; border-color:#e74c3c;" onclick="return confirm('確定要刪除此會員帳號嗎？此動作無法復原。')">刪除</a>
                    <?php else: ?>
                        <span style="font-size:0.75rem; color:#5a5650;">(目前帳號)</span>
                    <?php endif; ?>
                </td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

</main>
</body>
</html>
