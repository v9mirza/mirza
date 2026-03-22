import { useFadeIn } from '../hooks/useFadeIn'
import { FiFileText, FiMail } from 'react-icons/fi'
import MagneticButton from './MagneticButton'
import { useState } from 'react'

const quickLinks = [
  { label: 'Resume', href: '/mirza-resume-fsd.pdf', icon: FiFileText },
  { label: 'Get in touch', href: 'mailto:v9mirza@proton.me', icon: FiMail },
]

function Hero() {
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 })
  const [copied, setCopied] = useState(false)

  const handleLinkClick = (e, link) => {
    if (link.label === 'Get in touch') {
      e.preventDefault()
      navigator.clipboard.writeText('v9mirza@proton.me')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <section
        id="home"
        ref={ref}
      className="relative overflow-hidden border-b border-soft py-7 sm:py-8"
    >
      <p className={`text-muted relative z-[1] text-[13px] sm:text-[14px] transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>developer • technical writer • builder</p>
      <h1 className={`font-title text-accent relative z-[1] mt-2 text-[38px] font-medium leading-none tracking-tight sm:text-[42px] md:text-[46px] transition-all duration-700 ease-out delay-[100ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Hassan Mirza
      </h1>
      <p className={`relative z-[1] mt-3.5 max-w-[62ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:mt-4 sm:text-[14px] transition-all duration-700 ease-out delay-[200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        I&apos;m Hassan Mirza, a full-stack developer and technical writer who turns complex ideas into simple, reliable software. I focus on clean APIs, predictable systems, and interfaces that stay out of the way. <br />
        Currently pursuing a BCA, I write about developer tools and system design to think clearly and explain complexity simply.
      </p>

      <div className={`text-muted relative z-[1] mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3 text-[13px] sm:text-[14px] transition-all duration-700 ease-out delay-[300ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {quickLinks.map((link) => {
          const Icon = link.icon
          const isMailtoOrHttp =
            link.href.startsWith('http') || link.href.startsWith('mailto:')
          const isResume = link.href.includes('mirza-resume-fsd.pdf')

          return (
            <MagneticButton key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                target={isMailtoOrHttp || isResume ? '_blank' : undefined}
                rel={isMailtoOrHttp || isResume ? 'noreferrer noopener' : undefined}
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
      </section>
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#18181b]/80 backdrop-blur-md border border-[#2a303b] px-4 py-2.5 text-[13px] font-medium text-[#e8ebf0] shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_20px_rgba(217,137,115,0.1)] transition-all duration-300 z-[100] flex items-center gap-2.5 ${copied ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#d98973]/20 text-[#d98973]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        Copied to clipboard
      </div>
    </>
  )
}

export default Hero
