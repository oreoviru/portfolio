import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import Navbar from './Navbar'
import CustomCursor from './CustomCursor'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="anim-page-enter min-h-[100dvh] w-full">
      <Routes location={location}>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
)
