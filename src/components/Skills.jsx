import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ThreeDScene from './ThreeDScene'
import { Suspense, useState, useEffect } from 'react'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaBootstrap, FaPhp, FaNodeJs, FaJava, FaAndroid, FaPython, FaFigma } from 'react-icons/fa'
import { SiJquery, SiSpringboot, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiMysql, SiIntellijidea } from 'react-icons/si'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [isDestroying, setIsDestroying] = useState(false)

  const skills = [
    { 
      category: 'Frontend', 
      tech: [
        { name: 'HTML', icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
        { name: 'CSS', icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
        { name: 'JavaScript', icon: <FaJs className="text-yellow-400 text-3xl" /> },
        { name: 'jQuery', icon: <SiJquery className="text-blue-600 text-3xl" /> },
        { name: 'Vue.js', icon: <FaVuejs className="text-green-500 text-3xl" /> },
        { name: 'React.js', icon: <FaReact className="text-blue-400 text-3xl" /> },
        { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-500 text-3xl" /> },
        { name: 'Tailwind CSS', icon: <img src="https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" alt="Tailwind" className="h-10 w-auto" /> },
        { name: 'AJAX', icon: <img src="https://cdn.worldvectorlogo.com/logos/ajax-1.svg" alt="AJAX" className="h-10 w-auto" /> }
      ]
    },
    { 
      category: 'Backend', 
      tech: [
        { name: 'PHP', icon: <FaPhp className="text-purple-600 text-3xl" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-600 text-3xl" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-600 text-3xl" /> },
        { name: 'Spring Boot', icon: <SiSpringboot className="text-green-500 text-3xl" /> },
        { name: 'Express', icon: <SiExpress className="text-gray-400 text-3xl" /> },
        { name: 'FastAPI', icon: <img src="https://cdn.worldvectorlogo.com/logos/fastapi-1.svg" alt="FastAPI" className="h-10 w-auto" /> },
        { name: 'REST APIs', icon: <img src="https://th.bing.com/th/id/OIP.-qbcqgc0HIspibRVRNBHBQHaE8?rs=1&pid=ImgDetMain" alt="REST API" className="h-10 w-auto" /> },
        { name: 'Maven', icon: <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254075/maven-icon-md.png" alt="Maven" className="h-10 w-auto" /> }
      ]
    },
    { 
      category: 'Mobile', 
      tech: [
        { name: 'Android Studio', icon: <FaAndroid className="text-green-500 text-3xl" /> },
        { name: 'Kotlin', icon: <FaJava className="text-purple-600 text-3xl" /> },
        { name: 'Java', icon: <FaJava className="text-red-500 text-3xl" /> },
        { name: 'React Native', icon: <FaReact className="text-blue-400 text-3xl" /> }
      ]
    },
    { 
      category: 'Data Analytics', 
      tech: [
        { name: 'R Studio', icon: <img src="https://th.bing.com/th/id/OIP.HT-MXbLzM4SWhZWwZDvNGwHaIl?w=232&h=269&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="R Studio" className="w-4 h-4" /> },
        { name: 'R Language', icon: <img src="https://cdn.worldvectorlogo.com/logos/r-lang.svg" alt="R Language" className="w-4 h-4" /> },
        { name: 'Python', icon: <FaPython className="text-blue-500" /> },
        { name: 'Google Surveys', icon: <img src="https://cdn.worldvectorlogo.com/logos/google-forms.svg" alt="Google Surveys" className="w-4 h-4" /> },
        { name: 'Power BI', icon: <img src="https://cdn.worldvectorlogo.com/logos/power-bi.svg" alt="Power BI" className="w-4 h-4" /> }
      ]
    },
    { 
      category: '3D & Game Dev', 
      tech: [
        { name: 'Three.js', icon: <img src="https://cdn.worldvectorlogo.com/logos/threejs-1.svg" alt="Three.js" className="w-4 h-4" /> },
        { name: 'Cannon.js', icon: null },
        { name: 'Blender', icon: <img src="https://cdn.worldvectorlogo.com/logos/blender-1.svg" alt="Blender" className="w-4 h-4" /> },
        { name: 'Mixamo', icon: null },
        { name: 'MakeHuman', icon: null }
      ]
    },
    { 
      category: 'Databases', 
      tech: [
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500 text-3xl" /> },
        { name: 'Firebase', icon: <SiFirebase className="text-orange-500 text-3xl" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-600 text-3xl" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400 text-3xl" /> },
        { name: 'JSON', icon: <img src="https://cdn.worldvectorlogo.com/logos/json-5.svg" alt="JSON" className="h-10 w-auto" /> }
      ]
    },
    { 
      category: 'Tools', 
      tech: [
        { name: 'Workbench', icon: <img src="https://th.bing.com/th?q=SQL+Workbench+Icon+Circle&w=80&h=80&c=7&o=5&dpr=1.3&pid=1.7&mkt=en-WW&cc=LK&setlang=en&adlt=strict&t=1" alt="Workbench" className="h-10 w-auto" /> },
        { name: 'IntelliJ', icon: <SiIntellijidea className="text-red-500 text-3xl" /> },
        { name: 'NetBeans', icon: <img src="https://cdn.worldvectorlogo.com/logos/netbeans.svg" alt="NetBeans" className="h-10 w-auto" /> },
        { name: 'Maven', icon: <img src="https://th.bing.com/th/id/R.57fb6322eb317f3ce4f4017e62691983?rik=ga89jZh9l766Gw&pid=ImgRaw&r=0" alt="Maven" className="h-10 w-auto" /> },
        { name: 'Figma', icon: <FaFigma className="text-purple-500 text-3xl" /> },
        { name: 'VS Code', icon: <img src="https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" alt="VS Code" className="h-10 w-auto" /> },
        { name: 'Postman', icon: <img src="https://cdn.worldvectorlogo.com/logos/postman.svg" alt="Postman" className="h-10 w-auto" /> },
        { name: 'GitHub', icon: <img src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" alt="GitHub" className="h-10 w-auto" /> }
      ]
    },
    { 
      category: 'AI & ML', 
      tech: [
        { name: 'TensorFlow', icon: <img src="https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg" alt="TensorFlow" className="h-10 w-auto" /> },
        { name: 'Roboflow', icon: <img src="https://cdn.worldvectorlogo.com/logos/roboflow.svg" alt="Roboflow" className="h-10 w-auto" /> },
        { name: 'OpenCV', icon: <img src="https://cdn.worldvectorlogo.com/logos/opencv.svg" alt="OpenCV" className="h-10 w-auto" /> },
        { name: 'Hugging Face', icon: <img src="https://cdn.worldvectorlogo.com/logos/hugging-face.svg" alt="Hugging Face" className="h-10 w-auto" /> }
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
    animate: (index) => ({ 
      opacity: 1,
      scale: 1,
      x: Math.cos(index * (2 * Math.PI / skills[activeCategory].tech.length)) * 200,
      y: Math.sin(index * (2 * Math.PI / skills[activeCategory].tech.length)) * 200,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: index * 0.1
      }
    }),
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
    }, 5000)

    return () => clearInterval(interval)
  }, [skills.length])

  return (
    <section id="skills" className="py-20 bg-gray-800 text-white relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Technical Skills in </span>
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
              className="text-blue-500 inline-block"
            >
              {skills[activeCategory].category}
            </motion.span>
          </AnimatePresence>
        </motion.h2>
        
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
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex flex-wrap gap-4 justify-center">
                  {skills[activeCategory].tech.map((tech, index) => (
                    <motion.div
                      key={`${activeCategory}-${tech.name}`}
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={index}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="absolute flex flex-col items-center gap-2 group"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-blue-100/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-100/40">
                        <div className="h-10 w-auto flex items-center justify-center">
                          {tech.icon || <span className="text-3xl">{tech.name}</span>}
                        </div>
                      </div>
                      <span className="text-sm text-blue-300 bg-gray-800/80 px-3 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-8 whitespace-nowrap">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}