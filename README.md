# Jitender — 3D Creator Portfolio

A premium, light-themed 3D creator portfolio built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed to make a striking first impression with scroll-driven effects, magnetic interactions, and a fully responsive layout.

---

## ✨ Features

- **Magnetic Hero Portrait** — mouse-following magnetic hover effect on the 3D character (desktop only)
- **Scroll-Driven Marquee** — two rows of project GIFs that glide in opposite directions as you scroll
- **Animated About Text** — character-by-character opacity reveal driven by scroll progress
- **Sticky Stacking Project Cards** — cards that scale-compress as you scroll past, creating a depth effect
- **Services List** — staggered animated service items (3D Modeling, Rendering, Motion Design, Branding, Web Design)
- **Contact Section** — two-column layout with a validated form (EmailJS), email link, and 5 social icon buttons
- **Mobile-First Responsive** — full-screen overlay nav on mobile, hamburger menu, fluid `clamp()` typography throughout
- **Kanit Typography** — bold, uppercase headings via Google Fonts
- **Framer Motion** — FadeIn, whileInView, useScroll, useTransform animations across every section

---

## 🛠 Tech Stack

| Tool | Version |
|---|---|
| React | ^19 |
| TypeScript | ~6.0 |
| Vite | ^8 |
| Tailwind CSS | ^3.4 |
| Framer Motion | ^12 |
| EmailJS Browser | ^4.4 |
| Lucide React | ^1.14 |

---

## 📁 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── assets/                  # Static images / icons
│   ├── components/
│   │   ├── AnimatedText.tsx     # Scroll-driven char-by-char text reveal
│   │   ├── ContactButton.tsx    # Smooth-scroll CTA button
│   │   ├── FadeIn.tsx           # Reusable whileInView fade wrapper
│   │   ├── LiveProjectButton.tsx # Project card link button
│   │   └── Magnet.tsx           # Mouse-follow magnetic effect
│   ├── sections/
│   │   ├── HeroSection.tsx      # Full-screen hero with nav + portrait
│   │   ├── MarqueeSection.tsx   # Scroll-parallax image marquee
│   │   ├── AboutSection.tsx     # About me with animated paragraph
│   │   ├── ServicesSection.tsx  # Services list with large numbering
│   │   ├── ProjectsSection.tsx  # Sticky stacking project cards
│   │   └── ContactSection.tsx   # Contact form + social links + footer
│   ├── App.tsx                  # Root layout — sections in order
│   ├── main.tsx                 # React DOM entry point
│   └── index.css                # Global base styles
├── index.html                   # HTML shell + meta + font link
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── .env                         # EmailJS credentials (never commit!)
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure EmailJS (required for the contact form)
cp .env.example .env
# then fill in your real keys (see EmailJS Setup below)

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📧 EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) for serverless email delivery.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template — use these variable names in your template:
   - `{{from_name}}` — sender's name
   - `{{reply_to}}` — sender's email
   - `{{subject}}` — message subject
   - `{{message}}` — message body
4. Fill in your `.env`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

> **Never commit `.env` to Git.** Ensure `.env` is in your `.gitignore`.

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Background | `#F5F7FB` |
| Text primary | `#19191D` |
| Text muted | `#5B6472` |
| Text subtle | `#8A93A3` |
| Border | `#E2E6EF` |
| Accent | `#3C83F5` |
| Accent hover | `#2F6FE0` |
| Surface white | `#FFFFFF` |
| Font | Kanit (300–900) via Google Fonts |

---

## 📌 Roadmap / Known Issues

- [ ] Add real EmailJS credentials (contact form currently inactive)
- [ ] Add real social media profile URLs (Instagram, Twitter, LinkedIn, Behance, Dribbble)
- [ ] Fix Services section nav anchor (`id="price"` → `id="services"`)
- [ ] Wire Live Project buttons to actual project URLs
- [ ] Replace Figma CDN images with locally hosted assets
- [ ] Add a custom favicon
- [ ] Performance audit + image optimization (WebP conversion)
- [ ] Deploy to Vercel / Netlify

---

## 📄 License

MIT — feel free to fork and adapt.
