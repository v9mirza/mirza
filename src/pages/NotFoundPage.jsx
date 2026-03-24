import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MagneticButton from '../components/MagneticButton'
import { FiArrowLeft } from 'react-icons/fi'

function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b] flex flex-col"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[760px] px-3 sm:px-4 md:px-5 flex-1 flex flex-col items-center justify-center text-center">
        <p className="font-mono text-[#d98973]/70 text-[13px] sm:text-[14px] mb-3">404</p>
        <h1 className="font-title text-accent text-[42px] font-medium leading-none tracking-tight sm:text-[52px] md:text-[62px]">
          Lost in the void
        </h1>
        <p className="mt-4 max-w-[42ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:text-[14px] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <MagneticButton>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm text-[#c0c5cf] transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 px-2 py-1.5"
          >
            <FiArrowLeft className="text-[14px]" />
            <span className="text-[14px] font-medium">Return Home</span>
          </Link>
        </MagneticButton>
      </main>
    </motion.div>
  )
}

export default NotFoundPage
