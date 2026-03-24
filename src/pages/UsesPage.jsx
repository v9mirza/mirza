import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

function UsesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b] flex flex-col"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[760px] px-3 sm:px-4 md:px-5 flex-1 py-10 sm:py-12">
        
        <header className="mb-10 sm:mb-12 border-b border-soft pb-6">
          <h1 className="font-title text-accent text-[38px] font-medium leading-none tracking-tight sm:text-[42px] md:text-[46px]">
            Uses
          </h1>
          <p className="mt-3.5 max-w-[62ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:mt-4 sm:text-[14px]">
            A living document of the exact software, hardware, and tools I use on a daily basis to build software. Defaults change, but the focus on speed and minimalism remains.
          </p>
        </header>

        <div className="space-y-12 sm:space-y-16">
          
          {/* Imprint Section */}
          <section className="space-y-4">
            <p className="text-muted text-[14px] sm:text-[15px] leading-[1.7]">
              <span className="text-heading font-medium">Stack</span> — A brief overview of the technologies, tools, and processes used to build this website.
            </p>

            <p className="text-muted text-[14px] sm:text-[15px] leading-[1.7]">
              This site is crafted with <span className="text-[#e8ebf0] font-medium">React</span>, <span className="text-[#e8ebf0] font-medium">Framer Motion</span>, and <span className="text-[#e8ebf0] font-medium">Tailwind CSS</span>. It is hosted on <span className="text-[#e8ebf0] font-medium">Vercel</span>.
            </p>

            <p className="text-muted text-[14px] sm:text-[15px] leading-[1.7]">
              All code and patterns are open source — explore them on my <a href="https://github.com/v9mirza" target="_blank" rel="noreferrer" className="text-[#e8ebf0] font-medium underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-[#d98973] hover:decoration-[#d98973]/60">GitHub</a>.
            </p>
          </section>

          {/* Personal Stack Section */}
          <section>
            <h2 className="text-heading text-[18px] sm:text-[20px] font-medium font-title mb-6 opacity-90">
              Personal Stack
            </h2>
            
            <ul className="space-y-4">
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Zen Browser</span> <span className="text-muted ml-1">— My preferred browser for privacy and speed.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Spotify</span> <span className="text-muted ml-1">— Music for every coding session and long focus.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Notion</span> <span className="text-muted ml-1">— My project management and documentation tool.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">VS Code/Zed</span> <span className="text-muted ml-1">— My primary editor for writing code and thinking in text.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Ghostty</span> <span className="text-muted ml-1">— A fast, feature-rich terminal emulator with a focuses on performance.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Docker</span> <span className="text-muted ml-1">— For spinning up local databases and isolated environments.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Arch Linux</span> <span className="text-muted ml-1">— I prefer using Arch Linux for backend dev work and deployments.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Hyprland</span> <span className="text-muted ml-1">— My tiling window manager of choice for an ultra-productive Linux workflow.</span>
              </li>
              <li className="text-[14px] sm:text-[15px] leading-[1.6]">
                <span className="text-heading font-medium">Neovim</span> <span className="text-muted ml-1">— For quick terminal edits and a distraction-free coding experience.</span>
              </li>
            </ul>
            
            <p className="text-muted text-[13px] sm:text-[14px] pt-6 italic opacity-60">
              and many more...
            </p>
          </section>
          
        </div>

      </main>
      
      <footer className="border-soft border-t py-6 sm:py-7 mt-12">
        <div className="mx-auto w-full max-w-[760px] px-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 md:px-5">
          <p className="text-muted text-[11px] leading-[1.2] opacity-80">
            © 2026 Hassan Mirza · Open to work
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

export default UsesPage
