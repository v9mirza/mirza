import { useState } from 'react'

function ExperienceItem({ item }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="border-soft bg-card rounded-md border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.005] hover:border-[#d98973]/50 hover:shadow-lg hover:shadow-[#d98973]/5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-heading text-[14px] font-medium sm:text-[15px]">{item.role}</h3>
            <p className="text-[12px] text-[#b3b8c1] sm:text-[13px]">{item.company}</p>
          </div>
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#2a303b] text-[#b3b8c1] transition-transform duration-200 ${
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

      <div className="text-muted mt-2 flex flex-col gap-1 text-[11px] md:flex-row md:justify-between md:text-right sm:text-[12px]">
        <p className="md:text-left">{item.location}</p>
        <p>{item.duration}</p>
      </div>

      {isOpen && (
        <>
          <ul className="text-muted mt-3 list-disc space-y-1.5 pl-5 text-[12.5px] leading-[1.58] sm:text-[13px]">
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
        </>
      )}
    </article>
  )
}

export default ExperienceItem
