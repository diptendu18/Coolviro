-- Coolviro Services — Customer Review System
-- MySQL schema. Import this file via phpMyAdmin in Hostinger's hPanel
-- (or `mysql -u USER -p DBNAME < schema.sql` if you have shell access).
-- See ../README.md for the full step-by-step Hostinger setup.

SET NAMES utf8mb4;

-- ---------------------------------------------------------------------------
-- reviews: every customer-submitted review. New rows always start as
-- 'pending' — nothing here is shown on the public site until an admin
-- approves it (see api/get_reviews.php, which only ever selects status =
-- 'approved').
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_name     VARCHAR(60)  NOT NULL,
  service_used      VARCHAR(80)  NOT NULL,
  rating            TINYINT UNSIGNED NOT NULL,
  review_text       VARCHAR(1000) NOT NULL,
  photo_filename    VARCHAR(255) NULL,
  status            ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  ip_address        VARCHAR(45)  NULL,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_status_created (status, created_at),
  KEY idx_ip_created (ip_address, created_at),
  CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- admin_users: people who can log into /admin to moderate reviews.
-- No default row is seeded here on purpose — never ship a default
-- username/password. Create your own admin account by generating a
-- password hash and inserting it yourself; see README.md "Step 5".
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username       VARCHAR(60)  NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
