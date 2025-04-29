import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
      >
        <img
          src="/assets/profile.jpg"
          alt="Navaratnaraja Hariharan"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-400"
        />
        <h1 className="text-5xl md:text-7xl font-extrabold pb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Navaratnaraja Hariharan
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          Full Stack Developer | Data Analyst | Computer Science Student
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/HariShockings" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub" className="w-8 h-8 hover:opacity-80" />
          </a>
          <a href="https://www.hackerrank.com/profile/haritheguy21" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/50/ffffff/external-hackerrank-is-a-technology-company-that-focuses-on-competitive-programming-logo-shadow-tal-revivo.png" alt="HackerRank" className="w-8 h-8 hover:opacity-80" />
          </a>
          <a href="https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" className="w-8 h-8 hover:opacity-80" />
          </a>
          <a href="https://www.instagram.com/hari_shockings/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" className="w-8 h-8 hover:opacity-80" />
          </a>
        </div>
        <a
          href="#contact"
          className="mt-8 inline-block bg-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition-colors duration-300"
        >
          Hire Me
        </a>
      </motion.div>
    </section>
  )
}