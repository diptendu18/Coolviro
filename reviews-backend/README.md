# Coolviro Services — Customer Review System (PHP + MySQL, Hostinger)

This folder is a **separate, standalone PHP application** — it does not run
on Vercel and is not part of the Next.js build. It's meant to be uploaded to
your Hostinger hosting account, where it talks to a MySQL database also
hosted on Hostinger. The Next.js website (wherever it's deployed) calls this
API over HTTPS from the browser to show approved reviews and accept new
ones.

```
reviews-backend/
├── sql/schema.sql          ← import this into your Hostinger MySQL database
├── config.sample.php       ← copy to config.php and fill in real credentials
├── includes/               ← shared PHP code (DB connection, validation)
├── api/
│   ├── get_reviews.php     ← public: returns approved reviews (used by homepage)
│   └── submit_review.php   ← public: accepts a new review (status = pending)
├── admin/                  ← password-protected moderation panel
│   ├── login.php
│   ├── index.php           ← view / approve / reject / delete reviews
│   └── logout.php
└── uploads/reviews/        ← customer-submitted photos are stored here
```

No review is ever shown on the public website the moment it's submitted.
Every new review is stored with `status = 'pending'` and stays invisible
until you open `/admin` and click **Approve**. `api/get_reviews.php` — the
only endpoint the homepage reads from — only ever selects
`WHERE status = 'approved'`, so this is enforced at the database query
level, not just in the UI.

---

## Step 1 — Create the MySQL database in Hostinger

1. Log into **hPanel** (Hostinger's control panel).
2. Go to **Databases → MySQL Databases**.
3. Under "Create a New MySQL Database", enter a database name, e.g.
   `reviews`. Hostinger will automatically prefix it with your account ID,
   producing something like **`u123456789_reviews`** — that's your real
   `DB_NAME`.
4. Under "Create a New Database User", enter a username, e.g.
   `reviewsuser`, and a strong password. Hostinger prefixes the username
   too, e.g. **`u123456789_reviewsuser`** — that's your real `DB_USER`.
   Save the password somewhere safe — that's your `DB_PASS`.
5. Scroll to "Add User to Database", select the user and database you just
   created, and grant **All Privileges**.
6. Note the **database host** shown on the page — on Hostinger shared
   hosting this is almost always `localhost`, but check the page to
   confirm (some plans show a specific hostname instead). That's your
   `DB_HOST`.

You now have all four values needed for `config.php`: `DB_HOST`,
`DB_NAME`, `DB_USER`, `DB_PASS`.

## Step 2 — Import the schema

1. In hPanel, go to **Databases → phpMyAdmin** and open your new database
   (or click "Manage" next to it in the MySQL Databases list).
2. Click the **Import** tab.
3. Choose the file `sql/schema.sql` from this folder and click **Go**.
4. Confirm two tables now exist: `reviews` and `admin_users`.

(If you have SSH/terminal access on your plan, you can instead run:
`mysql -u DB_USER -p DB_NAME < sql/schema.sql`.)

## Step 3 — Upload this folder to Hostinger

1. In hPanel, go to **Files → File Manager** (or connect via FTP/SFTP —
   the credentials are under **Files → FTP Accounts**).
2. Upload the entire `reviews-backend/` folder into `public_html/` (or a
   subfolder of it). The public URL will match wherever you put it —
   e.g. uploading to `public_html/reviews-backend/` makes the API
   reachable at `https://yourdomain.com/reviews-backend/`.
3. **Do not upload `config.sample.php` renamed as-is with placeholder
   values.** You'll create the real `config.php` in the next step.

## Step 4 — Create `config.php` with your real credentials

1. In File Manager (or via FTP), duplicate `config.sample.php` and rename
   the copy to `config.php`, in the same folder.
2. Edit `config.php` and fill in the four values from Step 1:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'u123456789_reviews');
   define('DB_USER', 'u123456789_reviewsuser');
   define('DB_PASS', 'your-real-password');
   ```
3. Leave the rest of the file as-is for now (upload limits, rate
   limiting) — see Step 7 for the CORS setting once you have a domain.

`config.php` is never committed to git (it's listed in `.gitignore`) and
is never sent to the browser — it only exists on the server and is read
directly by the PHP scripts that need it.

## Step 5 — Create your admin login

No admin account is created automatically — you create your own. This
avoids ever shipping a default username/password that someone could
guess.

1. Generate a password hash. The easiest way is on your own computer, if
   you have PHP installed, by running:
   ```
   php -r "echo password_hash('YourChosenPassword', PASSWORD_DEFAULT);"
   ```
   This prints something like
   `$2y$12$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX`.
   (No PHP on your computer? Hostinger's hPanel also offers a browser-based
   Terminal under **Advanced → SSH Access** on some plans where you can run
   the same command.)
2. In phpMyAdmin, open the `admin_users` table and click **Insert**.
3. Set `username` to whatever you want to log in with (e.g. `admin`), and
   paste the full hash string (starting with `$2y$...`) into
   `password_hash`. Leave `id` and `created_at` on their defaults. Click
   **Go**.
4. Visit `https://yourdomain.com/reviews-backend/admin/login.php` and log
   in with the username and the *original* password (not the hash).

You can repeat this to add more admin accounts, or add a second row later
the same way.

## Step 6 — Set folder permissions for photo uploads

The `uploads/reviews/` folder needs to be writable by PHP so uploaded
review photos can be saved there.

1. In File Manager, right-click `reviews-backend/uploads/reviews/` →
   **Permissions** (or **Change Permissions**).
2. Set it to **755** (owner: read/write/execute, group/others:
   read/execute). If uploads still fail, try 775 — exact requirements
   vary slightly by hosting configuration.

This folder already has its own `.htaccess` that disables PHP execution
inside it, so even though it's writable, nothing uploaded there can ever
run as a script.

## Step 7 — Connect the Next.js frontend

Wherever your Next.js site is deployed (Vercel or elsewhere), set this
environment variable to this backend's public URL:

```
NEXT_PUBLIC_REVIEWS_API_URL=https://yourdomain.com/reviews-backend
```

No trailing slash. Once set and redeployed, the homepage's "What Our
Customers Say" section will fetch approved reviews from
`get_reviews.php`, and the `/write-a-review` page will submit new ones to
`submit_review.php`. Leaving this unset is safe — both pages fall back to
a friendly "not available yet" state instead of erroring, so you can
deploy the site before the review backend is live and connect it later.

Once you know your real domain, also tighten CORS in `config.php` — open
it and change:

```php
define('ALLOWED_ORIGINS', [
  '*',
]);
```

to your actual site domain(s), e.g.:

```php
define('ALLOWED_ORIGINS', [
  'https://coolviroservices.com',
  'https://www.coolviroservices.com',
]);
```

This restricts which websites are allowed to call your review API —
important once real customer data is flowing through it.

## Step 8 — Test it

1. Visit `/write-a-review` on your live site and submit a test review.
2. Log into `/reviews-backend/admin/` and confirm it shows up under
   **Pending**.
3. Click **Approve**.
4. Refresh the homepage — your review should now appear under "What Our
   Customers Say".
5. Submit a second test review and click **Reject** instead — confirm it
   never appears on the homepage.
6. Delete one of your test reviews and confirm it disappears from the
   admin panel (and, if it had a photo, that the photo file is gone from
   `uploads/reviews/` too).

---

## Security notes

- **Never fake reviews.** This system has no seed data and no way to
  publish a review that wasn't actually submitted through the form —
  every row in `reviews` starts as `pending` and only becomes visible
  after a human clicks Approve.
- All database queries use PDO prepared statements — no raw string
  concatenation of user input into SQL, anywhere.
- All admin panel output is escaped with `htmlspecialchars()` before
  being written into HTML.
- Every admin moderation action (approve/reject/delete) requires a valid
  CSRF token tied to the logged-in session.
- Admin passwords are stored as bcrypt hashes (`password_hash()`), never
  in plain text. Failed login attempts are rate-limited (5 attempts, then
  a 15-minute lockout).
- Uploaded photos are validated by their actual file content (not the
  filename or the browser-reported type), restricted to JPEG/PNG/WebP,
  capped at 5 MB, saved under a random filename, and served from a folder
  where `.htaccess` disables PHP execution — an uploaded file can never
  be run as a script even if someone renamed a malicious file to `.jpg`.
- `config.php` (real DB credentials) is excluded from git via
  `.gitignore` and is also blocked from direct browser access by
  `.htaccess` — and even if that `.htaccess` protection were somehow
  disabled, the file produces no output when loaded directly (it only
  contains `define()` calls), so it cannot leak credentials to a browser
  request either way.
- The review submission endpoint rate-limits by IP (3 submissions per
  hour by default — adjust `RATE_LIMIT_MAX_SUBMISSIONS` /
  `RATE_LIMIT_WINDOW_MINUTES` in `config.php`) and includes a honeypot
  field to deter basic bots.
- Always access `/admin` over **HTTPS** — Hostinger provides a free SSL
  certificate (hPanel → **Security → SSL**); make sure it's active before
  you log in for the first time, since the login form sends your
  password in the request body.

## Troubleshooting

- **"Server is not configured yet."** — `config.php` doesn't exist yet;
  repeat Step 4.
- **Reviews don't show up on the homepage after approving** — double
  check `NEXT_PUBLIC_REVIEWS_API_URL` is set correctly on the Next.js
  side and that the site was rebuilt/redeployed after setting it.
- **CORS error in the browser console** — your site's domain isn't in
  `ALLOWED_ORIGINS` in `config.php` (Step 7), or you're testing from a
  different domain (e.g. a Vercel preview URL) than the one you added.
- **Photo uploads fail** — check the permissions on
  `uploads/reviews/` (Step 6), and confirm your hosting plan's
  `upload_max_filesize` / `post_max_size` PHP settings (hPanel → **Advanced
  → PHP Configuration**) are at least 5 MB.
