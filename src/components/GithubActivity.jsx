const rows = 7
const cols = 44

const levels = ['bg-[#22252c]', 'bg-[#a86350]/32', 'bg-[#c2735b]/58']

function GithubActivity() {
  const cells = Array.from({ length: rows * cols }, (_, index) => {
    const isGap = index % 13 === 0 || index % 17 === 0 || index % 19 === 0
    const level = isGap ? 0 : (index * 5) % levels.length
    return levels[level]
  })

  return (
    <div className="border-soft bg-card rounded-md border p-3 md:p-4 transition-all duration-300 hover:-translate-y-[1px] hover:border-[#d98973]/50">
      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wide text-[#777c86]">
        <span>Mar</span>
        <span>Jun</span>
        <span>Sep</span>
        <span>Dec</span>
        <span>Mar</span>
      </div>
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cells.map((colorClass, index) => (
          <span
            key={index}
            className={`h-[6px] w-[6px] rounded-[2px] sm:h-[8px] sm:w-[8px] ${colorClass}`}
          />
        ))}
      </div>
      <p className="text-muted mt-3 text-[13px]">Sample contribution view (static)</p>
    </div>
  )
}

export default GithubActivity
