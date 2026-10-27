# Jude Rozario | Software Engineer Portfolio

My portfolio and blog, built with React 19, TypeScript and Tailwind CSS. The design is inspired by the **Tokyo Night** color palette and my **Arch Linux + Hyprland** setup, with terminal-style windows and animated gradient borders. The blog includes interactive diagrams of the systems I've built.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Syntax Highlighting:** [Prism.js](https://prismjs.com/)
- **Icons:** [Lucide](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Typography:** [Fira Code](https://github.com/tonsky/FiraCode) (monospace) & [Outfit](https://fonts.google.com/specimen/Outfit) (sans-serif)

## ✨ Key Features

- **Tokyo Night Theme:** A dark, neon-accented color palette.
- **Hyprland Aesthetics:** Rotating conic gradient borders and snappy spring animations that mimic a tiling window manager.
- **Terminal UI Components:** Cards and sections styled as terminal windows with window controls and `user@archlinux:~` prompts.
- **Engineering Blog:** In-depth posts with syntax-highlighted code, callouts, tradeoff cards and a table of contents (docked sidebar on desktop, drawer on mobile).
- **Interactive Diagrams:** System architecture and ER diagrams with drag-to-pan, zoom and fit-to-screen, on both mouse and touch.
- **Responsive Layout:** Works on mobile, tablet and desktop.

## 💻 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/juderozario08/judesPortfolio.git
   cd judesPortfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Data Structure

Content lives in typed data files under `src/data/`, separate from the UI:

- `resume.ts`: personal info, skills, experience and projects
- `blogs.ts`: blog posts and their sections
- `radiusSchema.ts` / `radiusSystemArchitecture.ts`: data for the Radius post's ER and architecture diagrams

Edit these files and the UI updates automatically.
