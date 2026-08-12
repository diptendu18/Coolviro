<?php
/**
 * Session-based auth for the admin review-moderation panel. Every page
 * under /admin (except login.php itself) requires require_login().
 */

declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    // Harden the session cookie: HttpOnly (no JS access), SameSite=Lax
    // (CSRF hardening), Secure when served over HTTPS (Hostinger gives you
    // a free SSL certificate — always use it for /admin).
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['SERVER_PORT'] ?? '') === '443';

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MINUTES = 15;

function is_logged_in(): bool
{
    return !empty($_SESSION['admin_user_id']);
}

function require_login(): void
{
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function is_login_locked_out(): bool
{
    return isset($_SESSION['login_locked_until']) && time() < $_SESSION['login_locked_until'];
}

function register_failed_login(): void
{
    $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
    if ($_SESSION['login_attempts'] >= LOGIN_MAX_ATTEMPTS) {
        $_SESSION['login_locked_until'] = time() + (LOGIN_LOCKOUT_MINUTES * 60);
        $_SESSION['login_attempts'] = 0;
    }
}

function clear_login_attempts(): void
{
    unset($_SESSION['login_attempts'], $_SESSION['login_locked_until']);
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token(?string $token): bool
{
    return is_string($token) && !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
