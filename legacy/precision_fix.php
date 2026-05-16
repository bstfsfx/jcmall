<?php
require_once 'config.php';
$db = getDB();

$fixData = [
    '絲綢褶皺長裙' => 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    '皮革機車夾克' => 'https://images.unsplash.com/photo-1521223890158-f9f7ad3973a0?w=800&q=80',
    '修身卡其褲' => 'https://images.unsplash.com/photo-1473966968600-fa804b868cca?w=800&q=80',
    '真絲圖騰絲巾' => 'https://images.unsplash.com/photo-1601924991987-39426a93997c?w=800&q=80',
    '飛行員太陽眼鏡' => 'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?w=800&q=80',
    '簡約皮革腕錶' => 'https://images.unsplash.com/photo-1524805444758-09911d43f458?w=800&q=80',
    '經典黑色皮帶' => 'https://images.unsplash.com/photo-1624222247344-550fb8ecfbd4?w=800&q=80',
    // 加碼修復：限量版夾克 (之前圖片不符)
    '限量版手工刺繡絲絨夾克' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
];

foreach ($fixData as $name => $url) {
    $stmt = $db->prepare("UPDATE products SET image = ? WHERE name = ?");
    $stmt->bind_param("ss", $url, $name);
    $stmt->execute();
}

echo "已成功精準修復 8 件商品的圖片與視覺匹配！";
unlink(__FILE__);
