<?php
/**
 * GET /reviews-backend/api/get_reviews.php
 *
 * Public, read-only endpoint used by the homepage's "What Our Customers
 * Say" section. Returns ONLY reviews with status = 'approved' — pending
 * and rejected reviews are never exposed here. No authentication needed
 * since this only ever returns already-approved, already-public data.
 *
 * Optional query params:
 *   limit  — max reviews to return (default 20, capped at 50)
 */

declare(strict_types=1);

// db.php must load first — it pulls in config.php, which defines
// ALLOWED_ORIGINS that apply_cors() depends on.
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/helpers.php';

apply_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 20;
if ($limit < 1) {
    $limit = 20;
}
if ($limit > 50) {
    $limit = 50;
}

$pdo = get_db_connection();

$stmt = $pdo->prepare(
    'SELECT id, customer_name, service_used, rating, review_text, photo_filename, created_at
     FROM reviews
     WHERE status = "approved"
     ORDER BY created_at DESC
     LIMIT :limit'
);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll();

$reviews = array_map(function (array $row): array {
    return [
        'id' => (int) $row['id'],
        'customerName' => $row['customer_name'],
        'serviceUsed' => $row['service_used'],
        'rating' => (int) $row['rating'],
        'reviewText' => $row['review_text'],
        'photoUrl' => $row['photo_filename'] ? UPLOAD_URL_PATH . $row['photo_filename'] : null,
        'createdAt' => $row['created_at'],
    ];
}, $rows);

send_json(['success' => true, 'reviews' => $reviews]);
