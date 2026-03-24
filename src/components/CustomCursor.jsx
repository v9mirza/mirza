import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    // Select all interactive elements
    const updateInteractiveElements = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart)
        el.addEventListener('mouseleave', handleHoverEnd)
      })
      // Return cleanup function for the listeners we just added
      return () => {
        interactives.forEach(el => {
          el.removeEventListener('mouseenter', handleHoverStart)
          el.removeEventListener('mouseleave', handleHoverEnd)
        })
      }
    }

    // Run once on mount
    let cleanupInteractive = updateInteractiveElements()

    // Setup an observer to run when DOM changes (ideal for React apps doing client-side routing)
    const observer = new MutationObserver(() => {
      if (cleanupInteractive) cleanupInteractive()
      cleanupInteractive = updateInteractiveElements()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
      if (cleanupInteractive) cleanupInteractive()
    }
  }, [isVisible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      height: 12,
      width: 12,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(217, 137, 115, 0.1)',
      border: '1px solid rgba(217, 137, 115, 0.4)',
      opacity: isVisible ? 1 : 0,
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-[#d98973] mix-blend-exclusion"
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      style={{
         // Hide default cursor across the entire site when the custom cursor is active
        '@media (pointer: fine)': {
          body: { cursor: 'none' },
          'a, button, [role="button"]': { cursor: 'none' }
        }
      }}
    />
  )
}

export default CustomCursor
