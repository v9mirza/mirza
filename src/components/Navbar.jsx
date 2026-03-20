import { useEffect, useState } from 'react'
import { FiFileText, FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi'

const links = [
  { label: 'home', href: '#home' },
  { label: 'projects', href: '#projects' },
  { label: 'experience', href: '#experience' },
  { label: 'skills', href: '#skills' },
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
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ids = ['home', 'projects', 'experience', 'skills']
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        visible.sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        )
        setActiveSection(visible[0].target.id)
      },
      {
        root: null,
        threshold: [0.01, 0.1, 0.25],
        rootMargin: '-45% 0px -50% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
    <header className="border-soft sticky top-0 z-50 border-b bg-[#18181b]/95 backdrop-blur-md backdrop-saturate-150">
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
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                className={`whitespace-nowrap leading-none rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d98973]/60 ${
                  activeSection === link.href.replace('#', '') ? 'text-[#d98973]' : 'hover:text-[#d98973]'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
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
                <a
                  href={item.href}
                  aria-label={item.label}
                  target={target}
                  rel={rel}
                  download={item.download}
                  className="inline-flex items-center justify-center p-1.5 whitespace-nowrap leading-none text-[14px] transition-colors duration-200 hover:text-[#d98973] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 rounded-sm sm:text-[15px]"
                >
                  <Icon className="text-[1em]" />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile menu - inside header so it sticks with navbar */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#1f232b] bg-[#18181b]/95 backdrop-blur-md">
          <div className="mx-auto max-w-[760px]">
            <ul className="flex flex-col py-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 text-[14px] capitalize transition-colors ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-[#d98973]'
                        : 'text-[#c0c5cf] hover:text-[#d98973]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
