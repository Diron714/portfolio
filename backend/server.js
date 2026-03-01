import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

// Trust proxy (Render, Vercel, etc.) so rate-limit and X-Forwarded-* work
app.set('trust proxy', 1)

// Security: request body size limit
app.use(express.json({ limit: '10kb' }))

// Security headers
app.use(helmet())

// CORS – allow frontend (trim trailing slash) and any *.vercel.app
const frontendOrigin = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (origin === frontendOrigin) return callback(null, true)
      if (origin.endsWith('.vercel.app')) return callback(null, true)
      callback(null, false)
    },
    methods: ['GET', 'POST'],
    credentials: false,
  })
)

// Rate limit only for contact route (applied in routes/contact.js)

// Root – so Render and browsers get a response even when hitting base URL
app.get('/', (_, res) => {
  res.json({ ok: true, message: 'Portfolio API', health: '/api/health' })
})

// Health check
app.get('/api/health', (_, res) => {
  res.json({ ok: true })
})

// Contact API
app.use('/api', contactRoutes)

// Admin page: view contact messages (open in browser, enter ADMIN_KEY)
app.get('/admin', (_, res) => {
  res.set('Content-Type', 'text/html')
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact messages</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 24px; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin-bottom: 16px; }
    .auth { display: flex; gap: 8px; margin-bottom: 24px; }
    input { padding: 10px 12px; border: 1px solid #333; border-radius: 8px; background: #1a1a1a; color: #fff; width: 280px; }
    button { padding: 10px 20px; border: none; border-radius: 8px; background: #CC4D4D; color: #fff; font-weight: 600; cursor: pointer; }
    button:hover { opacity: 0.9; }
    .error { color: #f87171; margin-top: 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #262626; }
    th { color: #a3a3a3; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; }
    .date { color: #737373; font-size: 0.85rem; }
    .msg { max-width: 360px; word-break: break-word; }
  </style>
</head>
<body>
  <h1>Contact messages</h1>
  <div class="auth">
    <input type="password" id="key" placeholder="Admin key" />
    <button type="button" id="load">Load messages</button>
  </div>
  <p class="error" id="err"></p>
  <div id="out"></div>
  <script>
    document.getElementById('load').onclick = async () => {
      const key = document.getElementById('key').value.trim()
      const err = document.getElementById('err')
      const out = document.getElementById('out')
      err.textContent = ''
      out.innerHTML = ''
      if (!key) { err.textContent = 'Enter admin key'; return }
      try {
        const r = await fetch('/api/contact?key=' + encodeURIComponent(key))
        if (!r.ok) { err.textContent = r.status === 401 ? 'Invalid key' : 'Failed to load'; return }
        const data = await r.json()
        if (data.length === 0) { out.innerHTML = '<p>No messages yet.</p>'; return }
        out.innerHTML = '<table><thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Message</th></tr></thead><tbody>' +
          data.map(m => '<tr><td class="date">' + new Date(m.date).toLocaleString() + '</td><td>' + escape(m.name) + '</td><td><a href="mailto:' + escape(m.email) + '">' + escape(m.email) + '</a></td><td class="msg">' + escape(m.message) + '</td></tr>').join('') +
          '</tbody></table>'
      } catch (e) {
        err.textContent = 'Network error: ' + e.message
      }
    }
    function escape(s) {
      const d = document.createElement('div')
      d.textContent = s == null ? '' : s
      return d.innerHTML
    }
  </script>
</body>
</html>
  `)
})

// 404
app.use((_, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Start server first so /api/health works even if DB is slow or down (e.g. Render cold start)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

connectDB().catch((err) => {
  console.error('DB connection failed:', err)
  // Don't exit – server stays up; contact form will return 500 until DB is fixed
})
