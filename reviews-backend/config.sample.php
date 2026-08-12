<?php
/**
 * Coolviro Services — Review System Configuration TEMPLATE.
 *
 * Copy this file to "config.php" (same folder) and fill in your real
 * Hostinger MySQL credentials. config.php is listed in .gitignore and must
 * NEVER be committed to git or exposed to the browser — see README.md.
 *
 * This file (config.sample.php) contains no real secrets and is safe to
 * commit; it exists only as a template for the real config.php you create
 * directly on the server (or locally, then upload it).
 */

// ---------------------------------------------------------------------------
// Database connection (from Hostinger hPanel → Databases → MySQL Databases)
// ---------------------------------------------------------------------------
define('DB_HOST', 'localhost');           // Usually "localhost" on Hostinger
define('DB_NAME', 'u123456789_reviews');  // Hostinger prefixes DB names with u123456789_
define('DB_USER', 'u123456789_reviewsuser');
define('DB_PASS', 'REPLACE_WITH_REAL_PASSWORD');

// ---------------------------------------------------------------------------
// CORS: which frontend origin(s) are allowed to call this API.
// Add your real production domain(s) once you have one. Using '*' works
// while you don't yet have a fixed domain, but should be tightened to your
// exact site URL(s) before going live — see README.md "Step 7".
// ---------------------------------------------------------------------------
define('ALLOWED_ORIGINS', [
  '*',
  // 'https://coolviroservices.com',
  // 'https://www.coolviroservices.com',
]);

// ---------------------------------------------------------------------------
// Photo upload limits
// ---------------------------------------------------------------------------
define('UPLOAD_MAX_BYTES', 5 * 1024 * 1024); // 5 MB
define('UPLOAD_ALLOWED_MIME', ['image/jpeg', 'image/png', 'image/webp']);
define('UPLOAD_DIR', __DIR__ . '/uploads/reviews/');
define('UPLOAD_URL_PATH', '/reviews-backend/uploads/reviews/'); // adjust if you move this folder

// ---------------------------------------------------------------------------
// Basic anti-spam: max review submissions allowed from one IP per window.
// ---------------------------------------------------------------------------
define('RATE_LIMIT_MAX_SUBMISSIONS', 3);
define('RATE_LIMIT_WINDOW_MINUTES', 60);

// ---------------------------------------------------------------------------
// Timezone used for created_at/updated_at display in the admin panel.
// ---------------------------------------------------------------------------
date_default_timezone_set('Asia/Kolkata');
