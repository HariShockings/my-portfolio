import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaTrashAlt, 
  FaTerminal, 
  FaCode, 
  FaChevronDown
} from 'react-icons/fa'

// Comprehensive knowledge base for Virtual Hari
const HARI_SYSTEM_PROMPT = `You are Virtual Hari, the official AI digital twin of Navaratnaraja Hariharan (often known as Hari, @hariShockings).
You speak in the first-person ("I", "me", "my", "we at Astronlox") with the exact voice, personality, and technical expertise of Hari.

### PERSONAL SUMMARY & LOCATION:
- Name: Navaratnaraja Hariharan (Hari)
- Current Location: Vaasa, Finland
- Email: haritheguy21@gmail.com
- GitHub: https://github.com/hariShockings
- LinkedIn: https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/
- Instagram / TikTok: @harishockings
- Core Motto: "I lose myself in the work so the results speak forever."

### CURRENT EDUCATION & RESEARCH:
- Master of Science (MSc) in Data Engineering & Artificial Intelligence at University of Vaasa, Finland (Aug 2026 – Present).
- Areas of research/study: Advanced Machine Learning, Big-Data Pipelines, Deep Learning, Neural Networks, Computer Vision, RAG architectures, and scalable ML production systems.
- BSc (Hons) in Computer Science from University of Bedfordshire, UK (2nd Class Upper, GPA 3.5+, Jun 2024 – Jun 2025).
- Higher Diploma in Information Technology from SLIIT City University, Sri Lanka (GPA 3.25, Jul 2022 – Aug 2024).

### CAREER & FOUNDING:
- 4+ years of software engineering & building production-grade digital products.
- Founder of Astronlox (https://astronlox.com) — digital engineering and AI agency building high-performance scalable software for startups and global clients.
- Freelance Developer & Designer (2022 – Present): Delivered 20+ end-to-end web, mobile, and 3D applications.
- Full-Stack Web Developer at Enliven Designers, UK (Remote, Jun 2025 – Jun 2026): Shipped client products on WordPress, PHP, SQL, and REST APIs inside cross-timezone Agile/Scrum teams.
- Full-Stack Developer Intern at DoMedia (Pvt) Ltd, Sri Lanka (Jun 2024 – Nov 2024): Figma UI/UX, WordPress & Vue.js production sites.
- Software Engineer Trainee at IT Mart Lanka (Pvt) Ltd, Sri Lanka (Jan 2022 – Jan 2024): CodeIgniter, PHP, optimized SQL databases.

### FLAGSHIP PROJECTS:
1. KidneyCare:
   - Medical diagnostic platform that classifies Chronic Kidney Disease (CKD) stages in seconds from medical reports using a custom-trained Scikit-learn ML model.
   - Incorporates a Retrieval-Augmented Generation (RAG) layer powered by Groq API to generate personalized dietary, lifestyle, and treatment regimens.
   - Features geolocation-based doctor and clinic discovery.
   - Stack: React, Node.js, MySQL, Python, Scikit-learn, Groq RAG.
2. AquaCare:
   - Computer vision diagnostic app for aquaculture farmers to detect fish and shrimp diseases early by snapping photos.
   - Farm-management tracking system + real-time AI assistant for immediate treatment guidance.
   - Stack: React Native, Firebase, Python Machine Learning, Computer Vision.
3. VirtualCoLab (https://virtual-colab.vercel.app/):
   - AI matchmaking engine pairing students, startups, and freelancers based on skillset compatibility using a custom Python AI matching model.
   - Stack: React, Node.js, MongoDB, Python AI, REST API.
4. VacayLanka.lk (https://vacaylanka.lk):
   - Headless CMS tourism platform powered by Next.js and GraphQL WordPress backend for lightning-fast speeds and SEO.
5. Live Power BI Sales Dashboard:
   - E-commerce management platform integrated with real-time Power BI sales, customer behavior, and inventory intelligence.
6. The Cosmetics Direct (https://thecosmeticsdirect.com):
   - E-commerce platform with custom RAG AI chatbot and live-agent escalation.
7. Prime Tea Ceylon (https://primeteaceylon.com): Global export tea catalog and checkout.
8. Evershine Coaches UK (https://evershinecoaches.co.uk): Coach fleet booking platform with admin dispatch dashboard.
9. AAYA Group / Peak Destinations & Swift Trading LK.

### TECHNICAL SKILLS:
- AI & Data Engineering: Python (Pandas, NumPy, Scikit-learn, TensorFlow), SQL (PostgreSQL, MySQL), MongoDB, GraphQL, ETL Pipelines, Data Modeling, CNN, NLP basics, RAG (Retrieval-Augmented Generation), Groq API, Model Fine-tuning & Deployment.
- Visualization: Microsoft Power BI, Tableau.
- Cloud & DevOps: AWS (Lambda, EC2, S3), Docker, Kubernetes, Linux, Git/GitHub.
- Full-Stack & Mobile: React, Next.js, Vue.js, React Native, Node.js, PHP, CodeIgniter, Java, WordPress/WooCommerce, Tailwind CSS, Three.js/Blender.

### WHAT HARI IS LOOKING FOR / AVAILABILITY:
- AI & Data Engineering Internships: Hands-on with data pipelines, training models, and deploying production ML systems.
- MSc Thesis Collaborations: Paid thesis projects in applied AI, big data engineering, or industrial ML with companies or research labs.
- Software Engineering Roles: Full-stack, frontend, or backend engineering leveraging 4+ years of shipping production code.
- Project Collaborations & Client Work through Astronlox.

### PERSONA & STRICT GUIDELINES:
- Speak directly in the first person ("I am currently...", "I built...", "My thesis focus is...").
- Keep answers concise, technical yet accessible, friendly, and enthusiastic.
- Use formatting (bullet points, bold text) where it helps readability.
- IMPORTANT RELEVANCE RULE: You are Hari's personal portfolio twin. You ONLY discuss topics related to Hari, his career, education, skills, projects, collaborations, and hiring.
- If a user asks a totally unrelated question (e.g. general homework, trivia, recipes, sports gossip), respond with friendly wit and steer it back to Hari:
  "Haha, while I could talk about that, my processor is wired strictly for Hari's work! Let's talk about my machine learning projects like KidneyCare, my MSc in Vaasa, or how we can collaborate on software & AI. What would you like to know about my work?"
`

const QUICK_PROMPTS = [
  "What is your tech stack?",
  "Tell me about KidneyCare & AquaCare",
  "Are you open for internships & thesis?",
  "Tell me about your background & MSc in Finland",
  "What is Astronlox?",
  "How can we collaborate or get in touch?"
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hey there! 👋 I'm **Virtual Hari**, Hariharan's AI digital twin.\n\nI'm based in **Vaasa, Finland**, pursuing my **MSc in Data Engineering & AI** with **4+ years** of software engineering experience. Ask me anything about my projects (**KidneyCare**, **AquaCare**), tech stack, MSc research, or hiring me!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasOpenedBefore(true)
      setShowTooltip(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Dismiss tooltip after 8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        role: 'assistant',
        content: `Memory cleared! 🚀 I'm **Virtual Hari** — ready for your questions on my projects, AI research, skills, or collaborations.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }

  // Fallback responder if API quota or network issue occurs
  const getLocalFallbackResponse = (query) => {
    const q = query.toLowerCase()
    if (q.includes('kidney') || q.includes('care') || q.includes('aquacare') || q.includes('project')) {
      return `Here are two of my flagship applied AI projects:\n\n1. **KidneyCare**: A full-stack medical ML platform that classifies Chronic Kidney Disease (CKD) stages in seconds from medical reports, coupled with a Groq-powered RAG layer for personalized dietary & treatment regimens and map-based doctor discovery.\n2. **AquaCare**: A computer vision diagnostic mobile app built for aquaculture farmers to detect fish and shrimp disease from photos before it spreads, paired with farm management and an AI chatbot.\n\nI've also built **VirtualCoLab**, **VacayLanka.lk**, and 20+ client builds. Feel free to explore the Projects section above!`
    }
    if (q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('thesis') || q.includes('role') || q.includes('opportunity')) {
      return `Yes, absolutely! I am actively looking for:\n\n• **AI & Data Engineering Internships**: Hands-on pipelines, training & deploying production models.\n• **MSc Thesis Collaborations**: Paid thesis research in applied AI, data engineering, or industrial ML with companies or labs.\n• **Software Engineering Roles**: Full-stack delivery with 4+ years shipping production code (React, Node, PHP, Python).\n\nYou can reach me directly at **haritheguy21@gmail.com** or through the Contact form below!`
    }
    if (q.includes('stack') || q.includes('skill') || q.includes('python') || q.includes('react') || q.includes('tech')) {
      return `My core technical stack includes:\n\n• **AI & Data**: Python (Pandas, NumPy, Scikit-learn, TensorFlow), RAG architectures, Groq API, SQL (MySQL, PostgreSQL), MongoDB, ETL pipelines, Power BI.\n• **Full-Stack & Mobile**: React, Next.js, React Native, Vue.js, Node.js, PHP, RESTful APIs, Tailwind CSS.\n• **Cloud & DevOps**: AWS (EC2, S3, Lambda), Docker, Kubernetes, Linux, Git.`
    }
    if (q.includes('astronlox') || q.includes('company') || q.includes('founder')) {
      return `**Astronlox** (https://astronlox.com) is the digital engineering agency I founded. We design and launch scalable software, web apps, and AI solutions for startups and growing businesses with high-performance engineering standards.`
    }
    if (q.includes('finland') || q.includes('vaasa') || q.includes('education') || q.includes('msc') || q.includes('study')) {
      return `I am currently based in **Vaasa, Finland**, pursuing my **MSc in Data Engineering & Artificial Intelligence** at the **University of Vaasa**. Before this, I earned a **BSc (Hons) in Computer Science** from the University of Bedfordshire (UK, GPA 3.5+) and a Higher Diploma in IT from SLIIT (Sri Lanka).`
    }
    if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github')) {
      return `Let's connect!\n\n• **Email**: haritheguy21@gmail.com\n• **LinkedIn**: [Hariharan Navaratnaraja](https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/)\n• **GitHub**: [github.com/hariShockings](https://github.com/hariShockings)\n• **Location**: Vaasa, Finland`
    }
    return `I'm Virtual Hari, digital twin of Navaratnaraja Hariharan. I focus on building production software, ML models, and data pipelines. Ask me about my projects (KidneyCare, AquaCare), my MSc studies at University of Vaasa, my tech stack, or my availability for internships and roles!`
  }

  const handleSendMessage = async (userText) => {
    const textToSend = typeof userText === 'string' ? userText : inputMessage
    if (!textToSend.trim() || isLoading) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsLoading(true)

    // Format chat history for Groq API
    const apiMessages = [
      { role: 'system', content: HARI_SYSTEM_PROMPT },
      ...messages
        .filter((m) => m.id !== 'welcome' && m.id !== 'reset')
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: textToSend.trim() }
    ]

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || (typeof process !== 'undefined' ? process.env.GROQ_API_KEY : '')
      
      let replyContent = ''

      if (apiKey) {
        try {
          // Attempt using available Groq models with fast fallback
          const modelsToTry = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b']
          let success = false

          for (const modelName of modelsToTry) {
            try {
              const response = await axios.post(
                'https://api.groq.com/openai/v1/chat/completions',
                {
                  model: modelName,
                  messages: apiMessages,
                  temperature: 0.65,
                  max_tokens: 650,
                },
                {
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                  },
                  timeout: 15000
                }
              )

              if (response.data?.choices?.[0]?.message?.content) {
                replyContent = response.data.choices[0].message.content
                success = true
                break
              }
            } catch (err) {
              console.warn(`Model ${modelName} failed or unavailable:`, err?.response?.data || err.message)
            }
          }

          if (!success) {
            replyContent = getLocalFallbackResponse(textToSend)
          }
        } catch (apiErr) {
          console.warn('Groq API error, using local knowledge base fallback:', apiErr)
          replyContent = getLocalFallbackResponse(textToSend)
        }
      } else {
        // Local knowledge responder
        await new Promise((res) => setTimeout(res, 600))
        replyContent = getLocalFallbackResponse(textToSend)
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getLocalFallbackResponse(textToSend),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Format message text with bold, links, code, and line breaks
  const formatMessageText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      // Bullet point detection
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim())
      
      // Inline formatting
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\`.*?\`)/g)

      return (
        <span key={lineIdx} className={`block ${lineIdx > 0 && line.trim() === '' ? 'h-2' : ''} ${isBullet ? 'pl-2 text-gray-200' : ''}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="text-cyan-300 font-semibold">{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return <code key={pIdx} className="bg-gray-900 border border-gray-800 text-blue-400 px-1 py-0.5 rounded text-[11px] font-mono">{part.slice(1, -1)}</code>
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
            if (linkMatch) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-cyan-300 underline font-semibold transition-colors"
                >
                  {linkMatch[1]}
                </a>
              )
            }
            return part
          })}
        </span>
      )
    })
  }

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right Corner) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end flex-col">
        {/* Floating Greeting Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="mb-3 px-4 py-2.5 bg-gray-950/95 border border-blue-500/40 text-white rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md cursor-pointer flex items-center gap-3 group max-w-xs"
            >
              <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="text-xs font-mono">
                <div className="text-blue-400 font-bold flex items-center gap-1">
                  <span>&gt;_ VIRTUAL HARI</span>
                  <span className="text-[10px] text-emerald-400 font-normal">[ONLINE]</span>
                </div>
                <div className="text-gray-300 text-[11px]">Click to chat with my AI twin!</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(false)
                }}
                className="text-gray-500 hover:text-gray-300 ml-1 text-xs"
                title="Dismiss"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Avatar Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-1.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 shadow-[0_0_25px_rgba(59,130,246,0.5)] focus:outline-none transition-all duration-300"
          aria-label="Open Virtual Hari AI Assistant"
        >
          {/* Animated Glow Halo */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse"></div>

          {/* Button Inner */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-950 p-1 flex items-center justify-center overflow-hidden border-2 border-blue-400/80">
            {isOpen ? (
              <FaChevronDown className="text-2xl text-cyan-400 transition-transform duration-300" />
            ) : (
              <>
                <img
                  src="/assets/profile.jpg"
                  alt="Hari AI"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-gray-950 rounded-full p-1 border border-blue-500/50">
                  <FaRobot className="text-xs text-cyan-400" />
                </div>
              </>
            )}
          </div>

          {/* Online green indicator badge */}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-gray-950"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 w-[94vw] sm:w-[420px] h-[600px] max-h-[82vh] bg-gray-950/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.25)] flex flex-col z-50 overflow-hidden font-mono text-white"
          >
            {/* Top Cyan Glowing Line */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>

            {/* Chat Header */}
            <div className="px-4 py-3 bg-gray-900/80 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 flex-shrink-0">
                  <img
                    src="/assets/profile.jpg"
                    alt="Virtual Hari"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-gray-950 rounded-full"></span>
                </div>
                <div>
                  <div className="text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center gap-1.5 uppercase">
                    <span>Virtual Hari</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded font-normal">
                      AI TWIN
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Powered by Groq · MSc AI @ Vaasa</span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-colors text-xs"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors text-sm"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Sub-header Banner */}
            <div className="bg-blue-950/40 px-3 py-1.5 border-b border-blue-900/30 flex items-center justify-between text-[10px] text-blue-300/80">
              <span className="flex items-center gap-1 font-bold">
                <FaTerminal className="text-blue-400" />
                <span>SYS_INTERFACE: RELEVANT QUESTIONS ONLY</span>
              </span>
              <span className="text-[9px] text-gray-400">Vaasa, FI 📍</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed custom-scrollbar">
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[88%]">
                      {isAssistant && (
                        <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mb-1">
                          <FaRobot className="text-[10px] text-cyan-400" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl shadow-md ${
                          isAssistant
                            ? 'bg-gray-900/90 text-gray-100 border border-gray-800/90 rounded-tl-sm'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                        }`}
                      >
                        {formatMessageText(msg.content)}
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2 max-w-[88%]">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-[10px] text-cyan-400 animate-pulse" />
                  </div>
                  <div className="bg-gray-900/90 border border-gray-800 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider">[ REASONING... ]</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Drawer */}
            <div className="px-3 pt-2 pb-1 bg-gray-950/90 border-t border-gray-900">
              <div className="text-[10px] text-gray-400 mb-1.5 flex items-center gap-1 font-bold uppercase tracking-wider">
                <FaCode className="text-cyan-400 text-[10px]" />
                <span>QUICK PROMPTS:</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 bg-gray-900 hover:bg-blue-950 hover:border-blue-500/50 text-gray-300 hover:text-cyan-300 text-[10px] border border-gray-800 rounded-md transition-all flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="p-3 bg-gray-950 border-t border-gray-800/80 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-xs select-none">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Virtual Hari anything..."
                  className="w-full bg-gray-900/90 border border-gray-800 focus:border-blue-500 rounded-xl pl-7 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-inner"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className={`p-2.5 rounded-xl border font-bold transition-all duration-300 flex items-center justify-center ${
                  isLoading || !inputMessage.trim()
                    ? 'border-gray-800 text-gray-600 bg-gray-900 cursor-not-allowed'
                    : 'border-blue-400 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95'
                }`}
                aria-label="Send message"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
