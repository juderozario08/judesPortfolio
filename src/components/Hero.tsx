import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../data/resume';

const SHAPES = [
  // Wireframe Cube
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
    <line x1="50" y1="5" x2="50" y2="50" />
    <line x1="10" y1="25" x2="50" y2="50" />
    <line x1="90" y1="25" x2="50" y2="50" />
    <line x1="50" y1="50" x2="50" y2="95" />
  </svg>,
  // Octahedron
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
    <polygon points="50,10 90,50 50,90 10,50" />
    <polygon points="50,10 70,50 50,90 30,50" />
    <line x1="10" y1="50" x2="90" y2="50" />
    <line x1="50" y1="10" x2="50" y2="90" />
  </svg>,
  // Wireframe Pyramid
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
    <polygon points="50,10 90,80 10,80" />
    <line x1="50" y1="10" x2="30" y2="80" />
    <line x1="50" y1="10" x2="70" y2="80" />
    <line x1="10" y1="80" x2="90" y2="80" />
  </svg>,
  // Concentric Hexagons
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
    <polygon points="50,5 89,27 89,73 50,95 11,73 11,27" />
    <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" />
    <circle cx="50" cy="50" r="3" fill="currentColor" />
  </svg>
];

const COLORS = ['text-tokyo-cyan', 'text-tokyo-purple', 'text-tokyo-blue'];

type RandomShape = {
  id: number;
  shapeIndex: number;
  color: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  rotationDuration: number;
  direction: number;
};

const Hero = () => {
  const [randomShapes, setRandomShapes] = useState<RandomShape[]>([]);

  useEffect(() => {
    // Generate 3 to 5 random shapes
    const numShapes = Math.floor(Math.random() * 3) + 3;
    const newShapes: RandomShape[] = [];

    for (let i = 0; i < numShapes; i++) {
      let topNum, leftNum;
      // Avoid center (30% to 70% width, 20% to 80% height)
      do {
        topNum = Math.random() * 90; // keep slightly away from edges
        leftNum = Math.random() * 90;
      } while (
        leftNum > 20 && leftNum < 80 &&
        topNum > 15 && topNum < 85
      );

      newShapes.push({
        id: i,
        shapeIndex: Math.floor(Math.random() * SHAPES.length),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.floor(Math.random() * 120) + 60, // 60px to 180px
        top: `${topNum}%`,
        left: `${leftNum}%`,
        duration: Math.random() * 5 + 6, // 6s to 11s
        rotationDuration: Math.random() * 20 + 20, // 20s to 40s
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
    setRandomShapes(newShapes);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-tokyo-purple/20 rounded-full blur-[80px] will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-tokyo-blue/20 rounded-full blur-[100px] will-change-transform"
        />
      </div>

      {/* Random Background Floating Geometries */}
      {randomShapes.map((shape) => (
        <motion.div
          key={shape.id}
          animate={{ y: [-20, 20, -20], rotate: [0, 360 * shape.direction] }}
          transition={{
            y: { duration: shape.duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: shape.rotationDuration, repeat: Infinity, ease: "linear" }
          }}
          className={`absolute ${shape.color} opacity-30 pointer-events-none z-0`}
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            filter: `drop-shadow(0 0 15px currentColor)`
          }}
        >
          {SHAPES[shape.shapeIndex]}
        </motion.div>
      ))}

      {/* Central Floating Tesseract */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 180, 360]
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="mb-8 mt-12 text-tokyo-cyan opacity-80 drop-shadow-[0_0_15px_rgba(125,207,255,0.5)] will-change-transform z-10"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
          <rect x="20" y="20" width="60" height="60" />
          <rect x="35" y="35" width="30" height="30" />
          <line x1="20" y1="20" x2="35" y2="35" />
          <line x1="80" y1="20" x2="65" y2="35" />
          <line x1="20" y1="80" x2="35" y2="65" />
          <line x1="80" y1="80" x2="65" y2="65" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Text Content */}
      <div className="z-10 text-center px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 relative rounded-full p-1 bg-gradient-to-tr from-tokyo-purple via-tokyo-blue to-tokyo-cyan"
        >
          <img
            src="/assets/images/jude.jpg"
            alt="Jude Rozario"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-tokyo-base"
          />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 min-h-[90px] md:min-h-[110px] tracking-tight">
          <TypeAnimation
            sequence={[
              `Hi, I'm ${personalInfo.name.split(' ')[0]}.`,
              1000,
            ]}
            wrapper="span"
            speed={40}
            className="text-tokyo-fg"
            cursor={true}
            repeat={1}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ease: "easeOut", duration: 0.6 }}
          className="text-lg md:text-2xl text-tokyo-muted mb-12 font-mono"
        >
          {personalInfo.program.split(' ')[1]} {personalInfo.program.split(' ')[2]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, ease: "easeOut", duration: 0.6 }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(125, 207, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="inline-block px-10 py-4 rounded-md border border-tokyo-cyan text-tokyo-cyan font-bold tracking-widest uppercase text-sm shadow-[0_0_10px_rgba(125,207,255,0.2)] bg-tokyo-surface/30 backdrop-blur-sm hover:bg-tokyo-cyan/10"
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
