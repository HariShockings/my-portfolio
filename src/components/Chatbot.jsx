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
  FaChevronDown,
  FaGlobe
} from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

// Comprehensive knowledge base for Virtual Hari
const getSystemPrompt = (langCode, langName) => `You are Virtual Hari, the official AI digital twin of Navaratnaraja Hariharan (often known as Hari, @hariShockings).
You speak in the first-person ("I", "me", "my", "we at Astronlox") with the exact voice, personality, and technical expertise of Hari.

### MANDATORY LANGUAGE INSTRUCTION:
- You MUST answer the user in ${langName} (language code: ${langCode}).
- Even if the user asks in another language, formulate your response naturally and fluently in ${langName}, keeping technical terms clear.

### PERSONAL SUMMARY & LOCATION:
- Name: Navaratnaraja Hariharan (Hari)
- Current Location: Vaasa, Finland
- Email: haritheguy21@gmail.com
- GitHub: https://github.com/hariShockings
- LinkedIn: https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/
- Core Motto: "I lose myself in the work so the results speak forever."

### CURRENT EDUCATION & RESEARCH:
- Master of Science (MSc) in Data Engineering & Artificial Intelligence at University of Vaasa, Finland (Aug 2026 – Present).
- Focus: Machine Learning, Big-Data Pipelines, Deep Learning, Computer Vision, RAG architectures.
- BSc (Hons) in Computer Science from University of Bedfordshire, UK (2nd Class Upper, GPA 3.5+, Jun 2024 – Jun 2025).
- Higher Diploma in Information Technology from SLIIT City University, Sri Lanka (GPA 3.25, Jul 2022 – Aug 2024).

### CAREER & FOUNDING:
- 4+ years of software engineering & building production-grade digital products.
- Founder of Astronlox (https://astronlox.com) — building scalable software and AI solutions.
- Freelance Developer (2022 – Present): 20+ shipped production projects.
- Full-Stack Developer at Enliven Designers UK (Remote, 2025–2026): WordPress, PHP, SQL, REST APIs in Agile teams.
- Past: DoMedia Sri Lanka, IT Mart Lanka.

### FLAGSHIP PROJECTS:
1. KidneyCare:
   - Chronic Kidney Disease (CKD) staging classifier using custom Scikit-learn model + Groq API RAG layer for personalized dietary and medical recommendations + map doctor discovery. Stack: React, Node, MySQL, Python, Groq RAG.
2. AquaCare:
   - Mobile CV app for aquaculture farmers detecting fish/shrimp disease from photos before it spreads. Stack: React Native, Firebase, Computer Vision.
3. VirtualCoLab (https://virtual-colab.vercel.app/):
   - AI matchmaking engine for students and startups.
4. VacayLanka.lk (https://vacaylanka.lk):
   - Headless CMS tourism platform with Next.js and GraphQL WordPress.
5. Live Power BI Sales Dashboard:
   - E-commerce analytics platform with real-time Power BI sales & inventory intelligence.
6. The Cosmetics Direct (https://thecosmeticsdirect.com):
   - RAG AI chatbot with live escalation.
7. Prime Tea Ceylon, Evershine Coaches UK, AAYA Group, Swift Trading.

### WHAT HARI IS LOOKING FOR / AVAILABILITY:
- AI & Data Engineering Internships: Hands-on pipeline building & production model deployment.
- MSc Thesis Collaborations: Paid thesis projects in applied AI, data engineering, or industrial ML.
- Software Engineering Roles: Full-stack, backend, or frontend engineering (4+ years experience).

### STRICT RELEVANCE RULE:
- You ONLY discuss topics related to Hari, his career, education, skills, projects, collaborations, and hiring.
- If a user asks completely unrelated questions (recipes, general trivia, unrelated homework), answer with friendly wit in ${langName} and steer the conversation back to Hari's projects, AI work, or collaborations.
`

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isDark } = useTheme()
  const { language, t, currentLangMeta } = useLanguage()

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: t.chatbot.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // When language changes, update greeting in that language
  useEffect(() => {
    setMessages((prev) => {
      // If only welcome message exists or user changed language, greet in new language
      if (prev.length <= 1) {
        return [
          {
            id: `welcome-${language}`,
            role: 'assistant',
            content: t.chatbot.welcome,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      } else {
        // Append a polite language switch announcement
        return [
          ...prev,
          {
            id: `lang-switch-${Date.now()}`,
            role: 'assistant',
            content: `🌐 **[${currentLangMeta.name} / ${currentLangMeta.flag}]**: ${t.chatbot.greeting}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }
    })
  }, [language])

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
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
        id: `reset-${Date.now()}`,
        role: 'assistant',
        content: t.chatbot.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }

  // Fallback responder in the active language
  const getLocalFallbackResponse = (query) => {
    const q = query.toLowerCase()
    
    // Tamil responses
    if (language === 'ta') {
      if (q.includes('kidney') || q.includes('care') || q.includes('aquacare') || q.includes('திட்டம்') || q.includes('படைப்பு')) {
        return `எனது முக்கிய AI திட்டங்கள்:\n\n1. **KidneyCare**: மருத்துவ அறிக்கைகளிலிருந்து நாள்பட்ட சிறுநீரக நோயின் (CKD) நிலைகளை நொடிகளில் கணிக்கும் இயந்திரக் கற்றல் மாதிரி. Groq RAG மூலம் தனிப்பயனாக்கப்பட்ட உணவுமுறை பரிந்துரைகளையும் வழங்குகிறது.\n2. **AquaCare**: மீன் மற்றும் இறால் நோய்களை புகைப்படங்கள் மூலம் கண்டறியும் கணினிப் பார்வை (Computer Vision) செயலி.\n\nமேலும் **VirtualCoLab**, **VacayLanka.lk** போன்ற 20+ திட்டங்களை உருவாக்கியுள்ளேன்.`
      }
      if (q.includes('பணி') || q.includes('பயிற்சி') || q.includes('intern') || q.includes('thesis') || q.includes('ஆய்வேடு')) {
        return `ஆம், நான் பின்வரும் வாய்ப்புகளுக்கு தீவிரமாக தயாராக உள்ளேன்:\n\n• **AI & தரவுப் பொறியியல் பயிற்சிகள் (Internships)**\n• **முதுகலை ஆய்வேட்டு ஒத்துழைப்புகள் (MSc Thesis)**\n• **மென்பொருள் பொறியியல் பணிகள் (Full-Stack / Backend)**\n\nஎன்னை **haritheguy21@gmail.com** வழியாக தொடர்பு கொள்ளலாம்!`
      }
      return `நான் விர்ச்சுவல் ஹரி! எனது திட்டங்கள் (KidneyCare, AquaCare), வாசா பல்கலைக்கழக படிப்பு, தொழில்நுட்பத் திறன்கள் அல்லது பணிகளுக்கு என்னை அணுகுவது குறித்து எதையும் கேளுங்கள்!`
    }

    // Finnish responses
    if (language === 'fi') {
      if (q.includes('kidney') || q.includes('aquacare') || q.includes('projekti')) {
        return `Tässä kaksi soveltavan tekoälyn kärkihankettani:\n\n1. **KidneyCare**: Lääketieteellinen koneoppimisalusta, joka luokittelee munuaistaudin (CKD) vaiheen sekunneissa ja tarjoaa Groq RAG -pohjaisen hoito- ja ruokavaliosuunnitelman.\n2. **AquaCare**: Konenäköön perustuva mobiilidiagnostiikka kalatautien varhaiseen tunnistamiseen.\n\nOlen toimittanut yli 20 tuotantoprojektia!`
      }
      if (q.includes('harjoittelu') || q.includes('työ') || q.includes('thesis') || q.includes('diplomityö')) {
        return `Kyllä! Etsin aktiivisesti:\n\n• **Tekoäly- ja datatekniikan harjoitteluita (Internships)**\n• **Diplomityöyhteistyötä (MSc Thesis)**\n• **Ohjelmistokehittäjän rooleja (Full-Stack)**\n\nOta yhteyttä: **haritheguy21@gmail.com**!`
      }
      return `Olen Virtuaali-Hari! Kysy minulta vapaasti projekteistani (KidneyCare, AquaCare), DI-opinnoistani Vaasan yliopistossa tai työllistämisestä!`
    }

    // Default multilingual / English fallback
    if (q.includes('kidney') || q.includes('care') || q.includes('aquacare') || q.includes('project')) {
      return `Here are two of my flagship applied AI projects:\n\n1. **KidneyCare**: A full-stack medical ML platform classifying Chronic Kidney Disease (CKD) stages in seconds from medical reports, coupled with a Groq-powered RAG layer for personalized dietary & treatment regimens.\n2. **AquaCare**: A computer vision diagnostic mobile app for aquaculture farmers to detect disease from photos before it spreads.\n\nI've also built **VirtualCoLab**, **VacayLanka.lk**, and 20+ client builds.`
    }
    if (q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('thesis') || q.includes('role')) {
      return `Yes, absolutely! I am actively looking for:\n\n• **AI & Data Engineering Internships**\n• **MSc Thesis Collaborations**\n• **Software Engineering Roles (Full-Stack)**\n\nYou can reach me directly at **haritheguy21@gmail.com**!`
    }
    return `I'm Virtual Hari, digital twin of Navaratnaraja Hariharan. Ask me about my projects (KidneyCare, AquaCare), my MSc studies at University of Vaasa, my tech stack, or my availability for internships and roles!`
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
      { role: 'system', content: getSystemPrompt(language, currentLangMeta.name) },
      ...messages
        .filter((m) => !m.id.startsWith('welcome') && !m.id.startsWith('reset'))
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: textToSend.trim() }
    ]

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || (typeof process !== 'undefined' ? process.env.GROQ_API_KEY : '')
      let replyContent = ''

      if (apiKey) {
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
            console.warn(`Model ${modelName} attempt failed:`, err?.response?.data || err.message)
          }
        }

        if (!success) {
          replyContent = getLocalFallbackResponse(textToSend)
        }
      } else {
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
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim())
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\`.*?\`)/g)

      return (
        <span key={lineIdx} className={`block ${lineIdx > 0 && line.trim() === '' ? 'h-2' : ''} ${isBullet ? 'pl-2' : ''}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="text-cyan-400 font-bold">{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={pIdx} className={`px-1 py-0.5 rounded text-[11px] font-mono ${
                  isDark ? 'bg-gray-900 border border-gray-800 text-blue-400' : 'bg-slate-200 border border-slate-300 text-blue-700'
                }`}>
                  {part.slice(1, -1)}
                </code>
              )
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
            if (linkMatch) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-cyan-400 underline font-semibold transition-colors"
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
              className={`mb-3 px-4 py-2.5 rounded-xl border shadow-xl backdrop-blur-md cursor-pointer flex items-center gap-3 group max-w-xs ${
                isDark 
                  ? 'bg-gray-950/95 border-blue-500/40 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-white/95 border-blue-400 text-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.15)]'
              }`}
            >
              <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="text-xs font-mono">
                <div className="text-blue-500 font-bold flex items-center gap-1.5">
                  <span>&gt;_ VIRTUAL HARI</span>
                  <span className="text-[10px] text-emerald-500 font-normal">[{t.chatbot.online}]</span>
                  <span className="text-xs">{currentLangMeta.flag}</span>
                </div>
                <div className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {t.chatbot.greeting}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(false)
                }}
                className="text-gray-400 hover:text-gray-600 ml-1 text-xs"
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
          <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 flex items-center justify-center overflow-hidden border-2 border-blue-400/80 ${
            isDark ? 'bg-gray-950' : 'bg-white'
          }`}>
            {isOpen ? (
              <FaChevronDown className="text-2xl text-blue-500 transition-transform duration-300" />
            ) : (
              <>
                <img
                  src="/assets/profile.jpg"
                  alt="Hari AI"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className={`absolute bottom-0 right-0 rounded-full p-1 border border-blue-500/50 ${
                  isDark ? 'bg-gray-950' : 'bg-white'
                }`}>
                  <FaRobot className="text-xs text-blue-500" />
                </div>
              </>
            )}
          </div>

          {/* Online green indicator badge with flag */}
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
            className={`fixed bottom-24 right-4 sm:bottom-28 sm:right-6 w-[94vw] sm:w-[420px] h-[600px] max-h-[82vh] backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-mono ${
              isDark 
                ? 'bg-gray-950/95 border-gray-800 text-white shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.25)]'
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
            }`}
          >
            {/* Top Cyan Glowing Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>

            {/* Chat Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-slate-50/80 border-slate-200'
            }`}>
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
                  <div className="text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center gap-1.5 uppercase">
                    <span>Virtual Hari</span>
                    <span className="text-xs select-none">{currentLangMeta.flag}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-normal border ${
                      isDark ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      AI TWIN
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className={`p-2 rounded-lg transition-colors text-xs ${
                    isDark ? 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-200'
                  }`}
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className={`p-2 rounded-lg transition-colors text-sm ${
                    isDark ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800' : 'text-slate-500 hover:text-red-600 hover:bg-slate-200'
                  }`}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Sub-header Banner */}
            <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[10px] ${
              isDark ? 'bg-blue-950/40 border-blue-900/30 text-blue-300/80' : 'bg-blue-50 border-blue-100 text-blue-800'
            }`}>
              <span className="flex items-center gap-1 font-bold">
                <FaTerminal className="text-blue-500" />
                <span>{t.chatbot.relevantOnly}</span>
              </span>
              <span className="text-[9px]">📍 Vaasa, FI</span>
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
                        <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mb-1">
                          <FaRobot className="text-[10px] text-blue-500" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl shadow-md ${
                          isAssistant
                            ? isDark
                              ? 'bg-gray-900/90 text-gray-100 border border-gray-800/90 rounded-tl-sm'
                              : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-sm'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-md'
                        }`}
                      >
                        {formatMessageText(msg.content)}
                      </div>
                    </div>
                    <span className={`text-[9px] mt-1 px-1 ${isDark ? 'text-gray-400' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2 max-w-[88%]">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-[10px] text-blue-500 animate-pulse" />
                  </div>
                  <div className={`p-3 rounded-2xl rounded-tl-sm flex items-center gap-2 border ${
                    isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className={`text-[10px] font-mono tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {t.chatbot.reasoning}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Drawer */}
            <div className={`px-3 pt-2 pb-1 border-t ${
              isDark ? 'bg-gray-950/90 border-gray-900' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`text-[10px] mb-1.5 flex items-center gap-1 font-bold uppercase tracking-wider ${
                isDark ? 'text-gray-400' : 'text-slate-500'
              }`}>
                <FaCode className="text-blue-500 text-[10px]" />
                <span>{t.chatbot.quickPromptsTitle}</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {t.chatbot.prompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className={`whitespace-nowrap px-2.5 py-1 text-[10px] border rounded-md transition-all flex-shrink-0 font-medium ${
                      isDark
                        ? 'bg-gray-900 hover:bg-blue-950 hover:border-blue-500/50 text-gray-300 hover:text-cyan-300 border-gray-800'
                        : 'bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 border-slate-200 shadow-sm'
                    }`}
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
              className={`p-3 border-t flex items-center gap-2 ${
                isDark ? 'bg-gray-950 border-gray-800/80' : 'bg-white border-slate-200'
              }`}
            >
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 font-bold text-xs select-none">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t.chatbot.inputPlaceholder}
                  className={`w-full rounded-xl pl-7 pr-3 py-2.5 text-xs focus:outline-none transition-all duration-300 border ${
                    isDark
                      ? 'bg-gray-900/90 border-gray-800 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-inner'
                  }`}
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className={`p-2.5 rounded-xl border font-bold transition-all duration-300 flex items-center justify-center ${
                  isLoading || !inputMessage.trim()
                    ? isDark
                      ? 'border-gray-800 text-gray-600 bg-gray-900 cursor-not-allowed'
                      : 'border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed'
                    : 'border-blue-500 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-105 active:scale-95'
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
