import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import ExperienceItem from '../components/ExperienceItem'
import SkillsSection from '../components/SkillsSection'
import { experienceItems } from '../data/experience'
import { skillCategories } from '../data/skills'
import { FiDownload } from 'react-icons/fi'

function ResumePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b] flex flex-col"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[760px] px-3 sm:px-4 md:px-5 flex-1 py-7 sm:py-8">
        
        <header className="mb-10 sm:mb-12 border-b border-soft pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-title text-accent text-[38px] font-medium leading-none tracking-tight sm:text-[42px] md:text-[46px]">
              Resume
            </h1>
            <p className="mt-3.5 max-w-[62ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:mt-4 sm:text-[14px]">
              Full-Stack Developer • Technical Writer
            </p>
          </div>
          <a
            href="/mirza-resume-fsd.pdf"
            download="mirza-resume-fsd.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-[#d98973]/10 border border-[#d98973]/20 px-3 py-1.5 text-[13px] font-medium text-[#d98973] transition-all duration-300 hover:bg-[#d98973]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 self-start sm:self-auto"
          >
            <FiDownload className="text-[14px]" />
            Download PDF
          </a>
        </header>

        <div className="space-y-10 sm:space-y-12">
          <section>
            <h2 className="text-heading mb-4 text-[20px] font-medium tracking-tight sm:mb-5">
              Experience
            </h2>
            <div className="space-y-4">
              {experienceItems.map((item) => (
                <ExperienceItem key={`${item.company}-${item.role}`} item={item} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-heading mb-4 text-[20px] font-medium tracking-tight sm:mb-5">
              Skills
            </h2>
            <SkillsSection categories={skillCategories} />
          </section>
          
          <section>
            <h2 className="text-heading mb-4 text-[20px] font-medium tracking-tight sm:mb-5">
              Education
            </h2>
            <div className="border-soft bg-card rounded-md border p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-[15px] font-medium text-[#e8ebf0]">Bachelor of Computer Applications (BCA)</h3>
                <span className="text-[12px] text-[#7f8590] mt-1 sm:mt-0">Graduating 2026</span>
              </div>
              <p className="text-[13px] text-[#a7adb8]">Focus on software engineering, system design, and algorithms.</p>
            </div>
          </section>
        </div>

      </main>
      
      <footer className="border-soft border-t py-6 sm:py-7 mt-8">
        <div className="mx-auto w-full max-w-[760px] px-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 md:px-5">
          <p className="text-muted text-[11px] leading-[1.2] opacity-80">
            © 2026 Hassan Mirza · Open to work
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

export default ResumePage
