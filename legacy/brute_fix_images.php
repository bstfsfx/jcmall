<?php
require_once 'config.php';
$db = getDB();

// 使用模糊匹配 (LIKE) 來確保能抓到可能有空格或隱形字元的商品
$fixes = [
    '絲綢' => 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    '機車夾克' => 'https://images.unsplash.com/photo-1521223890158-f9f7ad3973a0?w=800&q=80',
    '卡其褲' => 'https://images.unsplash.com/photo-1473966968600-fa804b868cca?w=800&q=80',
    '絲巾' => 'https://images.unsplash.com/photo-1601924991987-39426a93997c?w=800&q=80',
    '太陽眼鏡' => 'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?w=800&q=80',
    '腕錶' => 'https://images.unsplash.com/photo-1524805444758-09911d43f458?w=800&q=80',
    '皮帶' => 'https://images.unsplash.com/photo-1624222247344-550fb8ecfbd4?w=800&q=80'
];

$updatedCount = 0;
foreach ($fixes as $keyword => $url) {
    $stmt = $db->prepare("UPDATE products SET image = ? WHERE name LIKE ?");
    $search = "%" . $keyword . "%";
    $stmt->bind_param("ss", $url, $search);
    $stmt->execute();
    $updatedCount += $db->affected_rows;
}

echo "二次強力修復完成！共更新 $updatedCount 筆記錄。";
unlink(__FILE__);
