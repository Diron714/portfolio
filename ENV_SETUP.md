# Environment variables – Local and Render

Use this to run the contact feature **locally** and to configure **Render** for production.

---

## 1. Local development

### Backend (required for contact form)

1. Go to the `backend` folder.
2. Copy the example env file:
   - **Windows:** `copy env.example .env`
   - **Mac/Linux:** `cp env.example .env`
3. Edit `backend/.env` and set at least:

```env
# Required for contact messages (use MongoDB Atlas or local MongoDB)
MONGO_URI=mongodb://localhost:27017/portfolio

# Required to open /admin page (any secret string)
ADMIN_KEY=your-secret-admin-key

# Required for CORS when frontend runs on localhost:5173
FRONTEND_URL=http://localhost:5173

# Optional
PORT=5000
```

4. **(Optional)** To receive emails locally, use either:
   - **SendGrid:** `SENDGRID_API_KEY`, `EMAIL_FROM`, `CONTACT_EMAIL`
   - **SMTP (e.g. Gmail):** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`  
   See `backend/env.example` for the full list.

### Frontend (required for contact form)

1. In the **project root** (same folder as `package.json` and `src/`), create or edit `.env`.
2. Add:

```env
# Backend API URL – for local dev use your backend running on port 5000
VITE_API_URL=http://localhost:5000
```

3. Restart the Vite dev server after changing `.env` (Vite reads env at build/dev start).

---

## 2. How to test locally

1. **Start MongoDB** (local or use MongoDB Atlas and set `MONGO_URI` in `backend/.env`).
2. **Start backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   You should see: `Server running on port 5000` and `MongoDB connected`.
3. **Start frontend** (new terminal):
   ```bash
   cd c:\Users\Diron\Desktop\Portfolio
   npm install
   npm run dev
   ```
4. Open **http://localhost:5173**, scroll to **Contact**, fill the form and submit.
   - You should see **"Message sent ✓"**.
5. **View messages:** Open **http://localhost:5000/admin**, enter your `ADMIN_KEY`, click **Load messages**.
6. **(Optional)** Test email:  
   `http://localhost:5000/api/test-email?key=YOUR_ADMIN_KEY`  
   (Only works if SendGrid or SMTP is configured in `backend/.env`.)

---

## 3. Render (production backend)

In **Render** → your backend service → **Environment**, add these variables.

### Required

| Key | Value |
|-----|--------|
| `MONGO_URI` | Your MongoDB Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`) |
| `ADMIN_KEY` | Strong secret (e.g. random string); used to view messages at `https://YOUR-BACKEND.onrender.com/admin` |
| `FRONTEND_URL` | Your frontend URL with no trailing slash (e.g. `https://your-portfolio.vercel.app`) |

### Optional – email (recommended: SendGrid)

| Key | Value |
|-----|--------|
| `SENDGRID_API_KEY` | SendGrid API key from [sendgrid.com](https://sendgrid.com) |
| `EMAIL_FROM` | Verified sender email in SendGrid (e.g. `louisdiron2002@gmail.com`) |
| `CONTACT_EMAIL` | Where to receive contact form messages (can be same as `EMAIL_FROM`) |

You do **not** need `SMTP_*` on Render if you use SendGrid (Render blocks SMTP ports).

---

## 4. Vercel (production frontend)

In **Vercel** → your project → **Settings** → **Environment Variables**, add:

| Key | Value |
|-----|--------|
| `VITE_API_URL` | Your Render backend URL with no trailing slash (e.g. `https://portfolio-backend-xxxx.onrender.com`) |

Then **redeploy** the frontend (env is baked in at build time).

---

## 5. Quick checklist

- **Local contact not working**
  - Backend: `backend/.env` has `MONGO_URI`, `ADMIN_KEY`, `FRONTEND_URL`; backend is running (`npm run dev` in `backend`).
  - Frontend: project root `.env` has `VITE_API_URL=http://localhost:5000`; dev server was restarted after adding it.
- **Deployed contact not working**
  - Render: `FRONTEND_URL` = your Vercel URL (no trailing slash).
  - Vercel: `VITE_API_URL` = your Render URL (no trailing slash); redeploy after changing.
  - First request can take ~30–60 s on Render free tier (cold start); retry if it times out.
