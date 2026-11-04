# Viraj Salunkhe — Portfolio

An editorial, high-fashion portfolio website featuring layered visual depth, infinite typography marquees, and interactive skill cards.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-efeee9?style=for-the-badge&logo=vercel&logoColor=black)](https://portfolio-teal-delta-40jvdtvta1.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🌐 Live Preview

- **Production URL:** [https://portfolio-teal-delta-40jvdtvta1.vercel.app](https://portfolio-teal-delta-40jvdtvta1.vercel.app)
- **GitHub Repository:** [https://github.com/oreoviru/portfolio](https://github.com/oreoviru/portfolio)

---

## ✨ Features

- **Editorial Hero Composition**: Single full-viewport composition (`100dvh`, no unintended scroll) styled in high-contrast black & cream (`#efeee9`).
- **Layered Visual Depth**:
  1. Full-bleed textured background
  2. Giant infinite scrolling marquee (`Viraj — Salunkhe`)
  3. Front portrait cutout overlay sitting over the scrolling text so letters pass through behind the subject
  4. Minimalist top navigation & bottom credits
- **Projects Showcase (`/projects`)**:
  - **Flagship Feature: NEURO** — Autonomous AI & macOS Automation System with interactive live simulator HUD, YOLOv8 biometric face detection, 24kHz AvaNeural speech engine, and multi-app routine triggers.
  - **AirPool AI** — Flight-aware passenger matching and rideshare cost-splitting platform.
  - **Campus Recover** — Multi-modal lost & found platform for Rishihood University with CLIP + Sentence-Transformers + GIS radar.
  - **PuzzleCam** — Gesture-controlled browser photobooth & 3x3 interactive puzzle solver.
  - **RetroLens** — Real-time computer vision FX engine with 11 custom shaders and hand-tracking portals.
- **About Me Page (`/about`)**:
  - Detailed biography highlighting passion for AI, Full-Stack Development, and projects like **NEURO** and **AERI**.
  - **12 Interactive Skill Cards**:
    - *Python, JavaScript, React, HTML, CSS, API Integration, AI & ML, Ollama, Git, GitHub, Three.js, Automation*
    - Dynamic radial cursor spotlight effect following mouse movement.
    - Subtle 3D elevation, border illumination, and Lucide icon animations.
- **Dedicated Contact Hub (`/contact`)**:
  - Interactive clickable navbar for **LinkedIn**, **Instagram**, **Email (Gmail)**, and **GitHub**.
  - Detailed glassmorphic channel cards with direct profiles, live email copy-to-clipboard button, and quick Gmail launcher.
- **Direct Contact Integration**: One-click redirect to Gmail compose addressed to `oreoviru2008@gmail.com`.
- **Responsive Mobile Drawer**: Morphing hamburger-to-close icon with smooth staggered reveals for menu items.
- **Zero-Flicker SPA Routing**: Configured with `vercel.json` rewrites for smooth client-side routing on Vercel without 404s.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Typography:** *Helvetica Neue ME* via OnlineWebFonts
- **Icons:** Lucide React
- **Routing:** React Router DOM (v7)
- **Deployment & Hosting:** Vercel

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   └── portrait.png       # Transparent cutout portrait asset
├── src/
│   ├── About.tsx          # About Me page with 12 interactive skill cards
│   ├── App.tsx            # Main hero section with marquee & layered visuals
│   ├── Contact.tsx        # Contact hub with clickable channels navbar
│   ├── Projects.tsx       # Projects showcase with NEURO flagship simulator
│   ├── index.css          # Tailwind directives & keyframe animations
│   ├── main.tsx           # React Router route configuration
│   └── vite-env.d.ts      # Vite client types
├── index.html             # HTML shell with Helvetica Neue ME webfont
├── package.json           # Dependencies and project scripts
├── tailwind.config.js     # Custom theme extensions (cream color, typography)
├── vercel.json            # SPA rewrites for Vercel deployment
└── vite.config.ts         # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oreoviru/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

### Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

---

## 📬 Connect

- **Instagram:** [@oreo._.viru](https://www.instagram.com/oreo._.viru/)
- **GitHub:** [@oreoviru](https://github.com/oreoviru)
- **Email:** [oreoviru2008@gmail.com](mailto:oreoviru2008@gmail.com)

---

## 🖤 Credits

> A homage to **OREO>_<VIRU**

