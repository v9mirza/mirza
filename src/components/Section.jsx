function Section({ id, title, children }) {
  return (
    <section id={id} className="border-b border-[#1f232b]/45 py-7 sm:py-8">
      {title ? (
        <h2 className="text-heading mb-3.5 text-[23px] font-medium tracking-tight sm:mb-4 sm:text-[25px]">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}

export default Section
