import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-between w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-500 focus:outline-none select-none ${
        isDark 
          ? 'bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-950 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
          : 'bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 border border-amber-300/60 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
      } ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Background celestial decorations */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            {/* Stars for Dark Mode */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="absolute top-1.5 left-2.5 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-blue-200 rounded-full"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }}
              className="absolute top-3 left-7 w-1 h-1 bg-cyan-300 rounded-full"
            />
          </>
        ) : (
          <>
            {/* Mini Clouds for Light Mode */}
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 0.8 }}
              transition={{ duration: 0.4 }}
              className="absolute top-1.5 right-6 w-3 h-1.5 bg-white/70 rounded-full blur-[0.5px]"
            />
            <motion.span
              initial={{ x: -6, opacity: 0 }}
              animate={{ x: 0, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute bottom-1.5 right-4 w-4 h-1.5 bg-white/80 rounded-full blur-[0.5px]"
            />
          </>
        )}
      </div>

      {/* Static side icons as subtle hints */}
      <span className="z-10 pl-1 text-[10px] text-amber-300 pointer-events-none opacity-80">
        <FaSun className={isDark ? 'opacity-30 scale-75 transition-opacity' : 'opacity-0'} />
      </span>
      <span className="z-10 pr-1 text-[10px] text-blue-200 pointer-events-none opacity-80">
        <FaMoon className={isDark ? 'opacity-0' : 'opacity-30 scale-75 transition-opacity'} />
      </span>

      {/* Animated Sliding Thumb (Sun / Moon) */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        animate={{ x: isDark ? 0 : 32 }}
        className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-transform ${
          isDark
            ? 'bg-gradient-to-tr from-indigo-200 to-cyan-100 text-gray-950 border border-white/60 shadow-[0_0_10px_rgba(165,243,252,0.6)]'
            : 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 border border-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
        }`}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? (
            <FaMoon className="text-[11px] text-indigo-900" />
          ) : (
            <FaSun className="text-[11px] text-amber-900" />
          )}
        </motion.div>
      </motion.div>
    </button>
  )
}
