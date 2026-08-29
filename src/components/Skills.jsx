import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ThreeDScene from './ThreeDScene'
import { Suspense, useState, useEffect } from 'react'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaBootstrap, FaPhp, FaNodeJs, FaJava, FaAndroid, FaPython, FaFigma, FaAws, FaDocker, FaLinux, FaGitAlt, FaWordpress } from 'react-icons/fa'
import { SiJquery, SiSpringboot, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiMysql, SiIntellijidea, SiKubernetes, SiPostman, SiTensorflow, SiScikitlearn, SiTableau, SiNextdotjs, SiTailwindcss, SiGraphql, SiOpenai, SiShopify } from 'react-icons/si'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [selectedSkill, setSelectedSkill] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const skills = [
    { 
      category: 'Data & AI Engineering', 
      tech: [
        { name: 'Python (Pandas, NumPy, Scikit-learn, TensorFlow)', icon: <FaPython className="text-blue-400 text-3xl" /> },
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
      category: 'Visualization & Analytics', 
      tech: [
        { name: 'Power BI', icon: <img src="https://cdn.worldvectorlogo.com/logos/power-bi.svg" alt="Power BI" className="h-9 w-auto" /> },
        { name: 'Tableau', icon: <SiTableau className="text-blue-600 text-3xl" /> }
      ]
    },
    { 
      category: 'Cloud & DevOps', 
      tech: [
        { name: 'AWS (Lambda, EC2, S3)', icon: <FaAws className="text-yellow-500 text-3xl" /> },
        { name: 'Docker', icon: <FaDocker className="text-blue-400 text-3xl" /> },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-blue-500 text-3xl" /> },
        { name: 'Git/GitHub', icon: <FaGitAlt className="text-orange-600 text-3xl" /> },
        { name: 'Linux', icon: <FaLinux className="text-gray-300 text-3xl" /> }
      ]
    },
    { 
      category: 'Full-Stack Development', 
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
    initial: { 
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0
    },
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
          duration: 1,
          ease: "easeOut",
          delay: index * 0.1
        }
      }
    },
    exit: { 
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  // Auto-rotate through categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skills.length)
      setSelectedSkill('') // Reset selected skill on rotation
    }, 6000)

    return () => clearInterval(interval)
  }, [skills.length])

  return (
    <section id="skills" className="py-20 bg-gray-950 text-white relative overflow-hidden min-h-screen flex items-center font-mono border-t border-gray-900">
      
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="text-blue-500 font-black mb-2 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            {`SYS_MODULE: SKILLS`}
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-gray-200">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{`> TECHNICAL EXPERTISE IN `}</span><br className="sm:hidden" />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeCategory}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3 }
              }}
              className="text-blue-500 inline-block mt-2 sm:mt-0"
            >
              {`[ ${skills[activeCategory].category} ]`}
            </motion.span>
          </AnimatePresence>
          </h2>
        </motion.div>
        
        {/* 3D Model Container */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
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
                className="absolute inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center p-4 bg-gray-950/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
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
                      <div className={`w-16 h-16 flex items-center justify-center bg-gray-900/80 border shadow-[0_0_15px_rgba(59,130,246,0.1)] rounded-none p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-900/20 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] ${selectedSkill === tech.name ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] bg-blue-900/30 grayscale-0' : 'border-gray-700/50'}`}>
                        <div className={`h-10 w-auto flex items-center justify-center transition-all duration-300 ${selectedSkill === tech.name ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}>
                          {tech.icon || <span className="text-3xl">{tech.name}</span>}
                        </div>
                      </div>
                      <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gray-900/90 border border-gray-700 px-3 py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-8 whitespace-nowrap shadow-xl z-20 pointer-events-none">
                        {`> ${tech.name}`}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selected Skill Display (Mobile/Global) */}
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
                  <span className="inline-block text-xs md:text-sm font-bold uppercase tracking-widest text-cyan-400 bg-gray-950/95 border border-cyan-500/50 px-4 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)] whitespace-normal break-words text-center leading-relaxed rounded-none">
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