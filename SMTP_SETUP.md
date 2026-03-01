# SMTP Setup – Receive Contact Form Messages by Email

When someone submits your contact form, the backend can send you an email with their name, email, and message. Messages are always saved in MongoDB; SMTP is optional so you also get an email.

**Important:** The backend sends email whenever **SMTP_HOST**, **SMTP_USER**, and **SMTP_PASS** are set in `backend/.env` — in both development and production. No need to set `NODE_ENV=production` for email to work.

---

## 1. Choose a provider and get credentials

### Option A: Gmail (recommended for testing / small use)

1. Use a **Google account** (e.g. `louisdiron2002@gmail.com`).
2. Turn on **2-Step Verification** (needed for App Passwords):
   - Go to [Google Account → Security](https://myaccount.google.com/security)
   - Under “How you sign in to Google”, turn on **2-Step Verification** and complete the steps.
3. Create an **App Password** (this is what you put in `SMTP_PASS`):
   - Go to [Google Account → Security → 2-Step Verification](https://myaccount.google.com/apppasswords)
   - Or: Google Account → Security → 2-Step Verification → at the bottom, **App passwords**
   - Select app: **Mail**, device: **Other** (e.g. “Portfolio backend”), then **Generate**.
   - Copy the **16-character password** (no spaces). You’ll use it as `SMTP_PASS`.
4. Use these values in your backend `.env`:

| Variable | Value for Gmail |
|----------|-----------------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | Your full Gmail address (e.g. `louisdiron2002@gmail.com`) |
| `SMTP_PASS` | The 16-character **App Password** (not your normal Gmail password) |
| `SMTP_FROM` | Same as `SMTP_USER` or a display name like `"Diron Portfolio" <louisdiron2002@gmail.com>` |
| `CONTACT_EMAIL` | Email where you want to receive messages (usually same as `SMTP_USER`) |

**Example `backend/.env` (Gmail):**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=louisdiron2002@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM=louisdiron2002@gmail.com
CONTACT_EMAIL=louisdiron2002@gmail.com
```

(Remove spaces from the App Password when pasting: `SMTP_PASS=abcdefghijklmnop`.)

---

### Option B: Outlook / Microsoft 365

1. Use your Outlook or Microsoft 365 email (e.g. `you@outlook.com` or `you@yourcompany.com`).
2. If your org uses Microsoft 365, you may need to use an **app password** or allow “less secure apps” in the admin center. For personal Outlook, you can use an app password:
   - Go to [Microsoft Account → Security](https://account.microsoft.com/security)
   - **Advanced security options** → **Create a new app password** (if available).
3. Use these in `backend/.env`:

| Variable | Value for Outlook |
|----------|-------------------|
| `SMTP_HOST` | `smtp-mail.outlook.com` (or `smtp.office365.com` for Microsoft 365) |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | Your full Outlook/Office email |
| `SMTP_PASS` | Your account password or app password |
| `SMTP_FROM` | Same as `SMTP_USER` |
| `CONTACT_EMAIL` | Where to receive messages (e.g. same email) |

**Example:**

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@outlook.com
SMTP_PASS=your-app-password-or-password
SMTP_FROM=you@outlook.com
CONTACT_EMAIL=you@outlook.com
```

---

### Option C: Other providers (generic SMTP)

Many hosts (e.g. cPanel, Zoho, SendGrid, Mailgun) give you SMTP host, port, user, and password. Use their docs for exact values. Then set:

| Variable | Meaning |
|----------|--------|
| `SMTP_HOST` | e.g. `smtp.example.com` |
| `SMTP_PORT` | Usually `587` (TLS) or `465` (SSL). For port 465 use `SMTP_SECURE=true`. |
| `SMTP_SECURE` | `true` for port 465, `false` for 587 |
| `SMTP_USER` | SMTP username (often your email) |
| `SMTP_PASS` | SMTP password or API key |
| `SMTP_FROM` | “From” address (often same as `SMTP_USER`) |
| `CONTACT_EMAIL` | Where you want contact messages sent |

---

## 2. Add variables to backend `.env`

1. Open **`backend/.env`** (create from `backend/env.example` if needed).
2. Add or uncomment **all** of these (with your real values):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=your-email@gmail.com
```

3. Save the file. **Do not commit `.env`** to Git (it should be in `.gitignore`).

---

## 3. When does the email actually send?

The backend sends an email whenever **SMTP_HOST**, **SMTP_USER**, and **SMTP_PASS** are set (in `backend/.env` or your production host’s environment). It works in both development and production.

- **Local:** Add the SMTP variables to `backend/.env`, run the backend, and submit a message — check your inbox (and spam).
- **Production:** Set the same SMTP variables in your host’s env (e.g. Railway, Render). Each contact submission will save to MongoDB and send you an email.

---

## 4. Checklist

| Step | Done |
|------|------|
| 1. Get SMTP credentials (e.g. Gmail App Password or Outlook app password) | ☐ |
| 2. Add all 7 SMTP variables to `backend/.env` | ☐ |
| 3. In production, set `NODE_ENV=production` and same SMTP vars in host dashboard | ☐ |
| 4. Send a test message and check your inbox (and spam folder) | ☐ |

If email fails, the backend logs “Email send failed” but still returns success and the message is always saved in MongoDB and visible at **/admin**.
