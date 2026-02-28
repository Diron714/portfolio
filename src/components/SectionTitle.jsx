export default function SectionTitle({ number, title }) {
  return (
    <div className="mb-12 md:mb-16">
      <span className="text-accent font-medium text-xs tracking-[0.3em] uppercase block mb-3">
        {number}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
        {title}
      </h2>
      <div className="mt-4 h-px w-16 rounded-full bg-gradient-to-r from-accent via-accent/60 to-transparent" />
    </div>
  )
}
