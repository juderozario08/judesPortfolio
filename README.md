# Jude Rozario | Software Engineer Portfolio

A sleek, responsive, and highly animated personal portfolio built for modern web performance and aesthetics. The design is heavily inspired by the **Tokyo Night** color palette and **Hyprland / Arch Linux** tiling window manager aesthetics, featuring custom terminal-style window bars, animated gradient borders, and reactive background geometry.

## 🚀 Live Demo

[View Live Site](https://juderozario08.github.io/judesPortfolio/) *(Replace with actual Netlify/GitHub pages link if custom domain is used)*

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (Simple Icons, FontAwesome, etc.)
- **Typography:** [Fira Code](https://github.com/tonsky/FiraCode) (monospace) & [Outfit](https://fonts.google.com/specimen/Outfit) (sans-serif)
- **Deployment:** Netlify / GitHub Pages

## ✨ Key Features

- **Tokyo Night Theme:** A beautiful, dark, neon-accented color palette offering a premium developer aesthetic.
- **Hyprland Aesthetics:** Custom rotating conic gradient borders and snappy, high-stiffness spring animations that mimic the feel of an Arch Linux tiling window manager.
- **Terminal UI Components:** Cards and sections designed to look like native terminal windows (Mac/Linux window controls, `user@archlinux:~` prompts).
- **Procedural Background Geometry:** A custom React hook that procedurally generates floating wireframe geometries (Tesseracts, Pyramids, Hexagons, etc.) on every page load.
- **Responsive Layout:** fully optimized for mobile, tablet, and desktop viewing.

## 💻 Running Locally

To run this project locally on your machine:

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

All personal information, project details, skills, and work experience are centralized in the `src/data/resume.ts` file. To update the portfolio content, simply edit the objects in that file and the UI will automatically populate.
