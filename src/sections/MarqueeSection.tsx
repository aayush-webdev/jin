import { useRef, useEffect, useState } from 'react'

const ALL_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const ROW1_IMAGES = [...ALL_IMAGES.slice(0, 11), ...ALL_IMAGES.slice(0, 11), ...ALL_IMAGES.slice(0, 11)]
const ROW2_IMAGES = [...ALL_IMAGES.slice(11), ...ALL_IMAGES.slice(11), ...ALL_IMAGES.slice(11)]

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setScrollOffset(offset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-x-hidden"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — moves right */}
        <div
          ref={row1Ref}
          className="flex gap-3"
          style={{
            transform: `translateX(${scrollOffset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {ROW1_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-2xl object-cover flex-shrink-0"
              style={{ width: '420px', height: '270px' }}
            />
          ))}
        </div>

        {/* Row 2 — moves left */}
        <div
          ref={row2Ref}
          className="flex gap-3"
          style={{
            transform: `translateX(${-(scrollOffset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {ROW2_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-2xl object-cover flex-shrink-0"
              style={{ width: '420px', height: '270px' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
