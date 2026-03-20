import { useEffect, useState } from 'react'
import { FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

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

  return (
    <header className="border-soft sticky top-0 z-10 border-b bg-[#18181b]/55 backdrop-blur-md backdrop-saturate-150">
      <nav className="mx-auto flex w-full flex-wrap items-center justify-between gap-2 px-2 py-2.5 sm:flex-nowrap sm:items-center max-w-[760px]">
        <ul className="hidden min-w-0 flex-1 flex-wrap items-center gap-2 text-[13px] sm:flex sm:gap-3 sm:text-[14px]">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                className={`whitespace-nowrap leading-none rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d98973]/60 ${
                  activeSection === link.href.replace('#', '') ? 'text-[#d98973]' : 'hover:text-[#d98973]'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-shrink-0 items-center gap-1.5 text-[#7a808a] sm:gap-2.5">
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
                  className="inline-flex whitespace-nowrap leading-none text-[13px] transition-colors hover:text-[#d98973] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d98973]/60 sm:text-[14px]"
                >
                  <Icon className="text-[1em]" />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
