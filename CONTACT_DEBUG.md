# Find why the contact form shows "Try again" / message not sending

Use these steps to see **exactly** what is failing.

---

## Step 1: Open browser DevTools

1. Open your **live portfolio** (Vercel URL) in Chrome or Edge.
2. Press **F12** (or right‑click → Inspect).
3. Go to the **Network** tab.
4. Leave DevTools open.

---

## Step 2: Submit the form and find the request

1. Fill the contact form and click **Send message**.
2. In the Network tab, look for a request whose name is **`contact`** (or the URL contains `api/contact`).
3. Click that request to see details.

---

## Step 3: What you see tells you the problem

| What you see | Meaning | What to do |
|--------------|--------|------------|
| **No `contact` request at all** | Frontend is not sending (e.g. `VITE_API_URL` missing or wrong at build time). | Vercel → Settings → Environment Variables → set **`VITE_API_URL`** = `https://portfolio-backend-7w3p.onrender.com` (no slash at end). Then **Redeploy** (new build needed). |
| **Request to wrong URL** (e.g. localhost or different domain) | `VITE_API_URL` in the build is wrong. | Same as above: fix `VITE_API_URL` on Vercel and **Redeploy**. |
| **Request to correct URL, status (failed) or CORS error in red** | Browser blocked the response (CORS). | Render → your backend → **Environment** → set **`FRONTEND_URL`** = your **exact Vercel URL** (e.g. `https://portfolio-xxxx.vercel.app`), no trailing slash. Then **Save and deploy**. |
| **Status 404** | Backend path wrong or backend not running. | Check the request URL is exactly `https://....onrender.com/api/contact` (no double slash). Open `https://....onrender.com/api/health` in a new tab; if it doesn’t load, backend is down or sleeping (wait 30–60 s). |
| **Status 429** | Too many submissions. | Wait a few minutes and try again. |
| **Status 500** | Backend crashed (e.g. DB or code error). | Render → your backend → **Logs**; look at the error and fix (e.g. `MONGO_URI`, code bug). |
| **Status 400** | Validation failed (name/email/message). | Check the **Response** body in DevTools for the message (e.g. "Valid email is required"). |

---

## Step 4: Check the request URL

In the Network tab, when you click the `contact` request:

- **Request URL** should be:  
  `https://portfolio-backend-7w3p.onrender.com/api/contact`  
  (or whatever your real Render URL is).
- No `localhost`, no trailing slash, no double slash (`//api/contact`).

If the URL is wrong, fix **`VITE_API_URL`** on Vercel and redeploy.

---

## Step 5: Check the error message on the page

After you click **Send message**, the form now shows a short error under the button. Use it as a hint:

- **"Backend not configured"** → `VITE_API_URL` not set on Vercel (or not in the build). Set it and redeploy.
- **"Network error (CORS or backend down?)"** → Usually CORS: set **`FRONTEND_URL`** on Render to your Vercel URL and redeploy. Or backend is sleeping: open `/api/health` and wait.
- **"Backend returned 404"** → Wrong `VITE_API_URL` or backend not running. Check URL and `/api/health`.
- **"Server error (500)"** → Check Render **Logs** for the backend error.

---

## Checklist (quick fix)

1. **Vercel** → Environment Variables → **`VITE_API_URL`** = `https://portfolio-backend-7w3p.onrender.com` (no trailing slash) → **Redeploy**.
2. **Render** → Environment → **`FRONTEND_URL`** = your Vercel URL (e.g. `https://portfolio-xxxx.vercel.app`), no trailing slash → **Save and deploy**.
3. Open `https://portfolio-backend-7w3p.onrender.com/api/health` in the browser; wait up to 1 minute if needed. You should see `{"ok":true}`.
4. Try the form again and, if it still fails, use **Step 1–3** above to see the exact request and status in DevTools.
