import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="bg-base" aria-hidden="true" />
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-vignette" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </main>
        <ScrollToTop />
      </div>
    </div>
  )
}
