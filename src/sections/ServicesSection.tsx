import FadeIn from '../components/FadeIn'

interface Service {
  num: string
  name: string
  description: string
}

const SERVICES: Service[] = [
  {
    num: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    num: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    num: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    num: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    num: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase leading-none tracking-tight text-center text-[#19191D]
            mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      {/* Services list */}
      <ul className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30}>
            <li
              id={`service-${service.num}`}
              className="flex items-start gap-6 md:gap-10
                py-8 sm:py-10 md:py-12
                border-t border-[#E2E6EF]
                last:border-b"
            >
              {/* Number */}
              <span
                className="font-black text-[#19191D] leading-none flex-shrink-0 -mt-2"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                aria-hidden
              >
                {service.num}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col gap-2 pt-2">
                <span
                  className="font-medium uppercase text-[#19191D]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <span
                  className="font-light leading-relaxed text-[#19191D] max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </span>
              </div>
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  )
}
