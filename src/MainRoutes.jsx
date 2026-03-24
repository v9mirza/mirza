import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from './App.jsx'
import BlogsPage from './pages/BlogsPage.jsx'

function MainRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default MainRoutes
