import ConnectSection from './components/ConnectSection'
import ExperienceItem from './components/ExperienceItem'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProjectCard from './components/ProjectCard'
import Section from './components/Section'
import SkillsSection from './components/SkillsSection'
import { experienceItems } from './data/experience'
import { projects } from './data/projects'
import { skillCategories } from './data/skills'

import { motion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'

const GithubActivity = lazy(() => import('./components/GithubActivity'))
const StatsSection = lazy(() => import('./components/StatsSection'))

function SectionFallback() {
  return <div className="border-soft bg-card h-[96px] animate-pulse rounded-md border" aria-hidden="true" />
}

function App() {
  const [openExperienceIndex, setOpenExperienceIndex] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b]"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[700px] px-4 sm:px-5 md:px-6">
        <Hero />

        <Section id="experience" title="Experience">
          <div className="space-y-4">
            {experienceItems.map((item, index) => (
              <ExperienceItem
                key={`${item.company}-${item.role}`}
                item={item}
                isOpen={openExperienceIndex === index}
                onToggle={() =>
                  setOpenExperienceIndex((prev) => (prev === index ? null : index))
                }
              />
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <p className="text-muted mt-4 text-[13px] sm:mt-5 sm:text-[14px]">
            Want to see more?{' '}
            <a
              href="https://github.com/v9mirza?tab=repositories"
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-[#747b88] underline-offset-2 transition-colors hover:text-[#d98973] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d98973]/60"
            >
              Check them out.
            </a>
          </p>
        </Section>

        <Section id="github-activity" title="GitHub Snapshot">
          <Suspense fallback={<SectionFallback />}>
            <GithubActivity />
          </Suspense>
        </Section>

        <Section id="skills" title="Skills">
          <SkillsSection categories={skillCategories} />
        </Section>

        <Section id="stats" title="Stats">
          <Suspense fallback={<SectionFallback />}>
            <StatsSection />
          </Suspense>
        </Section>

        <Section id="connect" title="Connect">
          <ConnectSection />
        </Section>

        <Footer />
      </main>
    </motion.div>
  )
}

export default App
