import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { LANDMARK_DATA } from '../data/landmarks'
import { FaTimes, FaLandmark, FaQuoteLeft } from 'react-icons/fa'

// Custom Vector SVG Art representations for each language's unique symbols
function LandmarkVectorArt({ type }) {
  switch (type) {
    case 'english':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Big Ben / London */}
          <g className="text-blue-500 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 160V60L55 30L70 60V160" />
            <path d="M48 65H62" />
            <circle cx="55" cy="78" r="7" className="fill-blue-500/20" />
            <line x1="55" y1="74" x2="55" y2="78" />
            <line x1="55" y1="78" x2="59" y2="78" />
            <path d="M30 160H80" />
            {/* Tower Bridge arches */}
            <path d="M75 120H135" />
            <path d="M105 120V160" />
            <path d="M85 120C85 145 125 145 125 120" />
          </g>

          {/* Statue of Liberty (USA) */}
          <g className="text-cyan-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M190 160V95L185 85L195 85L200 95V160" />
            <path d="M195 80C195 76 190 76 190 80" />
            {/* Torch */}
            <path d="M205 100L215 75L213 70" />
            <circle cx="215" cy="65" r="4" className="fill-amber-400 text-amber-400 stroke-amber-400" />
            {/* Crown spikes */}
            <path d="M185 75L182 68M190 73L190 65M195 73L198 65M200 75L205 68" />
          </g>

          {/* Sydney Opera House (Australia) */}
          <g className="text-sky-300 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Shell 1 */}
            <path d="M255 160C255 110 290 85 305 160" className="fill-sky-400/10" />
            {/* Shell 2 */}
            <path d="M285 160C285 95 325 70 345 160" className="fill-sky-400/15" />
            {/* Shell 3 */}
            <path d="M325 160C325 120 355 105 375 160" className="fill-sky-400/10" />
            <line x1="240" y1="160" x2="385" y2="160" strokeWidth="3" />
          </g>
        </svg>
      )

    case 'tamil':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Thanjavur / Madurai Gopuram (South India) */}
          <g className="text-amber-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Gopuram Steps */}
            <path d="M80 160H140L135 130H85L80 160Z" className="fill-amber-500/10" />
            <path d="M86 130H134L130 100H90L86 130Z" className="fill-amber-500/15" />
            <path d="M91 100H129L125 70H95L91 100Z" className="fill-amber-500/20" />
            <path d="M96 70H124L120 45H100L96 70Z" />
            {/* Kalasams at the summit */}
            <circle cx="103" cy="38" r="2.5" className="fill-amber-300" />
            <circle cx="110" cy="36" r="3" className="fill-yellow-300" />
            <circle cx="117" cy="38" r="2.5" className="fill-amber-300" />
            {/* Central Temple Doorway */}
            <path d="M103 160V145C103 140 117 140 117 145V160" />
          </g>

          {/* Thiruvalluvar Statue & Ocean Waves */}
          <g className="text-red-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Pedestal */}
            <rect x="175" y="125" width="40" height="35" rx="2" className="fill-red-500/15" />
            {/* Standing Sage with Palm leaf manuscript */}
            <path d="M190 125V80C190 75 200 75 200 80V125" />
            <circle cx="195" cy="68" r="6" className="fill-red-400/30" />
            <path d="M200 90L212 95L210 105" /> {/* Raised hand in blessing */}
            {/* Ocean Waves */}
            <path d="M165 163C175 158 185 166 195 160C205 156 215 164 225 160" />
          </g>

          {/* Ravanan & Veena (Ravanahatha) Motif */}
          <g className="text-yellow-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Veena Body & Neck */}
            <circle cx="280" cy="140" r="16" className="fill-yellow-500/20" />
            <circle cx="340" cy="90" r="11" className="fill-yellow-500/20" />
            <path d="M280 140L350 75" strokeWidth="3" />
            {/* Veena Strings */}
            <line x1="272" y1="135" x2="345" y2="70" strokeWidth="1" strokeDasharray="3 2" />
            {/* Yarl / Ravanan Crown radiance symbol */}
            <path d="M305 60L310 45L315 58L325 42L330 60" />
            <circle cx="317" cy="35" r="3" className="fill-yellow-300" />
          </g>
        </svg>
      )

    case 'finnish':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Northern Lights / Aurora Borealis Wave */}
          <g className="text-emerald-400 stroke-current" strokeWidth="2" strokeLinecap="round">
            <path d="M30 40C90 20 150 70 210 40C270 10 330 60 380 30" className="opacity-60" />
            <path d="M20 55C80 35 140 85 200 55C260 25 320 75 390 45" className="opacity-90 stroke-cyan-400" />
            <path d="M35 70C95 50 155 100 215 70C275 40 335 90 375 60" className="opacity-40" />
          </g>

          {/* Helsinki Cathedral Dome */}
          <g className="text-blue-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="70" y="115" width="80" height="45" className="fill-blue-500/10" />
            {/* Central Dome */}
            <path d="M90 115C90 85 130 85 130 115" className="fill-emerald-500/20" />
            <line x1="110" y1="85" x2="110" y2="72" />
            <line x1="106" y1="76" x2="114" y2="76" />
            {/* Columns */}
            <line x1="85" y1="125" x2="85" y2="160" />
            <line x1="100" y1="125" x2="100" y2="160" />
            <line x1="120" y1="125" x2="120" y2="160" />
            <line x1="135" y1="125" x2="135" y2="160" />
          </g>

          {/* Sibelius Monument Steel Pipes */}
          <g className="text-sky-300 stroke-current" strokeWidth="2.5" strokeLinecap="round">
            <line x1="210" y1="160" x2="210" y2="90" />
            <line x1="218" y1="160" x2="218" y2="75" />
            <line x1="226" y1="160" x2="226" y2="65" />
            <line x1="234" y1="160" x2="234" y2="80" />
            <line x1="242" y1="160" x2="242" y2="70" />
            <line x1="250" y1="160" x2="250" y2="85" />
            <line x1="258" y1="160" x2="258" y2="100" />
            <path d="M205 135C225 125 245 145 265 135" strokeWidth="1.5" />
          </g>

          {/* Finnish Lion silhouette & Vaasa Pine */}
          <g className="text-yellow-400 stroke-current" strokeWidth="2" strokeLinecap="round">
            <path d="M310 160L325 130L340 160M315 140L335 140" />
            <path d="M325 125L325 110" />
            <path d="M345 160V110L360 125L350 135L365 145" />
          </g>
        </svg>
      )

    case 'swedish':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stockholm City Hall Tower with Tre Kronor */}
          <g className="text-amber-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="70" y="80" width="45" height="80" className="fill-amber-500/10" />
            <path d="M70 80L92.5 50L115 80" />
            {/* Spire */}
            <line x1="92.5" y1="50" x2="92.5" y2="30" strokeWidth="2.5" />
            {/* Three crowns */}
            <circle cx="88" cy="27" r="2.5" className="fill-yellow-300" />
            <circle cx="97" cy="27" r="2.5" className="fill-yellow-300" />
            <circle cx="92.5" cy="21" r="2.5" className="fill-yellow-300" />
          </g>

          {/* Dala Horse (Dalahäst) */}
          <g className="text-red-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M180 160V135L190 120H215L230 100H240L235 115L225 125V160" className="fill-red-500/20" />
            <path d="M205 130C205 140 215 140 215 130" className="text-amber-300 stroke-current" />
            <circle cx="230" cy="107" r="2" className="fill-white" />
          </g>

          {/* Viking Longship & Vasa Sail */}
          <g className="text-blue-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M270 145C290 160 340 160 365 135" strokeWidth="3" />
            <line x1="315" y1="145" x2="315" y2="70" strokeWidth="2.5" />
            {/* Striped Sail */}
            <rect x="295" y="80" width="40" height="40" rx="3" className="fill-blue-500/15" />
            <line x1="308" y1="80" x2="308" y2="120" />
            <line x1="322" y1="80" x2="322" y2="120" />
          </g>
        </svg>
      )

    case 'german':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Brandenburg Gate (Berlin) */}
          <g className="text-amber-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="50" y="75" width="130" height="15" className="fill-amber-500/15" />
            <line x1="60" y1="90" x2="60" y2="160" strokeWidth="3" />
            <line x1="80" y1="90" x2="80" y2="160" strokeWidth="3" />
            <line x1="100" y1="90" x2="100" y2="160" strokeWidth="3" />
            <line x1="130" y1="90" x2="130" y2="160" strokeWidth="3" />
            <line x1="150" y1="90" x2="150" y2="160" strokeWidth="3" />
            <line x1="170" y1="90" x2="170" y2="160" strokeWidth="3" />
            {/* Quadriga Chariot on top */}
            <path d="M100 75L115 50H125L130 75" />
            <circle cx="115" cy="46" r="3" className="fill-yellow-400" />
          </g>

          {/* Neuschwanstein Castle Turrets */}
          <g className="text-blue-300 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="230" y="90" width="35" height="70" className="fill-blue-500/15" />
            <path d="M230 90L247.5 45L265 90" />
            <rect x="275" y="70" width="45" height="90" className="fill-blue-500/15" />
            <path d="M275 70L297.5 30L320 70" />
            <rect x="330" y="100" width="30" height="60" className="fill-blue-500/15" />
            <path d="M330 100L345 60L360 100" />
          </g>
        </svg>
      )

    case 'spanish':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sagrada Família Spires */}
          <g className="text-amber-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M70 160L85 45L100 160" className="fill-amber-500/15" />
            <path d="M100 160L115 30L130 160" className="fill-amber-500/20" />
            <path d="M130 160L145 45L160 160" className="fill-amber-500/15" />
            {/* Cross on main tower */}
            <circle cx="115" cy="24" r="3" className="fill-amber-300" />
            <line x1="85" y1="70" x2="145" y2="70" strokeDasharray="2 2" />
          </g>

          {/* Alhambra Palace Moorish Arch */}
          <g className="text-red-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M220 160V100C220 75 250 65 265 80C280 65 310 75 310 100V160" className="fill-red-500/10" />
            <circle cx="265" cy="115" r="10" className="fill-red-500/20" />
            {/* Andalusian Sun */}
            <circle cx="340" cy="50" r="12" className="fill-yellow-400/30 text-yellow-400 stroke-current" />
            <path d="M340 32V25M340 68V75M322 50H315M358 50H365" className="text-yellow-400 stroke-current" />
          </g>
        </svg>
      )

    case 'french':
      return (
        <svg viewBox="0 0 400 180" className="w-full h-36 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Eiffel Tower (Paris) */}
          <g className="text-blue-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M80 160L115 35L150 160" className="fill-blue-500/10" />
            <path d="M92 160C92 140 138 140 138 160" strokeWidth="2.5" />
            <line x1="100" y1="120" x2="130" y2="120" strokeWidth="2.5" />
            <line x1="107" y1="80" x2="123" y2="80" strokeWidth="2" />
            <line x1="115" y1="35" x2="115" y2="20" strokeWidth="2.5" />
          </g>

          {/* Arc de Triomphe */}
          <g className="text-red-400 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="200" y="80" width="80" height="80" rx="3" className="fill-red-500/10" />
            <path d="M225 160V120C225 105 255 105 255 120V160" strokeWidth="2.5" />
            <line x1="200" y1="95" x2="280" y2="95" strokeWidth="2" />
          </g>

          {/* Louvre Glass Pyramid & Fleur-de-lis */}
          <g className="text-cyan-300 stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M310 160L350 90L390 160Z" className="fill-cyan-400/15" />
            <line x1="350" y1="90" x2="350" y2="160" />
            <line x1="330" y1="125" x2="370" y2="125" />
            {/* Fleur de lis emblem */}
            <circle cx="350" cy="65" r="4" className="fill-cyan-300" />
          </g>
        </svg>
      )

    default:
      return null
  }
}

export default function CulturalLandmarksModal() {
  const { showCelebration, setShowCelebration, celebrationLang } = useLanguage()
  const { isDark } = useTheme()

  const data = LANDMARK_DATA[celebrationLang] || LANDMARK_DATA.en

  return (
    <AnimatePresence>
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          {/* Backdrop dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCelebration(false)}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden z-10 font-mono ${
              isDark
                ? 'bg-gray-950/95 border-gray-800 text-white shadow-[0_0_50px_rgba(59,130,246,0.3)]'
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
            }`}
          >
            {/* Header Color Accent Stripe */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${data.themeColor}`}></div>

            {/* Modal Header */}
            <div className={`p-6 border-b flex items-start justify-between ${
              isDark ? 'border-gray-800/80 bg-gray-900/50' : 'border-slate-100 bg-slate-50/80'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl select-none">{data.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-500 font-bold uppercase tracking-widest">
                      {data.vectors.tag}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {data.nativeName}
                    </span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {data.title}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {data.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCelebration(false)}
                className={`p-2 rounded-lg transition-colors text-base ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-200'
                }`}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Landmark Vector Art Animation Area */}
            <div className={`relative px-6 pt-5 pb-3 overflow-hidden ${
              isDark ? 'bg-gray-900/40' : 'bg-slate-50'
            }`}>
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <LandmarkVectorArt type={data.vectors.type} />
              </motion.div>

              {/* Cultural Quote / Lore */}
              <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed text-center italic flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-gray-950/80 border-gray-800/80 text-gray-300' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <FaQuoteLeft className="text-blue-500 text-xs flex-shrink-0 opacity-70" />
                <span>{data.quote}</span>
              </div>
            </div>

            {/* Landmarks List Cards */}
            <div className="p-6 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                isDark ? 'text-gray-400' : 'text-slate-400'
              }`}>
                <FaLandmark className="text-blue-500" />
                <span>FEATURED LANDMARKS & HISTORIC SYMBOLS:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08 }}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-gray-900/60 border-gray-800/80 hover:border-blue-500/40 text-gray-200'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.badge}
                      </span>
                      <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                        {item.category}
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.name}
                    </h4>
                    <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`px-6 py-3.5 border-t flex items-center justify-between ${
              isDark ? 'border-gray-800/80 bg-gray-900/60' : 'border-slate-100 bg-slate-50'
            }`}>
              <span className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Portfolio language set to <strong className="text-blue-500 font-bold">{data.nativeName}</strong>
              </span>
              <button
                onClick={() => setShowCelebration(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md transition-all"
              >
                Explore Portfolio →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
