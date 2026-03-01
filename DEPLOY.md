# Deploy Portfolio – Backend + Frontend

Deploy the **backend** first (to get the API URL), then deploy the **frontend** and set `VITE_API_URL` to that URL.

---

## Part 1: Deploy backend (Render – free tier)

Render.com offers a free tier for Node.js backends and supports MongoDB + env vars.

### 1.1 Push code to GitHub

If not already done:

```bash
git add .
git commit -m "Ready for deploy"
git push origin main
```

### 1.2 Create backend on Render

1. Go to [render.com](https://render.com) and sign in (or create account with GitHub).
2. Click **New** → **Web Service**.
3. Connect your **GitHub** repo and select the **Portfolio** repository.
4. Configure the service:
   - **Name:** `portfolio-backend` (or any name).
   - **Region:** choose closest to you.
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Advanced** and add **Environment Variables** (same names as in `backend/.env`):

   | Key | Value |
   |-----|--------|
   | `MONGO_URI` | Your MongoDB Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`) |
   | `ADMIN_KEY` | Your secret admin key (same as local, or a new strong password) |
   | `FRONTEND_URL` | Your frontend URL – **set this after Part 2** (e.g. `https://your-portfolio.vercel.app`) |
   | `SMTP_HOST` | `smtp.gmail.com` (if using Gmail) |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASS` | Your Gmail App Password |
   | `SMTP_FROM` | Your Gmail address |
   | `CONTACT_EMAIL` | Where to receive contact emails |

   You can add `FRONTEND_URL` later and then **Manual Deploy** → **Clear build cache & deploy** so CORS works.

6. Click **Create Web Service**. Wait for the first deploy to finish.
7. Copy your backend URL, e.g. **`https://portfolio-backend-xxxx.onrender.com`**. You need this for the frontend.

### 1.3 (Optional) MongoDB Atlas

- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cluster.
- Create a database user and get the connection string.
- In Atlas → Network Access, add **0.0.0.0/0** (allow from anywhere) so Render can connect.
- Put the full URI in `MONGO_URI` on Render (include password and database name).

---

## Part 2: Deploy frontend (Vercel – free tier)

Vercel works well with Vite and GitHub.

### 2.1 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.
2. Click **Add New** → **Project**.
3. Import your **Portfolio** repo.
4. Configure:
   - **Framework Preset:** Vite (should be auto-detected).
   - **Root Directory:** leave as `.` (repo root).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add **Environment Variable** (required for contact form to work):
   - **Name:** `VITE_API_URL`
   - **Value:** your backend URL from Part 1 (e.g. `https://portfolio-backend-xxxx.onrender.com`)  
   **No trailing slash.** If this is missing, the contact form will show an error when submitted.
6. Click **Deploy**. Wait for the build to finish.
7. Copy your frontend URL, e.g. **`https://portfolio-xxxx.vercel.app`**.

### 2.2 Point backend to frontend (CORS)

1. In **Render** → your backend service → **Environment**.
2. Add or set **`FRONTEND_URL`** = your Vercel URL (e.g. `https://portfolio-xxxx.vercel.app`).
3. Save. Render will redeploy automatically so CORS allows your frontend.

---

## Part 3: Check everything

| Check | How |
|-------|-----|
| Backend health | Open `https://your-backend.onrender.com/api/health` → should show `{"ok":true}` |
| Frontend loads | Open your Vercel URL → portfolio loads |
| Contact form | Submit a message → “Message sent ✓” |
| View messages | Open `https://your-backend.onrender.com/admin`, enter `ADMIN_KEY`, click Load messages |
| Test email | Open `https://your-backend.onrender.com/api/test-email?key=YOUR_ADMIN_KEY` → check inbox |

---

## Env vars summary

### Backend (Render)

| Variable | Required | Example |
|----------|----------|---------|
| `MONGO_URI` | Yes | Atlas connection string |
| `ADMIN_KEY` | Yes | Your secret key |
| `FRONTEND_URL` | Yes (for CORS) | `https://portfolio-xxxx.vercel.app` |
| `SMTP_HOST` | Optional | `smtp.gmail.com` |
| `SMTP_PORT` | Optional | `587` |
| `SMTP_SECURE` | Optional | `false` |
| `SMTP_USER` | Optional | Your email |
| `SMTP_PASS` | Optional | App password |
| `SMTP_FROM` | Optional | Your email |
| `CONTACT_EMAIL` | Optional | Your email |

### Frontend (Vercel)

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_API_URL` | Yes | `https://portfolio-backend-xxxx.onrender.com` |

---

## Custom domain (optional)

- **Vercel:** Project → Settings → Domains → add your domain.
- **Render:** Service → Settings → Custom Domain → add subdomain (e.g. `api.yoursite.com`). Then set `VITE_API_URL` to that URL and update `FRONTEND_URL` if needed.

---

## Troubleshooting

- **“Duplicate keys are not allowed”:** You have the same environment variable name twice (e.g. two `FRONTEND_URL` or two `MONGO_URI`). In Render or Vercel → Environment / Environment Variables, delete the duplicate so each name appears only once.
- **`/api/health` shows error or won’t load:** (1) **Render free tier:** Wait 30–60 seconds and try again (service may be waking up). (2) **Wrong URL:** Use `https://` and your real backend host (e.g. `https://portfolio-backend-xxxx.onrender.com/api/health`). (3) **Backend not running:** In Render → your service → **Logs**; if you see “DB connection failed”, fix `MONGO_URI` (Atlas connection string and Network Access allowlist). The server now starts even if MongoDB fails, so after redeploy `/api/health` should respond.
- **Contact form shows success but no email:** Check SMTP vars on Render; use `/api/test-email?key=ADMIN_KEY` to test.
- **CORS error when submitting form / "Network Error" / "Try again":** (1) **Vercel** → Settings → Environment Variables → `VITE_API_URL` must be your **Render backend URL** (e.g. `https://portfolio-backend-7w3p.onrender.com`) with **no trailing slash**, **https**. (2) **Render** → your backend → Environment → `FRONTEND_URL` must be your **Vercel URL** (e.g. `https://portfolio-xxxx.vercel.app`) with **no trailing slash**. (3) Redeploy **both** after changing env (Vercel redeploy so frontend gets new build; Render "Save and deploy"). (4) Backend must be live: open `https://YOUR-BACKEND-URL.onrender.com/api/health` and wait 30–60 s if it was sleeping.
- **“Failed to fetch” / network error:** Ensure `VITE_API_URL` on Vercel has no trailing slash and uses `https://`.
- **Render backend sleeps on free tier:** First request after idle can take 30–60 seconds; subsequent requests are fast.
- **`ERR_ERL_UNEXPECTED_X_FORWARDED_FOR` / "trust proxy":** The backend now sets `trust proxy` so this is fixed. Redeploy the latest `backend/server.js` if you still see it.
- **"Email send failed: Connection timeout" (ETIMEDOUT):** Messages are still saved to MongoDB. Render (and some hosts) can block or throttle outbound SMTP. You can view messages at `/admin`. For reliable email in production, consider a transactional email API (e.g. Resend, SendGrid) instead of SMTP.
