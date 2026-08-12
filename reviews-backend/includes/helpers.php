<?php
/**
 * Shared helpers for the public-facing API endpoints (api/submit_review.php,
 * api/get_reviews.php): CORS, JSON responses, input validation.
 */

// The five appliance categories the main website services. Kept as a
// literal whitelist here (rather than trying to share code with the
// Next.js frontend across two different languages/runtimes) so
// "Service Used" can never be an arbitrary/injected string.
const ALLOWED_SERVICES = [
    'AC Service & Repair',
    'Refrigerator Service & Repair',
    'Geyser Service & Repair',
    'Microwave Oven Service & Repair',
    'Washing Machine Service & Repair',
];

function send_json(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

/**
 * Sends CORS headers for the configured allowed origins and handles the
 * browser's OPTIONS preflight request. Call this before anything else in
 * every public API script.
 */
function apply_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = defined('ALLOWED_ORIGINS') ? ALLOWED_ORIGINS : [];

    if (in_array('*', $allowed, true)) {
        header('Access-Control-Allow-Origin: *');
    } elseif ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function get_client_ip(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($forwarded !== '') {
        $parts = explode(',', $forwarded);
        return trim($parts[0]);
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function sanitize_string(string $value, int $maxLength): string
{
    $value = trim($value);
    $value = strip_tags($value);
    if (function_exists('mb_substr')) {
        $value = mb_substr($value, 0, $maxLength);
    } else {
        $value = substr($value, 0, $maxLength);
    }
    return $value;
}

/**
 * Validates all review fields server-side. Returns an array of field =>
 * error message; empty array means the submission is valid. Never trust
 * client-side validation alone — this is the authoritative check.
 */
function validate_review_input(array $values): array
{
    $errors = [];

    if ($values['customer_name'] === '') {
        $errors['customer_name'] = 'Please enter your name.';
    } elseif (mb_strlen($values['customer_name']) < 2) {
        $errors['customer_name'] = 'Please enter your full name.';
    } elseif (!preg_match("/^[a-zA-Z .'-]+$/u", $values['customer_name'])) {
        $errors['customer_name'] = 'Name can only contain letters and spaces.';
    }

    if (!in_array($values['service_used'], ALLOWED_SERVICES, true)) {
        $errors['service_used'] = 'Please select a valid service.';
    }

    if ($values['rating'] < 1 || $values['rating'] > 5) {
        $errors['rating'] = 'Please select a star rating from 1 to 5.';
    }

    if ($values['review_text'] === '') {
        $errors['review_text'] = 'Please write your review.';
    } elseif (mb_strlen($values['review_text']) < 10) {
        $errors['review_text'] = 'Please write a few more words about your experience (at least 10 characters).';
    } elseif (mb_strlen($values['review_text']) > 1000) {
        $errors['review_text'] = 'Review is too long (maximum 1000 characters).';
    }

    return $errors;
}

/**
 * Validates and stores an optional uploaded photo. Returns the generated
 * filename to store in the DB, or null if no photo was uploaded. Throws a
 * RuntimeException (with a user-safe message) on any validation failure.
 */
function handle_photo_upload(?array $file): ?string
{
    if ($file === null || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Photo upload failed. Please try again.');
    }

    if ($file['size'] > UPLOAD_MAX_BYTES) {
        throw new RuntimeException('Photo is too large (maximum 5 MB).');
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);

    if (!in_array($mime, UPLOAD_ALLOWED_MIME, true)) {
        throw new RuntimeException('Photo must be a JPEG, PNG or WebP image.');
    }

    $extensions = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];
    $extension = $extensions[$mime];

    if (!is_dir(UPLOAD_DIR) && !mkdir(UPLOAD_DIR, 0755, true) && !is_dir(UPLOAD_DIR)) {
        throw new RuntimeException('Server could not save the photo. Please try again.');
    }

    // Random filename — never trust or reuse the client-supplied filename
    // (avoids path traversal, overwrites, and leaking the uploader's
    // original file/folder names).
    $filename = bin2hex(random_bytes(16)) . '.' . $extension;
    $destination = UPLOAD_DIR . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new RuntimeException('Server could not save the photo. Please try again.');
    }

    chmod($destination, 0644);

    return $filename;
}

function is_rate_limited(PDO $pdo, string $ip): bool
{
    $stmt = $pdo->prepare(
        'SELECT COUNT(*) FROM reviews WHERE ip_address = :ip AND created_at > (NOW() - INTERVAL :minutes MINUTE)'
    );
    $stmt->bindValue(':ip', $ip);
    $stmt->bindValue(':minutes', RATE_LIMIT_WINDOW_MINUTES, PDO::PARAM_INT);
    $stmt->execute();

    return (int) $stmt->fetchColumn() >= RATE_LIMIT_MAX_SUBMISSIONS;
}
