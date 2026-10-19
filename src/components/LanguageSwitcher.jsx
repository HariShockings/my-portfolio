import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { FaGlobe, FaChevronDown, FaCheck } from 'react-icons/fa'

// Clean vector flag images - renders perfectly on Windows and all platforms
function FlagImage({ code, className = "w-5 h-3.5" }) {
  switch (code) {
    case 'en':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="60" height="36" fill="#012169"/>
          <path d="M0 0L60 36M60 0L0 36" stroke="#fff" strokeWidth="6"/>
          <path d="M0 0L60 36M60 0L0 36" stroke="#C8102E" strokeWidth="3"/>
          <path d="M30 0V36M0 18H60" stroke="#fff" strokeWidth="10"/>
          <path d="M30 0V36M0 18H60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
      )
    case 'ta':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="60" height="12" fill="#FF9933"/>
          <rect y="12" width="60" height="12" fill="#FFFFFF"/>
          <rect y="24" width="60" height="12" fill="#138808"/>
          <circle cx="30" cy="18" r="4.5" fill="none" stroke="#000080" strokeWidth="1.2"/>
          <circle cx="30" cy="18" r="1.5" fill="#000080"/>
        </svg>
      )
    case 'fi':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="60" height="36" fill="#FFFFFF"/>
          <rect x="16" width="9" height="36" fill="#003580"/>
          <rect y="13.5" width="60" height="9" fill="#003580"/>
        </svg>
      )
    case 'sv':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="60" height="36" fill="#006AA7"/>
          <rect x="18" width="8" height="36" fill="#FECC00"/>
          <rect y="14" width="60" height="8" fill="#FECC00"/>
        </svg>
      )
    case 'de':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="60" height="12" fill="#000000"/>
          <rect y="12" width="60" height="12" fill="#DD0000"/>
          <rect y="24" width="60" height="12" fill="#FFCE00"/>
        </svg>
      )
    case 'es':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="60" height="9" fill="#AA151B"/>
          <rect y="9" width="60" height="18" fill="#F1BF00"/>
          <rect y="27" width="60" height="9" fill="#AA151B"/>
          <circle cx="16" cy="18" r="3" fill="#AA151B" opacity="0.8"/>
        </svg>
      )
    case 'fr':
      return (
        <svg viewBox="0 0 60 36" className={`${className} rounded-sm overflow-hidden shadow-sm flex-shrink-0 border border-black/10`}>
          <rect width="20" height="36" fill="#002395"/>
          <rect x="20" width="20" height="36" fill="#FFFFFF"/>
          <rect x="40" width="20" height="36" fill="#ED2939"/>
        </svg>
      )
    default:
      return null
  }
}

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, languages, currentLangMeta } = useLanguage()
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (langCode) => {
    // Switch language smoothly (without popup)
    setLanguage(langCode, false)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button - Clean Language Name Only (NO country code, NO GB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all duration-300 border ${
          isDark
            ? 'bg-gray-900/80 hover:bg-gray-800 text-gray-200 border-gray-800 hover:border-blue-500/50 shadow-sm'
            : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 hover:border-blue-500/50 shadow-sm'
        }`}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="tracking-wide font-semibold">{currentLangMeta.name}</span>
        <FaChevronDown
          className={`text-[10px] text-gray-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-500' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border p-1.5 z-50 backdrop-blur-xl font-mono text-xs overflow-hidden ${
              isDark
                ? 'bg-gray-950/95 border-gray-800 text-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                : 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.15)]'
            }`}
          >
            <div className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b mb-1 flex items-center justify-between ${
              isDark ? 'text-gray-400 border-gray-800/80' : 'text-slate-400 border-slate-100'
            }`}>
              <span className="flex items-center gap-1.5">
                <FaGlobe className="text-blue-500" />
                <span>SELECT LANGUAGE</span>
              </span>
              <span className="text-[9px] text-blue-500 font-bold">7 LANGUAGES</span>
            </div>

            <div className="space-y-0.5 max-h-72 overflow-y-auto custom-scrollbar">
              {languages.map((lang) => {
                const isSelected = lang.code === language
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all duration-200 group ${
                      isSelected
                        ? isDark
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isDark
                        ? 'hover:bg-gray-900 text-gray-300 hover:text-white border border-transparent'
                        : 'hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Flag Image (vector SVG image, no country code) */}
                      <FlagImage code={lang.code} className="w-5 h-3.5" />
                      <div>
                        <div className="font-bold text-xs tracking-wide">
                          {lang.fullName || lang.name}
                        </div>
                        <div className={`text-[10px] tracking-tight ${
                          isDark ? 'text-gray-500 group-hover:text-gray-400' : 'text-slate-400 group-hover:text-slate-600'
                        }`}>
                          {lang.region}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <FaCheck className="text-blue-500 text-xs ml-2 flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

