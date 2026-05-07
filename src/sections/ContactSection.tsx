import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import emailjs from '@emailjs/browser'

// Social link icons as inline SVGs to avoid lucide peer-dep issues
const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.901l4.255 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://behance.net',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.971 13c-.17-1.883 1.271-2.065 1.789-2.065 1.156 0 1.773.768 1.889 2.065h-3.678zm-5.004 4.01s.908 0 1.3-.31c.387-.31.484-.725.484-1.305 0-.44-.145-.808-.478-1.063-.335-.259-.885-.385-1.65-.385H9v3.063h1.967zM9 7h2.549c1.322 0 2.38.226 2.38 1.786C13.929 10.243 13.2 10.7 12.51 10.9c1.013.2 1.73.838 1.73 2.119 0 2.045-1.615 2.981-3.43 2.981H9V7z" />
      </svg>
    ),
  },
  {
    label: 'Dribbble',
    href: 'https://dribbble.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
  },
]

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'sending' | 'sent'

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS credentials are not configured in .env')
      alert('Email service is not configured yet. Please try again later.')
      setStatus('idle')
      return
    }

    emailjs.send(
      serviceId,
      templateId,
      {
        from_name: form.name,
        reply_to: form.email,
        subject: form.subject,
        message: form.message,
      },
      publicKey
    )
      .then(() => {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      })
      .catch((err) => {
        console.error('Failed to send email:', err)
        alert('Failed to send message. Please try again later.')
        setStatus('idle')
      })
  }

  const inputClass =
    'w-full bg-transparent border border-[#E2E6EF] rounded-2xl px-5 py-4 text-[#19191D] placeholder-[#8A93A3] font-light text-base outline-none focus:border-[#3C83F5] transition-colors duration-200'

  return (
    <section
      id="contact"
      className="bg-[#F5F7FB] relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-28"
    >
      {/* Thin top divider */}
      <div className="w-full h-px bg-[#E2E6EF] mb-20 sm:mb-24 md:mb-32" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-10">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 80px)' }}
            >
              Let&apos;s<br />work<br />together.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} y={20}>
            <p
              className="text-[#5B6472] font-light leading-relaxed max-w-sm"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
            >
              Have a project in mind? I&apos;d love to hear about it. Drop me a message and let&apos;s create something incredible together.
            </p>
          </FadeIn>

          {/* Email */}
          <FadeIn delay={0.25} y={20}>
            <a
              href="mailto:aayushsharma7065@gmail.com"
              className="inline-flex items-center gap-3 text-[#19191D] font-medium hover:text-[#3C83F5] transition-colors duration-200 group"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
            >
              <span className="w-10 h-10 rounded-full border border-[#E2E6EF] flex items-center justify-center group-hover:border-[#3C83F5] transition-colors duration-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              aayushsharma7065@gmail.com
            </a>
          </FadeIn>

          {/* Social links */}
          <FadeIn delay={0.35} y={20}>
            <div className="flex flex-col gap-4">
              <span
                className="text-[#8A93A3] uppercase tracking-widest font-medium"
                style={{ fontSize: '0.7rem' }}
              >
                Find me on
              </span>
              <div className="flex gap-3 flex-wrap">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    id={`social-${social.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.08 }}
                    className="w-11 h-11 rounded-full border border-[#E2E6EF] flex items-center justify-center
                      text-[#5B6472] hover:text-[#3C83F5] hover:border-[#3C83F5]
                      transition-colors duration-200 cursor-pointer"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Right column — Contact form ── */}
        <FadeIn delay={0.2} y={40}>
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-[#8A93A3] text-xs uppercase tracking-widest font-medium pl-1">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-[#8A93A3] text-xs uppercase tracking-widest font-medium pl-1">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-subject" className="text-[#8A93A3] text-xs uppercase tracking-widest font-medium pl-1">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-[#8A93A3] text-xs uppercase tracking-widest font-medium pl-1">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={handleChange}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-6 mt-2">
              <motion.button
                id="contact-submit"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={{ scale: status === 'idle' ? 1.03 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.97 : 1 }}
                className="rounded-full font-medium uppercase tracking-widest text-white cursor-pointer
                  px-10 py-4 text-sm
                  disabled:opacity-60 disabled:cursor-not-allowed 
                  bg-[#3C83F5] hover:bg-[#2F6FE0] transition-colors duration-200"
              >
                {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Sent!' : 'Send Message'}
              </motion.button>

              {status === 'sent' && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#5B6472] text-sm font-light"
                >
                  I&apos;ll get back to you soon.
                </motion.span>
              )}
            </div>
          </form>
        </FadeIn>
      </div>

      {/* Footer */}
      <div className="mt-24 sm:mt-32 flex flex-col sm:flex-row justify-between items-center gap-4
        border-t border-[#E2E6EF] pt-8 max-w-6xl mx-auto">
        <span className="text-[#8A93A3] text-sm font-light uppercase tracking-widest">
          © 2026 Jitender — reel creator
        </span>
        <span className="text-[#8A93A3] text-xs font-light">
          Designed &amp; built by Aayush Sharma
        </span>
      </div>
    </section>
  )
}
