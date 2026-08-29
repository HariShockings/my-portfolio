import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa'

export default function WhatILookFor() {
  const targets = [
    {
      title: "AI & Data Engineering Internships",
      subtitle: "Target 01 — Core Pipeline Focus",
      icon: <FaBriefcase className="text-blue-400 text-2xl" />,
      description: "Hands-on with the full pipeline: cleaning data, training models, and deploying them where they're actually used. Looking for a team building real ML systems, not just prototypes.",
      border: "border-blue-500/20 hover:border-blue-400/50"
    },
    {
      title: "Thesis Collaborations",
      subtitle: "Target 02 — Applied AI Research",
      icon: <FaBookOpen className="text-purple-400 text-2xl" />,
      description: "Open to paid MSc thesis projects in applied AI, data engineering, or industrial ML — with universities or companies solving real operational problems.",
      border: "border-purple-500/20 hover:border-purple-400/50"
    },
    {
      title: "Software Engineering Roles",
      subtitle: "Target 03 — End-to-End Delivery",
      icon: <FaGraduationCap className="text-emerald-400 text-2xl" />,
      description: "4+ years shipping production code across React, Node.js, PHP, and Python. Comfortable owning a feature end-to-end, from requirements to deployment.",
      border: "border-emerald-500/20 hover:border-emerald-400/50"
    }
  ]

  return (
    <section id="looking-for" className="py-20 bg-gray-900 text-white relative overflow-hidden border-t border-gray-850">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0.95)_0%,rgba(17,24,39,0.99)_100%)] z-0" />

      {/* Grid overlay for technical theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Astronlox & Project Availability Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest font-mono">
              // Target & Opportunities
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-500 bg-clip-text text-transparent uppercase tracking-tight leading-none">
              What I am Looking For
            </h2>
            
            <p className="text-base text-gray-350 leading-relaxed font-medium">
              I am actively seeking collaborations and opportunities that leverage my practical engineering foundation and current AI studies. <span className="text-blue-300 font-semibold">I am open to any projects in the software, data, and AI industries.</span>
            </p>

            {/* Astronlox Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-gray-950/75 backdrop-blur-md p-6 rounded-2xl border border-gray-800 hover:border-blue-500/40 transition-all duration-300 shadow-xl"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  FOUNDER
                </span>
                <span className="text-xs text-gray-400 font-bold">📍 Sri Lanka</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Astronlox</h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed font-medium">
                Build Scalable Software & AI with Astronlox. We design and launch high-performance digital products that drive growth and engineering excellence.
              </p>
              <a 
                href="https://astronlox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors duration-300"
              >
                Visit astronlox.com <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3 Targets cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {targets.map((target, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-gray-950/60 backdrop-blur-md p-5 rounded-xl border ${target.border} transition-all duration-300 flex items-start gap-4`}
                >
                  <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 shadow-inner flex-shrink-0">
                    {target.icon}
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">
                      {target.subtitle}
                    </span>
                    <h3 className="text-lg font-extrabold text-white mb-1.5 leading-snug">
                      {target.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
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
