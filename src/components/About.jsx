import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ThreeDScene from './ThreeDScene.jsx'
import { useState, useEffect, Suspense } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const sections = [
    {
      title: t.about.p1Title,
      content: t.about.p1Content
    },
    {
      title: t.about.p2Title,
      content: t.about.p2Content
    },
    {
      title: t.about.p3Title,
      content: t.about.p3Content
    }
  ]

  // Auto-scroll effect for sections
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % sections.length)
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [sections.length, isPaused])

  const education = [
    {
      title: "MSc in Data Engineering & Artificial Intelligence",
      institution: "University of Vaasa, Finland",
      period: "Aug 2026 – Present",
      details: "Advanced machine learning, deep learning, big-data pipelines, and neural networks — with a focus on applying theory to production-grade systems."
    },
    {
      title: "BSc (Hons) Computer Science",
      institution: "University of Bedfordshire, UK — 2nd Upper Class, GPA 3.5+",
      period: "Jun 2024 – Jun 2025",
      details: "Built the software engineering foundation this entire career runs on."
    },
    {
      title: "Higher Diploma in Information Technology",
      institution: "SLIIT City University, Sri Lanka — GPA 3.25",
      period: "Jul 2022 – Aug 2024",
      details: "Specialised in software engineering, database management, and network infrastructure."
    }
  ]

  const experience = [
    {
      role: "Freelance Developer & Designer",
      company: "Self-Employed",
      period: "2022 – Present",
      details: "Delivered 20+ end-to-end web, mobile, and 3D projects for real clients — owning everything from requirements to deployment, across PHP, Vue, MERN, React Native, and Blender/Three.js."
    },
    {
      role: "Full-Stack Web Developer",
      company: "Enliven Designers, UK (Remote)",
      period: "Jun 2025 – Jun 2026",
      details: "Shipped client-facing features on WordPress, PHP, SQL, and REST APIs inside a distributed Agile/Scrum team — collaborating daily across time zones with PMs, seniors, and DevOps."
    },
    {
      role: "Intern, Full-Stack Developer",
      company: "DoMedia (Pvt) Ltd, Sri Lanka",
      period: "Jun 2024 – Nov 2024",
      details: "Designed user flows in Figma and built production WordPress/Vue.js pages, while learning end-to-end requirement gathering from real client briefs."
    },
    {
      role: "Software Engineer Trainee",
      company: "IT Mart Lanka (Pvt) Ltd, Sri Lanka",
      period: "Jan 2022 – Jan 2024",
      details: "Built CodeIgniter/PHP client portals, optimised complex SQL queries, and integrated REST APIs into production systems."
    }
  ]

  const certifications = [
    "Data Analytics Job Simulation — Deloitte Australia (Forage)",
    "Python for Beginners — University of Moratuwa, Sri Lanka",
    "Certificate in Web Development — TURNKEY IT Campus, Colombo"
  ]

  return (
    <section id="about" className={`border-t transition-colors duration-500 relative overflow-hidden font-mono ${
      isDark ? 'bg-gray-950 text-white border-gray-900' : 'bg-white text-slate-900 border-slate-200'
    }`}>
      {/* Background Grid & Scanline */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${
        !isDark && 'invert'
      }`} />

      {/* By the Numbers Stat Strip */}
      <div className={`py-10 border-b backdrop-blur-md relative z-10 transition-colors duration-300 ${
        isDark ? 'bg-gray-950/60 border-gray-900/80' : 'bg-slate-50/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '> 4+', label: 'YRS FULL-STACK' },
              { val: '> 20+', label: 'PROD PROJECTS' },
              { val: '> 5+', label: 'ML MODELS' },
              { val: '> 20+', label: 'PROGRAMMING LANGUAGES' },
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {stat.val}
                </span>
                <span className={`text-xs md:text-sm font-bold uppercase tracking-widest mt-2 ${
                  isDark ? 'text-gray-400' : 'text-slate-500'
                }`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* About 3D & Intro Row */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="w-full lg:w-1/3 h-[500px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-400">Loading 3D Model...</p>
                  </div>
                </div>
              }
            >
              <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}>
                <ThreeDScene 
                  scale={1.0} 
                  position={[0, -1, 0]}
                  modelNo={1}
                />
              </Canvas>
            </Suspense>
          </div>

          <div className="w-full lg:w-2/3 h-[400px] flex items-center justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${sections[activeIndex].title}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`w-full max-w-xl p-8 rounded-none border transition-colors duration-300 shadow-xl ${
                  isDark
                    ? 'bg-gray-900/80 backdrop-blur-md border-gray-800 hover:border-blue-500/50'
                    : 'bg-white/90 backdrop-blur-md border-slate-200 hover:border-blue-500/50 text-slate-800'
                }`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
                  {t.about.tag}
                </div>
                <h3 className={`text-2xl sm:text-3xl font-black mb-4 tracking-tight uppercase ${
                  isDark ? 'text-gray-100' : 'text-slate-900'
                }`}>
                  {`> ${sections[activeIndex].title}`}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {sections[activeIndex].content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Vertical/Horizontal Indicators */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 flex flex-row md:flex-col gap-3">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-none transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-blue-500 scale-125 shadow-[0_0_8px_#3b82f6]' 
                      : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Grid (Education & Experience) */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-16 border-t relative z-10 ${
          isDark ? 'border-gray-900' : 'border-slate-200'
        }`}>
          
          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-blue-500 font-black">{`[ EDU ]`}</span>
              <h3 className={`text-2xl font-black tracking-widest uppercase ${
                isDark ? 'text-gray-200' : 'text-slate-800'
              }`}>
                {t.about.educationHeading}
              </h3>
            </div>
            <div className={`space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px ${
              isDark ? 'before:bg-gray-800' : 'before:bg-slate-200'
            }`}>
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10"
                >
                  <div className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-none bg-blue-500 border ${
                    isDark ? 'border-gray-900' : 'border-white'
                  } shadow-[0_0_10px_#3b82f6]`} />
                  <span className="text-xs text-blue-500 font-bold uppercase tracking-widest">{item.period}</span>
                  <h4 className={`text-lg font-bold mt-1 uppercase ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                    {item.title}
                  </h4>
                  <div className={`text-xs font-bold mb-2 tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {item.institution}
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-cyan-500 font-black">{`[ EXP ]`}</span>
              <h3 className={`text-2xl font-black tracking-widest uppercase ${
                isDark ? 'text-gray-200' : 'text-slate-800'
              }`}>
                {t.about.experienceHeading}
              </h3>
            </div>
            <div className={`space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px ${
              isDark ? 'before:bg-gray-800' : 'before:bg-slate-200'
            }`}>
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10"
                >
                  <div className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-none bg-cyan-500 border ${
                    isDark ? 'border-gray-900' : 'border-white'
                  } shadow-[0_0_10px_#06b6d4]`} />
                  <span className="text-xs text-cyan-500 font-bold uppercase tracking-widest">{item.period}</span>
                  <h4 className={`text-lg font-bold mt-1 uppercase ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                    {item.role}
                  </h4>
                  <div className={`text-xs font-bold mb-2 tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {item.company}
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 p-8 border shadow-xl relative z-10 group transition-colors duration-300 ${
            isDark
              ? 'bg-gray-900/50 border-gray-800 hover:border-blue-500/30'
              : 'bg-slate-50 border-slate-200 hover:border-blue-500/30 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-500 font-black">{`[ CERT ]`}</span>
            <h3 className={`text-xl font-black uppercase tracking-widest ${isDark ? 'text-gray-200' : 'text-slate-900'}`}>
              {t.about.certificationsHeading}
            </h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <li key={index} className={`flex items-start gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                <span className="text-blue-500 mt-1">{`>`}</span> 
                <span className="uppercase tracking-wider">{cert}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}