function ExperienceItem({ item, isOpen, onToggle }) {
  return (
    <article className="border-soft rounded-md border bg-transparent p-3 transition-colors duration-200 hover:border-[#d98973]/40 sm:p-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full rounded-md p-1 -m-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
      >
        <div className="flex items-center justify-between gap-2 sm:items-start sm:gap-3">
          <div className="min-w-0">
            <h3 className="text-heading text-[14px] font-medium sm:text-[15px]">{item.role}</h3>
            <p className="text-[12px] text-[#b3b8c1] sm:text-[13px]">{item.company}</p>
          </div>
          <span
            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2a303b] text-[#b3b8c1] transition-transform duration-200 sm:h-8 sm:w-8 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
              <path d="M7 4l6 6-6 6" />
            </svg>
          </span>
        </div>
      </button>

      <div className="text-muted mt-2 flex items-center justify-between gap-2 text-[11px] sm:text-[12px]">
        <p className="truncate">{item.location}</p>
        <span className="shrink-0 rounded-full border border-[#2a303b] px-2 py-0.5 text-[11px] text-[#aeb4be] sm:rounded-none sm:border-0 sm:px-0 sm:py-0 sm:text-[12px]">
          {item.duration}
        </span>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <ul className="text-muted mt-3 list-disc space-y-1.5 pl-4 text-[12.5px] leading-[1.58] sm:pl-5 sm:text-[13px]">
            {item.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm border border-[#2a303b] bg-[#18181b] px-2 py-1 text-[11px] text-[#b4b8c2] transition-all duration-200 hover:border-[#d98973]/40 hover:text-[#d98973]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ExperienceItem
