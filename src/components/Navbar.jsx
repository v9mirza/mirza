import { useEffect, useState } from 'react'
import { FiFileText, FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import MagneticButton from './MagneticButton'

const routeLinks = [
  { label: 'home', href: '/' },
  { label: 'blogs', href: '/blogs' },
  { label: 'resume', href: '/resume' },
  { label: 'uses', href: '/uses' },
]

const actions = [
  {
    label: 'Resume',
    href: '/mirza-resume-fsd.pdf',
    icon: FiFileText,
    download: 'mirza-resume-fsd.pdf',
    newTab: true,
  },
  { label: 'GitHub', href: 'https://github.com/v9mirza', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/v9mirza', icon: FiLinkedin },
  { label: 'Email', href: 'mailto:v9mirza@proton.me', icon: FiMail },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const location = useLocation()

  const handleActionClick = (e, item) => {
    if (item.label === 'Email') {
      e.preventDefault()
      navigator.clipboard.writeText('v9mirza@proton.me')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }



  // Close menu when resizing to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="border-soft sticky top-0 z-50 border-b bg-[#18181b]/60 backdrop-blur-lg backdrop-saturate-150 transition-colors duration-300">
      <nav className="mx-auto flex w-full items-center justify-between gap-2 px-3 py-2.5 sm:px-4 max-w-[760px]">
        {/* Hamburger menu button - visible only on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setMobileMenuOpen(!mobileMenuOpen)
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="flex items-center justify-center p-1.5 text-[#a0a5b0] transition-colors hover:text-[#d98973] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 rounded-sm sm:hidden"
        >
          {mobileMenuOpen ? (
            <FiX className="text-[22px]" />
          ) : (
            <FiMenu className="text-[22px]" />
          )}
        </button>

        {/* Desktop navigation */}
        <ul className="hidden min-w-0 flex-1 flex-wrap items-center gap-2 text-[13px] sm:flex sm:gap-3 sm:text-[14px]">
          {routeLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
            <li key={link.label}>
              <Link
                to={link.href}
                className={`group relative flex items-center whitespace-nowrap leading-none rounded-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d98973]/60 ${
                  isActive ? 'text-[#d98973]' : 'hover:text-[#d98973]'
                }`}
              >
                <span className="absolute -left-2.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-0.5 text-[#d98973]/70 font-mono text-[10px] leading-none mt-[1px]">[</span>
                {link.label}
                <span className="absolute -right-2.5 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#d98973]/70 font-mono text-[10px] leading-none mt-[1px]">]</span>
              </Link>
            </li>
            )
          })}
        </ul>

        {/* Action icons */}
        <ul className="flex flex-shrink-0 items-center gap-2 text-[#7a808a] sm:gap-2.5">
          {actions.map((item) => {
            const Icon = item.icon
            const isExternal =
              item.href.startsWith('http') || item.href.startsWith('mailto:')
            const shouldOpenNewTab = (isExternal || item.newTab) && !item.download

            const target = shouldOpenNewTab ? '_blank' : undefined
            const rel = shouldOpenNewTab ? 'noreferrer noopener' : undefined

            return (
              <li key={item.label}>
                <MagneticButton>
                  <a
                    href={item.href}
                    onClick={(e) => handleActionClick(e, item)}
                    aria-label={item.label}
                    target={target}
                    rel={rel}
                    download={item.download}
                    className="inline-flex items-center justify-center p-1.5 whitespace-nowrap leading-none text-[14px] transition-colors duration-200 hover:text-[#d98973] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 rounded-sm sm:text-[15px]"
                  >
                    <Icon className="text-[1em]" />
                  </a>
                </MagneticButton>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile menu - inside header so it sticks with navbar */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#1f232b] bg-[#18181b]/80 backdrop-blur-lg">
          <div className="mx-auto max-w-[760px]">
            <ul className="flex flex-col py-2">
              {routeLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 text-[14px] capitalize transition-colors ${
                      isActive
                        ? 'text-[#d98973]'
                        : 'text-[#c0c5cf] hover:text-[#d98973]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      </header>

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

export default Navbar
