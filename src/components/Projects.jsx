import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDark } = useTheme()
  const { t } = useLanguage()

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

  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth >= 1024) return 4
    if (window.innerWidth >= 768) return 2
    return 1
  }

  const getRepoSlidesPerView = () => {
    if (typeof window === 'undefined') return 6
    if (window.innerWidth >= 1024) return 6
    if (window.innerWidth >= 768) return 4
    return 1
  }

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())
  const [repoSlidesPerView, setRepoSlidesPerView] = useState(getRepoSlidesPerView())
  const [repoActiveIndex, setRepoActiveIndex] = useState(0)
  const [repoIsPaused, setRepoIsPaused] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView())
      setRepoSlidesPerView(getRepoSlidesPerView())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-scroll effect for Shipped Work
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

  // Group GitHub repositories into slides
  const groupedRepos = repositories.reduce((acc, repo, index) => {
    const slideIndex = Math.floor(index / repoSlidesPerView)
    if (!acc[slideIndex]) {
      acc[slideIndex] = []
    }
    acc[slideIndex].push(repo)
    return acc
  }, [])

  useEffect(() => {
    if (repoActiveIndex >= groupedRepos.length && groupedRepos.length > 0) {
      setRepoActiveIndex(0)
    }
  }, [groupedRepos.length, repoActiveIndex])

  // Auto-scroll effect for GitHub Repositories
  useEffect(() => {
    if (groupedRepos.length <= 1) return
    const interval = setInterval(() => {
      if (!repoIsPaused) {
        setRepoActiveIndex((prev) => (prev + 1) % groupedRepos.length)
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [groupedRepos.length, repoIsPaused])

  // Fetch all GitHub repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      setIsLoading(true)
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN
        const username = 'hariShockings'
        let allRepos = []
        let page = 1
        let keepFetching = true
        let hasAuth = !!token

        while (keepFetching && page <= 10) {
          try {
            const url = hasAuth
              ? 'https://api.github.com/user/repos'
              : `https://api.github.com/users/${username}/repos`

            const headers = {
              Accept: 'application/vnd.github.v3+json',
            }
            if (hasAuth) {
              headers.Authorization = `Bearer ${token}`
            }

            const response = await axios.get(url, {
              headers,
              params: {
                sort: 'updated',
                direction: 'desc',
                per_page: 100,
                page: page,
                ...(hasAuth ? { affiliation: 'owner,collaborator' } : {})
              }
            })

            if (Array.isArray(response.data) && response.data.length > 0) {
              allRepos = [...allRepos, ...response.data]
              if (response.data.length < 100) {
                keepFetching = false
              } else {
                page++
              }
            } else {
              keepFetching = false
            }
          } catch (err) {
            if (hasAuth) {
              console.warn('GitHub token invalid or unauthorized. Falling back to public repos for', username)
              hasAuth = false
              allRepos = []
              page = 1
              continue
            }
            throw err
          }
        }

        allRepos.sort((a, b) => new Date(b.updated_at || b.pushed_at) - new Date(a.updated_at || a.pushed_at))

        setRepositories(allRepos)
        setError(null)
      } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        setError('Failed to load repositories. Please try again later.')
        setRepositories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  return (
    <section id="projects" className={`py-20 font-mono relative overflow-hidden border-t transition-colors duration-500 ${
      isDark ? 'bg-gray-950 text-white border-gray-900' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      {/* Background Grid & Scanline */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${
        !isDark && 'invert'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="text-blue-500 font-black mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            {t.projects.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent uppercase tracking-widest text-center">
            {t.projects.title}
          </h2>
        </motion.div>

        {/* Shipped Work Carousel */}
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
                  {slideProjects.map((project) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`p-8 rounded-none shadow-xl border transition-colors duration-300 flex flex-col justify-between group relative ${
                        isDark
                          ? 'bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-blue-500/50 text-white'
                          : 'bg-white backdrop-blur-md border-slate-200 hover:border-blue-500/50 text-slate-900'
                      }`}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div>
                        <span className="text-xs text-blue-500 mb-2 block font-bold uppercase tracking-widest">{`[ ${project.category} ]`}</span>
                        <h3 className={`text-2xl font-black mb-3 uppercase ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>{project.name}</h3>
                        <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{project.description}</p>
                      </div>
                      
                      <div>
                        {project.stack && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.stack.map(tech => (
                              <span key={tech} className={`text-[10px] px-2 py-1 font-bold uppercase tracking-widest border transition-colors duration-300 ${
                                isDark
                                  ? 'bg-gray-950 text-cyan-400 border-gray-800 group-hover:border-blue-500/30'
                                  : 'bg-slate-100 text-blue-700 border-slate-200 group-hover:border-blue-300'
                              }`}>
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
                            className="inline-flex items-center gap-2 text-blue-500 hover:text-cyan-500 font-bold transition-colors duration-300 text-sm uppercase tracking-widest"
                          >
                            <span>{t.projects.viewProject}</span> →
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

        {/* Shipped Work Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {groupedProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-blue-500 scale-125' 
                  : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-slate-300 hover:bg-slate-400'
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
            {t.projects.openSourceTag}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest mb-4">
            {t.projects.openSourceTitle}
          </h2>
          <p className={`text-xs sm:text-sm md:text-base max-w-2xl text-center px-4 leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-slate-600'
          }`}>
            {t.projects.openSourceDesc.replace('{count}', repositories.length)}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-48 gap-3">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className={`text-xs font-mono tracking-widest ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {t.projects.fetching}
            </span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-6 bg-red-500/10 border border-red-500/30 max-w-lg mx-auto font-mono rounded-lg">
            <p className="text-sm font-bold">{error}</p>
          </div>
        ) : repositories.length === 0 ? (
          <div className="text-center text-gray-400 p-8 font-mono">
            [ NO_REPOSITORIES_FOUND ]
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${repoActiveIndex * 100}%)` }}
              onMouseEnter={() => setRepoIsPaused(true)}
              onMouseLeave={() => setRepoIsPaused(false)}
            >
              {groupedRepos.map((slideRepos, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                  style={{ width: '100%' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4">
                    {slideRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className={`p-6 rounded-none shadow-xl border transition-all duration-300 relative group flex flex-col justify-between h-full ${
                          isDark
                            ? 'bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] text-white'
                            : 'bg-white backdrop-blur-md border-slate-200 hover:border-blue-500/50 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] text-slate-900'
                        }`}
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className={`text-base sm:text-lg font-black uppercase tracking-wide truncate group-hover:text-blue-500 transition-colors ${
                              isDark ? 'text-gray-100' : 'text-slate-900'
                            }`} title={repo.name}>
                              {repo.name}
                            </h3>
                            <FaGithub className="text-xl text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                          </div>

                          <p className={`text-xs mb-4 leading-relaxed line-clamp-3 min-h-[48px] ${
                            isDark ? 'text-gray-400' : 'text-slate-600'
                          }`}>
                            {repo.description || 'No description provided for this repository.'}
                          </p>
                        </div>

                        <div className={`pt-3 border-t ${isDark ? 'border-gray-800/80' : 'border-slate-100'}`}>
                          <div className={`flex flex-wrap items-center justify-between gap-2 mb-4 text-[11px] font-bold uppercase tracking-wider ${
                            isDark ? 'text-gray-400' : 'text-slate-500'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1" title="Stars">
                                <FaStar className="text-blue-500 text-xs" />
                                <span>{repo.stargazers_count}</span>
                              </div>
                              <div className="flex items-center gap-1" title="Forks">
                                <FaCodeBranch className="text-cyan-500 text-xs" />
                                <span>{repo.forks_count}</span>
                              </div>
                            </div>
                            {repo.language && (
                              <span className={`px-2 py-0.5 border text-[10px] font-mono ${
                                isDark
                                  ? 'bg-gray-950 border-gray-800 text-cyan-400'
                                  : 'bg-slate-100 border-slate-200 text-blue-700'
                              }`}>
                                {repo.language}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-cyan-500 transition-colors text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5"
                            >
                              <span>{t.projects.viewSource}</span> →
                            </a>
                            {repo.homepage && (
                              <a
                                href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-500 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1"
                              >
                                <span>{t.projects.liveDemo}</span> ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Carousel Indicators & Prev/Next Controls */}
            {groupedRepos.length > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button
                  onClick={() => setRepoActiveIndex((prev) => (prev === 0 ? groupedRepos.length - 1 : prev - 1))}
                  className={`px-3 py-1.5 border transition-all text-xs font-mono font-bold ${
                    isDark
                      ? 'bg-gray-900 border-gray-800 hover:border-blue-500 text-gray-400 hover:text-blue-400'
                      : 'bg-white border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 shadow-sm'
                  }`}
                  aria-label="Previous GitHub Slide"
                >
                  {t.projects.prev}
                </button>

                <div className="flex items-center gap-2">
                  {groupedRepos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setRepoActiveIndex(index)}
                      className={`transition-all duration-300 rounded-none ${
                        repoActiveIndex === index 
                          ? 'w-6 h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                          : isDark ? 'w-2 h-2 bg-gray-700 hover:bg-gray-500' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to GitHub slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setRepoActiveIndex((prev) => (prev + 1) % groupedRepos.length)}
                  className={`px-3 py-1.5 border transition-all text-xs font-mono font-bold ${
                    isDark
                      ? 'bg-gray-900 border-gray-800 hover:border-blue-500 text-gray-400 hover:text-blue-400'
                      : 'bg-white border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 shadow-sm'
                  }`}
                  aria-label="Next GitHub Slide"
                >
                  {t.projects.next}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}