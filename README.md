# Portfolio — Kevin | Software Engineer & UI/UX

Single-page portfolio (MERN-style): React + Vite + Tailwind frontend, Express + MongoDB backend for contact form.

## Structure

- **Frontend** (root): React, Vite, Tailwind, Framer Motion, React Icons, Axios
- **Backend** (`/backend`): Express, MongoDB (Mongoose), Nodemailer, Helmet, express-rate-limit, express-validator

## Quick start

### Frontend

```bash
npm install
cp .env.example .env   # set VITE_API_URL if using backend
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # set MONGO_URI, FRONTEND_URL, optional SMTP
npm run dev
```

### Content

- Add your **resume** as `public/resume.pdf` (create the file; the Download button links to it).
- Update **contact** email/phone and social links in `src/components/Contact.jsx`.
- Edit **projects** in `src/data/projects.js` and add images under `public/projects/` (e.g. `pet-system.png`).

## Phase 1 checklist

- [x] Vite + React + Tailwind
- [x] Single-page layout: Home, About, Skills, Projects, Contact, Footer
- [x] Navbar, Hero, About, Skills, Projects, Contact, Footer, ScrollToTop
- [x] Dark theme, smooth scroll
- [x] Contact form with idle → loading → success/error (3s reset)
- [x] Resume download from `public/resume.pdf`
- [x] Express backend: CORS, Helmet, 10kb JSON limit
- [x] Contact schema (name, email, message, date, isRead)
- [x] POST /api/contact with rate limit (5/10min), express-validator
- [x] Save to DB first, then optional email (no block on SMTP failure)
- [x] Favicon (SVG), SEO meta (title, description, theme-color, og:*)
- [x] `.env.example` for frontend and backend
