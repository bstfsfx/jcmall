<?php
require_once 'config.php';
$db = getDB();

$newFixes = [
    '絲綢褶皺' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80', // 換成另一款優雅洋裝/裙子
    '機車夾克' => 'https://images.unsplash.com/photo-1551028711-0305df2a9b39?w=800&q=80', // 換成另一款經典皮衣
    '卡其褲' => 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',  // 換成西裝長褲
];

foreach ($newFixes as $keyword => $url) {
    $stmt = $db->prepare("UPDATE products SET image = ? WHERE name LIKE ?");
    $search = "%" . $keyword . "%";
    $stmt->bind_param("ss", $url, $search);
    $stmt->execute();
}

echo "終極修復完成！已換上全新的官方圖片連結。";
unlink(__FILE__);
