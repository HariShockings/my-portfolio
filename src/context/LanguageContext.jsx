import { createContext, useContext, useState, useEffect } from 'react'
import { translations, LANGUAGES } from '../data/translations'
import { LANDMARK_DATA } from '../data/landmarks'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-language')
      if (saved && translations[saved]) return saved
    }
    return 'en'
  })

  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationLang, setCelebrationLang] = useState(language)

  const setLanguage = (langCode, triggerAnimation = true) => {
    if (!translations[langCode]) return
    setLanguageState(langCode)
    localStorage.setItem('portfolio-language', langCode)
    if (triggerAnimation) {
      setCelebrationLang(langCode)
      setShowCelebration(true)
    }
  }

  const t = translations[language] || translations.en
  const currentLandmarks = LANDMARK_DATA[language] || LANDMARK_DATA.en
  const currentLangMeta = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLandmarks,
        currentLangMeta,
        showCelebration,
        setShowCelebration,
        celebrationLang,
        languages: LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
