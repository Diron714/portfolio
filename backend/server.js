import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

// Security: request body size limit
app.use(express.json({ limit: '10kb' }))

// Security headers
app.use(helmet())

// CORS – no credentials needed for this portfolio
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
)

// Rate limit only for contact route (applied in routes/contact.js)

// Health check
app.get('/api/health', (_, res) => {
  res.json({ ok: true })
})

// Contact API
app.use('/api', contactRoutes)

// 404
app.use((_, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('DB connection failed:', err)
    process.exit(1)
  })
