import express from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact.js'

const router = express.Router()

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

      // 2. Try sending email – don't block success on SMTP failure
      if (process.env.NODE_ENV === 'production' && process.env.SMTP_HOST) {
        try {
          const nodemailer = (await import('nodemailer')).default
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          })
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `Portfolio: Message from ${name}`,
            text: `From: ${email}\n\n${message}`,
          })
        } catch (emailErr) {
          console.error('Email send failed:', emailErr)
          // Still return success – message is saved
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
