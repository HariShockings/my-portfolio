import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaHackerrank, FaEnvelope, FaMapMarkerAlt, FaFileAlt, FaTiktok, FaFacebook } from 'react-icons/fa'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Typewriter effect state
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
    const particleCount = 75
    const connectionDistance = 120
    const mouse = { x: null, y: null, radius: 180 }

    const resizeCanvas = () => {
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
        this.baseColor = 'rgba(96, 165, 250, ' // blue-400
        this.alpha = Math.random() * 0.5 + 0.3
      }

      update() {
        // Drift
        this.x += this.vx
        this.y += this.vy

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy

        // Mouse interaction (push away gently or pull)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.hypot(dx, dy)
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            // Push away
            this.x -= Math.cos(angle) * force * 1.5
            this.y -= Math.sin(angle) * force * 1.5
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${this.baseColor}${this.alpha})`
        ctx.shadowBlur = 6
        ctx.shadowColor = '#60a5fa'
        ctx.fill()
        ctx.shadowBlur = 0 // Reset
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleCanvasMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    canvas.addEventListener('mousemove', handleCanvasMouseMove)
    canvas.addEventListener('mouseleave', handleCanvasMouseLeave)

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw cybernet grid lines faintly
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)'
      ctx.lineWidth = 1
      const gridSize = 60
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            // Use custom gradient for lines between particles
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})` // purple-500
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (canvas) {
        canvas.removeEventListener('mousemove', handleCanvasMouseMove)
        canvas.removeEventListener('mouseleave', handleCanvasMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950 text-white"
    >
      {/* Background Interactive Canvas */}
      <motion.canvas
        ref={canvasRef}
        style={{ scale: scaleCanvas }}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Cyberpunk Neon Radial Light follow */}
      <div
        className="absolute pointer-events-none inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`,
        }}
      />

      {/* Main Grid Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)] pointer-events-none z-0" />

      {/* Interactive Floating Content */}
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12"
      >
        {/* Status Eyebrow Badge (Technical Monospace style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold font-mono tracking-wider mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          root@hari:~# msc_status --ai-de
        </motion.div>

        {/* Profile Image with Futuristic Hexagon Glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
          className="relative w-32 h-32 mb-6 group cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <img
            src="/assets/profile.jpg"
            alt="Navaratnaraja Hariharan"
            className="w-full h-full rounded-full object-cover border-2 border-blue-400 z-10 relative group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Name Title with Typewriter Animation */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-black pb-2 bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-500 bg-clip-text text-transparent tracking-tight uppercase font-mono min-h-[50px] sm:min-h-[70px] md:min-h-[85px]"
        >
          {displayedName}
          <span className="inline-block w-1.5 h-8 sm:h-12 md:h-16 bg-blue-400 animate-pulse ml-1.5 align-middle" />
        </motion.h1>
        
        {/* Subheadline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="text-lg sm:text-2xl md:text-2xl italic font-bold text-gray-300 mb-4 tracking-normal max-w-4xl leading-relaxed"
        >
          "I lose myself in the work so the results speak forever."
        </motion.h2>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-gray-450 max-w-3xl mb-6 leading-relaxed font-light"
        >
          AI & Data Engineer · Full-Stack Developer · 4+ years building production software, now applying that foundation to machine learning, data pipelines, and applied AI research in Finland.
        </motion.p>

        {/* Location & Eyebrow stats tag (Technical theme) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 font-mono text-xs text-gray-400"
        >
          <span className="flex items-center gap-1.5 bg-gray-900/60 px-3.5 py-1.5 rounded border border-gray-800">
            📍 Vaasa, Finland
          </span>
          <span className="flex items-center gap-1.5 bg-gray-900/60 px-3.5 py-1.5 rounded border border-gray-800 text-blue-400">
            🎓 MSc AI & DE @ University of Vaasa
          </span>
        </motion.div>

        {/* Social Icons & Call To Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full"
        >
          {/* Action buttons */}
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-md font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 border border-blue-400/40 text-sm md:text-base font-mono uppercase tracking-wider"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md font-bold bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700 hover:border-gray-505 hover:scale-105 transition-all duration-300 text-sm md:text-base font-mono uppercase tracking-wider"
            >
              Let's Collaborate
            </a>
          </div>

          {/* Social icons */}
          <div className="flex space-x-3">
            <a href="https://github.com/hariShockings" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-3 bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <FaGithub className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-3 bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/harishockings/" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-3 bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="https://www.tiktok.com/@hari_shockings?_r=1&_t=ZS-99IAYMEi13N" target="_blank" rel="noopener noreferrer" title="TikTok" className="p-3 bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <FaTiktok className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/share/19YLxNh57M/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" title="Facebook" className="p-3 bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <FaFacebook className="w-4 h-4" />
            </a>
            <a href="https://www.hackerrank.com/profile/haritheguy21" target="_blank" rel="noopener noreferrer" title="HackerRank" className="p-3 bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white rounded border border-gray-800 hover:border-blue-400/50 transition-all duration-300">
              <FaHackerrank className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Futuristic Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 flex flex-col items-center cursor-pointer pointer-events-none font-mono"
        >
        </motion.div>
      </motion.div>
    </section>
  )
}
