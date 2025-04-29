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

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        () => {
          setStatus('success')
          setFormData({ name: '', email: '', message: '' })
        },
        () => setStatus('error')
      )
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <section id="contact" className="py-20 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Get in Touch
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700">
            <div className="relative">
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium text-gray-200 transition-all duration-300 ${
                  isFocused.name ? 'text-blue-400' : ''
                }`}
              >
                Name
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
                className={`mt-1 block w-full px-3 py-2 bg-gray-900/50 border rounded-md text-white focus:outline-none transition-all duration-300 ${
                  isFocused.name 
                    ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              />
            </div>
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium text-gray-200 transition-all duration-300 ${
                  isFocused.email ? 'text-blue-400' : ''
                }`}
              >
                Email
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
                className={`mt-1 block w-full px-3 py-2 bg-gray-900/50 border rounded-md text-white focus:outline-none transition-all duration-300 ${
                  isFocused.email 
                    ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              />
            </div>
            <div className="relative">
              <label 
                htmlFor="message" 
                className={`block text-sm font-medium text-gray-200 transition-all duration-300 ${
                  isFocused.message ? 'text-blue-400' : ''
                }`}
              >
                Message
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
                className={`mt-1 block w-full px-3 py-2 bg-gray-900/50 border rounded-md text-white focus:outline-none transition-all duration-300 ${
                  isFocused.message 
                    ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-blue-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSending 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                }`}
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
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