import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from './App.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import UsesPage from './pages/UsesPage.jsx'
import ResumePage from './pages/ResumePage.jsx'

function MainRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/uses" element={<UsesPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default MainRoutes
