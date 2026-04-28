import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SiHashnode } from 'react-icons/si'

const links = [
  {
    label: 'GitHub',
    handle: '@v9mirza',
    href: 'https://github.com/v9mirza',
    icon: FiGithub,
    description: 'Code, projects & open source',
  },
  {
    label: 'LinkedIn',
    handle: 'Hassan Mirza',
    href: 'https://linkedin.com/in/v9mirza',
    icon: FiLinkedin,
    description: 'Professional profile & experience',
  },
  {
    label: 'Hashnode',
    handle: '@v9mirza',
    href: 'https://hashnode.com/@v9mirza',
    icon: SiHashnode,
    description: 'Technical articles & dev writing',
  },
  {
    label: 'X',
    handle: '@v9mirza',
    href: 'https://x.com/v9mirza',
    icon: FiTwitter,
    description: 'Build updates, thoughts & dev notes',
  },
]

function ConnectSection() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="border-soft bg-card rounded-md border p-3 transition-colors duration-200 hover:border-[#d98973]/35 sm:p-4">
        <p className="text-[13px] text-[#c0c5cf] sm:text-[14px]">Prefer email for work opportunities.</p>
        <p className="mt-1 text-[12px] text-[#99a0ac] sm:text-[13px]">Usually replies within 24 hours.</p>
        <a
          href="mailto:v9mirza@proton.me"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#d98973]/40 bg-[#d98973]/12 px-3 py-2 text-[13px] font-medium text-[#f0d1c7] transition-all duration-300 hover:border-[#d98973]/60 hover:bg-[#d98973]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 sm:w-auto"
        >
          Start a conversation
          <FiArrowRight className="text-[14px]" />
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noreferrer noopener'}
              className="border-soft bg-card group flex items-start gap-3 rounded-md border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[2px] hover:border-[#d98973]/50 hover:shadow-lg hover:shadow-[#d98973]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
            >
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-[#2a303b] text-[#7f8590] transition-all duration-300 group-hover:border-[#d98973]/40 group-hover:text-[#d98973]">
                <Icon className="text-[15px]" />
              </span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <p className="text-heading text-[14px] font-medium transition-colors duration-300 group-hover:text-[#d98973]">
                    {link.label}
                  </p>
                  <p className="text-muted text-[11px] truncate">{link.handle}</p>
                </div>
                <p className="mt-0.5 text-[12px] leading-snug text-[#a8aebb]">
                  {link.description}
                </p>
              </div>
              <span className="ml-auto self-center flex-shrink-0 text-[11px] text-[#555c68] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                ↗
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default ConnectSection
