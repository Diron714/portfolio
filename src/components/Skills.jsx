import { useRef, useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

const HOME_ACCENT = '#CC4D4D'

// Base path for local skill images (public/skills/). Use full URL for CDN icons.
const SKILL_IMAGES_PATH = '/skills'

// Simple Icons CDN: https://cdn.simpleicons.org/{slug}
// Bootstrap Icons (generic): https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/{name}.svg
const technicalGroups = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'Java', image: 'https://cdn.simpleicons.org/java/ED8B00' },
      { name: 'Python', image: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'JavaScript', image: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    ],
    description: 'Core programming languages',
  },
  {
    title: 'Web Technologies',
    items: [
      { name: 'React.js', image: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', image: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'Express.js', image: 'https://cdn.simpleicons.org/express/000000' },
      { name: 'HTML5', image: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS3', image: 'https://cdn.simpleicons.org/css3/1572B6' },
    ],
    description: 'Frontend & backend web stack',
  },
  {
    title: 'Database Management',
    items: [
      { name: 'MongoDB', image: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'MySQL', image: 'https://cdn.simpleicons.org/mysql/4479A1' },
    ],
    description: 'Data storage and management',
  },
  {
    title: 'Cloud & DevOps',
    items: [
      { name: 'Git', image: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'GitHub', image: 'https://cdn.simpleicons.org/github/181717' },
    ],
    description: 'Version control and collaboration',
  },
  {
    title: 'UI/UX & Diagraming',
    items: [
      { name: 'Figma', image: 'https://cdn.simpleicons.org/figma/F24E1E' },
      { name: 'Canva', image: 'https://cdn.simpleicons.org/canva/00C4CC' },
      { name: 'Draw.io', image: 'https://cdn.simpleicons.org/drawio/F08705' },
      { name: 'Lucidchart', image: 'https://cdn.simpleicons.org/lucidchart/F24E1E' },
    ],
    description: 'Design and diagramming tools',
  },
  {
    title: 'Others',
    items: [
      { name: 'OOP Concept', image: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/code-slash.svg' },
      { name: 'Data Structure and Algorithm', image: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/diagram-3.svg' },
    ],
    description: 'Fundamentals and concepts',
  },
]

const softSkillsGroup = {
  title: 'Soft Skills',
  items: [
    { name: 'Problem solving', image: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/lightbulb.svg' },
    { name: 'Time management', image: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/clock.svg' },
    { name: 'Good communication', image: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/chat-dots.svg' },
    { name: 'Teamwork', image: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/people-fill.svg' },
  ],
  description: 'Interpersonal and professional skills',
}

// All technical items for carousel (objects with name + image)
const allTechItems = technicalGroups.flatMap((g) => g.items)

function getAbbr(name) {
  const words = name.split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function getImageSrc(image) {
  if (!image) return null
  // Use as-is if full path (e.g. /java.png for public/java.png)
  if (image.startsWith('/') || image.startsWith('http')) return image
  return `${SKILL_IMAGES_PATH}/${image}`
}

function SkillIcon({ item, size = 'md', accent, showLabel = true }) {
  const src = getImageSrc(item.image)
  const abbr = getAbbr(item.name)
  const isBootstrapSvg = src && src.includes('bootstrap-icons')
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10 sm:w-11 sm:h-11'
  const boxClasses = `flex-shrink-0 ${sizeClasses} rounded-lg flex items-center justify-center overflow-hidden border transition-all duration-300 hover:bg-white/5 hover:scale-105`
  const boxStyle = {
    borderColor: `${accent}50`,
    backgroundColor: 'rgba(0,0,0,0.3)',
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${boxClasses} relative`} style={boxStyle}>
        {src ? (
          <>
            <img
              src={src}
              alt={item.name}
              className={`w-full h-full object-contain p-1 ${isBootstrapSvg ? 'opacity-90' : ''}`}
              style={isBootstrapSvg ? { filter: 'brightness(0) invert(1)' } : undefined}
              onError={(e) => {
                e.target.style.display = 'none'
                const fallback = e.target.nextElementSibling
                if (fallback) {
                  fallback.classList.remove('hidden')
                  fallback.classList.add('flex', 'items-center', 'justify-center')
                }
              }}
            />
            <span className="hidden absolute inset-0 text-white font-semibold text-xs bg-black/30 rounded-lg">
              {abbr}
            </span>
          </>
        ) : (
          <span className="text-white font-semibold text-xs">{abbr}</span>
        )}
      </div>
      {showLabel && (
        <span className="text-white/80 text-xs sm:text-sm leading-snug line-clamp-2">
          {item.name}
        </span>
      )}
    </div>
  )
}

function SkillCard({ group, accent, isInView, index }) {
  const itemCount = group.items.length
  const gridCols = itemCount <= 2 ? 'grid-cols-2' : itemCount <= 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-500 ease-out flex flex-col min-h-[200px] hover:border-opacity-80 hover:scale-[1.02] hover:shadow-xl reveal-stagger ${isInView ? 'reveal-ready' : ''}`}
      style={{
        backgroundColor: '#141414',
        borderColor: `${accent}50`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: `${accent}90` }}
        >
          {index != null ? index + 1 : '•'}
        </span>
        {group.title}
      </h3>
      <div className={`grid ${gridCols} gap-3 sm:gap-4 flex-1`}>
        {group.items.map((item) => (
          <SkillIcon key={item.name} item={item} accent={accent} showLabel />
        ))}
      </div>
      <p className="text-white/50 text-xs mt-3 pt-3 border-t border-white/10">
        {group.description}
      </p>
    </div>
  )
}

export default function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.08 })
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  const scroll = (dir) => {
    const el = carouselRef.current
    if (!el) return
    el.scrollBy({ left: dir * 260, behavior: 'smooth' })
    setTimeout(updateScrollState, 350)
  }

  useEffect(() => {
    const el = carouselRef.current
    if (el) updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  return (
    <section
      id="skills"
      className={`skills-section min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black relative overflow-hidden ${isInView ? 'skills-in-view' : ''}`}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        <h2 className="skills-header text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight text-center">
          Expertise & Technologies
        </h2>
        <p className="skills-subtitle text-white/50 text-sm sm:text-base text-center mb-10 sm:mb-12 max-w-xl mx-auto">
          Technical skills and tools I work with daily.
        </p>

        {/* Technical Skills */}
        <h3 className="skills-subsection-title text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-5 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: HOME_ACCENT }} />
          Technical Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-14">
          {technicalGroups.map((group, index) => (
            <SkillCard
              key={group.title}
              group={group}
              accent={HOME_ACCENT}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>

        {/* Soft Skills */}
        <h3 className="skills-subsection-title text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-5 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: HOME_ACCENT }} />
          Soft Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <SkillCard
              group={softSkillsGroup}
              accent={HOME_ACCENT}
              isInView={isInView}
              index={null}
            />
          </div>
        </div>

        {/* Tech Stack Overview */}
        <h3 className="skills-subsection-title text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-5 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: HOME_ACCENT }} />
          Tech Stack Overview
        </h3>
        <div
          className="skills-carousel-wrap rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-4"
          style={{
            backgroundColor: '#0d0d0d',
            borderColor: `${HOME_ACCENT}30`,
          }}
        >
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 disabled:opacity-25 disabled:pointer-events-none transition-all duration-300"
            style={{ borderColor: `${HOME_ACCENT}60` }}
            disabled={!canScrollLeft}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={carouselRef}
            onScroll={updateScrollState}
            className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth scrollbar-hide flex-1 min-w-0 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allTechItems.map((item) => (
              <div
                key={item.name}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 hover:bg-white/5 hover:scale-105"
                style={{
                  borderColor: `${HOME_ACCENT}40`,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                <SkillIcon item={item} size="sm" accent={HOME_ACCENT} showLabel={false} />
                <span className="text-white/80 text-xs sm:text-sm whitespace-nowrap hidden sm:inline">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 disabled:opacity-25 disabled:pointer-events-none transition-all duration-300"
            style={{ borderColor: `${HOME_ACCENT}60` }}
            disabled={!canScrollRight}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
