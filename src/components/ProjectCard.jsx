function ProjectCard({ project }) {
  const isExternal = project.link.startsWith('http')

  return (
    <a
      href={project.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className="border-soft bg-card group relative block overflow-hidden rounded-md border p-4 transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.01] hover:border-[#d98973]/50 hover:shadow-lg hover:shadow-[#d98973]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 min-h-[160px]"
    >
      {/* Background Image Reveal */}
      {project.image && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-0 mix-blend-overlay transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
        </>
      )}

      {/* Content wrapper to stay above background */}
      <div className="relative z-10 flex h-full flex-col">
        <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#7f8590] transition-colors duration-300 group-hover:text-[#d98973]/70">{project.meta}</p>
        <h3 className="text-heading text-[16px] font-medium sm:text-[17px] transition-colors duration-300 group-hover:text-[#d98973]">{project.title}</h3>
        <p className="text-muted mt-2 text-[13px] leading-[1.58] line-clamp-2 sm:line-clamp-3">{project.description}</p>
        <div className="mt-auto pt-4 inline-flex items-center gap-2 text-[12px] text-[#c8ced8] transition-all duration-300">
          <span className="underline decoration-transparent underline-offset-4 transition-all duration-300 group-hover:decoration-[#d98973]/60">
            View details
          </span>
          <span className="text-[11px] text-[#969faf] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
            ↗
          </span>
        </div>
      </div>
    </a>
  )
}

export default ProjectCard
