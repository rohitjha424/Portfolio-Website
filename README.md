<div align="center">

```
██████╗  ██╗
██╔══██╗ ██║
██████╔╝ ██║
██╔══██╗ ██║
██║  ██║ ╚██████╗
╚═╝  ╚═╝  ╚═════╝
```

# rohit.jha [ ] — portfolio v2.0

**A dark-themed, single-page portfolio built with Angular 21**

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![SCSS](https://img.shields.io/badge/SCSS-darktheme-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Live](https://img.shields.io/badge/live-rohitjha424.github.io-63b3ed?style=flat-square&logo=github)](https://rohitjha424.github.io/Portfolio-Website/)

<br/>

*Migrated from vanilla HTML/CSS/JS → Angular 21. Because growth is uncomfortable, and that's the point.*

</div>

---

## `$ whoami`

Hey — I'm **Rohit Jha**, a Full Stack Developer based in India. This repository is my corner of the internet where I document what I know, what I've built, and who I'm becoming as a developer.

Version 1 of this site was plain HTML, CSS, and JavaScript — a good starting point. Version 2 is a full migration to **Angular 21** with a dark-themed, single-page scroll architecture, particle animations, and a design system built from scratch.

Not just a portfolio. A proof of work.

---

## `$ ls ./features`

```
✦  Particle canvas background     — Canvas API, pure TypeScript, no libraries
✦  Typing animation               — Cycles through roles with a blinking cursor
✦  Staggered fade-in on load      — CSS keyframes with animation-delay offsets
✦  Scroll-spy navbar              — IntersectionObserver highlights active section
✦  Frosted glass navbar           — backdrop-filter on scroll
✦  Single-page anchor scroll      — Smooth scroll with offset for fixed navbar
✦  Fully responsive               — Mobile-first, tested on real devices
✦  Dark theme system              — Deep navy base with electric blue accents
✦  Zero external UI libraries     — No Material, no Bootstrap. Just Angular + CSS
```

---

## `$ cat ./tech-stack.json`

```json
{
  "framework"  : "Angular 21",
  "language"   : "TypeScript 5.9",
  "styling"    : "CSS3 (component-scoped)",
  "fonts"      : ["Outfit", "Fira Code", "DM Sans"],
  "animations" : ["Canvas API", "CSS Keyframes", "IntersectionObserver"],
  "tooling"    : ["Angular CLI", "Vitest", "Prettier"],
  "deployment" : "GitHub Pages"
}
```

---

## `$ tree ./src`

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          ← Scroll-spy navigation
│   │   └── footer/          ← Clean minimal footer
│   ├── pages/
│   │   └── home/            ← Single page with 6 anchor sections
│   │       ├── home.ts      ← Particle engine + typing animation
│   │       ├── home.html    ← Hero, About, Skills, Projects, Services, Contact
│   │       └── home.css     ← Full design system
│   ├── app.ts
│   ├── app.html
│   └── app.routes.ts
├── index.html               ← Google Fonts + meta
├── styles.css               ← Global dark base
└── main.ts
```

---

## `$ ng serve`

**Prerequisites:** Node.js 18+ and Angular CLI 21

```bash
# Clone the repo
git clone https://github.com/rohitjha424/Portfolio-Website.git
cd Portfolio-Website

# Switch to the active branch
git checkout angular-migration

# Install dependencies
npm install

# Start dev server
ng serve

# Open in browser
http://localhost:4200
```

**Test on a real mobile device (same WiFi network):**

```bash
ng serve --host 0.0.0.0
# Then visit http://<your-ip>:4200 on your phone
```

**Or expose publicly with ngrok:**

```bash
ngrok http 4200
```

---

## `$ git log --oneline` *(the journey)*

```
v1.0  →  Plain HTML + CSS + JS. Hosted on GitHub Pages.
v2.0  →  Angular 21 migration. Dark theme. Animations. This repo.
v2.x  →  Scroll reveal animations, project screenshots, form backend — coming soon.
```

---

## `$ cat ./sections.md`

| Section | What's inside |
|---|---|
| **Hero** | Name, typing role animation, bio, social links, particle canvas |
| **About** | Profile photo, intro paragraphs, stats (years / projects / stacks), resume download |
| **Skills** | Tech stack grouped by Frontend, Backend, Tools, Databases |
| **Projects** | Project cards with GitHub + live links, tech tags |
| **Services** | What I offer — Web Dev, Responsive Design, APIs, Performance |
| **Contact** | Direct email CTA + social links |

---

## `$ cat ./roadmap.md`

```
[ ]  Scroll-reveal animations (Intersection Observer on each section)
[ ]  Project screenshots / mockup images on project cards
[ ]  Contact form with email backend (EmailJS or Formspree)
[ ]  Dark/Light theme toggle
[ ]  GitHub contributions graph integration
[ ]  Deploy pipeline via GitHub Actions
[x]  Particle canvas background
[x]  Typing animation with role cycling
[x]  Scroll-spy navbar with active highlight
[x]  Fully responsive layout
[x]  Single-page anchor scroll architecture
```

---

## `$ cat ./license`

```
MIT License — use it, fork it, learn from it.
Just don't copy the content and call it yours.
The code is open. The story is mine.
```

---

<div align="center">

**Built with obsession, debugged with patience.**

[Live Site](https://rohitjha424.github.io/Portfolio-Website/) · [GitHub](https://github.com/rohitjha424) · [LinkedIn](https://linkedin.com/in/rohitjha424) · [Email](mailto:rohitjha424@gmail.com)

<br/>

*`> _`*

</div>