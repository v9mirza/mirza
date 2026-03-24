import { useState, useEffect, useRef } from 'react'
import { motion, animate, useInView } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Projects built' },
  { value: '4+', label: 'Years coding' },
  { value: '10+', label: 'Articles written' },
  { value: '4', label: 'Core languages' },
  { value: '100+', label: 'GitHub commits' },
  { value: '∞', label: 'Bugs squashed' },
]

function CountUp({ value }) {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (!isInView) return

    const numericMatch = value.match(/\d+/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const target = parseInt(numericMatch[0], 10)
    const suffix = value.replace(numericMatch[0], '')

    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest) + suffix)
      },
    })

    return () => controls.stop()
  }, [value, isInView])

  return <span ref={ref}>{displayValue}</span>
}

function StatsSection() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="border-soft bg-card group rounded-md border p-4 sm:p-5 transition-all duration-300 hover:border-[#d98973]/40 hover:shadow-md hover:shadow-[#d98973]/5"
        >
          <p className="font-title text-[#d98973] text-[32px] sm:text-[36px] font-medium leading-none tracking-tight transition-colors duration-300">
            <CountUp value={stat.value} />
          </p>
          <p className="text-muted mt-2 text-[12px] sm:text-[13px] leading-snug">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsSection
