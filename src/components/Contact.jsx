import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const HOME_ACCENT = '#CC4D4D'

export default function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.08 })
  const [formState, setFormState] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errorMessage, setErrorMessage] = useState('')

  // Wake backend when Contact section is visible (helps with Render free-tier cold start)
  useEffect(() => {
    if (!API_URL || !isInView) return
    axios.get(`${API_URL}/api/health`, { timeout: 15000 }).catch(() => {})
  }, [API_URL, isInView])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!API_URL) {
      setFormState('error')
      setErrorMessage('Backend not configured. Local: add VITE_API_URL=http://localhost:5000 to .env in project root and restart dev server. Deploy: set VITE_API_URL on Vercel to your Render URL.')
      setTimeout(() => { setFormState('idle'); setErrorMessage('') }, 4000)
      return
    }
    setFormState('loading')
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    }
    try {
      await axios.post(`${API_URL}/api/contact`, payload, {
        timeout: 90000,
        headers: { 'Content-Type': 'application/json' },
      })
      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormState('idle'), 3000)
    } catch (err) {
      setFormState('error')
      const status = err.response?.status
      const serverMsg = err.response?.data?.error || err.response?.data?.message
      let msg = serverMsg || err.message || 'Request failed.'
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        msg = `Cannot reach backend (${API_URL || 'not set'}). Set VITE_API_URL on Vercel to your Render URL (https://....onrender.com) and FRONTEND_URL on Render to your Vercel URL, then redeploy both.`
      } else if (status === 404) {
        msg = `Backend returned 404. Check VITE_API_URL is correct: ${API_URL || '(not set)'}`
      } else if (status === 429) {
        msg = 'Too many requests. Wait a few minutes and try again.'
      } else if (status >= 500) {
        msg = `Server error (${status}). Check Render logs. ${serverMsg ? String(serverMsg) : ''}`
      } else if (status === 400) {
        msg = serverMsg ? String(serverMsg) : `Bad request (${status}). Check form data.`
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        msg = 'Request timed out. The server may be waking up (free tier). Try again in 30 seconds — it should be faster the second time.'
      }
      setErrorMessage(typeof msg === 'string' ? msg : 'Request failed')
      console.error('[Contact]', status, err.response?.data, err.code, err.message)
      setTimeout(() => { setFormState('idle'); setErrorMessage('') }, 8000)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center pt-2 sm:pt-3 pb-3 sm:pb-4 px-4 sm:px-6 bg-[#050505] relative overflow-hidden"
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative">
        <header className="mb-4 sm:mb-5">
          <div className="h-px w-10 bg-white/10 mb-2" />
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/32 mb-1">
            Get in touch
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
            Contact
          </h2>
          <p className="text-white/38 text-xs sm:text-sm mt-1.5 max-w-lg leading-snug">
            Have a project in mind? Send a message and I’ll get back to you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Form — left, accent bar */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div
              className="relative rounded-xl border overflow-hidden transition-all duration-300 hover:border-white/[0.08]"
              style={{
                backgroundColor: 'rgba(10, 10, 10, 0.8)',
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 32px 64px -32px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none lg:opacity-100"
                style={{ backgroundColor: HOME_ACCENT }}
              />
              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 mb-0.5">
                  Send a message
                </p>
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg text-sm bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-[#CC4D4D]/50 focus:ring-2 focus:ring-[#CC4D4D]/15 transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg text-sm bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-[#CC4D4D]/50 focus:ring-2 focus:ring-[#CC4D4D]/15 transition-all duration-200"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg text-sm bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-[#CC4D4D]/50 focus:ring-2 focus:ring-[#CC4D4D]/15 transition-all duration-200 resize-none min-h-[72px]"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:ring-white/40"
                    style={{
                      backgroundColor: HOME_ACCENT,
                      boxShadow: `0 4px 24px ${HOME_ACCENT}35`,
                    }}
                    onMouseEnter={(e) => {
                      if (formState !== 'loading') {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 8px 32px ${HOME_ACCENT}45`
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = `0 4px 24px ${HOME_ACCENT}35`
                    }}
                  >
                    {formState === 'loading' && 'Sending... (first time may take up to 60s)'}
                    {formState === 'success' && 'Message sent ✓'}
                    {formState === 'error' && 'Try again'}
                    {formState === 'idle' && 'Send message'}
                  </button>
                  {errorMessage && (
                    <p className="text-red-400/90 text-xs mt-2" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Contact info — right */}
          <div
            className={`lg:col-span-5 flex flex-col gap-3 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div
              className="rounded-xl border p-4 flex-1 min-h-0 transition-all duration-300 hover:border-white/[0.08]"
              style={{
                backgroundColor: 'rgba(10, 10, 10, 0.6)',
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 48px -24px rgba(0,0,0,0.4)',
              }}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 mb-2">
                Direct contact
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:louisdiron2002@gmail.com"
                  className="flex items-center gap-2 group"
                >
                  <span
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <FiMail className="w-4 h-4 text-white/70 group-hover:text-[#CC4D4D] transition-colors" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">Email</p>
                    <p className="text-white/85 group-hover:text-white transition-colors text-xs sm:text-sm truncate">
                      louisdiron2002@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+94757122338"
                  className="flex items-center gap-2 group"
                >
                  <span
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <svg className="w-4 h-4 text-white/70 group-hover:text-[#CC4D4D] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-wider text-white/35">Phone</p>
                    <p className="text-white/85 group-hover:text-white transition-colors text-xs sm:text-sm">
                      +94 75 712 2338
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <a
              href="/Diron_Resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white border-2 transition-all duration-300 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-white/30"
              style={{ borderColor: `${HOME_ACCENT}70` }}
            >
              Download Resume
            </a>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 mb-2">
                Connect
              </p>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Diron714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300 border border-transparent hover:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-white/30"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  aria-label="GitHub"
                >
                  <FiGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/diron2002/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300 border border-transparent hover:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-white/30"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
