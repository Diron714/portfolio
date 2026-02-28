import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'

const HOME_ACCENT = '#CC4D4D'

function ProjectCard({ project, index }) {
  const [cardRef, isInView] = useInView({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  return (
    <article
      ref={cardRef}
      className="scroll-mt-32 group/card"
    >
      <a
        href={project.githubUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-[20px] focus-visible:ring-white/30"
      >
        <div
          className={`relative overflow-hidden rounded-[20px] border transition-all duration-700 ease-out ${
            isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            backgroundColor: 'rgba(14, 14, 14, 0.9)',
            borderColor: 'rgba(255, 255, 255, 0.06)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 20px 40px -20px rgba(0,0,0,0.45)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06), 0 28px 56px -24px rgba(0,0,0,0.55)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.04), 0 20px 40px -20px rgba(0,0,0,0.45)'
          }}
        >
          {/* Accent line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[20px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-400 ease-out"
            style={{ backgroundColor: HOME_ACCENT }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[300px] sm:min-h-[360px]">
            {/* Image — number stays in this column only so it never overlaps text */}
            <div className="lg:col-span-3 relative overflow-hidden rounded-t-[20px] lg:rounded-l-[20px] lg:rounded-tr-none">
              {/* Watermark: confined to image area */}
              <span
                className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none select-none tabular-nums transition-all duration-500 ease-out group-hover/card:opacity-70 group-hover/card:scale-95 z-10"
                style={{ color: 'rgba(255,255,255,0.08)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="absolute inset-0 bg-[#070707]">
                {project.image?.startsWith('/') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.025]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center min-h-[260px]">
                    <span className="text-7xl font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.025)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
              {/* Edge gradient into content */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 55%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.35) 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-2 relative flex flex-col justify-center p-6 sm:p-8 lg:p-10 rounded-b-[20px] lg:rounded-r-[20px] lg:rounded-bl-none">
              {/* Project number — top right of content box */}
              <span
                className="absolute right-6 top-6 sm:right-8 sm:top-8 text-2xl sm:text-3xl font-bold tabular-nums"
                style={{ color: HOME_ACCENT }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/38 mb-2.5">
                {project.client}
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-semibold text-white tracking-tight leading-[1.22]">
                {project.title}
              </h3>
              <p className="text-white/48 text-sm sm:text-[15px] mt-3 leading-[1.65] line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border"
                    style={{
                      borderColor: `${HOME_ACCENT}80`,
                      backgroundColor: `${HOME_ACCENT}18`,
                      color: '#fff',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-2 mt-6 pt-5 border-t border-white/[0.06] text-sm font-medium transition-all duration-300 ease-out group-hover/card:gap-3 group-hover/card:opacity-90 w-fit"
                style={{ color: HOME_ACCENT }}
              >
                View repository
                <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/card:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>

      <div className="h-10 sm:h-14 lg:h-20" />
    </article>
  )
}

export default function Projects() {
  const [ref] = useInView({ threshold: 0.05 })

  return (
    <section
      id="projects"
      className="min-h-screen py-24 sm:py-28 lg:py-32 px-4 sm:px-6 bg-[#050505] relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle radial fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-60"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.9), transparent)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative">
        <header className="mb-20 sm:mb-24 lg:mb-28">
          <div className="h-px w-12 bg-white/10 mb-6" />
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/32 mb-3">
            Selected work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-white tracking-tight leading-[1.08] max-w-2xl">
            Projects
          </h2>
          <p className="text-white/38 text-sm sm:text-base mt-5 max-w-lg leading-relaxed">
            Full-stack applications, APIs, and design case studies.
          </p>
        </header>

        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
