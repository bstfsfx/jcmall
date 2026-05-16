<?php
/**
 * JC mall - Database Setup
 * Run this once to create the database and tables
 */

require_once 'config.php';
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

// Create database
$conn->query("CREATE DATABASE IF NOT EXISTS mall CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$conn->select_db("mall");

// Categories table
$conn->query("CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Products table
$conn->query("CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) DEFAULT NULL,
    image VARCHAR(255),
    images TEXT,
    sizes VARCHAR(255) DEFAULT 'S,M,L,XL',
    colors VARCHAR(255),
    stock INT DEFAULT 0,
    is_featured TINYINT(1) DEFAULT 0,
    is_new TINYINT(1) DEFAULT 0,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Users table
$conn->query("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('customer','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Orders table
$conn->query("CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
    shipping_name VARCHAR(100),
    shipping_phone VARCHAR(20),
    shipping_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Order items table
$conn->query("CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT,
    product_name VARCHAR(200),
    size VARCHAR(10),
    color VARCHAR(50),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Cart table
$conn->query("CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    user_id INT DEFAULT NULL,
    product_id INT NOT NULL,
    size VARCHAR(10),
    color VARCHAR(50),
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Insert sample categories
$conn->query("INSERT IGNORE INTO categories (id, name, slug, description, image, sort_order) VALUES
    (1, '女裝', 'women', '為現代女性打造的優雅系列', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', 1),
    (2, '男裝', 'men', '為當代紳士打造的精緻風格', 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800', 2),
    (3, '配件', 'accessories', '以頂級配件完美點綴您的造型', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800', 3),
    (4, '新品上市', 'new-arrivals', '探索本季最新潮流趨勢', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800', 4)
");

// Insert sample products
$conn->query("INSERT IGNORE INTO products (id, category_id, name, slug, description, price, sale_price, image, sizes, colors, stock, is_featured, is_new) VALUES
    (1, 1, '絲綢裹身洋裝', 'silk-wrap-dress', '奢華絲綢裹身洋裝，展現迷人身姿曲線。完美適合晚宴場合。', 289.00, 239.00, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', 'XS,S,M,L', '黑色,象牙白,酒紅', 45, 1, 1),
    (2, 1, '喀什米爾西裝外套', 'cashmere-blazer', '精製喀什米爾混紡西裝外套。永不過時的衣櫛必備。', 459.00, NULL, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', 'S,M,L,XL', '駝色,黑色,深藍', 30, 1, 0),
    (3, 2, '義大利羊毛西裝', 'italian-wool-suit', '手工精製義大利羊毛西裝，現代修身剪裁。', 899.00, 749.00, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', 'S,M,L,XL,XXL', '炭灰,深藍,黑色', 20, 1, 0),
    (4, 2, '頂級純棉襯衫', 'premium-cotton-shirt', '埃及純棉正裝襯衫，配有法式袖口。', 189.00, NULL, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600', 'S,M,L,XL', '白色,藍色,粉色', 60, 0, 1),
    (5, 3, '真皮托特包', 'leather-tote-bag', '全粒面真皮托特包，麂皮內襯。', 349.00, 299.00, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600', '單一尺寸', '棕褐,黑色,干邑色', 25, 1, 1),
    (6, 1, '亞麻長裙', 'linen-maxi-skirt', '飄逸亞麻長裙，休閒剰裁。', 179.00, NULL, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600', 'XS,S,M,L', '鼠尾草綠,米色,赫土色', 35, 0, 1),
    (7, 2, '美麗諾羊毛毛衣', 'merino-wool-sweater', '超柔軟美麗諾羊毛圓領毛衣。', 229.00, 189.00, 'https://images.unsplash.com/photo-1614975059251-992f11792571?w=600', 'S,M,L,XL', '燕麥色,森林綠,深藍', 40, 1, 0),
    (8, 3, '經典腕錶', 'classic-timepiece', '瑞士製造自動上鏈腕錶，藍寶石水晶鏡面。', 1299.00, NULL, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600', '單一尺寸', '銀色,金色,玫瑰金', 15, 1, 1)
");

// Insert admin user (password: admin)
$adminPass = password_hash('admin', PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin', ?, 'admin') ON DUPLICATE KEY UPDATE password = ?");
$stmt->bind_param("ss", $adminPass, $adminPass);
$stmt->execute();

// Update existing data to Traditional Chinese (in case rows already exist)
$conn->query("UPDATE categories SET name='女裝', description='為現代女性打造的優雅系列' WHERE id=1");
$conn->query("UPDATE categories SET name='男裝', description='為當代紳士打造的精緻風格' WHERE id=2");
$conn->query("UPDATE categories SET name='配件', description='以頂級配件完美點綴您的造型' WHERE id=3");
$conn->query("UPDATE categories SET name='新品上市', description='探索本季最新潮流趨勢' WHERE id=4");

$conn->query("UPDATE products SET name='絲綢裹身洋裝', description='奢華絲綢裹身洋裝，展現迷人身姿曲線。完美適合晚宴場合。', colors='黑色,象牙白,酒紅' WHERE id=1");
$conn->query("UPDATE products SET name='喀什米爾西裝外套', description='精製喀什米爾混紡西裝外套。永不過時的衣櫛必備。', colors='駝色,黑色,深藍' WHERE id=2");
$conn->query("UPDATE products SET name='義大利羊毛西裝', description='手工精製義大利羊毛西裝，現代修身剪裁。', colors='炭灰,深藍,黑色' WHERE id=3");
$conn->query("UPDATE products SET name='頂級純棉襯衫', description='埃及純棉正裝襯衫，配有法式袖口。', colors='白色,藍色,粉色' WHERE id=4");
$conn->query("UPDATE products SET name='真皮托特包', description='全粒面真皮托特包，麂皮內襯。', sizes='單一尺寸', colors='棕褐,黑色,干邑色' WHERE id=5");
$conn->query("UPDATE products SET name='亞麻長裙', description='飄逸亞麻長裙，休閒剪裁。', colors='鼠尾草綠,米色,赫土色' WHERE id=6");
$conn->query("UPDATE products SET name='美麗諾羊毛毛衣', description='超柔軟美麗諾羊毛圓領毛衣。', colors='燕麥色,森林綠,深藍' WHERE id=7");
$conn->query("UPDATE products SET name='經典腕錶', description='瑞士製造自動上鏈腕錶，藍寶石水晶鏡面。', sizes='單一尺寸', colors='銀色,金色,玫瑰金' WHERE id=8");

echo "<!DOCTYPE html><html><head><style>
body{font-family:'Segoe UI',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#0a0a0a;color:#fff;margin:0}
.box{text-align:center;padding:60px;border:1px solid #333;border-radius:16px;background:#111}
h1{font-size:2rem;margin-bottom:10px}
p{color:#888;font-size:1.1rem}
a{color:#c9a96e;text-decoration:none;font-weight:600}
.check{font-size:3rem;margin-bottom:20px}
</style></head><body>
<div class='box'>
<div class='check'>✓</div>
<h1>JC mall 設定完成</h1>
<p>資料庫表格與範例資料已成功建立。</p>
<br><a href='index.php'>→ 前往首頁</a>
</div></body></html>";

$conn->close();
?>
