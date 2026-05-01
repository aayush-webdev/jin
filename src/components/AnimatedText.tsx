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

  // Split into words so the browser can only wrap at word boundaries,
  // never mid-word. Each word is an inline-block so it stays together.
  const words = text.split(' ')
  const totalChars = text.replace(/ /g, '').length
  let charIndex = 0

  return (
    <p
      ref={ref}
      className={`relative ${className}`}
      style={style}
      aria-label={text}
    >
      {words.map((word, wi) => {
        const wordSpans = word.split('').map((char) => {
          const globalIndex = charIndex
          charIndex++
          const start = globalIndex / totalChars
          const end = Math.min(start + 1 / totalChars + 0.05, 1)
          return (
            <CharSpan
              key={`${wi}-${globalIndex}`}
              char={char}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
          )
        })

        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {wordSpans}
            {wi < words.length - 1 && (
              <span style={{ display: 'inline-block', width: '0.3em' }} aria-hidden />
            )}
          </span>
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
      <span style={{ opacity: 0, userSelect: 'none' }}>{char}</span>
      <motion.span
        style={{ opacity, position: 'absolute', left: 0, top: 0 }}
        aria-hidden
      >
        {char}
      </motion.span>
    </span>
  )
}
