import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from './App.jsx'

const BlogsPage = lazy(() => import('./pages/BlogsPage.jsx'))
const UsesPage = lazy(() => import('./pages/UsesPage.jsx'))
const ResumePage = lazy(() => import('./pages/ResumePage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function RouteFallback() {
  return <div className="min-h-screen bg-[#18181b]" aria-hidden="true" />
}

function MainRoutes() {
  const location = useLocation()
  useEffect(() => {
    const warmRoutes = () => {
      import('./pages/ResumePage.jsx')
      import('./pages/BlogsPage.jsx')
      import('./pages/UsesPage.jsx')
    }

    if ('requestIdleCallback' in window) {
      const callbackId = window.requestIdleCallback(warmRoutes)
      return () => window.cancelIdleCallback(callbackId)
    }

    const timeoutId = window.setTimeout(warmRoutes, 1200)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<App />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/uses" element={<UsesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default MainRoutes
