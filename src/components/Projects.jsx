import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const projects = [
    {
      name: 'KidneyCare',
      description: "A chronic illness doesn't wait for a doctor's appointment — KidneyCare gives patients an instant read on where they stand. Upload a medical report, and a custom-trained model classifies the Chronic Kidney Disease stage in seconds. A Retrieval-Augmented Generation layer (Groq API) then turns that result into a personalised dietary and treatment plan, with map-based doctor discovery so the next step is never more than a click away.",
      category: 'Research & AI / ML',
      stack: ['React', 'Node.js', 'MySQL', 'Python', 'Groq RAG', 'Scikit-learn'],
    },
    {
      name: 'AquaCare',
      description: "Built for aquaculture farmers who can't afford to lose a harvest to a disease they can't see coming. AquaCare puts a computer-vision diagnostic in every farmer's pocket — snap a photo, get an instant disease read, and act before it spreads. Paired with farm-management tracking and an AI chatbot for on-the-spot guidance.",
      category: 'Mobile & AI / Computer Vision',
      stack: ['React Native', 'Firebase', 'Machine Learning', 'Computer Vision', 'AI Chatbot'],
    },
    {
      name: 'VirtualCoLab',
      description: "The best ideas die in isolation. VirtualCoLab is a matchmaking engine for ambition — pairing students, startups, and freelancers by skillset and compatibility using a custom Python-driven AI matching model, so the right people find each other before the idea goes cold.",
      category: 'AI & Full Stack',
      stack: ['React', 'Node.js', 'MongoDB', 'Python AI', 'REST API'],
      url: 'https://virtual-colab.vercel.app/'
    },
    {
      name: 'VacayLanka.lk',
      description: "A headless-CMS tourism platform built for speed: Next.js renders dynamic content pulled from a GraphQL-powered WordPress backend, giving Sri Lanka's destinations a site that loads fast and ranks faster.",
      category: 'Web Application',
      stack: ['Next.js', 'GraphQL', 'WordPress', 'JavaScript', 'Tailwind'],
      url: 'https://vacaylanka.lk'
    },
    {
      name: 'Live Power BI Sales Dashboard',
      description: "As Tech Lead & PM, I took this from Scrum board to production: a full e-commerce platform wired to a real-time Power BI dashboard tracking customer behaviour, inventory, and sales as they happen — not a day later.",
      category: 'Data Analytics & Agile',
      stack: ['React', 'Power BI', 'SQL Server', 'Scrum ceremonies'],
    },
    {
      name: 'The Cosmetics Direct',
      description: "E-commerce with a brain: a custom AI-powered RAG chatbot handles customer questions instantly, with live-agent escalation built in for the moments only a human can close.",
      category: 'E-Commerce & Chatbots',
      stack: ['WordPress', 'WooCommerce', 'RAG Chatbot', 'Live Escalation'],
      url: 'https://thecosmeticsdirect.com'
    },
    {
      name: 'Prime Tea Ceylon',
      description: "Global ordering, built for a Ceylon tea exporter — catalogue, checkout, and fulfilment engineered to sell internationally from day one.",
      category: 'E-Commerce',
      stack: ['WordPress', 'WooCommerce', 'Payment Gateway'],
      url: 'https://primeteaceylon.com'
    },
    {
      name: 'Evershine Coaches (UK)',
      description: "A coach and fleet booking platform with real-time availability and a custom admin dashboard — built so a small operations team can run a large fleet without the chaos.",
      category: 'Web Application',
      stack: ['WordPress', 'PHP', 'Custom Plugins', 'MySQL'],
      url: 'https://evershinecoaches.co.uk'
    },
    {
      name: 'AAYA Group',
      description: "Custom Elementor components and a reusable frontend system, giving a travel brand a site that's as fast to update as it is to browse.",
      category: 'Web Application',
      stack: ['React.js', 'WordPress', 'Elementor', 'Tailwind'],
      url: 'https://peakdestinations.travel'
    },
    {
      name: 'Swift Trading',
      description: "A transactional directory connecting equipment suppliers with hirers across Sri Lanka — live, in production, and still running.",
      category: 'Web Application',
      stack: ['PHP', 'CodeIgniter', 'MySQL', 'Bootstrap'],
      url: 'https://swifttrading.lk'
    }
  ]

  // Calculate number of slides based on screen size
  const getSlidesPerView = () => {
    if (window.innerWidth >= 1024) return 4 // Large screens (2x2 grid)
    if (window.innerWidth >= 768) return 2 // Medium screens
    return 1 // Small screens
  }

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % Math.ceil(projects.length / slidesPerView))
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [projects.length, slidesPerView, isPaused])

  // Group projects into slides
  const groupedProjects = projects.reduce((acc, project, index) => {
    const slideIndex = Math.floor(index / slidesPerView)
    if (!acc[slideIndex]) {
      acc[slideIndex] = []
    }
    acc[slideIndex].push(project)
    return acc
  }, [])

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json'
          },
          params: {
            sort: 'updated',
            per_page: 6
          }
        })
        setRepositories(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        setError('Failed to load repositories. Please try again later.')
        setRepositories([])
      } finally {
        setIsLoading(false)
      }
    }

    if (import.meta.env.VITE_GITHUB_TOKEN) {
      fetchRepositories()
    } else {
      setError('GitHub token not found. Please add your GitHub token to the environment variables.')
      setIsLoading(false)
    }
  }, [])

  return (
    <section id="projects" className="py-20 bg-gray-950 text-white font-mono relative overflow-hidden border-t border-gray-900">
      
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="text-blue-500 font-black mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            SYS_MODULE: PROJECTS
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest">
            {`> SHIPPED WORK`}
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {groupedProjects.map((slideProjects, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0"
                style={{ width: '100%' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                  {slideProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-900/50 backdrop-blur-md p-8 rounded-none shadow-xl border border-gray-800 hover:border-blue-500/50 transition-colors duration-300 flex flex-col justify-between animate-fade-in group relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div>
                        <span className="text-xs text-blue-500 mb-2 block font-bold uppercase tracking-widest">{`[ ${project.category} ]`}</span>
                        <h3 className="text-2xl font-black mb-3 text-gray-100 uppercase">{project.name}</h3>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                      </div>
                      
                      <div>
                        {project.stack && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.stack.map(tech => (
                              <span key={tech} className="text-[10px] px-2 py-1 bg-gray-950 text-cyan-400 border border-gray-800 font-bold uppercase tracking-widest group-hover:border-blue-500/30 transition-colors duration-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-400 font-bold transition-colors duration-300 text-sm uppercase tracking-widest"
                          >
                            <span>[ VISIT_PROJECT ]</span> →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {groupedProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* GitHub Repositories Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 mb-16 flex flex-col items-center"
        >
          <div className="text-blue-500 font-black mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            SYS_MODULE: GITHUB_REPOS
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest mb-6">
            {`> OPEN SOURCE`}
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl text-left">
            Code speaks louder than a CV. Here's what's public — from production models to shipped client work.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-lg">
            <p>{error}</p>
            <p className="text-sm mt-2">
              Make sure you have added your GitHub token to the .env file:
              <br />
              <code className="bg-gray-800 px-2 py-1 rounded">VITE_GITHUB_TOKEN=your_token_here</code>
            </p>
          </div>
        ) : repositories.length === 0 ? (
          <div className="text-center text-gray-400 p-4">
            No repositories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repositories.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-6 rounded-none shadow-xl border border-gray-800 hover:border-blue-500/50 transition-colors duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-start justify-between mb-4 pl-2">
                  <div>
                    <h3 className="text-xl font-black text-gray-100 mb-2 uppercase">{repo.name}</h3>
                    <p className="text-gray-400 text-xs mb-4 leading-relaxed">{repo.description || 'No description available.'}</p>
                  </div>
                  <FaGithub className="text-2xl text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pl-2 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-blue-500" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCodeBranch className="text-cyan-500" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-blue-400">
                    {repo.language || 'N/A'}
                  </span>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-cyan-400 transition-colors duration-300 text-xs font-bold uppercase tracking-widest pl-2 inline-flex items-center gap-2"
                >
                  <span>[ VIEW_SOURCE ]</span> →
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}