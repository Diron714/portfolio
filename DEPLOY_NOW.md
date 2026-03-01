# Deploy your changes and get a working portfolio link

Follow these steps in order. Your portfolio will be live at a Vercel URL; the contact form will use your Render backend.

---

## Step 1: Push your code to GitHub

In your project folder (e.g. `C:\Users\Diron\Desktop\Portfolio`), open a terminal and run:

```powershell
git add .
git status
git commit -m "Favicon D, contact form fixes, trust proxy"
git push origin main
```

(If your branch is `master` instead of `main`, use `git push origin master`.)

Wait until the push finishes. Your latest code (favicon, contact fixes, backend trust proxy) is now on GitHub.

---

## Step 2: Backend (Render) – redeploy

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Open your **backend** service (e.g. `portfolio-backend`).
3. Click **Manual Deploy** → **Deploy latest commit**.
4. Wait until the deploy status is **Live** (green).
5. Copy your backend URL (e.g. `https://portfolio-backend-7w3p.onrender.com`). You need it for the next step.

---

## Step 3: Frontend (Vercel) – set env and redeploy

1. Go to [vercel.com](https://vercel.com) and open your **Portfolio** project.
2. Go to **Settings** → **Environment Variables**.
3. Check that **`VITE_API_URL`** exists and its value is your **backend URL** from Step 2 (no trailing slash), e.g.  
   `https://portfolio-backend-7w3p.onrender.com`  
   If it’s missing or wrong, add/edit it, then save.
4. Go to the **Deployments** tab.
5. Click the **⋮** (three dots) on the latest deployment → **Redeploy**.
6. Confirm **Redeploy** (you can leave “Use existing Build Cache” unchecked for a clean build).
7. Wait until the deployment status is **Ready**.
8. Click **Visit** or copy the deployment URL (e.g. `https://portfolio-xxxx.vercel.app`).  
   **This is your working portfolio link.**

---

## Step 4: CORS (if contact form still fails)

1. In **Render** → your backend service → **Environment**.
2. Set **`FRONTEND_URL`** to your **Vercel portfolio URL** from Step 3 (e.g. `https://portfolio-xxxx.vercel.app`), no trailing slash.
3. Click **Save** and choose **Save and deploy** so the backend restarts with the new value.

---

## Step 5: Test your portfolio link

1. Open your **Vercel URL** (the portfolio link from Step 3).
2. Check:
   - Tab icon shows **D** (red square with “D”).
   - All sections load (Hero, About, Skills, Projects, Contact, Footer).
   - **Contact**: send a test message → you should see **“Message sent ✓”**.
3. To see the message in the backend:
   - Open `https://YOUR-BACKEND-URL.onrender.com/admin` (use the same URL as in `VITE_API_URL`).
   - Enter your **Admin key** (same as `ADMIN_KEY` on Render).
   - Click **Load messages** → your test message should appear.

---

## Summary

| Step | What you do |
|------|-------------|
| 1 | `git add .` → `git commit -m "..."` → `git push origin main` |
| 2 | Render → your backend → **Manual Deploy** → **Deploy latest commit** → copy backend URL |
| 3 | Vercel → **Settings** → **Environment Variables** → set `VITE_API_URL` = backend URL → **Deployments** → **Redeploy** → copy portfolio URL |
| 4 | Render → **Environment** → set `FRONTEND_URL` = Vercel URL → Save and deploy |
| 5 | Open portfolio URL, test site and contact form, then use `/admin` to see messages |

Your **working portfolio link** is the Vercel URL you get after Step 3 (e.g. `https://portfolio-xxxx.vercel.app`). Share that link on your resume, LinkedIn, and GitHub.
