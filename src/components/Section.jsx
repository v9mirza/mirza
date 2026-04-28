import { useFadeIn } from '../hooks/useFadeIn'

function Section({ id, title, children }) {
  const [ref, isVisible] = useFadeIn({ threshold: 0.1, rootMargin: '0px 0px -80px 0px' })

  return (
    <section
      id={id}
      ref={ref}
      className={`border-b border-[#1f232b]/45 py-6 sm:py-7 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {title ? (
        <h2 className="text-heading mb-3 text-[22px] font-medium tracking-tight sm:mb-3.5 sm:text-[24px]">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}

export default Section
