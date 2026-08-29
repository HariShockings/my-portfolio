import { motion } from 'framer-motion'
import { FaLaptopCode, FaBrain, FaGlobe } from 'react-icons/fa'

export default function WhyWorkWithMe() {
  const cards = [
    {
      title: "Full-Stack Foundation",
      subtitle: "20+ production builds",
      description: "Proven track record of shipping end-to-end applications across web, mobile, and e-commerce platforms for real clients.",
      icon: <FaLaptopCode className="text-3xl text-blue-400" />,
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      title: "Applied AI, Not Just Theory",
      subtitle: "2 self-trained models in production",
      description: "Trained and deployed models for CKD classification (KidneyCare) and CV disease detection (AquaCare). Not just studied in notebooks.",
      icon: <FaBrain className="text-3xl text-purple-400" />,
      color: "from-purple-500/20 to-purple-600/5"
    },
    {
      title: "Built for Remote Teams",
      subtitle: "Agile delivery across timezones",
      description: "Years of cross-timezone Agile delivery collaborating daily with UK, Sri Lankan, and international teams.",
      icon: <FaGlobe className="text-3xl text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-600/5"
    }
  ]

  return (
    <section id="why-work-with-me" className="py-20 bg-gray-950 text-white relative overflow-hidden border-t border-gray-900 font-mono">
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)] pointer-events-none" />

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

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
            SYS_MODULE: VALUE_PROPOSITION
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 uppercase tracking-widest"
          >
            {`> BUILT TO SHIP, TRAINED TO REASON`}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl text-left"
          >
            Most portfolios show you code. Mine shows you a track record: four years of shipping real products for real clients, now paired with the machine learning and data engineering training to build the systems behind them. I don't just implement — I ask what the data is actually telling you, and I don't stop at a prototype that works in a notebook.
          </motion.p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`bg-gray-900/50 backdrop-blur-md p-8 rounded-none border border-gray-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between h-full group relative`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="w-14 h-14 bg-gray-950 flex items-center justify-center border border-gray-800 mb-6 shadow-inner group-hover:border-blue-500/30 transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-gray-100 mb-1.5 uppercase tracking-wide">{card.title}</h3>
                <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-4">
                  {`> ${card.subtitle}`}
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
