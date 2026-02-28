import { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'

const SHOW_AFTER_PX = 400
const HOME_ACCENT = '#CC4D4D'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="animate-in fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-3 sm:p-3.5 rounded-full text-white border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#CC4D4D]/60 focus:ring-offset-2 focus:ring-offset-black"
      style={{
        backgroundColor: `${HOME_ACCENT}ee`,
        borderColor: HOME_ACCENT,
        boxShadow: `0 4px 20px ${HOME_ACCENT}40`,
      }}
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-5 h-5" />
    </button>
  )
}
