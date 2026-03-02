/**
 * Email sending: SendGrid API (recommended on Render) or SMTP (e.g. local).
 * Uses SendGrid when SENDGRID_API_KEY is set; otherwise uses Nodemailer/SMTP.
 */

import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

const useSendGrid = () =>
  process.env.SENDGRID_API_KEY && process.env.EMAIL_FROM

const useSmtp = () =>
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

if (useSendGrid()) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

let transporter = null
if (useSmtp()) {
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })
}

const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER
const fromName = process.env.SMTP_FROM_NAME || 'Portfolio'

/**
 * Send an email. Uses SendGrid if configured, otherwise SMTP. No-op if neither is configured.
 * @param {string} to - Recipient email
 * @param {string} subject - Subject line
 * @param {string} text - Plain text body
 * @returns {Promise<void>}
 */
export async function sendEmail(to, subject, text) {
  if (useSendGrid()) {
    try {
      await sgMail.send({
        to,
        from: process.env.EMAIL_FROM, // must be verified in SendGrid
        subject,
        text,
      })
      console.log('Email sent successfully! (SendGrid)')
    } catch (err) {
      const body = err.response?.body
      const msg = body?.errors?.[0]?.message || err.message
      const isSenderNotVerified = err.code === 403 && /verified Sender Identity/i.test(msg)
      if (isSenderNotVerified) {
        console.error('SendGrid 403: Verify EMAIL_FROM in SendGrid → Settings → Sender Authentication (Single Sender). See SENDGRID_403_FIX.md')
      } else {
        console.error('Email send failed (SendGrid):', msg)
        if (body?.errors?.length) console.error('SendGrid details:', JSON.stringify(body.errors))
      }
      throw err
    }
    return
  }

  if (useSmtp() && transporter) {
    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to,
        subject,
        text,
      })
      console.log('Email sent successfully! (SMTP)')
    } catch (err) {
      console.error('Email send failed:', err)
      throw err
    }
    return
  }

  // No provider configured – no-op
}

export { transporter }
