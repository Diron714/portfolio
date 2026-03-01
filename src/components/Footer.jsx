export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-5 sm:py-6 px-4 sm:px-6 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/50 text-sm text-center sm:text-left">
          © {currentYear} <span className="text-white/70">Diron</span>. All rights reserved.
        </p>
        <a
          href="#home"
          className="text-white/50 hover:text-[#CC4D4D] text-sm font-medium transition-colors duration-200"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}
