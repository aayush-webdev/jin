import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";
import ContactButton from "../components/ContactButton";

const NAV_LINKS = ["About", "Services", "Projects", "Contact"];

const PORTRAIT_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport for disabling Magnet on touch devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      className="h-screen min-h-[100svh] md:min-h-0 flex flex-col relative"
      style={{ overflowX: "clip" }}
    >
      {/* ── Navbar (z-50 so it sits above mobile overlay) ── */}
      <FadeIn delay={0} y={-20} className="w-full relative z-50">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {/* Mobile: Logo */}
          <div className="md:hidden font-black uppercase tracking-tight leading-none text-[#19191D] text-[2rem]">
            JITENDER
          </div>

          {/* Desktop: Nav links — UNTOUCHED */}
          <div className="hidden md:flex justify-between w-full">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                id={`nav-${link.toLowerCase()}`}
                className="text-[#19191D] font-medium uppercase tracking-wider
                  text-sm md:text-lg lg:text-[1.4rem]
                  transition-opacity duration-200 hover:opacity-70"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile: Hamburger / Close toggle */}
          <button
            className="md:hidden text-[#19191D] hover:opacity-70 transition-opacity"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>
      </FadeIn>

      {/* ── Mobile Full-Screen Menu Overlay ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-10
          bg-[#F5F7FB] transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={closeMenu}
            className="text-[#19191D] font-black uppercase tracking-widest text-4xl
              transition-opacity duration-200 hover:opacity-60"
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* ── Hero Heading ── */}
      <FadeIn
        delay={0.15}
        y={40}
        className="overflow-hidden px-6 md:px-6 flex justify-center md:block"
      >
        <h1
          className="hero-heading font-black uppercase tracking-tight w-full
            text-[clamp(3rem,13vw,4.8rem)] sm:text-[15vw] md:text-[16vw] lg:text-[13vw]
            mt-8 sm:mt-4 md:-mt-5
            text-center md:text-left
            leading-[1.1] md:leading-none
            whitespace-normal md:whitespace-nowrap"
          style={{ overflow: "hidden", textOverflow: "clip" }}
        >
          Hi, i&apos;m jitender
        </h1>
      </FadeIn>

      {/* ── Portrait ── */}
      <FadeIn
        delay={0.6}
        y={30}
        className="relative md:absolute z-10
          mx-auto md:mx-0 md:left-1/2 md:-translate-x-1/2
          w-[72vw] sm:w-[65vw] max-w-[520px]
          mt-4 mb-2 md:mt-0 md:mb-0
          md:bottom-0"
      >
        {isMobile ? (
          <img
            src={PORTRAIT_URL}
            alt="Jitender – 3D Creator portrait"
            className="w-full h-auto object-contain select-none"
            draggable={false}
            loading="eager"
            decoding="async"
          />
        ) : (
          <Magnet
            padding={80}
            strength={2.5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={PORTRAIT_URL}
              alt="Jitender – 3D Creator portrait"
              className="w-full h-auto object-contain select-none"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </Magnet>
        )}
      </FadeIn>

      {/* ── Bottom Bar: Tagline + CTA — DESKTOP UNTOUCHED ── */}
      <div
        className="mt-auto flex flex-col md:flex-row items-center md:items-end
        justify-center md:justify-between px-6 md:px-10 pb-10 sm:pb-8 md:pb-10
        relative z-20 gap-5 md:gap-0"
      >
        <FadeIn
          delay={0.35}
          y={20}
          className="w-full flex justify-center md:justify-start"
        >
          <p
            className="text-[#19191D] font-light uppercase tracking-wide leading-relaxed md:leading-snug
              max-w-[280px] sm:max-w-[220px] md:max-w-[260px] text-center md:text-left
              text-[0.95rem] md:text-[clamp(0.65rem,1.4vw,1.5rem)]"
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton id="hero-contact-btn" />
        </FadeIn>
      </div>
    </section>
  );
}
