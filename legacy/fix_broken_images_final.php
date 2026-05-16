<?php
require_once 'config.php';
$db = getDB();

$fixes = [
    '絲綢褶皺' => 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80', // 裙裝
    '機車夾克' => 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80', // 皮衣
    '卡其褲' => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', // 長褲
    '圖騰絲巾' => 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80', // 絲巾/布料
    '太陽眼鏡' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', // 墨鏡
    '皮革腕錶' => 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80', // 手錶
    '黑色皮帶' => 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=800&q=80', // 配件
    '刺繡絲絨夾克' => 'https://images.unsplash.com/photo-1551028719-01ec1bf8e1b2?w=800&q=80' // 夾克
];

$count = 0;
foreach ($fixes as $keyword => $url) {
    $stmt = $db->prepare("UPDATE products SET image = ? WHERE name LIKE ?");
    $search = "%" . $keyword . "%";
    $stmt->bind_param("ss", $url, $search);
    $stmt->execute();
    $count += $db->affected_rows;
}

echo "已成功更新 $count 件商品的圖片。\n";
unlink(__FILE__);
