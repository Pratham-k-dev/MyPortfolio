// 



//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react'

// import {
//   SiC,
//   SiCplusplus,
//   SiPython,
//   SiJavascript,
//   SiReact,
//   SiNodedotjs,
//   SiGit,
//   SiMongodb,
//   SiTailwindcss,
//   SiHtml5,
//   SiCss,
// } from 'react-icons/si'


// const STACKS = [
//   {
//     name: "JavaScript",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
//   },
//   {
//     name: "TypeScript",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
//   },
//   {
//     name: "Python",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
//   },
//   {
//     name: "C++",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
//   },
//   {
//     name: "C",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
//   },
//   {
//     name: "Java",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
//   },
//   {
//     name: "React",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
//   },
//   {
//     name: "Next.js",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
//     invert: true,
//   },
//   {
//     name: "Tailwind CSS",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
//   },
//   {
//     name: "Framer Motion",
//     icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
//   },
//   {
//     name: "Node.js",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
//   },
//   {
//     name: "Express",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
//     invert: true,
//   },
//   {
//     name: "PostgreSQL",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
//   },
//   {
//     name: "Redis",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
//   },
//   {
//     name: "GraphQL",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
//   },
//   {
//     name: "MongoDB",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
//   },
//   {
//     name: "Docker",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
//   },
//   {
//     name: "Git",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
//   },
//   {
//     name: "AWS",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
//   },
//   {
//     name: "Linux",
//     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
//   },
// ]

// const COUNT = 18

// const TILT = -28 * (Math.PI / 180)

// const cos_t = Math.cos(TILT)
// const sin_t = Math.sin(TILT)

// const OFFSETS = Array.from(
//   { length: COUNT },
//   (_, i) => (i / COUNT) * Math.PI * 2
// )

// function project(angle, RX, RY) {
//   const lx = Math.cos(angle) * RX
//   const ly = Math.sin(angle) * RY

//   return {
//     x: lx * cos_t - ly * sin_t,
//     y: lx * sin_t + ly * cos_t,
//     depth: (Math.sin(angle) + 1) / 2,
//   }
// }

// function getSceneConfig() {
//   const w = window.innerWidth

//   if (w >= 1280) {
//     return {
//       planet: 520,
//       RX: 340,
//       RY: 115,
//       box: 54,
//     }
//   }

//   if (w >= 1024) {
//     return {
//       planet: 420,
//       RX: 280,
//       RY: 97,
//       box: 55,
//     }
//   }

//   if (w >= 768) {
//     return {
//       planet: 280,
//       RX: 210,
//       RY: 72,
//       box: 36,
//     }
//   }

//   return {
//     planet: 210,
//     RX: 155,
//     RY: 55,
//     box: 30,
//   }
// }

// function genStars(count) {
//   return Array.from(
//     { length: count },
//     (_, i) => {
//       const a = (i * 137.508) % 360

//       const r =
//         20 + ((i * 73) % 80)

//       return {
//         x:
//           50 +
//           r *
//             Math.cos(
//               (a * Math.PI) / 180
//             ) *
//             0.6,

//         y:
//           50 +
//           r *
//             Math.sin(
//               (a * Math.PI) / 180
//             ) *
//             0.6,

//         size:
//           i % 7 === 0
//             ? 2
//             : i % 3 === 0
//             ? 1.5
//             : 1,

//         opacity:
//           0.25 +
//           ((i * 31) % 55) / 100,
//       }
//     }
//   )
// }

// function Stack() {
//   const hoveredRef = useRef(null)
//   const sectionRef = useRef(null);

// const framesRef = useRef([]);

// const [frameIndex, setFrameIndex] = useState(0);

// useEffect(() => {
//   const frames = [];

//   for (let i = 1; i <= 32; i++) {
//     const img = new Image();

//     img.src = `/Neptune/ezgif-frame-${String(i).padStart(3, "0")}.png`;

//     frames.push(img);
//   }

//   framesRef.current = frames;
// }, []);

// useEffect(() => {
//   function handleScroll() {
//     if (!sectionRef.current) return;

//     const rect =
//       sectionRef.current.getBoundingClientRect();

//     const progress = Math.max(
//       0,
//       Math.min(
//         1,
//         (window.innerHeight - rect.top) /
//           (window.innerHeight + rect.height)
//       )
//     );

//     setFrameIndex(
//       Math.min(
//         31,
//         Math.floor(progress * 32)
//       )
//     );
//   }

//   handleScroll();

//   window.addEventListener(
//     "scroll",
//     handleScroll,
//     { passive: true }
//   );

//   return () =>
//     window.removeEventListener(
//       "scroll",
//       handleScroll
//     );
// }, []);
//   const boxRefs = useRef([])

//   const animRef = useRef(null)

//   const tRef = useRef(0)

//   const stars = useMemo(
//     () => genStars(80),
//     []
//   )

//   const [config, setConfig] =
//     useState(() => getSceneConfig())

//   const configRef = useRef(config)

//   useEffect(() => {
//     configRef.current = config
//   }, [config])

//   useEffect(() => {
//     function handleResize() {
//       setConfig(getSceneConfig())
//     }

//     window.addEventListener(
//       'resize',
//       handleResize
//     )

//     return () =>
//       window.removeEventListener(
//         'resize',
//         handleResize
//       )
//   }, [])

//   useEffect(() => {
//     function tick() {
//       tRef.current += 0.008

//       const t = tRef.current

//       const {
//         RX,
//         RY,
//       } = configRef.current

//       const computed = OFFSETS.map(
//         (offset, i) => {
//           const angle = t + offset

//           const {
//             x,
//             y,
//             depth,
//           } = project(
//             angle,
//             RX,
//             RY
//           )

//          let scale =
//   0.65 + depth * 0.45

// let opacity =
//   0.3 + depth * 0.7

// if (hoveredRef.current === i) {
//   scale *= 1.35
//   opacity = 1
// }

// return {
//   i,
//   x,
//   y,
//   depth,
//   scale,
//   opacity,
// }
//         }
//       )

//       computed
//         .sort(
//           (a, b) =>
//             a.depth - b.depth
//         )
//         .forEach(
//           ({
//             i,
//             x,
//             y,
//             depth,
//             scale,
//             opacity,
//           }) => {
//             const el =
//               boxRefs.current[i]

//             if (!el) return

//             el.style.transform = `
//               translate(
//                 calc(${x}px - 50%),
//                 calc(${y}px - 50%)
//               )
//               scale(${scale})
//             `

//             el.style.opacity =
//               opacity

//             el.style.zIndex =
//               depth < 0.5
//                 ? 5
//                 : 20
//           }
//         )

//       animRef.current =
//         requestAnimationFrame(tick)
//     }

//     animRef.current =
//       requestAnimationFrame(tick)

//     return () =>
//       cancelAnimationFrame(
//         animRef.current
//       )
//   }, [])

//   return (
//     // <div className='min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-black z-10'>
//     <div
//   ref={sectionRef}
//   className='min-h-screen w-full relative bg-black z-10'
// >
//   <div className='sticky top-0 h-screen flex justify-center items-center overflow-hidden'>
      

//       {/* stars */}
//       {stars.map((s, i) => (
//         <div
//           key={i}
//           className='absolute rounded-full pointer-events-none'
//           style={{
//             left: `${s.x}%`,
//             top: `${s.y}%`,
//             width: s.size,
//             height: s.size,
//             background: '#fff',
//             opacity: s.opacity,
//           }}
//         />
//       ))}

//       {/* glow */}
//       <div
//         className='absolute inset-0 pointer-events-none'
//         style={{
//           background:
//             'radial-gradient(ellipse 60% 50% at center, rgba(30,40,90,0.28) 0%, transparent 72%)',
//         }}
//       />

//       {/* orbiting boxes */}
//       {/* {Array.from({
//         length: COUNT,
//       }).map((_, i) => (
//         <div
//           key={i}
//           ref={(el) =>
//             (boxRefs.current[i] = el)
//           }
//           className='absolute rounded-md border border-blue-400/30 bg-blue-950/40 backdrop-blur-sm'
//           style={{
//             width: config.box,
//             height: config.box,
//           }}
//         />
//       ))} */}

//       {/* orbiting tech cards */}
// {STACKS.map((Icon, i) => (
//   <div
//     key={i}
//     ref={(el) =>
//       (boxRefs.current[i] = el)
//     }
//     onMouseEnter={() => {
//       hoveredRef.current = i
//     }}
//     className='
//       absolute
//       rounded-2xl
//       border
//       border-blue-400/20
//       bg-white/5
//       backdrop-blur-md
//       flex
//       items-center
//       justify-center
//       shadow-[0_0_30px_rgba(80,120,255,0.10)]
//     '
//     style={{
//       width: config.box,
//       height: config.box,
//     }}
//   >
//     {/* <Icon
//       className='
//         text-white/90
//         w-[52%]
//         h-[52%]
//       '
//     /> */}

//     <img src={Icon.icon} className='text-white/90
//         w-[52%]
//         h-[52%]' alt="" />
//   </div>
// ))}

//       {/* saturn */}
//       <div
//         className='absolute rounded-full overflow-hidden border  z-10'
//         style={{
//           width: config.planet,
//           height: config.planet,
//         }}
//       >
//         {/* <img
//           src='/Saturn.png'
//           alt=''
//           className='absolute inset-0 w-full h-full object-cover scale-175'
//         /> */}

//         {/* <img
//         src={
//           framesRef.current[frameIndex]?.src ||
//           "/Neptune/ezgif-frame-001.png"
//         }
//         alt=''
//         className='z-10 absolute inset-0 w-full h-full object-cover scale-175 '
//       /> */}

//       <video
//   autoPlay
//   loop
//   muted
//   playsInline
//   className="
//     absolute
//     inset-0
//     w-full
//     h-full
//     object-cover
//     scale-175
//     z-20
//   "
// >
//   <source
//     src="/neptune.mp4"
//     type="video/mp4"
//   />
// </video>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Stack

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const STACKS = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Framer Motion", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
]

const COUNT = 18
const TILT = -28 * (Math.PI / 180)
const cos_t = Math.cos(TILT)
const sin_t = Math.sin(TILT)

const OFFSETS = Array.from(
  { length: COUNT },
  (_, i) => (i / COUNT) * Math.PI * 2
)

function project(angle, RX, RY) {
  const lx = Math.cos(angle) * RX
  const ly = Math.sin(angle) * RY
  return {
    x: lx * cos_t - ly * sin_t,
    y: lx * sin_t + ly * cos_t,
    depth: (Math.sin(angle) + 1) / 2,
  }
}

function getSceneConfig() {
  const w = window.innerWidth
  if (w >= 1280) return { planet: 520, RX: 340, RY: 115, box: 54 }
  if (w >= 1024) return { planet: 420, RX: 280, RY: 97, box: 55 }
  if (w >= 768)  return { planet: 280, RX: 210, RY: 72, box: 36 }
  return { planet: 210, RX: 155, RY: 55, box: 30 }
}

function genStars(count) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * 137.508) % 360
    const r = 20 + ((i * 73) % 80)
    return {
      x: 50 + r * Math.cos((a * Math.PI) / 180) * 0.6,
      y: 50 + r * Math.sin((a * Math.PI) / 180) * 0.6,
      size: i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
      opacity: 0.25 + ((i * 31) % 55) / 100,
    }
  })
}

// Eases a 0–1 value with smooth cubic
function smoothstep(x) {
  return x * x * (3 - 2 * x)
}

function Stack() {
  const hoveredRef      = useRef(null)
  const sectionRef      = useRef(null)
  const framesRef       = useRef([])
  const boxRefs         = useRef([])
  const boxPositions    = useRef([])   // live {x, y} per card in screen coords
  const animRef         = useRef(null)
  const tRef            = useRef(0)
  const stars           = useMemo(() => genStars(80), [])
  const [config, setConfig]             = useState(() => getSceneConfig())
  const configRef       = useRef(config)
  const [hoveredCard, setHoveredCard]   = useState(null)   // index or null
  const [tooltipPos, setTooltipPos]     = useState({ x: 0, y: 0 })

  // scroll-driven heading visibility  (0 = hidden, 1 = fully visible)
  const [headingAlpha, setHeadingAlpha] = useState(0)
  const [headingY, setHeadingY]         = useState(18)     // px offset

  useEffect(() => { configRef.current = config }, [config])

  // preload Neptune frames (kept even though video is primary)
  useEffect(() => {
    const frames = []
    for (let i = 1; i <= 32; i++) {
      const img = new Image()
      img.src = `/Neptune/ezgif-frame-${String(i).padStart(3, '0')}.png`
      frames.push(img)
    }
    framesRef.current = frames
  }, [])

  // scroll handler — drives heading alpha + translateY
  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
      )

      // fade-in band: 0.08 → 0.28   fade-out band: 0.72 → 0.92
      let alpha = 0
      let yOff  = 18

      if (progress >= 0.08 && progress <= 0.28) {
        const t = smoothstep((progress - 0.08) / 0.20)
        alpha = t
        yOff  = 18 * (1 - t)
      } else if (progress > 0.28 && progress < 0.72) {
        alpha = 1
        yOff  = 0
      } else if (progress >= 0.72 && progress <= 0.92) {
        const t = smoothstep((progress - 0.72) / 0.20)
        alpha = 1 - t
        yOff  = -14 * t
      }

      setHeadingAlpha(alpha)
      setHeadingY(yOff)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleResize() { setConfig(getSceneConfig()) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // rAF orbit loop — also tracks card screen positions for tooltip
  useEffect(() => {
    function tick() {
      tRef.current += 0.008
      const t = tRef.current
      const { RX, RY } = configRef.current

      const computed = OFFSETS.map((offset, i) => {
        const angle = t + offset
        const { x, y, depth } = project(angle, RX, RY)

        let scale   = 0.65 + depth * 0.45
        let opacity = 0.3  + depth * 0.7

        if (hoveredRef.current === i) {
          scale  *= 1.35
          opacity = 1
        }

        return { i, x, y, depth, scale, opacity }
      })

      computed.sort((a, b) => a.depth - b.depth).forEach(({ i, x, y, depth, scale, opacity }) => {
        const el = boxRefs.current[i]
        if (!el) return

        el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(${scale})`
        el.style.opacity   = opacity
        el.style.zIndex    = depth < 0.5 ? 5 : 20

        // store centre position for tooltip (relative to orbit container centre)
        boxPositions.current[i] = { x, y, scale }
      })

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // update tooltip anchor whenever hoveredCard changes
  function handleCardEnter(i, el) {
    hoveredRef.current = i
    setHoveredCard(i)
  }
  function handleCardLeave() {
    hoveredRef.current = null
    setHoveredCard(null)
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full relative bg-black z-10 overflow-hidden"
    >
       <section id="techstack"></section>
      <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">

        {/* ── Stars ── */}
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${s.x}%`,
              top:  `${s.y}%`,
              width:  s.size,
              height: s.size,
              background: '#fff',
              opacity: s.opacity,
            }}
          />
        ))}

        {/* ── Ambient center glow ── */}
        
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at center, rgba(30,40,90,0.28) 0%, transparent 72%)',
          }}
        />

        {/* ─────────────────────────────────────────────────────────────
            CINEMATIC HEADING BLOCK
            No card, no border, no glass panel.
            Just an atmospheric soft readability band + floating text.
        ───────────────────────────────────────────────────────────── */}
       
        <div
          aria-label="Tech Stack — Tools I Work With Daily"
          style={{
            position:  'absolute',
            left:      0,
            right:     0,
            top:       '50%',
            transform: `translateY(calc(-50% + ${headingY}px))`,
            zIndex:    25,
            opacity:   headingAlpha,
            // no transition on transform — driven frame-by-frame by scroll
            transition: 'opacity 0.15s linear',
            pointerEvents: 'none',
            display:   'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingLeft: 'clamp(28px, 7vw, 110px)',
          }}
        >
          {/*
            Atmospheric readability band — not a box.
            Pure radial gradient anchored to the left reading zone,
            feathers away completely on all sides.
          */}
          <div
            style={{
              position:  'absolute',
              inset:     '-80px -40px -80px -60px',
              background: `
                radial-gradient(
                  ellipse 68% 70% at 32% 50%,
                  rgba(4, 6, 22, 0.52) 0%,
                  rgba(4, 6, 22, 0.22) 45%,
                  transparent 75%
                )
              `,
              pointerEvents: 'none',
            }}
          />

          {/* Eyebrow — barely-there label */}
          <p
            style={{
              position:      'relative',
              margin:        '0 0 14px 2px',
              fontSize:      'clamp(9px, 0.85vw, 11px)',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color:         'rgba(160, 185, 255, 0.45)',
              fontWeight:    400,
              fontFamily:    'inherit',
            }}
          >
            Selected Technologies
          </p>

          {/* Main heading */}
          <section >
          <h2
            style={{
              position:      'relative',
              margin:        0,
              fontSize:      'clamp(38px, 5.8vw, 82px)',
              fontWeight:    700,
              letterSpacing: '-0.035em',
              lineHeight:    1,
              color:         'rgba(255, 255, 255, 0.92)',
              fontFamily:    'inherit',
              // Subtle text gradient — top brighter, bottom slightly dimmer
              background:    'linear-gradient(175deg, rgba(255,255,255,0.97) 0%, rgba(200,215,255,0.75) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            TECH STACK
          </h2>
          </section>

          {/* Thin separator — very subtle */}
          <div
            style={{
              position:   'relative',
              marginTop:  '16px',
              width:      'clamp(40px, 5vw, 64px)',
              height:     '1px',
              background: 'linear-gradient(90deg, rgba(140,170,255,0.5) 0%, transparent 100%)',
            }}
          />

          {/* Supporting line */}
          <p
            style={{
              position:      'relative',
              margin:        '14px 0 0 0',
              fontSize:      'clamp(13px, 1.15vw, 16px)',
              fontWeight:    300,
              letterSpacing: '0.04em',
              color:         'rgba(185, 200, 240, 0.5)',
              fontFamily:    'inherit',
            }}
          >
            Tools I Work With Daily
          </p>
        </div>

        {/* ── Orbiting tech cards ── */}
        {STACKS.map((stack, i) => (
          <div
            key={i}
            ref={(el) => (boxRefs.current[i] = el)}
            onMouseEnter={(e) => handleCardEnter(i, e.currentTarget)}
            onMouseLeave={handleCardLeave}
            className="absolute rounded-2xl border border-blue-400/20 bg-white/5 backdrop-blur-md flex items-center justify-center"
            style={{
              width:  config.box,
              height: config.box,
              // smooth glow transition on hover — applied via CSS so it animates
              transition: 'box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
              boxShadow:  hoveredCard === i
                ? '0 0 0 1px rgba(140,170,255,0.4), 0 0 22px 4px rgba(80,120,255,0.4)'
                : '0 0 24px rgba(80,120,255,0.08)',
              borderColor: hoveredCard === i ? 'rgba(140,170,255,0.5)' : undefined,
              background:  hoveredCard === i ? 'rgba(255,255,255,0.10)' : undefined,
            }}
          >
            <img
              src={stack.icon}
              style={{
                width:  '52%',
                height: '52%',
                filter: stack.invert ? 'invert(1)' : undefined,
                transition: 'transform 0.3s ease',
                transform: hoveredCard === i ? 'scale(1.12)' : 'scale(1)',
              }}
              alt={stack.name}
            />

            {/* Inline tooltip — floats above the card, fades in */}
            <div
              style={{
                position:       'absolute',
                bottom:         'calc(100% + 7px)',
                left:           '50%',
                transform:      'translateX(-50%)',
                whiteSpace:     'nowrap',
                pointerEvents:  'none',
                opacity:        hoveredCard === i ? 1 : 0,
                translate:      hoveredCard === i ? '0 0' : '0 4px',
                transition:     'opacity 0.22s ease, translate 0.22s ease',
                fontSize:       'clamp(9px, 0.75vw, 11px)',
                letterSpacing:  '0.08em',
                color:          'rgba(210, 225, 255, 0.88)',
                fontWeight:     500,
                // no panel, no border — pure atmospheric text with micro shadow
                textShadow:     '0 0 12px rgba(80,120,255,0.6), 0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {stack.name}
            </div>
          </div>
        ))}

        {/* ── Neptune ── */}
        <div
          className="absolute rounded-full overflow-hidden z-10"
          style={{
            width:  config.planet,
            height: config.planet,
            border: '1px solid rgba(80,100,200,0.15)',
            boxShadow: '0 0 60px 16px rgba(30,50,180,0.18), 0 0 120px 40px rgba(20,35,140,0.10)',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-20"
            style={{ scale: '1.75' }}
          >
            <source src="/neptune.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </div>
  )
}

export default Stack