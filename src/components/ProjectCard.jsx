function ProjectCard({ project }) {
  const isExternal = project.link.startsWith('http')

  return (
    <a
      href={project.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className="border-soft bg-card group block rounded-md border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.01] hover:border-[#d98973]/50 hover:shadow-lg hover:shadow-[#d98973]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
    >
      <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#7f8590] transition-colors duration-300 group-hover:text-[#d98973]/70">{project.meta}</p>
      <h3 className="text-heading text-[16px] font-medium sm:text-[17px] transition-colors duration-300 group-hover:text-[#d98973]">{project.title}</h3>
      <p className="text-muted mt-2 text-[13px] leading-[1.58]">{project.description}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-[12px] text-[#c8ced8] transition-all duration-300">
        <span className="underline decoration-transparent underline-offset-4 transition-all duration-300 group-hover:decoration-[#d98973]/60">
          View details
        </span>
        <span className="text-[11px] text-[#969faf] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
          ↗
        </span>
      </div>
    </a>
  )
}

export default ProjectCard
