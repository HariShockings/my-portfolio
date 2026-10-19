import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ThreeDScene from './ThreeDScene'
import { Suspense, useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { FaReact, FaVuejs, FaPhp, FaNodeJs, FaJava, FaPython, FaAws, FaDocker, FaLinux, FaGitAlt, FaWordpress } from 'react-icons/fa'
import { SiMongodb, SiMysql, SiKubernetes, SiTableau, SiGraphql } from 'react-icons/si'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [selectedSkill, setSelectedSkill] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const { isDark } = useTheme()
  const { t } = useLanguage()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const skills = [
    { 
      category: t.skills.categories.ai, 
      tech: [
        { name: 'Python (Pandas, NumPy, Scikit-learn, TensorFlow)', icon: <FaPython className="text-blue-500 text-3xl" /> },
        { name: 'SQL (MySQL/PostgreSQL)', icon: <SiMysql className="text-blue-500 text-3xl" /> },
        { name: 'ETL & Data Modeling', icon: <span className="text-3xl">📊</span> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500 text-3xl" /> },
        { name: 'GraphQL', icon: <SiGraphql className="text-pink-500 text-3xl" /> },
        { name: 'Model Training', icon: <span className="text-3xl">🤖</span> },
        { name: 'CNN', icon: <span className="text-3xl">👁️</span> },
        { name: 'NLP basics', icon: <span className="text-3xl">💬</span> }
      ]
    },
    { 
      category: t.skills.categories.analytics, 
      tech: [
        { name: 'Power BI', icon: <img src="https://cdn.worldvectorlogo.com/logos/power-bi.svg" alt="Power BI" className="h-9 w-auto" /> },
        { name: 'Tableau', icon: <SiTableau className="text-blue-600 text-3xl" /> }
      ]
    },
    { 
      category: t.skills.categories.cloud, 
      tech: [
        { name: 'AWS (Lambda, EC2, S3)', icon: <FaAws className="text-yellow-500 text-3xl" /> },
        { name: 'Docker', icon: <FaDocker className="text-blue-400 text-3xl" /> },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-blue-500 text-3xl" /> },
        { name: 'Git/GitHub', icon: <FaGitAlt className="text-orange-600 text-3xl" /> },
        { name: 'Linux', icon: <FaLinux className="text-gray-400 text-3xl" /> }
      ]
    },
    { 
      category: t.skills.categories.fullstack, 
      tech: [
        { name: 'React', icon: <FaReact className="text-blue-400 text-3xl" /> },
        { name: 'Vue.js', icon: <FaVuejs className="text-green-400 text-3xl" /> },
        { name: 'React Native', icon: <FaReact className="text-cyan-400 text-3xl" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500 text-3xl" /> },
        { name: 'PHP', icon: <FaPhp className="text-purple-500 text-3xl" /> },
        { name: 'Java', icon: <FaJava className="text-red-500 text-3xl" /> },
        { name: 'RESTful APIs', icon: <span className="text-3xl">🔗</span> },
        { name: 'WordPress/WooCommerce', icon: <FaWordpress className="text-blue-400 text-3xl" /> }
      ]
    }
  ]

  // Animation variants
  const iconVariants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (index) => {
      const radius = isMobile ? 0 : 200
      const x = isMobile ? 0 : Math.cos(index * (2 * Math.PI / skills[activeCategory].tech.length)) * radius
      const y = isMobile ? 0 : Math.sin(index * (2 * Math.PI / skills[activeCategory].tech.length)) * radius
      return {
        opacity: 1,
        scale: 1,
        x,
        y,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: index * 0.05
        }
      }
    },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } }
  }

  // Auto-rotate through categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skills.length)
      setSelectedSkill('')
    }, 6000)

    return () => clearInterval(interval)
  }, [skills.length])

  return (
    <section id="skills" className={`py-20 relative overflow-hidden min-h-screen flex items-center font-mono border-t transition-colors duration-500 ${
      isDark ? 'bg-gray-950 text-white border-gray-900' : 'bg-white text-slate-900 border-slate-200'
    }`}>
      {/* Background Grid & Scanline */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${
        !isDark && 'invert'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="text-blue-500 font-black mb-2 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            {t.skills.tag}
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest ${
            isDark ? 'text-gray-200' : 'text-slate-800'
          }`}>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {`> ${t.skills.title} `}
            </span>
            <br className="sm:hidden" />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeCategory}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="text-blue-500 inline-block mt-2 sm:mt-0"
              >
                {`[ ${skills[activeCategory].category} ]`}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {t.skills.clickHint}
          </p>
        </motion.div>
        
        {/* 3D Model Container */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-400">Loading 3D Core...</p>
                  </div>
                </div>
              }
            >
              <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}>
                <ThreeDScene 
                  scale={1.0} 
                  position={[0, -1, 0]}
                  modelNo={2}
                />
              </Canvas>
            </Suspense>
          </div>

          {/* Floating Skills */}
          <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none md:pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="absolute inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center p-4"
              >
                <div className="flex flex-wrap gap-4 justify-center pointer-events-auto max-w-sm md:block md:max-w-none">
                  {skills[activeCategory].tech.map((tech, index) => (
                    <motion.div
                      key={`${activeCategory}-${tech.name}`}
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={index}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      onClick={() => setSelectedSkill(tech.name)}
                      className="relative md:absolute flex flex-col items-center gap-2 group md:-ml-8 md:-mt-8 cursor-pointer"
                    >
                      <div className={`w-16 h-16 flex items-center justify-center shadow-lg p-3 backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${
                        isDark
                          ? `bg-gray-900/80 border ${selectedSkill === tech.name ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] bg-blue-900/30' : 'border-gray-800 hover:border-blue-500/50'}`
                          : `bg-white/90 border ${selectedSkill === tech.name ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`
                      }`}>
                        <div className="h-10 w-auto flex items-center justify-center">
                          {tech.icon || <span className="text-3xl">{tech.name}</span>}
                        </div>
                      </div>
                      <span className={`hidden md:block text-xs font-bold uppercase tracking-widest px-3 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-8 whitespace-nowrap shadow-xl z-20 pointer-events-none border ${
                        isDark 
                          ? 'text-cyan-400 bg-gray-900/90 border-gray-700' 
                          : 'text-blue-700 bg-white/95 border-slate-200 shadow-md'
                      }`}>
                        {`> ${tech.name}`}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selected Skill Display */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full px-4 z-20 pointer-events-none flex justify-center">
            <AnimatePresence mode="wait">
              {selectedSkill && (
                <motion.div
                  key={selectedSkill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="inline-block max-w-[90%]"
                >
                  <span className={`inline-block text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-2 backdrop-blur-md border shadow-lg whitespace-normal break-words text-center leading-relaxed ${
                    isDark
                      ? 'text-cyan-400 bg-gray-950/95 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                      : 'text-blue-700 bg-white/95 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                  }`}>
                    {`> ${selectedSkill}`}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}