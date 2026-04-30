import { useRef, useEffect, useState } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
  style?: React.CSSProperties
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style = {},
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const inZone =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding

      if (inZone) {
        setIsActive(true)
        el.style.transition = activeTransition
        el.style.transform = `translate3d(${distX / strength}px, ${distY / strength}px, 0)`
      } else {
        setIsActive(false)
        el.style.transition = inactiveTransition
        el.style.transform = 'translate3d(0, 0, 0)'
      }
    }

    const handleMouseLeave = () => {
      setIsActive(false)
      el.style.transition = inactiveTransition
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [padding, strength, activeTransition, inactiveTransition])

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform', ...style }}
      data-active={isActive}
    >
      {children}
    </div>
  )
}
