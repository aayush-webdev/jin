interface ContactButtonProps {
  id?: string
}

export default function ContactButton({ id = 'contact-btn' }: ContactButtonProps) {
  return (
    <button
      id={id}
      onClick={() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }}
      className="
        relative overflow-hidden
        rounded-[50px] uppercase tracking-widest font-medium text-white
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base

        backdrop-blur-lg bg-[#3C83F5]/90
        border border-white/20

        shadow-[0_8px_32px_rgba(60,131,245,0.35)]
        hover:shadow-[0_10px_45px_rgba(60,131,245,0.5)]

        transition-all duration-300 ease-out
        hover:bg-[#3C83F5]/90 active:scale-95
      "
    >
      {/* glass shine */}
      <span className="absolute inset-0 bg-white/10 opacity-50" />

      {/* subtle gradient depth */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#3C83F5]/30 to-[#2F6FE0]/30 opacity-0 hover:opacity-100 transition duration-300" />

      {/* content */}
      <span className="relative z-10">Contact Me</span>
    </button>
  )
}