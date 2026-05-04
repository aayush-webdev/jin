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
      className="rounded-full font-medium uppercase tracking-widest text-white cursor-pointer
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        transition-colors duration-200 bg-[#3C83F5] hover:bg-[#2F6FE0]"
    >
      Contact Me
    </button>
  )
}
