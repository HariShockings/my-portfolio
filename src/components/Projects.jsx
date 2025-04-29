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
      name: 'Virtual CoLab',
      url: 'https://virtual-colab.vercel.app/',
      description: 'A collaborative platform for freelancers to form teams and find projects to work together. Features include team formation, project discovery, and seamless collaboration tools.',
      category: 'Web Application'
    },
    {
      name: 'Swift Trading',
      url: 'https://swifttrading.lk',
      description: 'A comprehensive trading platform for seamless transactions and market operations.',
      category: 'Web Application'
    },
    {
      name: 'Gift Delivery E-Commerce',
      description: 'An e-commerce platform for gift delivery services, developed as part of WAD course.',
      category: 'Web Application'
    },
    {
      name: 'FindBodima.lk',
      description: 'A rental and booking platform for accommodations, developed for PPA course.',
      category: 'Web Application'
    },
    {
      name: 'Student Management System',
      description: 'A comprehensive system for managing student records and academic information.',
      category: 'Web Application'
    },
    {
      name: 'Pet Shop System',
      description: 'A complete pet shop management system with inventory and customer management.',
      category: 'Web Application'
    },
    {
      name: 'Student Mate Platform',
      description: 'A platform facilitating student discussions, gaming, and leisure activities.',
      category: 'Web Application'
    },
    {
      name: 'Automate MyShare',
      description: 'A comprehensive system for managing digital advertisements, orders, suppliers, and employees.',
      category: 'Web Application'
    },
    {
      name: 'Secure Bank Infrastructure',
      description: 'Setup and configuration of secure bank branches and servers with advanced security measures.',
      category: 'Computer Security'
    },
    {
      name: 'Network Configuration',
      description: 'Implementation of VLAN routing, trunking, router configurations, and network protocols.',
      category: 'Networking'
    },
    {
      name: 'Economic Crisis Impact Analysis',
      description: 'Conducted and analyzed a survey on the impact of economic crisis among Sri Lankan university students.',
      category: 'Data Analytics'
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
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          My Projects
        </motion.h2>

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
                      className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                    >
                      <span className="text-sm text-blue-400 mb-2 block">{project.category}</span>
                      <h3 className="text-2xl font-bold mb-4 text-blue-400">{project.name}</h3>
                      <p className="text-lg text-gray-200 mb-4">{project.description}</p>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                        >
                          Visit Project
                        </a>
                      )}
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
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mt-20 mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          GitHub Repositories
        </motion.h2>

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
                className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">{repo.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{repo.description || 'No description available.'}</p>
                  </div>
                  <FaGithub className="text-2xl text-gray-400" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCodeBranch />
                    <span>{repo.forks_count}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                    {repo.language || 'N/A'}
                  </span>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors duration-300 text-sm"
                >
                  View on GitHub →
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}