# Your To-Do List (after updating .env)

You’ve updated your `.env` files. Do these steps to get contact form + admin + email working.

---

## ☐ 1. MongoDB running

- **Local:** Start MongoDB (e.g. start the MongoDB service on your PC).
- **Atlas:** You already have a connection string in `backend/.env` as `MONGO_URI` — ensure the cluster is running and the IP is allowed (or allow 0.0.0.0 for testing).

---

## ☐ 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

You should see: **Server running on port 5000** and **MongoDB connected**.  
If MongoDB isn’t running, the backend will exit with a connection error.

---

## ☐ 3. Start the frontend

In a **new terminal**, from the **project root** (not inside `backend`):

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## ☐ 4. Test the contact form

1. Go to the **Contact** section on your portfolio.
2. Fill in name, email, and message and click **Send message**.
3. You should see **Message sent ✓**.
4. If you set SMTP in `backend/.env`, check your email (and spam) for the message.

---

## ☐ 5. View messages in admin

1. Open **http://localhost:5000/admin** in your browser.
2. Enter your **Admin key** (same as `ADMIN_KEY` in `backend/.env`).
3. Click **Load messages**.
4. You should see the message you sent in the table.

---

## ☐ 6. (Optional) Production deploy

- Deploy backend (e.g. Railway, Render) and set the same env vars there.
- Deploy frontend and set `VITE_API_URL` to your live backend URL.
- See **CONTACT_SETUP.md** → “Production (Deploy)” for details.

---

**Summary:** Start MongoDB → run backend → run frontend → test form → open /admin to see messages. SMTP email works in both dev and production when SMTP vars are set in `backend/.env`.
