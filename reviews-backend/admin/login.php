<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/../includes/db.php';

if (is_logged_in()) {
    header('Location: index.php');
    exit;
}

$error = '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (is_login_locked_out()) {
        $error = 'Too many failed attempts. Please try again in a few minutes.';
    } elseif (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
        $error = 'Your session expired. Please try again.';
    } else {
        $username = trim((string) ($_POST['username'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');

        $stmt = get_db_connection()->prepare('SELECT id, password_hash FROM admin_users WHERE username = :username');
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_user_id'] = (int) $user['id'];
            $_SESSION['admin_username'] = $username;
            clear_login_attempts();
            header('Location: index.php');
            exit;
        }

        register_failed_login();
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Admin Login — Coolviro Services Reviews</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="login-page">
  <div class="login-card">
    <h1>Coolviro Services</h1>
    <p class="subtitle">Review Moderation — Admin Login</p>
    <?php if ($error): ?>
      <p class="alert alert-error"><?= e($error) ?></p>
    <?php endif; ?>
    <form method="post" novalidate>
      <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" autocomplete="username" required autofocus>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" autocomplete="current-password" required>
      <button type="submit" class="btn">Log In</button>
    </form>
  </div>
</body>
</html>
