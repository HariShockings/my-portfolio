import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaPaperPlane, FaCheck, FaTimes } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true })
  }

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)
    setStatus('')

    fetch('https://formsubmit.co/ajax/haritheguy21@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `New portfolio contact from ${formData.name}`
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === 'true' || data.success === true) {
          setStatus('success')
          setFormData({ name: '', email: '', message: '' })
        } else {
          setStatus('error')
        }
      })
      .catch((error) => {
        console.error('Error sending message:', error)
        setStatus('error')
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <section id="contact" className="py-20 bg-gray-950 text-white font-mono relative overflow-hidden border-t border-gray-900">
      
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <div className="text-blue-500 font-black mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 animate-pulse"></span>
            SYS_MODULE: CONTACT
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest max-w-2xl mx-auto">
            {`> HAVE A PROBLEM WORTH SOLVING? LET'S TALK.`}
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
            Whether it's an internship, a thesis collaboration, or a role where I can build — I reply fast and I follow through.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 backdrop-blur-md p-8 rounded-none border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="relative">
              <label 
                htmlFor="name" 
                className={`block text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  isFocused.name ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {`> NAME`}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                required
                className={`mt-2 block w-full px-4 py-3 bg-gray-950 border rounded-none text-white text-sm focus:outline-none transition-all duration-300 ${
                  isFocused.name 
                    ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              />
            </div>
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`block text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  isFocused.email ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {`> EMAIL`}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                required
                className={`mt-2 block w-full px-4 py-3 bg-gray-950 border rounded-none text-white text-sm focus:outline-none transition-all duration-300 ${
                  isFocused.email 
                    ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              />
            </div>
            <div className="relative">
              <label 
                htmlFor="message" 
                className={`block text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  isFocused.message ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {`> MESSAGE`}
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                required
                className={`mt-2 block w-full px-4 py-3 bg-gray-950 border rounded-none text-white text-sm focus:outline-none transition-all duration-300 ${
                  isFocused.message 
                    ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-transparent border-2 border-blue-500 text-blue-400 text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2.5 sm:py-3 rounded-none font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                  isSending 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-blue-500 hover:text-gray-950 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                }`}
              >
                {isSending ? (
                  <>
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>[ SENDING... ]</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs sm:text-sm" />
                    <span>[ INIT_TRANSMISSION ]</span>
                  </>
                )}
              </button>
            </div>
            <AnimatePresence mode="wait">
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-center p-3 rounded-lg ${
                    status === 'success' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {status === 'success' ? (
                      <>
                        <FaCheck />
                        Message sent successfully!
                      </>
                    ) : (
                      <>
                        <FaTimes />
                        Failed to send message. Please try again.
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}