function SkillsSection({ categories }) {
  return (
    <div className="max-w-[68ch]">
      <p className="text-muted mb-5 text-[14px] leading-[1.55] sm:text-[15px]">
        I work across the stack: from typed JavaScript backends and React frontends to Linux-first tooling and deployment. The focus is always on clear boundaries, observability, and systems that are easy to debug.
      </p>
      <div className="space-y-2.5 sm:space-y-2">
        {categories.map((category) => (
          <p key={category.title} className="text-[14px] leading-[1.6] text-[#aeb3bc] sm:text-[15px]">
            <span className="text-[#cfd3db]">{category.title}</span> - {category.items.join(', ')}
          </p>
        ))}
      </div>
    </div>
  )
}

export default SkillsSection
