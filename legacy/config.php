<?php
/**
 * JC mall - Database Configuration
 * Database: mall | User: root | Password: (none)
 */

$db_host = getenv('DB_HOST') ?: 'localhost';
define('DB_HOST', $db_host);
define('DB_NAME', 'mall');
define('DB_USER', 'root');
define('DB_PASS', '');
define('SITE_NAME', 'JC mall');
$site_url = getenv('SITE_URL') ?: 'http://localhost/jcmall';
define('SITE_URL', $site_url);

// Database connection
function getDB() {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $conn->set_charset("utf8mb4");
    }
    return $conn;
}

// Start session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
