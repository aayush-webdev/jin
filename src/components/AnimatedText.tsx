import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className = '', style = {} }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')

  return (
    <p
      ref={ref}
      className={`relative ${className}`}
      style={{ overflowWrap: 'break-word', wordBreak: 'break-word', ...style }}
      aria-label={text}
    >
      {characters.map((char, i) => {
        const start = i / characters.length
        const end = start + 1 / characters.length

        return (
          <CharSpan
            key={i}
            char={char}
            progress={scrollYProgress}
            start={start}
            end={Math.min(end + 0.05, 1)}
          />
        )
      })}
    </p>
  )
}

interface CharSpanProps {
  char: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any
  start: number
  end: number
}

function CharSpan({ char, progress, start, end }: CharSpanProps) {
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ opacity: 0, userSelect: 'none' }}>{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{ opacity, position: 'absolute', left: 0, top: 0 }}
        aria-hidden
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  )
}
