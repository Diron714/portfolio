import { useState, useEffect } from 'react'

const HOME_ACCENT = '#CC4D4D'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atHome, setAtHome] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setAtHome(window.scrollY < 120)
    }
    window.addEventListener('scroll', onScroll)
    setAtHome(window.scrollY < 120)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
        <a href="#home" className="text-lg font-semibold text-white hover:opacity-90 transition-opacity">
          Diron
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                  link.href === '#home' && atHome
                    ? 'text-white/80'
                    : 'text-white hover:text-white hover:bg-white/5'
                }`}
                style={
                  link.href === '#home' && atHome
                    ? { boxShadow: `inset 0 -2px 0 0 ${HOME_ACCENT}, 0 0 20px ${HOME_ACCENT}25` }
                    : undefined
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors duration-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="border-t border-white/10 bg-black/95 backdrop-blur-md px-4 py-4 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-3 px-3 rounded-xl text-white hover:bg-white/5 transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
