import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const HOME_ACCENT = '#CC4D4D'
const ABOUT_PHOTO = '/diron.png'

const TABS = [
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certificates', label: 'Certificates' },
]

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.15 })
  const [activeTab, setActiveTab] = useState('education')
  const [photoError, setPhotoError] = useState(false)

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-20 sm:py-24 lg:py-28 px-4 sm:px-6 bg-[#050505] relative overflow-hidden"
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        <div
          className={`about-card rounded-[20px] overflow-hidden border transition-all duration-500 reveal-up ${isInView ? 'reveal-ready' : ''}`}
          style={{
            backgroundColor: 'rgba(12, 12, 12, 0.9)',
            borderColor: 'rgba(255,255,255,0.06)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 48px -24px rgba(0,0,0,0.5)',
          }}
        >
          <div className="grid md:grid-cols-5 gap-0 min-h-0">
            {/* Left: image */}
            <div className="md:col-span-2 relative min-h-[280px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center p-6 sm:p-8 md:p-10 bg-[#0d0d0d]">
              <div
                className="about-photo-wrap w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center overflow-hidden border-2 flex-shrink-0 transition-shadow duration-300 hover:shadow-lg"
                style={{
                  borderColor: `${HOME_ACCENT}70`,
                  boxShadow: `0 0 0 1px ${HOME_ACCENT}30`,
                }}
              >
                {!photoError ? (
                  <img
                    src={ABOUT_PHOTO}
                    alt="Diron"
                    className="w-full h-full object-cover"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <span className="text-white/30 text-sm">Your photo</span>
                )}
              </div>
            </div>

            {/* Right: content */}
            <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="about-content-in about-delay-1 flex items-center gap-2 mb-2">
                <span
                  className="w-1 h-6 rounded-full flex-shrink-0"
                  style={{ backgroundColor: HOME_ACCENT }}
                />
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  About
                </p>
              </div>
              <h2 className="about-content-in about-delay-2 text-2xl sm:text-3xl lg:text-[1.75rem] font-bold text-white tracking-tight mb-4">
                About Me
              </h2>

              <div className="about-content-in about-delay-3 space-y-3 text-white/75 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                <p>
                  Third-year IT undergraduate at the <strong className="text-white">University of Kelaniya</strong>, focused on full stack development and cloud technologies.
                </p>
                <p>
                  Skilled in building solutions with modern tech stacks and automation. Adaptable team player committed to delivering efficient and user-focused projects.
                </p>
              </div>

              {/* Tabs — pill style */}
              <div className="about-content-in about-delay-4 flex flex-wrap gap-2 mb-5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] focus-visible:ring-white/30"
                    style={{
                      backgroundColor: activeTab === tab.id ? `${HOME_ACCENT}25` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${activeTab === tab.id ? `${HOME_ACCENT}50` : 'rgba(255,255,255,0.08)'}`,
                      color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content — contained panel */}
              <div
                className="about-content-in about-delay-5 rounded-xl border p-5 sm:p-6 min-h-[200px] transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <div key={activeTab} className="about-tab-panel">
                {activeTab === 'education' && (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: `${HOME_ACCENT}80` }}
                      >
                        01
                      </span>
                      <div>
                        <p className="font-semibold text-white">BSc (Hons) in Information Technology</p>
                        <p className="text-white/75 text-sm mt-0.5">University of Kelaniya, Sri Lanka</p>
                        <p className="text-white/55 text-sm mt-0.5">Faculty of Science · 2026–present</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex gap-4">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: `${HOME_ACCENT}80` }}
                      >
                        02
                      </span>
                      <div>
                        <p className="font-semibold text-white">G.C.E. Advance Level Examination</p>
                        <p className="text-white/75 text-sm mt-0.5">Jaffna College</p>
                        <p className="text-white/55 text-sm mt-1">Physics — B · Combined Mathematics — B · Chemistry — B</p>
                        <p className="text-white/55 text-sm mt-0.5">Z-Score: 1.358 · 2019</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: `${HOME_ACCENT}80` }}
                      >
                        01
                      </span>
                      <div>
                        <p className="font-semibold text-white">4th Place – TRINOVA 2025</p>
                        <p className="text-white/70 text-sm mt-0.5">3-Minute Youth Innovation Competition</p>
                        <p className="text-white/60 text-sm mt-1">CINEC International Research Symposium (CIRS) & NEXORA 2025</p>
                        <p className="text-white/55 text-sm mt-0.5">Hilton Colombo Residences</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex gap-4">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: `${HOME_ACCENT}80` }}
                      >
                        02
                      </span>
                      <div>
                        <p className="font-semibold text-white">Cre8X 2.0 – KDU UI/UX Design Competition 2025</p>
                        <p className="text-white/65 text-sm mt-0.5">Organized by BCS Student Chapter, General Sir John Kotelawala Defence University</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'certificates' && (
                  <div className="space-y-4">
                    <a
                      href="https://drive.google.com/file/d/1xXvYWE06Ak1Lpoy-AgnJGWGKMQoh7QF_/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 group"
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    >
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                        style={{ backgroundColor: `${HOME_ACCENT}25`, border: `1px solid ${HOME_ACCENT}50}` }}
                      >
                        <svg className="w-5 h-5" style={{ color: HOME_ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white group-hover:text-white">Artemia 1.0</p>
                        <p className="text-white/55 text-xs mt-0.5">View certificate</p>
                      </div>
                      <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1_f-a3UFcWUYztGK-v6KAYXapw_s2Zkts/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 group"
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    >
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                        style={{ backgroundColor: `${HOME_ACCENT}25`, border: `1px solid ${HOME_ACCENT}50}` }}
                      >
                        <svg className="w-5 h-5" style={{ color: HOME_ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white group-hover:text-white">Cre8X 2.0</p>
                        <p className="text-white/55 text-xs mt-0.5">View certificate</p>
                      </div>
                      <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
