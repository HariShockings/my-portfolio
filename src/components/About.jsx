import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ThreeDScene from './ThreeDScene.jsx'
import { useState, useEffect, Suspense } from 'react'

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hasLooped, setHasLooped] = useState(false)

  const sections = [
    {
      title: "Always Advancing",
      content: "I've spent the last four years building things people actually use — client websites, mobile apps, e-commerce platforms — while teaching myself the machine learning and data engineering skills to build the layer underneath them: the models and pipelines that make software smart, not just functional."
    },
    {
      title: "Theory Meets Practice",
      content: "That path led me to Vaasa, Finland, where I'm now completing an MSc in Data Engineering & AI — sharpening the theory behind the intuition I built shipping 20+ real-world projects."
    },
    {
      title: "Collaborative & Remote Driven",
      content: "I do my best work in fast-moving, remote-first teams: picking up new stacks quickly, working directly with clients and cross-functional teams, and treating every project as a chance to get measurably better."
    }
  ]

  // Auto-scroll effect for sections
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % sections.length
          if (next === 0) {
            setHasLooped(true)
          }
          return next
        })
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
    <section id="about" className="bg-gray-950 text-white border-t border-gray-900 relative overflow-hidden">
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)] pointer-events-none" />

      {/* NEW: By the Numbers Stat Strip */}
      <div className="bg-gray-950/60 border-b border-gray-900/80 py-10 backdrop-blur-md relative z-10 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{`> 4+`}</span>
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">YRS FULL-STACK</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{`> 20+`}</span>
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">PROD PROJECTS</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{`> 2`}</span>
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">ML MODELS</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{`> 1`}</span>
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">MSc IN AI & DE</span>
            </motion.div>
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
                key={activeIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3 }
                }}
                className="w-full max-w-xl bg-gray-900/80 backdrop-blur-md p-8 rounded-none border border-gray-800 hover:border-blue-500/50 transition-colors duration-300 font-mono shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
                  SYS_INFO: STORY
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 text-gray-100 tracking-tight uppercase">{`> ${sections[activeIndex].title}`}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium">{sections[activeIndex].content}</p>
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
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Grid (Education & Experience) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-16 border-t border-gray-900 relative z-10 font-mono">
          
          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-blue-500 font-black">{`[ EDU ]`}</span>
              <h3 className="text-2xl font-black text-gray-200 tracking-widest uppercase">Education</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gray-800">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-none bg-blue-500 border border-gray-900 shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-xs text-blue-500 font-bold uppercase tracking-widest">{item.period}</span>
                  <h4 className="text-lg font-bold text-gray-100 mt-1 uppercase">{item.title}</h4>
                  <div className="text-xs font-bold text-gray-500 mb-2 tracking-wider">{item.institution}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.details}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-cyan-500 font-black">{`[ EXP ]`}</span>
              <h3 className="text-2xl font-black text-gray-200 tracking-widest uppercase">Experience</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gray-800">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-none bg-cyan-500 border border-gray-900 shadow-[0_0_10px_#06b6d4]" />
                  <span className="text-xs text-cyan-500 font-bold uppercase tracking-widest">{item.period}</span>
                  <h4 className="text-lg font-bold text-gray-100 mt-1 uppercase">{item.role}</h4>
                  <div className="text-xs font-bold text-gray-500 mb-2 tracking-wider">{item.company}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.details}</p>
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
          className="mt-16 p-8 bg-gray-900/50 border border-gray-800 shadow-xl font-mono relative z-10 group hover:border-blue-500/30 transition-colors duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-500 font-black">{`[ CERT ]`}</span>
            <h3 className="text-xl font-black text-gray-200 uppercase tracking-widest">Certifications & Training</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-400 text-sm">
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