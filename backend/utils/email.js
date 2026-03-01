import nodemailer from 'nodemailer'

const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
})

const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER
const fromName = process.env.SMTP_FROM_NAME || 'Portfolio'

/**
 * Send an email. No-op if SMTP is not configured.
 * @param {string} to - Recipient email
 * @param {string} subject - Subject line
 * @param {string} text - Plain text body
 * @returns {Promise<void>}
 */
export async function sendEmail(to, subject, text) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return
  }
  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      text,
    })
    console.log('Email sent successfully!')
  } catch (err) {
    console.error('Email send failed:', err)
    throw err
  }
}

export { transporter }
