import { motion } from 'framer-motion'
import { FaLaptopCode, FaBrain, FaGlobe } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function WhyWorkWithMe() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const cardIcons = [
    <FaLaptopCode className="text-3xl text-blue-500" />,
    <FaBrain className="text-3xl text-purple-500" />,
    <FaGlobe className="text-3xl text-emerald-500" />
  ]

  return (
    <section id="why-work-with-me" className={`py-20 relative overflow-hidden border-t font-mono transition-colors duration-500 ${
      isDark ? 'bg-gray-950 text-white border-gray-900' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      {/* Background Grid & Scanline */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${
        !isDark && 'invert'
      }`} />
      
      {/* Glows */}
      <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-blue-500/5' : 'bg-blue-400/10'
      }`} />
      <div className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-black mb-3 flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            {t.whyWorkWithMe.tag}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent mb-6 uppercase tracking-widest text-center"
          >
            {t.whyWorkWithMe.title}
          </motion.h2>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.whyWorkWithMe.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between h-full group relative shadow-lg ${
                isDark
                  ? 'bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-blue-500/50'
                  : 'bg-white backdrop-blur-md border-slate-200 hover:border-blue-500/50'
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className={`w-14 h-14 flex items-center justify-center border mb-6 shadow-inner transition-colors duration-300 ${
                  isDark ? 'bg-gray-950 border-gray-800 group-hover:border-blue-500/30' : 'bg-slate-50 border-slate-200 group-hover:border-blue-400'
                }`}>
                  {cardIcons[index]}
                </div>
                <h3 className={`text-xl font-black mb-1.5 uppercase tracking-wide ${
                  isDark ? 'text-gray-100' : 'text-slate-900'
                }`}>
                  {card.title}
                </h3>
                <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-4">
                  {`> ${card.subtitle}`}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
