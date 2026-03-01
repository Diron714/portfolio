import { useState } from 'react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const HOME_ACCENT = '#CC4D4D'
// Image from public folder (put your portrait at public/hero-portrait.png)
const HERO_IMAGE = '/hero-portrait.png'

export default function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="home" className="min-h-screen flex items-center bg-black pt-20 pb-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* LEFT: Character Image */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center order-1">
            {/* The Portrait — shows placeholder if image fails to load */}
            <div className="hero-anim-image relative z-10 w-[280px] sm:w-[360px] lg:w-[420px] min-h-[280px] sm:min-h-[360px] lg:min-h-[360px] flex items-center justify-center">
              {!imgError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Diron"
                  className="w-full h-auto drop-shadow-2xl max-w-full"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full aspect-[3/4] max-w-[280px] sm:max-w-[360px] rounded-lg flex items-center justify-center text-white/50 text-center px-4 border-2 border-dashed border-white/20"
                  style={{ minHeight: '280px' }}
                >
                  <p className="text-sm">Add your photo as<br /><strong className="text-white/70">public/hero-portrait.png</strong></p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="w-full lg:w-1/2 text-left order-2">
            <h1 className="hero-anim-text hero-anim-text-delay-1 text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="text-white">Hi, I'm </span>
              <span style={{ color: HOME_ACCENT }}>Diron</span>
            </h1>
            
            <p className="hero-anim-text hero-anim-text-delay-2 text-xl md:text-2xl mb-4">
              <span className="text-white/60">I'm a </span>
              <span style={{ color: HOME_ACCENT }} className="font-medium">Software Engineer</span>
              <span className="text-white/60"> | </span>
              <span className="text-white/60">UI/UX Designer</span>
            </p>
            
            <p className="hero-anim-text hero-anim-text-delay-3 text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
              I build scalable systems and user-focused interfaces. Backend & secure APIs, 
              with a strong eye for clean UI/UX.
            </p>

            {/* Social Icons */}
            <div className="hero-anim-text hero-anim-text-delay-4 flex gap-4 mb-10">
              <a
                href="https://www.linkedin.com/in/diron2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://github.com/Diron714"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hero-anim-text hero-anim-text-delay-5 flex flex-wrap gap-5">
              <a
                href="#projects"
                className="px-8 py-3 rounded-full text-white border-2 font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg"
                style={{ borderColor: HOME_ACCENT }}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full text-white border-2 font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg"
                style={{ borderColor: HOME_ACCENT }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-bounce absolute bottom-10 left-1/2 -translate-x-1/2">
        <span className="text-white/30 text-xs tracking-[0.4em] uppercase font-light">Scroll</span>
      </div>
    </section>
  )
}