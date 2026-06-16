# Space Odyssey Portfolio — Implementation Plan

This blueprint outlines a production-ready implementation plan for a premium, scroll-animated portfolio using **React**, **Vite**, **Tailwind CSS**, and **Motion (Framer Motion)**. 

The website relies on your custom space animations:
1. **Space Station (Hero Section)** — A looping background video(src/assets/space_station.mp4)positioned in the right half of the viewport. The left half holds a high-contrast card featuring your name, professional background, and custom roles shown via an elegant typewriter effect that erases, rewrites, and loops.
2. **Saturn Ring-Shatter Stack Component** — A beautiful interactive section featuring a ringless Saturn image (in src/assets/Saturn.png) with tech stack icons orbiting around it diagonally in 3D-space, simulating its planet rings.
3. **Rocket (Course Work)** — A continuous launch and separation frame sequence (loaded as pre-made static frames/images(src/assets/rocket) on scroll) guiding coursework and achievement cards. 
4. **Moon (Projects Section)** — A detailed lunar orbit sequence (loaded as pre-made static frames/images(src/assets/moon) on scroll) that displays responsive project cards as you scroll down.

---

## 🌌 Section 1: The "Stellar Void" Design System

To ensure all custom text and overlay cards are perfectly compatible with dark space backgrounds and video layers, we will implement a unified **Glassmorphism Theme**:

```css
/* Custom utility variables for the theme */
:root {
  --color-void-black: #020205;
  --color-nebula-blue: #0ea5e9;    /* sky-500 */
  --color-aurora-teal: #14b8a6;    /* teal-500 */
  --color-lunar-gold: #fbbf24;     /* amber-400 */
  --glass-bg: rgba(8, 8, 12, 0.65);
  --glass-border: rgba(255, 255, 255, 0.08);
}
```

### Aesthetic Specifications:
* **Backgrounds**: Deep, rich cosmic space absolute layers (`bg-slate-950`) with starry gradients.
* **Component Cards**: Frosted white borders, subtle scale-on-hover movements, high-contrast typography, and colorful back-glows.
* **Typography**:
  * Display Header: Clean, geometric sans-serif (e.g., Space Grotesk, Syne, or Inter).
  * Monospaced Details: `font-mono` tracking technical indicators.

---

## 🎥 Section 2: Core Scroll Animation Architecture

Since the frame-by-frame sequences are already provided in the workspace, we will bind scroll progress directly to frame indices. This yields responsive, fluid frame scrubbing.

### 🖼️ Frame-by-Frame Scroll Scrubbing (Rocket & Moon)
We track scroll position within a sticky layout container and map the progress (0 to 1) directly to pre-loaded frame directories:

```typescript
import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';

interface FrameScrubberProps {
  directory: string;       // e.g., "/assets/rocket-frames"
  totalFrames: number;     // e.g., 60 or 120
  prefix?: string;         // e.g., "rocket_"
  extension?: string;      // e.g., "png" or "jpg"
  pad?: number;            // e.g., 3 or 4 padding
}

export function FrameScrubber({ directory, totalFrames, prefix = 'frame_', extension = 'jpg', pad = 4 }: FrameScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Track scroll within a 300vh scrolling region
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Simple frame mapper
  const frameValue = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  useMotionValueEvent(frameValue, "change", (latest) => {
    setCurrentFrameIndex(Math.min(totalFrames, Math.max(1, Math.round(latest))));
  });

  // Calculate standard padded path
  const frameString = String(currentFrameIndex).padStart(pad, '0');
  const imageSource = `${directory}/${prefix}${frameString}.${extension}`;

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Render Frame */}
        <img
          src={imageSource}
          alt="Space Scroll Animation"
          className="w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
```

---

## ⚡ Section 3: Saturn Ring-Shatter Stack Component (`SaturnStack.tsx`)

This custom section showcases your technical expertise by simulating Saturn's planetary rings using orbiting tech stack icons.
* **Component Asset**: A high-quality clip-art/image of Saturn (without its rings) centered in the viewport.
* **Interactivity**: Clean, colorful icons (React, TypeScript, Tailwind, Node.js, etc.) floating diagonally in a elliptical orbital path.

### Circular / Diagonal Orbital Loop Concept (CSS/Framer Motion):
Instead of typical horizontal rotations, we introduce 3D depth with diagonal translation, scaling, and z-index modifications:
```typescript
import { motion } from 'motion/react';

interface OrbitingIconProps {
  icon: React.ReactNode;
  label: string;
  delay: number; // Staggered entry for ring spacing
}

export function OrbitingTechIcon({ icon, label, delay }: OrbitingIconProps) {
  return (
    <motion.div
      className="absolute p-3 rounded-full bg-slate-900/80 border border-white/10 shadow-lg text-white text-sm font-mono flex items-center gap-2"
      animate={{
        // Simulating a diagonal elliptical orbital ring around Saturn
        x: [ -180, 0, 180, 0, -180 ],
        y: [ -60,  30, -60, -150, -60 ],
        scale: [ 0.7, 1.1, 0.7, 0.5, 0.7 ],
        zIndex: [ 10, 20, 10, 5, 10 ] // Cross in front and behind the planet
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </motion.div>
  );
}
```

---

## 🛠️ Section 4: Interactive Component Breakdown

### 🎨 Component 1: Space Station Hero Screen (`HeroSection.jsx`)
* **Layout Structure**: 
  * Divided as a split layout:
    * **Left Side**: Rich typography, your name, and a dynamic Typewriter roles loop inside a high-contrast glassmorphic card.
    * **Right Side**: Seamless, looping Space Station background video (`/assets/space_station.mp4`).
* **Contrast Safeguard**: Deep gradient backdrop overlaid on the right-side video loop to prevent bright frames from reducing the legibility of the left interactive panels.

### 📝 Component 2: Rocket Timeline & Course Work (`CourseworkSection.jsx`)
* **Background**: Scrolling activates the pre-made frame timeline of the rocket launch sequence.
* **Scroll Cards**: Pinned to scroll milestones, sliding horizontally from the sides with your academic achievements and coursework logs.

### 🌒 Component 3: Moon Sphere & Projects (`ProjectsSection.jsx`)
* **Background**: Scrubbing zooms directly in/out of the detailed Moon sphere.
* **Overlays**: Interactive mock tech-specs showing descriptions, tags, and GitHub buttons for your engineering projects.

---

## 📈 Section 5: Integration Blueprint

1. **Verify Asset Catalogues**: Confirm custom frame folders match directory names in the build step.
2. **Mount Shared App Shell**: Implement a smooth scrolling wrapper or viewport snapping mechanics to preserve smooth scrubbing behaviors.
3. **Assemble Component Tree**: Order sections logically (Hero -> Saturn Stack -> Rocket Coursework -> Moon Projects -> Glass Contact Footer) to complete a beautiful scrolling narrative.
