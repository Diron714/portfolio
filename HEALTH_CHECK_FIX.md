# Fix: Backend health check shows error

When you open `https://your-backend.onrender.com/api/health` you should see `{"ok":true}`. If you get an error, follow these steps in order.

---

## Step 1: Use your real backend URL

- In **Render** go to your backend service (Dashboard → your web service).
- At the top you’ll see the service URL, e.g. **`https://portfolio-backend-xxxx.onrender.com`**.
- Use that exact URL. Replace `your-backend.onrender.com` in the guide with this URL.

Try in the browser:

- `https://YOUR-REAL-URL.onrender.com/`
- `https://YOUR-REAL-URL.onrender.com/api/health`

Both should return JSON. If the service was sleeping (free tier), wait **30–60 seconds** and try again.

---

## Step 2: Check Render service settings

In Render → your backend service → **Settings**:

| Setting | Must be |
|--------|---------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

If any of these are wrong, fix them and click **Save**, then **Manual Deploy** → **Deploy latest commit**.

---

## Step 3: Check Logs

In Render → your backend service → **Logs**.

- You should see: **`Server running on port 5000`**. If you see that, the app is running and the health URL should work (maybe after waiting for cold start).
- If you see **`DB connection failed`**: the server still starts; health should work. The contact form will fail until `MONGO_URI` is fixed (Atlas connection string and Network Access).
- If you **don’t** see “Server running on port 5000”, the start command or root directory is wrong — fix Step 2 and redeploy.

---

## Step 4: Redeploy with latest code

The backend was updated so the server starts **before** MongoDB connects and responds at `/` and `/api/health`.

1. Commit and push your latest code (including `backend/server.js`).
2. In Render → your service → **Manual Deploy** → **Deploy latest commit**.
3. Wait for the deploy to finish (green “Live”).
4. Try again:
   - `https://YOUR-REAL-URL.onrender.com/`
   - `https://YOUR-REAL-URL.onrender.com/api/health`

---

## Summary

1. Use the **real** URL from the Render dashboard.
2. Wait **30–60 seconds** on first request (free tier wake-up).
3. Confirm **Root Directory** = `backend`, **Start Command** = `npm start`.
4. Check **Logs** for “Server running on port 5000”.
5. **Redeploy** after pushing the latest `backend/server.js`.

After that, both `/` and `/api/health` should return JSON and the health check step is done.
