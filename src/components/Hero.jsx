import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFileText, FiMail } from 'react-icons/fi'
import MagneticButton from './MagneticButton'

const roles = [
  'developer',
  'technical writer',
  'builder',
  'Arch Linux user',
  'open-source contributor',
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
      className="relative overflow-hidden border-b border-soft py-10 sm:py-12"
    >
      <div className="hidden sm:flex items-stretch gap-0">

        {/* Left — photo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden sm:block flex-shrink-0 w-[220px] md:w-[250px]"
        >
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-3xl ring-1 ring-[#2a303b]">
            <img
              src="/mirza.jpg"
              alt="Hassan Mirza"
              className="h-full w-full object-cover grayscale"
              style={{ objectPosition: '50% 15%' }}
            />
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#18181b]/60 to-transparent" />
            {/* Open to work dot */}
            <div className="absolute bottom-3.5 right-3.5 group flex items-center justify-end">
              <span className="mr-1.5 max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-medium text-emerald-400/80 tracking-wide opacity-0 transition-all duration-300 group-hover:max-w-[80px] group-hover:opacity-100">
                Open to work
              </span>
              <div className="relative flex-shrink-0 h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="absolute inset-[2px] rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden sm:block w-px mx-7 md:mx-9 flex-shrink-0 self-stretch bg-gradient-to-b from-transparent via-[#2a303b] to-transparent" />

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-center min-w-0 flex-1"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#555c68]">
            Full-Stack Developer
          </p>

          <h1 className="font-title text-accent mt-2.5 text-[40px] font-medium leading-[1.05] tracking-tight sm:text-[46px] md:text-[52px]">
            Hassan Mirza
          </h1>

          {/* Role ticker */}
          <div className="mt-3.5 flex items-center gap-2 text-[13px] text-[#555c68]">
            <span>currently —</span>
            <div className="relative h-[20px] overflow-hidden min-w-[160px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[currentRole]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute left-0 block whitespace-nowrap text-accent font-medium mt-[1px]"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-5 max-w-[40ch] text-pretty text-[13px] leading-[1.7] text-[#a7adb8] sm:text-[14px]">
            I build simple, reliable software from complex ideas — clean APIs,
            predictable systems, and interfaces that stay out of the way.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:gap-4 text-[13px] sm:text-[14px]">
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
          </div>
        </motion.div>
      </div>

      {/* Mobile: stacked layout (no photo) */}
      <div className="sm:hidden mt-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b7280]">Full-Stack Developer</p>
        <h1 className="font-title text-accent mt-2 text-[38px] font-medium leading-none tracking-tight">Hassan Mirza</h1>
        <div className="mt-3 flex items-center gap-2 text-[13px] text-[#6b7280]">
          <span>currently —</span>
          <div className="relative h-[20px] overflow-hidden min-w-[150px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[currentRole]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute left-0 block whitespace-nowrap text-accent font-medium mt-[1px]"
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-4 text-pretty text-[14px] leading-[1.65] text-[#a7adb8]">
          I build simple, reliable software from complex ideas — clean APIs,
          predictable systems, and interfaces that stay out of the way.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
          {quickLinks.map((link) => {
            const Icon = link.icon
            const isResume = link.href.includes('mirza-resume-fsd.pdf')
            const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:')
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                target={isExternal || isResume ? '_blank' : undefined}
                rel={isExternal || isResume ? 'noreferrer noopener' : undefined}
                download={isResume ? 'mirza-resume-fsd.pdf' : undefined}
                className="inline-flex items-center gap-2 text-[#8d94a0] transition-colors hover:text-accent"
              >
                <Icon className="text-[12px]" />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>

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
