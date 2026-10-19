import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Thin Availability Banner */}
      <div className="bg-emerald-950/90 text-emerald-400 text-[10px] sm:text-xs font-mono font-semibold py-1.5 sm:py-2 px-2.5 sm:px-4 border-b border-emerald-900/30 text-center relative z-50 backdrop-blur-md tracking-tight sm:tracking-wider leading-relaxed">
        <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5 sm:mr-2 align-middle"></span>
        &gt;_ OPEN FOR AI &amp; DATA ENGINEERING INTERNSHIPS · THESIS COLLABORATIONS · SOFTWARE ENGINEERING ROLES
      </div>
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-gray-950/75 backdrop-blur-md border-b border-gray-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
            : 'top-7 sm:top-8 bg-transparent'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#hero" className="text-lg font-black font-mono bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-widest uppercase flex items-center gap-2">
              <span className="text-blue-500">{`</>`}</span> HARIHARAN
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 px-4 py-2 rounded-md text-xs font-mono tracking-widest uppercase transition-all duration-300 border border-transparent hover:border-blue-500/30"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-400 p-2 rounded-lg hover:bg-gray-900/50 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-950/95 backdrop-blur-md border-b border-gray-900 font-mono uppercase tracking-wider"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-blue-400 block px-3 py-2 rounded-md text-sm border border-transparent hover:border-blue-500/30 hover:bg-blue-900/20 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                &gt; {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
    </>
  )
}