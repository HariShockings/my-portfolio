import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { FaGithub, FaLinkedin, FaInstagram, FaHackerrank, FaTiktok, FaFacebook } from 'react-icons/fa'
import HeroLandmarksBackground from './HeroLandmarksBackground'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { isDark } = useTheme()
  const { language, t, currentLandmarks } = useLanguage()
  
  // Typewriter effect state for personal name
  const fullName = "Navaratnaraja Hariharan"
  const [displayedName, setDisplayedName] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDisplayedName(fullName.slice(0, index + 1))
      index++
      if (index >= fullName.length) {
        clearInterval(interval)
      }
    }, 70)
    return () => clearInterval(interval)
  }, [])

  // Looping Typewriter for alternating Quotes
  // Quote 1: "I lose myself in the work so the results speak forever."
  // Quote 2: Language Cultural Heritage Quote from currentLandmarks
  const quote1 = "I lose myself in the work so the results speak forever."
  const quote2 = (currentLandmarks?.quote || "").replace(/^"|"$/g, "").trim()
  const quotes = [quote1, quote2].filter(Boolean)

  const [quoteIndex, setQuoteIndex] = useState(0)
  const [displayedQuote, setDisplayedQuote] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset quote typing whenever language changes
  useEffect(() => {
    setQuoteIndex(0)
    setDisplayedQuote("")
    setIsDeleting(false)
  }, [language])

  useEffect(() => {
    const currentTarget = quotes[quoteIndex] || quote1
    let timeout

    if (!isDeleting) {
      if (displayedQuote.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayedQuote(currentTarget.slice(0, displayedQuote.length + 1))
        }, 35)
      } else {
        // Pause at full text before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 3200)
      }
    } else {
      if (displayedQuote.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedQuote(currentTarget.slice(0, displayedQuote.length - 1))
        }, 16)
      } else {
        // Move to next quote in infinite loop
        setIsDeleting(false)
        setQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedQuote, isDeleting, quoteIndex, language, quote1, quote2])

  const { scrollY } = useScroll()
  const opacityText = useTransform(scrollY, [0, 300], [1, 0])
  const yText = useTransform(scrollY, [0, 300], [0, -50])
  const scaleCanvas = useTransform(scrollY, [0, 500], [1, 1.05])

  // Track mouse movement for interactive light effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Interactive Particle/Node Web Background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    const particleCount = 70
    const connectionDistance = 120
    const mouse = { x: null, y: null, radius: 180 }

    const resizeCanvas = () => {
      if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = (Math.random() - 0.5) * 0.6
        this.radius = Math.random() * 2 + 1.5
        this.baseColor = isDark ? 'rgba(96, 165, 250, ' : 'rgba(37, 99, 235, '
        this.alpha = Math.random() * 0.45 + 0.25
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.hypot(dx, dy)
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            this.x -= Math.cos(angle) * force * 1.5
            this.y -= Math.sin(angle) * force * 1.5
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${this.baseColor}${this.alpha})`
        ctx.shadowBlur = isDark ? 6 : 2
        ctx.shadowColor = isDark ? '#60a5fa' : '#93c5fd'
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.hypot(dx, dy)

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = isDark
              ? `rgba(96, 165, 250, ${opacity * 0.22})`
              : `rgba(59, 130, 246, ${opacity * 0.18})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleCanvasMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleCanvasMouseMove)
    window.addEventListener('mouseleave', handleCanvasMouseLeave)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleCanvasMouseMove)
      window.removeEventListener('mouseleave', handleCanvasMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-gray-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Interactive Canvas Particle Mesh */}
      <motion.canvas
        ref={canvasRef}
        style={{ scale: scaleCanvas }}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Cyberpunk Radial Light Follow */}
      <div
        className="absolute pointer-events-none inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: isDark
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`
            : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />

      {/* Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${
        isDark
          ? 'bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)]'
          : 'bg-[radial-gradient(ellipse_at_center,transparent_20%,#f8fafc_95%)]'
      }`} />

      {/* Cultural Heritage & Landmarks Moving Vector Animation Layer */}
      <HeroLandmarksBackground language={language} isDark={isDark} />

      {/* Interactive Floating Content */}
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-4 sm:mt-12 pt-0 sm:pt-12"
      >
        {/* Status Eyebrow Badge & Culture Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold font-mono tracking-wider backdrop-blur-md border ${
              isDark
                ? 'bg-blue-500/10 border-blue-400/20 text-blue-400'
                : 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {t.hero.status}
          </motion.div>
        </div>

        {/* Profile Image with Futuristic Glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
          className="relative w-20 h-20 sm:h-32 sm:w-32 mb-2 sm:mb-6 group cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <img
            src="/assets/profile.jpg"
            alt="Navaratnaraja Hariharan (Developer Hariharan) - Full Stack Developer & AI Engineer Portfolio Avatar"
            className="w-full h-full rounded-full object-cover border-2 border-blue-400 z-10 relative group-hover:scale-105 transition-transform duration-500 shadow-xl"
          />
        </motion.div>

        {/* Name Title with Typewriter Animation */}
        <motion.h1
          aria-label="Navaratnaraja Hariharan - Developer Hariharan Portfolio"
          className="text-3xl sm:text-5xl md:text-6xl font-black pb-0 sm:pb-2 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-600 bg-clip-text text-transparent tracking-tight uppercase font-mono min-h-[48px] sm:min-h-[65px] md:min-h-[80px]"
        >
          {displayedName}
          <span className="inline-block w-1.5 h-7 sm:h-11 md:h-14 bg-blue-500 animate-pulse ml-1.5 align-middle" />
        </motion.h1>
        
        {/* Alternating Dual-Quote Typewriter Loop */}
        <div className="min-h-[68px] sm:min-h-[58px] flex flex-col items-center justify-center mb-0 sm:mb-4 max-w-4xl px-2">
          <h2
  className={`text-[12px] sm:text-xl md:text-2xl italic font-bold tracking-normal leading-relaxed text-center transition-colors duration-500 ${
    quoteIndex === 0
      ? isDark ? 'text-blue-200' : 'text-blue-900'
      : isDark ? 'text-amber-200' : 'text-amber-900'
  }`}
>
  "{displayedQuote}"
  <span
    className={`inline-block w-1 h-4 sm:h-6 align-middle ml-1.5 animate-pulse ${
      quoteIndex === 0 ? 'bg-blue-400' : 'bg-amber-400'
    }`}
  />
</h2>
          <div className="flex items-center gap-2 mt-1.5 opacity-60 text-[10px] font-mono tracking-widest uppercase">
            {quoteIndex === 0 ? (
              <span className="text-blue-400">✦ Hari's Philosophy</span>
            ) : (
              <span className="text-amber-400">🏛️ {currentLandmarks.nativeName} Cultural Heritage Quote</span>
            )}
          </div>
        </div>

        {/* Supporting Line (Translated) */}
        <motion.p
          key={t.hero.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-xs sm:text-sm md:text-base max-w-3xl mb-6 leading-relaxed font-light ${
            isDark ? 'text-gray-400' : 'text-slate-600 font-normal'
          }`}
        >
          {t.hero.description}
        </motion.p>

        {/* Location & Eyebrow stats tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8 font-mono text-xs"
        >
          <span className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded border ${
            isDark ? 'bg-gray-900/60 border-gray-800 text-gray-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}>
            📍 {t.hero.location}
          </span>
          <span className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded border text-blue-500 font-bold ${
            isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            🎓 {t.hero.educationBadge}
          </span>
        </motion.div>

        {/* Action Buttons & Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-5 justify-center w-full"
        >
          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href="#projects"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 border border-blue-400/40 text-xs sm:text-sm font-mono uppercase tracking-wider"
            >
              {t.hero.viewWork}
            </a>
            <a
              href="#contact"
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold border hover:scale-105 transition-all duration-300 text-xs sm:text-sm font-mono uppercase tracking-wider ${
                isDark 
                  ? 'bg-gray-900/80 hover:bg-gray-800 text-gray-200 border-gray-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              {t.hero.collaborate}
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-2">
            {[
              { href: "https://github.com/hariShockings", icon: <FaGithub className="w-4 h-4" />, title: "GitHub - HariShockings" },
              { href: "https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/", icon: <FaLinkedin className="w-4 h-4" />, title: "LinkedIn - Hariharan Navaratnaraja" },
              { href: "https://www.instagram.com/harishockings/", icon: <FaInstagram className="w-4 h-4" />, title: "Instagram - @harishockings" },
              { href: "https://www.tiktok.com/@hari_shockings?_r=1&_t=ZS-99IAYMEi13N", icon: <FaTiktok className="w-4 h-4" />, title: "TikTok - @hari_shockings" },
              { href: "https://www.facebook.com/share/19YLxNh57M/?mibextid=wwXIfr", icon: <FaFacebook className="w-4 h-4" />, title: "Facebook - Hariharan" },
              { href: "https://www.hackerrank.com/profile/haritheguy21", icon: <FaHackerrank className="w-4 h-4" />, title: "HackerRank - haritheguy21" },
            ].map((soc) => (
              <a
                key={soc.title}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                title={soc.title}
                aria-label={soc.title}
                className={`p-2.5 rounded border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border-gray-800 hover:border-blue-400/50'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-blue-400 shadow-sm'
                }`}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

