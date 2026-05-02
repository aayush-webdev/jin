interface LiveProjectButtonProps {
  id?: string
}

export default function LiveProjectButton({ id }: LiveProjectButtonProps) {
  return (
    <button
      id={id}
      className="rounded-full border-2 border-[#3C83F5] text-[#3C83F5] font-medium uppercase tracking-widest cursor-pointer
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        transition-colors duration-200 hover:bg-[rgba(60,131,245,0.08)]"
    >
      Live Project
    </button>
  )
}
