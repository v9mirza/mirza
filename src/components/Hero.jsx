import { useFadeIn } from '../hooks/useFadeIn'
import { FiFileText, FiMail } from 'react-icons/fi'

const quickLinks = [
  { label: 'Resume', href: '/mirza-resume-fsd.pdf', icon: FiFileText },
  { label: 'Get in touch', href: 'mailto:v9mirza@proton.me', icon: FiMail },
]

function Hero() {
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 })

  return (
    <section
      id="home"
      ref={ref}
      className={`relative overflow-hidden border-b border-soft py-7 sm:py-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <p className="text-muted relative z-[1] text-[13px] sm:text-[14px]">developer • technical writer • builder</p>
      <h1 className="font-title text-accent relative z-[1] mt-2 text-[38px] font-medium leading-none tracking-tight sm:text-[42px] md:text-[46px]">
        Hassan Mirza
      </h1>
      <p className="relative z-[1] mt-3.5 max-w-[62ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:mt-4 sm:text-[14px]">
        I&apos;m Hassan Mirza, a full-stack developer and technical writer who turns complex ideas into simple, reliable software. I focus on clean APIs, predictable systems, and interfaces that stay out of the way. <br />
        Currently pursuing a BCA, I write about developer tools and system design to think clearly and explain complexity simply.
      </p>

      <div className="text-muted relative z-[1] mt-4 flex flex-wrap gap-3 text-[13px] sm:mt-5 sm:gap-4 sm:text-[14px]">
        {quickLinks.map((link) => {
          const Icon = link.icon
          const isMailtoOrHttp =
            link.href.startsWith('http') || link.href.startsWith('mailto:')
          const isResume = link.href.includes('mirza-resume-fsd.pdf')

          return (
          <a
            key={link.label}
            href={link.href}
            target={isMailtoOrHttp || isResume ? '_blank' : undefined}
            rel={isMailtoOrHttp || isResume ? 'noreferrer noopener' : undefined}
            download={isResume ? 'mirza-resume-fsd.pdf' : undefined}
            className="inline-flex items-center gap-2 rounded-sm text-[#8d94a0] transition-all duration-200 hover:text-[#d98973] hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
          >
            <Icon className="text-[12px]" />
            {link.label}
          </a>
          )
        })}
      </div>
    </section>
  )
}

export default Hero
