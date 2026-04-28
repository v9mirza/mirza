import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFileText, FiMail } from 'react-icons/fi'
import MagneticButton from './MagneticButton'

const roles = [
  'developer',
  'technical writer',
  'builder',
  'Arch Linux user',
  'open source contributor'
]

const quickLinks = [
  { label: 'Resume', href: '/mirza-resume-fsd.pdf', icon: FiFileText },
  { label: 'Get in touch', href: 'mailto:v9mirza@proton.me', icon: FiMail },
]

function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleLinkClick = (e, link) => {
    if (link.label === 'Get in touch') {
      e.preventDefault()
      navigator.clipboard.writeText('v9mirza@proton.me')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-soft py-10 sm:py-14"
    >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2 text-muted text-[13px] sm:text-[14px]"
        >
          <span className="opacity-70">currently —</span>
          <div className="relative h-[20px] overflow-hidden min-w-[150px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[currentRole]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 block whitespace-nowrap text-accent font-medium mt-[1px]"
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

      <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-title text-accent relative z-[1] mt-3 text-[42px] font-medium leading-none tracking-tight sm:text-[48px] md:text-[54px]"
        >
          Hassan Mirza
      </motion.h1>
        
      <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative z-[1] mt-4 max-w-[62ch] text-pretty text-[14px] leading-[1.6] text-[#a7adb8] sm:mt-5 sm:text-[15px]"
        >
          I build simple, reliable software from complex ideas. <br />
          Clean APIs, predictable systems, and interfaces that stay out of the way. <br />
          I write to think clearly and explain complexity simply.
        </motion.p>

      <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-muted relative z-[1] mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-4 text-[13px] sm:text-[14px]"
        >
          {quickLinks.map((link) => {
            const Icon = link.icon
            const isResume = link.href.includes('mirza-resume-fsd.pdf')
            const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:')

            return (
              <MagneticButton key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  target={isExternal || isResume ? '_blank' : undefined}
                  rel={isExternal || isResume ? 'noreferrer noopener' : undefined}
                  download={isResume ? 'mirza-resume-fsd.pdf' : undefined}
                  className="group relative inline-flex items-center gap-2 rounded-sm text-[#8d94a0] transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 px-1 py-1"
                >
                  <span className="absolute -left-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 text-[#d98973]/70 font-mono text-[11px] leading-none mt-[2px]">[</span>
                  <span className="inline-flex items-center gap-2">
                    <Icon className="text-[12px]" />
                    {link.label}
                  </span>
                  <span className="absolute -right-1 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 text-[#d98973]/70 font-mono text-[11px] leading-none mt-[2px]">]</span>
                </a>
              </MagneticButton>
            )
          })}
        </motion.div>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#18181b]/80 backdrop-blur-md border border-[#2a303b] px-4 py-2.5 text-[13px] font-medium text-[#e8ebf0] shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_20px_rgba(217,137,115,0.1)] transition-all duration-300 z-[100] flex items-center gap-2.5 ${copied ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#d98973]/20 text-[#d98973]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        Copied to clipboard
      </div>
    </section>
  )
}

export default Hero
