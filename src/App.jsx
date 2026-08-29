import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import WhatILookFor from './components/WhatILookFor.jsx'
import Skills from './components/Skills.jsx'
import WhyWorkWithMe from './components/WhyWorkWithMe.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <WhatILookFor />
        <Skills />
        <WhyWorkWithMe />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App