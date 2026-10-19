import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const navItems = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
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
      <div className={`text-[10px] sm:text-xs font-mono font-semibold py-1.5 sm:py-2 px-2.5 sm:px-4 border-b text-center relative z-50 backdrop-blur-md tracking-tight sm:tracking-wider leading-relaxed transition-colors duration-300 ${
        isDark 
          ? 'bg-emerald-950/90 text-emerald-400 border-emerald-900/30' 
          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
      }`}>
        <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5 sm:mr-2 align-middle"></span>
        <span>{t.banner}</span>
      </div>
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? isDark
              ? 'top-0 bg-gray-950/80 backdrop-blur-md border-b border-gray-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
              : 'top-0 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-slate-900'
            : 'top-10 sm:top-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#hero" className="text-lg font-black font-mono bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent tracking-widest uppercase flex items-center gap-2">
                <span className="text-blue-500">{`</>`}</span> HARIHARAN
              </a>
            </div>

            {/* Desktop Navigation & Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all duration-300 border border-transparent ${
                    isDark
                      ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 hover:border-blue-500/30'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 font-bold'
                  }`}
                >
                  {item.name}
                </a>
              ))}

              <div className="h-5 w-[1px] bg-gray-700/50 mx-2" />

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Toggle (Dark / Light) */}
              <ThemeToggle className="ml-1" />
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle className="scale-90" />
              <LanguageSwitcher className="scale-90" />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-900/50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
                aria-label="Toggle navigation menu"
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

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-md border-b font-mono uppercase tracking-wider ${
              isDark ? 'bg-gray-950/95 border-gray-900' : 'bg-white/95 border-slate-200 text-slate-900'
            }`}
          >
            <div className="px-3 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm transition-all duration-300 ${
                    isDark
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/20'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-bold'
                  }`}
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