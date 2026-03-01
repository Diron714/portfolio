import express from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact.js'
import { sendEmail } from '../utils/email.js'

const router = express.Router()
const ADMIN_KEY = process.env.ADMIN_KEY || ''

// GET /api/contact — list messages (admin only). Use ?key=YOUR_ADMIN_KEY or header X-Admin-Key
router.get('/contact', async (req, res) => {
  const key = req.query.key || req.get('X-Admin-Key') || ''
  if (!ADMIN_KEY || key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const messages = await Contact.find().sort({ date: -1 }).lean()
    res.json(messages)
  } catch (err) {
    console.error('List contact error:', err)
    res.status(500).json({ error: 'Could not load messages' })
  }
})

// GET /api/test-email — send a test email (admin only). Use ?key=YOUR_ADMIN_KEY to check if SMTP works.
router.get('/test-email', async (req, res) => {
  const key = req.query.key || req.get('X-Admin-Key') || ''
  if (!ADMIN_KEY || key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(400).json({
      ok: false,
      error: 'SMTP not configured',
      hint: 'Set SMTP_HOST, SMTP_USER, SMTP_PASS (and CONTACT_EMAIL) in backend/.env',
    })
  }
  if (!to) {
    return res.status(400).json({
      ok: false,
      error: 'No recipient',
      hint: 'Set CONTACT_EMAIL or SMTP_USER in backend/.env',
    })
  }
  try {
    await sendEmail(
      to,
      'Portfolio SMTP test',
      'This is a test email from your portfolio backend. SMTP is working.'
    )
    res.json({ ok: true, message: 'Test email sent. Check your inbox (and spam).' })
  } catch (err) {
    console.error('Test email failed:', err)
    res.status(500).json({
      ok: false,
      error: 'Failed to send test email',
      detail: err.message || String(err),
    })
  }
})

// Rate limit: 5 requests per 10 minutes per IP (contact only)
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post(
  '/contact',
  contactLimiter,
  [
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0]?.msg || 'Validation failed' })
      }

      const { name, email, message } = req.body

      // 1. Save to DB first (most important)
      const doc = await Contact.create({ name, email, message })

      // 2. Try sending email when SMTP is configured – don't block success on failure
      const contactTo = process.env.CONTACT_EMAIL || process.env.SMTP_USER
      if (contactTo) {
        try {
          await sendEmail(
            contactTo,
            `Portfolio: Message from ${name}`,
            `From: ${email}\n\n${message}`
          )
        } catch (emailErr) {
          console.error('Email send failed:', emailErr)
          // Still return success – message is saved in DB
        }
      }

      res.status(201).json({ success: true, id: doc._id })
    } catch (err) {
      console.error('Contact error:', err)
      res.status(500).json({ error: 'Could not send message. Try again later.' })
    }
  }
)

export default router
