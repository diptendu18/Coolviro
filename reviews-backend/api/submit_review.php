<?php
/**
 * POST /reviews-backend/api/submit_review.php
 *
 * Accepts a new customer review as multipart/form-data (so the optional
 * photo can be uploaded in the same request) and stores it with
 * status = 'pending'. Nothing submitted here becomes visible on the public
 * site until an admin approves it in /admin.
 *
 * Fields: customer_name, service_used, rating, review_text, photo (file,
 * optional), website (honeypot — must stay empty).
 */

declare(strict_types=1);

// db.php must load first — it pulls in config.php, which defines
// ALLOWED_ORIGINS that apply_cors() depends on.
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/helpers.php';

apply_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed.'], 405);
}

// Honeypot: real customers never fill this hidden field in. Pretend
// success so bots don't learn to look for a different signal.
if (!empty($_POST['website'])) {
    send_json(['success' => true]);
}

$pdo = get_db_connection();
$ip = get_client_ip();

if (is_rate_limited($pdo, $ip)) {
    send_json([
        'success' => false,
        'message' => 'Too many reviews submitted recently. Please try again later.',
    ], 429);
}

$values = [
    'customer_name' => sanitize_string((string) ($_POST['customer_name'] ?? ''), 60),
    'service_used'  => sanitize_string((string) ($_POST['service_used'] ?? ''), 80),
    'rating'        => (int) ($_POST['rating'] ?? 0),
    'review_text'   => sanitize_string((string) ($_POST['review_text'] ?? ''), 1000),
];

$errors = validate_review_input($values);

if (!empty($errors)) {
    send_json([
        'success' => false,
        'message' => 'Please correct the highlighted fields and try again.',
        'errors' => $errors,
    ], 400);
}

try {
    $photoFilename = handle_photo_upload($_FILES['photo'] ?? null);
} catch (RuntimeException $e) {
    send_json(['success' => false, 'message' => $e->getMessage()], 400);
}

$stmt = $pdo->prepare(
    'INSERT INTO reviews (customer_name, service_used, rating, review_text, photo_filename, status, ip_address)
     VALUES (:customer_name, :service_used, :rating, :review_text, :photo_filename, "pending", :ip_address)'
);

$stmt->execute([
    ':customer_name' => $values['customer_name'],
    ':service_used' => $values['service_used'],
    ':rating' => $values['rating'],
    ':review_text' => $values['review_text'],
    ':photo_filename' => $photoFilename,
    ':ip_address' => $ip,
]);

send_json([
    'success' => true,
    'message' => 'Thank you! Your review has been submitted and will appear on the site once approved.',
]);
