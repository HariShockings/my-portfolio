import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function WhatILookFor() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const icons = [
    <FaBriefcase className="text-blue-500 text-2xl" />,
    <FaBookOpen className="text-purple-500 text-2xl" />,
    <FaGraduationCap className="text-emerald-500 text-2xl" />
  ]

  const borderStyles = [
    isDark ? "border-blue-500/20 hover:border-blue-400/50" : "border-blue-200 hover:border-blue-400",
    isDark ? "border-purple-500/20 hover:border-purple-400/50" : "border-purple-200 hover:border-purple-400",
    isDark ? "border-emerald-500/20 hover:border-emerald-400/50" : "border-emerald-200 hover:border-emerald-400"
  ]

  return (
    <section id="looking-for" className={`py-20 border-t transition-colors duration-500 relative overflow-hidden font-mono ${
      isDark ? 'bg-gray-900 text-white border-gray-800' : 'bg-slate-100 text-slate-900 border-slate-200'
    }`}>
      {/* Background overlay */}
      <div className={`absolute inset-0 z-0 pointer-events-none ${
        isDark 
          ? 'bg-[linear-gradient(rgba(17,24,39,0.95)_0%,rgba(17,24,39,0.99)_100%)]' 
          : 'bg-[linear-gradient(rgba(241,245,249,0.95)_0%,rgba(248,250,252,0.99)_100%)]'
      }`} />

      {/* Grid overlay */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none z-0 ${
        !isDark && 'invert'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Astronlox & Project Availability Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs text-blue-500 font-bold uppercase tracking-widest">
              {t.whatILookFor.tag}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-tight leading-none">
              {t.whatILookFor.title}
            </h2>
            
            <p className={`text-base leading-relaxed font-medium ${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>
              {t.whatILookFor.intro}
            </p>

            {/* Astronlox Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl ${
                isDark 
                  ? 'bg-gray-950/75 backdrop-blur-md border-gray-800 hover:border-blue-500/40 text-white' 
                  : 'bg-white backdrop-blur-md border-slate-200 hover:border-blue-500/40 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] bg-blue-500/10 text-blue-500 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  {t.whatILookFor.astronloxRole}
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  📍 {t.whatILookFor.astronloxOrigin}
                </span>
              </div>
              <h3 className={`text-xl font-black mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Astronlox
              </h3>
              <p className={`text-xs mb-4 leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {t.whatILookFor.astronloxDesc}
              </p>
              <a 
                href="https://astronlox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wider transition-colors duration-300"
              >
                {t.whatILookFor.astronloxLink} <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3 Targets cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {t.whatILookFor.targets.map((target, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-5 rounded-xl border ${borderStyles[idx]} transition-all duration-300 flex items-start gap-4 shadow-md ${
                    isDark
                      ? 'bg-gray-950/60 backdrop-blur-md text-white'
                      : 'bg-white backdrop-blur-md text-slate-800'
                  }`}
                >
                  <div className={`p-3 rounded-lg border shadow-inner flex-shrink-0 ${
                    isDark ? 'bg-gray-900 border-gray-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {icons[idx]}
                  </div>
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest font-mono ${
                      isDark ? 'text-gray-500' : 'text-slate-400'
                    }`}>
                      {target.subtitle}
                    </span>
                    <h3 className={`text-lg font-extrabold mb-1.5 leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {target.title}
                    </h3>
                    <p className={`text-xs leading-relaxed font-medium ${
                      isDark ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {target.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
