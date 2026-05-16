<?php
require_once 'config.php';
$db = getDB();

$mapping = [
    'coat' => 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    'jacket' => 'https://images.unsplash.com/photo-1551028711-0305df2a9b39?w=800&q=80',
    'skirt' => 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    'dress' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    'shirt' => 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    'trousers' => 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    'sweater' => 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    'denim' => 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    'briefcase' => 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
    'scarf' => 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    'sunglasses' => 'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?w=800&q=80',
    'watch' => 'https://images.unsplash.com/photo-1524805444758-09911d43f458?w=800&q=80',
    'belt' => 'https://images.unsplash.com/photo-1624222247344-550fb8ecfbd4?w=800&q=80',
    'hoodie' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
];

$res = $db->query("SELECT id, name, slug, category_id FROM products");
$count = 0;

while ($p = $res->fetch_assoc()) {
    $found = false;
    foreach ($mapping as $key => $url) {
        if (stripos($p['name'], $key) !== false || stripos($p['slug'], $key) !== false) {
            $db->query("UPDATE products SET image = '$url' WHERE id = {$p['id']}");
            $found = true;
            $count++;
            break;
        }
    }
    
    // 如果關鍵字沒對到，按分類給預設圖
    if (!$found) {
        $defaultUrl = '';
        if ($p['category_id'] == 1) $defaultUrl = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'; // 女裝
        if ($p['category_id'] == 2) $defaultUrl = 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80'; // 男裝
        if ($p['category_id'] == 3) $defaultUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'; // 配件
        
        if ($defaultUrl) {
            $db->query("UPDATE products SET image = '$defaultUrl' WHERE id = {$p['id']}");
            $count++;
        }
    }
}

echo "所有圖片已重新連結！共更新 $count 筆商品圖片。";
unlink(__FILE__);
