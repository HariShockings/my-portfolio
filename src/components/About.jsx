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
      title: "The Tech Dreamer",
      content: "Hey there! I'm Navaratnaraja Hariharan, a passionate Computer Science student at SLIIT City University. I'm not just a coder – I'm a dreamer who turns ideas into reality. When I'm not crafting code, you'll find me on the football field, painting walls with vibrant stories, or pushing my limits at the gym. Life's too short to be ordinary!"
    },
    {
      title: "Code & Creativity",
      content: "My journey in tech isn't just about writing code – it's about creating magic. From building sleek web applications to diving deep into data science, I love turning complex problems into elegant solutions. Every project is a new adventure, and I'm always excited to learn something new!"
    },
    {
      title: "Data Whisperer",
      content: "There's something magical about turning raw data into beautiful stories. Power BI is my paintbrush, and data is my canvas. I love discovering hidden patterns and insights that can make a real difference. It's like being a detective, but with numbers!"
    },
    {
      title: "Sports Enthusiast",
      content: "Football isn't just a game for me – it's a way of life. Whether I'm scoring goals or cheering from the sidelines, the energy of the game keeps me alive. Cricket matches are my weekend therapy. Sports taught me teamwork, resilience, and the joy of pushing boundaries."
    },
    {
      title: "Artistic Soul",
      content: "Walls are my canvas, and colors are my voice. Every stroke of my brush tells a story, every mural shares a piece of my soul. Art isn't just a hobby – it's my way of leaving a colorful mark on the world around me."
    },
    {
      title: "Fitness Journey",
      content: "The gym is my sanctuary. It's where I transform not just my body, but my mind. Every drop of sweat is a step toward becoming a better version of myself. Discipline, determination, and dedication – that's what keeps me going!"
    },
    {
      title: "Nature's Child",
      content: "There's nothing like the feeling of fresh mountain air or the sound of waves crashing. Nature is my reset button – it clears my mind, fuels my creativity, and reminds me of life's simple beauties. Every hike is a new adventure waiting to be discovered!"
    },
    {
      title: "Forever Learning",
      content: "The tech world never sleeps, and neither do I! I'm constantly exploring new technologies, tools, and ideas. Whether it's mastering a new programming language or diving into the latest AI trends, I'm always ready for the next challenge. The future is exciting, and I'm here to shape it!"
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
    }, 5000)
    return () => clearInterval(interval)
  }, [sections.length, isPaused])

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Discover My World
          </h2>
        </motion.div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
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
          <div className="w-full lg:w-2/3 h-[500px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3 }
                }}
                className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{sections[activeIndex].title}</h3>
                <p className="text-lg text-gray-200">{sections[activeIndex].content}</p>
              </motion.div>
            </AnimatePresence>

            {/* Vertical Indicators */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}