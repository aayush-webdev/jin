import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import LiveProjectButton from '../components/LiveProjectButton'

interface Project {
  num: string
  name: string
  category: string
  col1Img1: string
  col1Img2: string
  col2Img: string
}

const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    num: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    num: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

// ─── Layout constants ──────────────────────────────────────────────────────────
// How far from the top of the viewport the first card pins
const STICKY_TOP_PX = 80
// Additional downward offset per subsequent card (creates the "peek" effect)
const STACK_OFFSET_PX = 28
// How much each buried card shrinks (e.g. 0.04 = 4% smaller per level)
const SCALE_PER_LEVEL = 0.04

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project
  index: number
  totalCards: number
  /** Shared scrollYProgress from the cards wrapper — goes 0→1 as the whole stack scrolls */
  sectionProgress: MotionValue<number>
}

// ─── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ project, index, totalCards, sectionProgress }: ProjectCardProps) {
  /*
   * Stacking logic
   * ──────────────
   * The cards wrapper is divided into `totalCards` equal scroll segments.
   * Card[i] starts compressing at the moment card[i+1] begins sliding on top
   * of it — i.e. at scrollProgress = i / totalCards.
   * It reaches its fully-compressed state by scrollProgress = (i+1) / totalCards.
   *
   * The LAST card never compresses (it stays at scale 1 the whole time).
   */
  const segStart = index / totalCards
  const segEnd = (index + 1) / totalCards

  // Cards buried deeper get compressed more; last card never compresses
  const targetScale =
    index < totalCards - 1
      ? 1 - (totalCards - 1 - index) * SCALE_PER_LEVEL
      : 1

  const scale = useTransform(sectionProgress, [segStart, segEnd], [1, targetScale])

  return (
    // Scroll-space container — one full viewport height per card
    <div
      className="h-screen flex items-start"
      style={{ paddingTop: `${index * STACK_OFFSET_PX}px` }}
    >
      <motion.div
        style={{
          scale,
          // Sticky pins from the top; each card is offset slightly lower
          position: 'sticky',
          top: `${STICKY_TOP_PX + index * STACK_OFFSET_PX}px`,
          // Scale from the top so compressed cards "sink" rather than float up
          transformOrigin: 'top center',
        }}
        className="
          w-full
          rounded-[32px] sm:rounded-[44px] md:rounded-[56px]
          border-2 border-[#E2E6EF]
          bg-white
          p-4 sm:p-6 md:p-8
        "
      >
        {/* ── Header row ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-6">
            <span
              className="font-black text-[#19191D] leading-none"
              style={{ fontSize: 'clamp(2rem, 7vw, 100px)' }}
            >
              {project.num}
            </span>
            <div className="flex flex-col">
              <span
                className="text-[#19191D] uppercase tracking-widest font-medium opacity-60"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[#19191D] font-black uppercase leading-none"
                style={{ fontSize: 'clamp(0.95rem, 2.5vw, 2.5rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton id={`live-btn-${project.num}`} />
        </div>

        {/* ── Image grid ─────────────────────────────────────────────────── */}
        {/*
         * Mobile  (<sm):  Big hero image on top, two smaller images side-by-side below
         * Desktop (≥sm):  Original layout — left col (2 stacked) + right col (1 tall)
         */}

        {/* MOBILE LAYOUT -------------------------------------------------- */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Hero image */}
          <img
            src={project.col2Img}
            alt={`${project.name} main`}
            loading="lazy"
            className="w-full object-cover rounded-2xl"
            style={{ height: 'clamp(180px, 52vw, 320px)' }}
          />
          {/* Two smaller images side by side */}
          <div className="flex gap-3">
            <img
              src={project.col1Img1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="flex-1 object-cover rounded-2xl"
              style={{ height: 'clamp(110px, 28vw, 200px)' }}
            />
            <img
              src={project.col1Img2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="flex-1 object-cover rounded-2xl"
              style={{ height: 'clamp(110px, 28vw, 200px)' }}
            />
          </div>
        </div>

        {/* DESKTOP LAYOUT ------------------------------------------------- */}
        <div className="hidden sm:flex gap-4">
          {/* Left column — 40% */}
          <div className="flex flex-col gap-4" style={{ width: '40%' }}>
            <img
              src={project.col1Img1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover rounded-[36px] md:rounded-[48px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1Img2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover rounded-[36px] md:rounded-[48px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>

          {/* Right column — 60% */}
          <div style={{ width: '60%' }}>
            <img
              src={project.col2Img}
              alt={`${project.name} main`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[36px] md:rounded-[48px]"
              style={{
                minHeight: 'clamp(290px, 38vw, 580px)',
                maxHeight: 'clamp(290px, 38vw, 580px)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── ProjectsSection ───────────────────────────────────────────────────────────
export default function ProjectsSection() {
  /*
   * Track scroll progress on the CARDS WRAPPER (not the whole section or each
   * individual card).  offset 'start start' → 'end end' means:
   *   progress = 0  when the wrapper's top  hits the viewport's top
   *   progress = 1  when the wrapper's bottom hits the viewport's bottom
   * This gives us a clean 0→1 range covering exactly the stacking animation.
   */
  const cardsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="
        bg-[#F5F7FB]
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14
        z-10 relative
        px-5 sm:px-8 md:px-10
        pt-20 sm:pt-24 md:pt-32
        pb-20
      "
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* Cards wrapper — scroll progress tracked here */}
      <div ref={cardsRef} className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
            sectionProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}