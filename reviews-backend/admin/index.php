<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/helpers.php';

require_login();

$pdo = get_db_connection();
$actionMessage = '';

// ---------------------------------------------------------------------------
// Handle moderation actions (approve / reject / delete). Every action is a
// same-origin POST with a CSRF token — this panel is never called from the
// public frontend, only from this HTML itself.
// ---------------------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
        $actionMessage = 'Your session expired — please try that action again.';
    } else {
        $reviewId = (int) ($_POST['review_id'] ?? 0);
        $action = (string) ($_POST['action'] ?? '');

        if ($reviewId > 0 && in_array($action, ['approve', 'reject', 'delete'], true)) {
            if ($action === 'delete') {
                $stmt = $pdo->prepare('SELECT photo_filename FROM reviews WHERE id = :id');
                $stmt->execute([':id' => $reviewId]);
                $row = $stmt->fetch();

                $pdo->prepare('DELETE FROM reviews WHERE id = :id')->execute([':id' => $reviewId]);

                if ($row && $row['photo_filename']) {
                    $photoPath = UPLOAD_DIR . basename($row['photo_filename']);
                    if (is_file($photoPath)) {
                        unlink($photoPath);
                    }
                }
                $actionMessage = 'Review deleted.';
            } else {
                $newStatus = $action === 'approve' ? 'approved' : 'rejected';
                $stmt = $pdo->prepare('UPDATE reviews SET status = :status WHERE id = :id');
                $stmt->execute([':status' => $newStatus, ':id' => $reviewId]);
                $actionMessage = $action === 'approve' ? 'Review approved and is now live on the site.' : 'Review rejected.';
            }
        }
    }
}

// ---------------------------------------------------------------------------
// List reviews, filtered by status tab.
// ---------------------------------------------------------------------------
$statusFilter = $_GET['status'] ?? 'pending';
$validStatuses = ['pending', 'approved', 'rejected', 'all'];
if (!in_array($statusFilter, $validStatuses, true)) {
    $statusFilter = 'pending';
}

if ($statusFilter === 'all') {
    $stmt = $pdo->query('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 200');
} else {
    $stmt = $pdo->prepare('SELECT * FROM reviews WHERE status = :status ORDER BY created_at DESC LIMIT 200');
    $stmt->execute([':status' => $statusFilter]);
}
$reviews = $stmt->fetchAll();

$counts = [];
foreach (['pending', 'approved', 'rejected'] as $s) {
    $countStmt = $pdo->prepare('SELECT COUNT(*) FROM reviews WHERE status = :status');
    $countStmt->execute([':status' => $s]);
    $counts[$s] = (int) $countStmt->fetchColumn();
}

$token = csrf_token();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Review Moderation — Coolviro Services Admin</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body>
  <header class="admin-header">
    <h1>Coolviro Services — Review Moderation</h1>
    <div class="admin-header-right">
      <span>Signed in as <?= e($_SESSION['admin_username'] ?? '') ?></span>
      <a href="logout.php" class="btn btn-ghost">Log Out</a>
    </div>
  </header>

  <main class="admin-main">
    <?php if ($actionMessage): ?>
      <p class="alert alert-info"><?= e($actionMessage) ?></p>
    <?php endif; ?>

    <nav class="tabs">
      <a href="?status=pending" class="<?= $statusFilter === 'pending' ? 'active' : '' ?>">Pending (<?= $counts['pending'] ?>)</a>
      <a href="?status=approved" class="<?= $statusFilter === 'approved' ? 'active' : '' ?>">Approved (<?= $counts['approved'] ?>)</a>
      <a href="?status=rejected" class="<?= $statusFilter === 'rejected' ? 'active' : '' ?>">Rejected (<?= $counts['rejected'] ?>)</a>
      <a href="?status=all" class="<?= $statusFilter === 'all' ? 'active' : '' ?>">All</a>
    </nav>

    <?php if (empty($reviews)): ?>
      <p class="empty-state">No reviews in this view.</p>
    <?php endif; ?>

    <div class="review-list">
      <?php foreach ($reviews as $review): ?>
        <article class="review-card status-<?= e($review['status']) ?>">
          <div class="review-card-main">
            <div class="review-card-head">
              <strong><?= e($review['customer_name']) ?></strong>
              <span class="stars" aria-label="<?= (int) $review['rating'] ?> out of 5 stars">
                <?= str_repeat('★', (int) $review['rating']) . str_repeat('☆', 5 - (int) $review['rating']) ?>
              </span>
              <span class="badge badge-<?= e($review['status']) ?>"><?= e(ucfirst($review['status'])) ?></span>
            </div>
            <p class="review-meta">
              <?= e($review['service_used']) ?> &middot;
              <?= e(date('d M Y, g:i A', strtotime($review['created_at']))) ?> &middot;
              IP <?= e($review['ip_address'] ?? 'unknown') ?>
            </p>
            <p class="review-text"><?= nl2br(e($review['review_text'])) ?></p>
            <?php if ($review['photo_filename']): ?>
              <a href="<?= e(UPLOAD_URL_PATH . $review['photo_filename']) ?>" target="_blank" rel="noopener noreferrer">
                <img class="review-photo" src="<?= e(UPLOAD_URL_PATH . $review['photo_filename']) ?>" alt="Photo attached by <?= e($review['customer_name']) ?>">
              </a>
            <?php endif; ?>
          </div>
          <div class="review-card-actions">
            <?php if ($review['status'] !== 'approved'): ?>
              <form method="post">
                <input type="hidden" name="csrf_token" value="<?= e($token) ?>">
                <input type="hidden" name="review_id" value="<?= (int) $review['id'] ?>">
                <input type="hidden" name="action" value="approve">
                <button type="submit" class="btn btn-approve">Approve</button>
              </form>
            <?php endif; ?>
            <?php if ($review['status'] !== 'rejected'): ?>
              <form method="post">
                <input type="hidden" name="csrf_token" value="<?= e($token) ?>">
                <input type="hidden" name="review_id" value="<?= (int) $review['id'] ?>">
                <input type="hidden" name="action" value="reject">
                <button type="submit" class="btn btn-reject">Reject</button>
              </form>
            <?php endif; ?>
            <form method="post" onsubmit="return confirm('Permanently delete this review? This cannot be undone.');">
              <input type="hidden" name="csrf_token" value="<?= e($token) ?>">
              <input type="hidden" name="review_id" value="<?= (int) $review['id'] ?>">
              <input type="hidden" name="action" value="delete">
              <button type="submit" class="btn btn-delete">Delete</button>
            </form>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </main>
</body>
</html>
