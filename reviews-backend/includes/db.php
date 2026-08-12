<?php
/**
 * Shared PDO database connection. Every script that touches MySQL includes
 * this file rather than opening its own connection.
 */

$configPath = __DIR__ . '/../config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    // Deliberately generic — never leak filesystem paths or config details
    // to a client. Full detail goes to the server error log only.
    error_log('reviews-backend: config.php is missing. Copy config.sample.php to config.php and fill in your Hostinger MySQL credentials.');
    die(json_encode(['success' => false, 'message' => 'Server is not configured yet.']));
}

require_once $configPath;

function get_db_connection(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        error_log('reviews-backend: database connection failed: ' . $e->getMessage());
        die(json_encode(['success' => false, 'message' => 'Could not connect to the database.']));
    }

    return $pdo;
}
