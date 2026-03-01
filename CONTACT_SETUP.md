# Contact Form & View Messages – Setup Guide

This guide explains how contact messages are saved and how you can view them.

---

## How It Works

1. **User** fills the contact form on your portfolio and clicks **Send message**.
2. **Frontend** sends a POST request to: `VITE_API_URL + '/api/contact'` (e.g. `http://localhost:5000/api/contact`).
3. **Backend** (`backend/routes/contact.js`):
   - Validates name, email, and message
   - Saves to **MongoDB** in the `contacts` collection
   - Optionally sends you an **email** (in production, if SMTP is configured)

**Where messages are stored:** MongoDB database (and optionally your email inbox).

**How you see them:** Open the **Admin page** in your browser, enter your admin key, and click **Load messages**.

---

## To-Do List (Do These in Order)

### Step 1: Install and run MongoDB

- **Option A – Local:** Install [MongoDB Community](https://www.mongodb.com/try/download/community) and start the MongoDB service.
- **Option B – Cloud:** Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and copy the connection string.

You need MongoDB running so the backend can save messages.

---

### Step 2: Backend environment (.env)

1. Go to the **backend** folder: `cd backend`
2. Copy the example env file:
   - **Windows:** `copy env.example .env`
   - **Mac/Linux:** `cp env.example .env`
3. Open **`.env`** and set:

   | Variable     | What to put |
   |-------------|-------------|
   | `MONGO_URI` | Your MongoDB connection string, e.g. `mongodb://localhost:27017/portfolio` or your Atlas URL |
   | `ADMIN_KEY` | A secret password you choose (e.g. `mySecretKey123`). You’ll type this on the admin page to view messages. |
   | `FRONTEND_URL` | `http://localhost:5173` for local dev (or your frontend URL in production) |

4. Save the file.

---

### Step 3: Run the backend

1. In the **backend** folder, install dependencies (first time only):

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

   You should see: `Server running on port 5000` and `MongoDB connected`.

---

### Step 4: Frontend environment (.env)

1. In the **project root** (where `package.json` for the React app is), copy the example env:
   - **Windows:** `copy env.example .env`
   - **Mac/Linux:** `cp env.example .env`
2. Open **`.env`** and set:

   | Variable        | What to put |
   |-----------------|-------------|
   | `VITE_API_URL`  | Backend URL, e.g. `http://localhost:5000` |

3. Save the file.
4. **Restart the frontend** (stop and run `npm run dev` again) so it picks up the new env.

---

### Step 5: Run the frontend

In the **project root**:

```bash
npm install
npm run dev
```

Open the portfolio in the browser (e.g. `http://localhost:5173`), go to the Contact section, and send a test message. You should see “Message sent ✓”.

---

### Step 6: View messages (Admin page)

1. Open in your browser: **http://localhost:5000/admin**
2. In the **Admin key** field, enter the same value you set for `ADMIN_KEY` in the backend `.env`.
3. Click **Load messages**.
4. You should see a table with all contact messages (date, name, email, message).

---

## Checklist Summary

| # | Task | Done |
|---|------|------|
| 1 | MongoDB installed and running (or Atlas URI in `MONGO_URI`) | ☐ |
| 2 | Backend: copy `backend/env.example` → `backend/.env`, set `MONGO_URI`, `ADMIN_KEY`, `FRONTEND_URL` | ☐ |
| 3 | Backend: `npm install` and `npm run dev` (server on port 5000, MongoDB connected) | ☐ |
| 4 | Root: copy `env.example` → `.env`, set `VITE_API_URL=http://localhost:5000` | ☐ |
| 5 | Frontend: `npm run dev`, send a test message from Contact section | ☐ |
| 6 | Open **http://localhost:5000/admin**, enter admin key, click **Load messages** | ☐ |

---

## Production (Deploy)

- **Backend:** Deploy to Railway, Render, Fly.io, or any Node host. Set `MONGO_URI` to your production MongoDB (e.g. Atlas) and `ADMIN_KEY` to a strong secret. Set `FRONTEND_URL` to your live portfolio URL.
- **Frontend:** Set `VITE_API_URL` to your live backend URL (e.g. `https://your-api.railway.app`) in your build env, then build and deploy.

Admin page in production: **https://your-backend-url.com/admin**

---

## Optional: Email on each message (SMTP)

To receive an email every time someone sends a message (in production), set up SMTP in **backend/.env** and set `NODE_ENV=production`.

**Full step-by-step:** see **[SMTP_SETUP.md](./SMTP_SETUP.md)** in the project root. It covers:

- **Gmail** – using an App Password (recommended)
- **Outlook / Microsoft 365**
- **Other providers** – generic SMTP settings

Required variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_EMAIL`. Messages are always saved to MongoDB even if the email fails.
