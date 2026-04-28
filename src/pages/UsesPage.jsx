import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const setupHighlights = ['Arch Linux', 'Hyprland', 'Ghostty', 'VS Code/Zed', 'Docker']

const toolSections = [
  {
    title: 'Development',
    items: [
      {
        name: 'VS Code / Zed',
        description: 'Primary editors for application work, refactors, and debugging.',
        href: 'https://code.visualstudio.com/',
      },
      {
        name: 'Neovim',
        description: 'Fast terminal editing for quick patches and focused coding.',
        href: 'https://neovim.io/',
      },
      {
        name: 'Docker',
        description: 'Local databases and isolated service environments.',
        href: 'https://www.docker.com/',
      },
    ],
  },
  {
    title: 'Terminal & OS',
    items: [
      {
        name: 'Arch Linux',
        description: 'Preferred daily OS for development and server-oriented workflows.',
        href: 'https://archlinux.org/',
      },
      {
        name: 'Hyprland',
        description: 'Tiling window manager for efficient keyboard-driven multitasking.',
        href: 'https://hyprland.org/',
      },
      {
        name: 'Ghostty',
        description: 'Terminal emulator tuned for speed and clarity.',
        href: 'https://ghostty.org/',
      },
    ],
  },
  {
    title: 'Productivity',
    items: [
      {
        name: 'Notion',
        description: 'Project notes, lightweight planning, and docs.',
        href: 'https://www.notion.so/',
      },
      {
        name: 'Zen Browser',
        description: 'Default browser focused on speed and distraction-free sessions.',
        href: 'https://zen-browser.app/',
      },
      {
        name: 'Spotify',
        description: 'Music for deep work and long coding sessions.',
        href: 'https://open.spotify.com/',
      },
    ],
  },
]

function UsesPage() {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta = document.querySelector('meta[name="description"]')
    const previousDescription = descriptionMeta?.getAttribute('content')

    document.title = 'Uses | Hassan Mirza'
    if (descriptionMeta) {
      descriptionMeta.setAttribute(
        'content',
        'Tools and setup Hassan Mirza uses daily for full-stack development: editors, terminal, Linux workflow, and productivity stack.',
      )
    }

    return () => {
      document.title = previousTitle
      if (descriptionMeta && previousDescription) {
        descriptionMeta.setAttribute('content', previousDescription)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b] flex flex-col"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[700px] px-4 sm:px-5 md:px-6 flex-1 py-10 sm:py-12">
        
        <header className="mb-8 border-b border-soft pb-5 sm:mb-10 sm:pb-6">
          <h1 className="font-title text-accent text-[38px] font-medium leading-none tracking-tight sm:text-[42px] md:text-[46px]">
            Uses
          </h1>
          <p className="mt-3.5 max-w-[62ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:mt-4 sm:text-[14px]">
            A living list of software and workflow tools I use to build and ship products. Defaults change, but the focus stays on speed, clarity, and minimalism.
          </p>
          <p className="text-muted mt-2 text-[12px] sm:text-[13px]">
            Last updated: April 2026
          </p>
        </header>

        <div className="space-y-8 sm:space-y-10">
          <section className="border-soft rounded-md border p-3 sm:p-4">
            <p className="text-muted text-[12px] uppercase tracking-[0.14em] sm:text-[13px]">
              Current setup
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] sm:text-[14px]">
              {setupHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-[#2a303b] px-2 py-1 text-[#c0c5cf]"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-muted text-[14px] leading-[1.7] sm:text-[15px]">
              This site is built with <span className="text-heading font-medium">React</span>,{' '}
              <span className="text-heading font-medium">Framer Motion</span>, and{' '}
              <span className="text-heading font-medium">Tailwind CSS</span>, and deployed on{' '}
              <span className="text-heading font-medium">Vercel</span>.
            </p>
            <p className="text-muted text-[14px] leading-[1.7] sm:text-[15px]">
              Code and implementation details are open source on{' '}
              <a
                href="https://github.com/v9mirza"
                target="_blank"
                rel="noreferrer"
                className="text-heading font-medium underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-[#d98973] hover:decoration-[#d98973]/60"
              >
                GitHub
              </a>
              .
            </p>
          </section>

          {toolSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-heading mb-3 text-[17px] font-medium sm:mb-4 sm:text-[19px]">
                {section.title}
              </h2>

              <ul className="border-soft divide-y divide-[#1f232b] rounded-md border">
                {section.items.map((item) => (
                  <li key={item.name} className="p-3 sm:p-4">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
                    >
                      <p className="text-heading text-[14px] font-medium transition-colors duration-200 group-hover:text-[#d98973] sm:text-[15px]">
                        {item.name}
                      </p>
                      <p className="text-muted mt-1 text-[13px] leading-[1.6] sm:text-[14px]">
                        {item.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="text-muted text-[12px] italic opacity-75 sm:text-[13px]">
            More tools I use occasionally: Postman, Figma, Obsidian, and tmux.
          </p>
        </div>

      </main>
      
      <footer className="border-soft border-t py-6 sm:py-7 mt-12">
        <div className="mx-auto flex w-full max-w-[700px] flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-6">
          <p className="text-muted text-[11px] leading-[1.2] opacity-80">
            © 2026 Hassan Mirza · Open to work
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

export default UsesPage
