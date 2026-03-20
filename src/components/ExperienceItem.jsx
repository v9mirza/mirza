function ExperienceItem({ item }) {
  return (
    <article className="border-soft bg-card rounded-md border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[1px] hover:border-[#d98973]/50">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-heading text-[14px] font-medium sm:text-[15px]">{item.role}</h3>
          <p className="text-[12px] text-[#b3b8c1] sm:text-[13px]">{item.company}</p>
        </div>
        <div className="text-muted text-[11px] md:text-right sm:text-[12px]">
          <p>{item.location}</p>
          <p>{item.duration}</p>
        </div>
      </div>

      <ul className="text-muted mt-3 list-disc space-y-1.5 pl-5 text-[12.5px] sm:text-[13px] leading-[1.58]">
        {item.highlights.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-sm border border-[#2a303b] bg-[#18181b] px-2 py-1 text-[11px] text-[#b4b8c2]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}

export default ExperienceItem
