import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { LANDMARK_DATA } from '../data/landmarks'

export default function HeroLandmarksBackground({ language = 'en', isDark = true, style }) {
  const data = LANDMARK_DATA[language] || LANDMARK_DATA.en

  // Scroll-linked smooth opacity: 10% (0.10) at initial scroll 0 -> 100% (1.00) when scrolled down, and vice-versa
  const { scrollY } = useScroll()

  // Transform scroll from 0px (initial) to 420px (scrolled down): 10% (0.10) to 100% (1.00)
  const rawOpacity = useTransform(scrollY, [0, 420], [0.10, 1.00])

  // Spring physics for buttery-smooth fluid transitions both when scrolling down and scrolling up
  const landmarkOpacity = useSpring(rawOpacity, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  })

  // Subtle dynamic elevation parallax as landmarks emerge into full vibrancy
  const rawY = useTransform(scrollY, [0, 420], [20, 0])
  const landmarkY = useSpring(rawY, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  })

  // Subtle atmospheric depth scale (0.97 to 1.0)
  const rawScale = useTransform(scrollY, [0, 420], [0.97, 1.0])
  const landmarkScale = useSpring(rawScale, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        opacity: landmarkOpacity,
        y: landmarkY,
        scale: landmarkScale,
        ...style,
      }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none will-change-transform"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-full relative"
        >
          {/* Ambient Scenic Glow */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-t ${data.themeColor}`}
          />

          {/* SVG Landmarks Layer - Positioned Across Horizon */}
          <div className="absolute inset-x-0 bottom-4 sm:bottom-8 max-w-6xl mx-auto px-4 flex flex-col items-center justify-end h-72 sm:h-80">
            {language === 'en' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* London - Big Ben & Bridge */}
                <motion.g
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className={isDark ? "stroke-cyan-400 text-cyan-400" : "stroke-blue-600 text-blue-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Big Ben Spire & Clock */}
                  <path d="M120 300V120L150 45L180 120V300" className={isDark ? "fill-cyan-500/5" : "fill-blue-500/5"} />
                  <line x1="135" y1="130" x2="165" y2="130" />
                  <circle cx="150" cy="155" r="14" className={isDark ? "fill-cyan-400/20" : "fill-blue-400/20"} strokeWidth="2" />
                  {/* Clock hands with subtle motion */}
                  <line x1="150" y1="147" x2="150" y2="155" strokeWidth="2.5" />
                  <line x1="150" y1="155" x2="157" y2="155" strokeWidth="2" />
                  {/* Roof Spire Finial */}
                  <line x1="150" y1="45" x2="150" y2="25" strokeWidth="3" />
                  <circle cx="150" cy="22" r="3" className="fill-current" />
                  {/* Tower Bridge arches */}
                  <path d="M180 230H270" strokeWidth="3" />
                  <path d="M225 230V300" strokeWidth="2" />
                  <path d="M190 230C190 280 260 280 260 230" strokeWidth="2" />
                  {/* Suspension cables */}
                  <path d="M180 160L225 230L270 160" strokeDasharray="3 3" opacity="0.6" />
                </motion.g>

                {/* USA - Statue of Liberty */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7, delay: 0.5, ease: "easeInOut" }}
                  className={isDark ? "stroke-blue-400 text-blue-400" : "stroke-indigo-600 text-indigo-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Pedestal */}
                  <rect x="470" y="220" width="60" height="80" rx="3" className={isDark ? "fill-blue-500/5" : "fill-indigo-500/5"} />
                  <line x1="460" y1="220" x2="540" y2="220" strokeWidth="3" />
                  {/* Statue Body */}
                  <path d="M490 220V120L480 100H510L520 120V220" />
                  {/* Head & 7-Spike Crown */}
                  <circle cx="495" cy="85" r="9" className={isDark ? "fill-blue-400/20" : "fill-indigo-400/20"} />
                  <path d="M485 80L478 70M490 77L488 66M495 76L495 64M500 77L503 66M505 80L512 70" strokeWidth="2" />
                  {/* Torch Arm & Glowing Flame */}
                  <path d="M515 125L535 75L530 65" strokeWidth="3" />
                  <motion.circle
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    cx="535"
                    cy="55"
                    r="8"
                    className="fill-amber-400 stroke-yellow-300"
                  />
                  <path d="M535 45L535 35" strokeWidth="2" stroke="gold" />
                </motion.g>

                {/* Australia - Sydney Opera House */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 8, delay: 1, ease: "easeInOut" }}
                  className={isDark ? "stroke-sky-300 text-sky-300" : "stroke-sky-600 text-sky-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Monumental Shells */}
                  <path d="M720 300C720 190 790 140 820 300" className={isDark ? "fill-sky-400/10" : "fill-sky-500/10"} />
                  <path d="M780 300C780 160 860 110 900 300" className={isDark ? "fill-sky-400/15" : "fill-sky-500/15"} strokeWidth="3" />
                  <path d="M860 300C860 210 920 180 960 300" className={isDark ? "fill-sky-400/10" : "fill-sky-500/10"} />
                  {/* Podium baseline */}
                  <line x1="680" y1="300" x2="990" y2="300" strokeWidth="4" />
                  {/* Harbor reflections */}
                  <path d="M700 310H980" strokeDasharray="6 4" opacity="0.4" />
                </motion.g>
              </svg>
            )}

            {language === 'ta' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Thanjavur Brihadisvara Temple Big Gopuram */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className={isDark ? "stroke-amber-400 text-amber-400" : "stroke-amber-600 text-amber-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Base Plinth */}
                  <path d="M90 300H250L240 240H100L90 300Z" className={isDark ? "fill-amber-500/10" : "fill-amber-500/5"} strokeWidth="3" />
                  {/* Tier 1 */}
                  <path d="M102 240H238L230 185H110L102 240Z" className={isDark ? "fill-amber-500/15" : "fill-amber-500/10"} />
                  {/* Tier 2 */}
                  <path d="M112 185H228L220 135H120L112 185Z" className={isDark ? "fill-amber-500/20" : "fill-amber-500/15"} />
                  {/* Tier 3 (Vimana Spire) */}
                  <path d="M122 135H218L210 90H130L122 135Z" />
                  {/* Vimana Dome */}
                  <path d="M130 90C130 50 210 50 210 90" strokeWidth="3" className="fill-yellow-400/20" />
                  {/* Golden Kalasams */}
                  <motion.circle
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    cx="170"
                    cy="38"
                    r="5"
                    className="fill-yellow-300 stroke-yellow-400"
                  />
                  <circle cx="155" cy="42" r="3.5" className="fill-amber-300" />
                  <circle cx="185" cy="42" r="3.5" className="fill-amber-300" />
                  {/* Sanctum Portal */}
                  <path d="M150 300V260C150 250 190 250 190 260V300" strokeWidth="2.5" />
                </motion.g>

                {/* Thiruvalluvar Statue & Kanyakumari Waves */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7, delay: 0.6, ease: "easeInOut" }}
                  className={isDark ? "stroke-red-400 text-red-400" : "stroke-red-600 text-red-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* 38ft Rock Pedestal (Aram section) */}
                  <rect x="470" y="210" width="70" height="90" rx="3" className={isDark ? "fill-red-500/10" : "fill-red-500/5"} strokeWidth="3" />
                  <line x1="455" y1="210" x2="555" y2="210" strokeWidth="3.5" />
                  {/* 95ft Standing Sage Statue */}
                  <path d="M495 210V105C495 95 515 95 515 105V210" strokeWidth="3" />
                  {/* Face & Sage Jata */}
                  <circle cx="505" cy="85" r="10" className={isDark ? "fill-red-400/20" : "fill-red-400/10"} />
                  {/* Right Hand raised showing Aram / Virtue */}
                  <path d="M515 125L532 110L530 95" strokeWidth="2.5" />
                  {/* Left hand holding palm manuscript */}
                  <path d="M495 135L480 145" strokeWidth="2.5" />
                  {/* Kanyakumari Ocean Waves */}
                  <motion.path
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    d="M420 305C450 295 480 315 510 305C540 295 570 315 600 305"
                    strokeWidth="3"
                    className="stroke-cyan-400"
                  />
                </motion.g>

                {/* King Ravanan & Celestial Veena (Ravanahatha) Motif */}
                <motion.g
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 8, delay: 1.2, ease: "easeInOut" }}
                  className={isDark ? "stroke-yellow-400 text-yellow-400" : "stroke-yellow-600 text-yellow-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Veena Resonator Gourd */}
                  <circle cx="800" cy="240" r="32" className={isDark ? "fill-yellow-500/15" : "fill-yellow-500/10"} strokeWidth="3" />
                  <circle cx="910" cy="140" r="22" className={isDark ? "fill-yellow-500/15" : "fill-yellow-500/10"} strokeWidth="2.5" />
                  {/* Long Veena Dandi / Neck */}
                  <line x1="800" y1="240" x2="940" y2="110" strokeWidth="5" />
                  {/* Strings with vibration pulse */}
                  <motion.line
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    x1="785"
                    y1="230"
                    x2="930"
                    y2="105"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  {/* Yarl / Ravanan Crown Radiance Spikes */}
                  <path d="M850 85L860 60L870 82L885 55L895 85" strokeWidth="2.5" />
                  <circle cx="872" cy="45" r="5" className="fill-yellow-300 stroke-yellow-400" />
                </motion.g>
              </svg>
            )}

            {language === 'fi' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dancing Northern Lights (Aurora Borealis) across top sky */}
                <motion.g
                  animate={{ x: [-20, 20, -20], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  strokeLinecap="round"
                >
                  <path d="M40 70C180 20 320 110 480 60C640 10 800 90 960 40" stroke="#34d399" strokeWidth="4" className="opacity-75 blur-[1px]" />
                  <path d="M60 90C200 40 340 130 500 80C660 30 820 110 940 60" stroke="#22d3ee" strokeWidth="3" className="opacity-90 blur-[0.5px]" />
                  <path d="M30 110C170 60 310 150 470 100C630 50 790 130 970 80" stroke="#818cf8" strokeWidth="2" className="opacity-50" />
                </motion.g>

                {/* Helsinki Cathedral Grand Dome & Colonnade */}
                <motion.g
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className={isDark ? "stroke-blue-400 text-blue-400" : "stroke-blue-600 text-blue-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Cathedral Base */}
                  <rect x="110" y="210" width="160" height="90" className={isDark ? "fill-blue-500/10" : "fill-blue-500/5"} />
                  {/* Grand Dome */}
                  <path d="M150 210C150 130 230 130 230 210" strokeWidth="3.5" className={isDark ? "fill-emerald-400/15" : "fill-emerald-400/10"} />
                  {/* Dome Cross */}
                  <line x1="190" y1="130" x2="190" y2="100" strokeWidth="3" />
                  <line x1="182" y1="110" x2="198" y2="110" strokeWidth="3" />
                  {/* Classical Columns */}
                  <line x1="135" y1="230" x2="135" y2="300" strokeWidth="3" />
                  <line x1="165" y1="230" x2="165" y2="300" strokeWidth="3" />
                  <line x1="215" y1="230" x2="215" y2="300" strokeWidth="3" />
                  <line x1="245" y1="230" x2="245" y2="300" strokeWidth="3" />
                </motion.g>

                {/* Sibelius Monument Steel Organ Pipes */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 6, delay: 0.4, ease: "easeInOut" }}
                  className={isDark ? "stroke-sky-300 text-sky-300" : "stroke-sky-600 text-sky-600"}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                >
                  <line x1="490" y1="300" x2="490" y2="150" />
                  <line x1="505" y1="300" x2="505" y2="120" strokeWidth="4" />
                  <line x1="520" y1="300" x2="520" y2="100" strokeWidth="4.5" />
                  <line x1="535" y1="300" x2="535" y2="130" strokeWidth="4" />
                  <line x1="550" y1="300" x2="550" y2="110" strokeWidth="4.5" />
                  <line x1="565" y1="300" x2="565" y2="140" strokeWidth="4" />
                  <line x1="580" y1="300" x2="580" y2="170" />
                  {/* Organic wave tie-line */}
                  <path d="M480 230C520 210 550 250 590 230" strokeWidth="2" strokeDasharray="3 3" />
                </motion.g>

                {/* Vaasa Archipelago & Finnish Lion */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 8, delay: 1, ease: "easeInOut" }}
                  className={isDark ? "stroke-yellow-400 text-yellow-400" : "stroke-yellow-600 text-yellow-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  {/* Nordic Pine trees */}
                  <path d="M780 300L800 230L820 300M790 260L810 260" strokeWidth="3" />
                  <path d="M830 300L855 210L880 300M840 250L870 250" strokeWidth="3" />
                  {/* Finnish Heraldic Lion Silhouette */}
                  <path d="M890 300V220L915 240L905 255L925 270" strokeWidth="3" />
                  <circle cx="905" cy="210" r="7" className="fill-yellow-400" />
                </motion.g>
              </svg>
            )}

            {language === 'sv' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stockholm City Hall Tower with Tre Kronor */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className={isDark ? "stroke-amber-400 text-amber-400" : "stroke-amber-600 text-amber-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="130" y="140" width="70" height="160" rx="2" className={isDark ? "fill-amber-500/10" : "fill-amber-500/5"} strokeWidth="3" />
                  <path d="M130 140L165 80L200 140" strokeWidth="3" />
                  <line x1="165" y1="80" x2="165" y2="40" strokeWidth="3" />
                  {/* Tre Kronor (Three Golden Crowns) */}
                  <circle cx="158" cy="35" r="4" className="fill-yellow-300 stroke-yellow-400" />
                  <circle cx="172" cy="35" r="4" className="fill-yellow-300 stroke-yellow-400" />
                  <circle cx="165" cy="25" r="4" className="fill-yellow-300 stroke-yellow-400" />
                </motion.g>

                {/* Hand-carved Dala Horse (Dalahäst) */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7, delay: 0.5, ease: "easeInOut" }}
                  className={isDark ? "stroke-red-400 text-red-400" : "stroke-red-600 text-red-600"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M470 300V240L490 210H535L560 170H580L570 200L550 220V300" className={isDark ? "fill-red-500/15" : "fill-red-500/10"} />
                  {/* Saddle floral kurbits motif */}
                  <path d="M515 225C515 245 535 245 535 225" stroke="#facc15" strokeWidth="2.5" />
                  <circle cx="560" cy="182" r="3" className="fill-white" />
                </motion.g>

                {/* Viking Longship & Vasa Maritime Sail */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 8, delay: 1, ease: "easeInOut" }}
                  className={isDark ? "stroke-blue-400 text-blue-400" : "stroke-blue-600 text-blue-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M740 270C780 300 880 300 930 250" strokeWidth="4" />
                  <line x1="835" y1="270" x2="835" y2="120" strokeWidth="3.5" />
                  {/* Square Cross Sail */}
                  <rect x="795" y="140" width="80" height="80" rx="4" className={isDark ? "fill-blue-500/15" : "fill-blue-500/10"} strokeWidth="3" />
                  <line x1="820" y1="140" x2="820" y2="220" strokeWidth="2" />
                  <line x1="850" y1="140" x2="850" y2="220" strokeWidth="2" />
                </motion.g>
              </svg>
            )}

            {language === 'de' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Brandenburg Gate with Quadriga (Berlin) */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className={isDark ? "stroke-amber-400 text-amber-400" : "stroke-amber-600 text-amber-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="140" y="140" width="220" height="25" className={isDark ? "fill-amber-500/15" : "fill-amber-500/5"} strokeWidth="3" />
                  <line x1="160" y1="165" x2="160" y2="300" strokeWidth="4" />
                  <line x1="190" y1="165" x2="190" y2="300" strokeWidth="4" />
                  <line x1="220" y1="165" x2="220" y2="300" strokeWidth="4" />
                  <line x1="280" y1="165" x2="280" y2="300" strokeWidth="4" />
                  <line x1="310" y1="165" x2="310" y2="300" strokeWidth="4" />
                  <line x1="340" y1="165" x2="340" y2="300" strokeWidth="4" />
                  {/* Quadriga Chariot */}
                  <path d="M230 140L250 95H270L280 140" strokeWidth="3" />
                  <circle cx="250" cy="85" r="5" className="fill-yellow-400" />
                </motion.g>

                {/* Neuschwanstein Fairy-Tale Castle Turrets */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 8, delay: 0.6, ease: "easeInOut" }}
                  className={isDark ? "stroke-blue-300 text-blue-300" : "stroke-blue-600 text-blue-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="680" y="170" width="60" height="130" className={isDark ? "fill-blue-500/15" : "fill-blue-500/5"} />
                  <path d="M680 170L710 90L740 170" strokeWidth="3" />
                  <rect x="760" y="130" width="75" height="170" className={isDark ? "fill-blue-500/20" : "fill-blue-500/10"} strokeWidth="3" />
                  <path d="M760 130L797.5 50L835 130" strokeWidth="3" />
                  <rect x="850" y="190" width="55" height="110" className={isDark ? "fill-blue-500/15" : "fill-blue-500/5"} />
                  <path d="M850 190L877.5 120L905 190" strokeWidth="3" />
                </motion.g>
              </svg>
            )}

            {language === 'es' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Sagrada Família Soaring Spires */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className={isDark ? "stroke-amber-400 text-amber-400" : "stroke-amber-600 text-amber-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M120 300L150 90L180 300" className={isDark ? "fill-amber-500/15" : "fill-amber-500/5"} strokeWidth="3" />
                  <path d="M180 300L215 50L250 300" className={isDark ? "fill-amber-500/20" : "fill-amber-500/10"} strokeWidth="3.5" />
                  <path d="M250 300L280 90L310 300" className={isDark ? "fill-amber-500/15" : "fill-amber-500/5"} strokeWidth="3" />
                  {/* Gaudí Cross Finial */}
                  <circle cx="215" cy="40" r="5" className="fill-amber-300 stroke-yellow-400" />
                  <line x1="150" y1="140" x2="280" y2="140" strokeDasharray="3 3" opacity="0.6" />
                </motion.g>

                {/* Alhambra Moorish Palace Arches & Andalusian Sun */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7, delay: 0.5, ease: "easeInOut" }}
                  className={isDark ? "stroke-red-400 text-red-400" : "stroke-red-600 text-red-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Horseshoe Arch */}
                  <path d="M680 300V180C680 130 740 110 770 140C800 110 860 130 860 180V300" className={isDark ? "fill-red-500/10" : "fill-red-500/5"} strokeWidth="3" />
                  <circle cx="770" cy="200" r="16" className={isDark ? "fill-red-500/20" : "fill-red-500/10"} />
                  {/* Radiant Andalusian Sun */}
                  <motion.circle
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    cx="910"
                    cy="90"
                    r="22"
                    className="fill-yellow-400/30 stroke-yellow-400"
                    strokeWidth="3"
                  />
                  <line x1="910" y1="55" x2="910" y2="40" stroke="#facc15" strokeWidth="2.5" />
                  <line x1="910" y1="125" x2="910" y2="140" stroke="#facc15" strokeWidth="2.5" />
                  <line x1="875" y1="90" x2="860" y2="90" stroke="#facc15" strokeWidth="2.5" />
                  <line x1="945" y1="90" x2="960" y2="90" stroke="#facc15" strokeWidth="2.5" />
                </motion.g>
              </svg>
            )}

            {language === 'fr' && (
              <svg viewBox="0 0 1000 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Eiffel Tower (Paris) */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className={isDark ? "stroke-blue-400 text-blue-400" : "stroke-blue-600 text-blue-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M120 300L185 60L250 300" className={isDark ? "fill-blue-500/10" : "fill-blue-500/5"} strokeWidth="3.5" />
                  <path d="M142 300C142 255 228 255 228 300" strokeWidth="4" />
                  {/* Observation Decks */}
                  <line x1="155" y1="220" x2="215" y2="220" strokeWidth="4" />
                  <line x1="170" y1="140" x2="200" y2="140" strokeWidth="3" />
                  {/* Summit Spire with Rotating Light Beacon */}
                  <line x1="185" y1="60" x2="185" y2="25" strokeWidth="3.5" />
                  <motion.circle
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    cx="185"
                    cy="22"
                    r="4"
                    className="fill-yellow-300 stroke-cyan-300"
                  />
                </motion.g>

                {/* Arc de Triomphe */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7, delay: 0.5, ease: "easeInOut" }}
                  className={isDark ? "stroke-red-400 text-red-400" : "stroke-red-600 text-red-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="460" y="150" width="130" height="150" rx="4" className={isDark ? "fill-red-500/10" : "fill-red-500/5"} strokeWidth="3.5" />
                  <path d="M500 300V220C500 195 550 195 550 220V300" strokeWidth="4" />
                  <line x1="460" y1="180" x2="590" y2="180" strokeWidth="3" />
                </motion.g>

                {/* Louvre Glass Pyramid & Fleur-de-lis */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 8, delay: 1, ease: "easeInOut" }}
                  className={isDark ? "stroke-cyan-300 text-cyan-300" : "stroke-cyan-600 text-cyan-600"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Diamond facet pyramid */}
                  <path d="M780 300L850 170L920 300Z" className={isDark ? "fill-cyan-400/15" : "fill-cyan-400/10"} strokeWidth="3.5" />
                  <line x1="850" y1="170" x2="850" y2="300" strokeWidth="2.5" />
                  <line x1="815" y1="235" x2="885" y2="235" strokeWidth="2" />
                  {/* Fleur de lis royal symbol */}
                  <circle cx="850" cy="125" r="7" className="fill-cyan-300 stroke-cyan-400" />
                  <path d="M840 145L850 120L860 145" strokeWidth="2.5" />
                </motion.g>
              </svg>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
