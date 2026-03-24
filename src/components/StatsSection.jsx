const stats = [
  { value: '10+', label: 'Projects built' },
  { value: '4+', label: 'Years coding' },
  { value: '10+', label: 'Articles written' },
  { value: '4', label: 'Core languages' },
  { value: '100+', label: 'GitHub commits' },
  { value: '∞', label: 'Bugs squashed' },
]

function StatsSection() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-soft bg-card group rounded-md border p-4 sm:p-5 transition-all duration-300 hover:border-[#d98973]/40 hover:shadow-md hover:shadow-[#d98973]/5"
        >
          <p className="font-title text-[#d98973] text-[32px] sm:text-[36px] font-medium leading-none tracking-tight transition-colors duration-300">
            {stat.value}
          </p>
          <p className="text-muted mt-2 text-[12px] sm:text-[13px] leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsSection
