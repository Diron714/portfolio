# Fix SendGrid "403 Forbidden" Error

SendGrid returns **403 Forbidden** when your **sender (from) email is not verified**. Fix it like this:

## 1. Verify your sender email in SendGrid

1. Log in at [sendgrid.com](https://sendgrid.com).
2. Go to **Settings** → **Sender Authentication**.
3. Use **Single Sender Verification**:
   - Click **Create New Sender** (or verify an existing one).
   - Enter the **exact same email** you use in `EMAIL_FROM` in your `.env` (e.g. `louisdiron2002@gmail.com`).
   - Fill in name and address, then save.
4. SendGrid will send a **verification email** to that address. Open it and click the link.
5. Wait until the sender shows as **Verified** in the dashboard.

## 2. Use that email in your app

In `backend/.env` (or Render env):

```env
EMAIL_FROM=louisdiron2002@gmail.com
```

Use the **exact same address** you verified in SendGrid (no typo, same case).

## 3. API key permissions (if it still fails)

- In SendGrid: **Settings** → **API Keys**.
- Your key must have **Mail Send** permission (Full Access or Restricted with “Mail Send” enabled).
- If in doubt, create a new key with **Full Access** and use it in `SENDGRID_API_KEY`.

After verifying the sender and matching `EMAIL_FROM`, restart your backend and try again. The contact form will still save messages to the database; only the email step was failing.
