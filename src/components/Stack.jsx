import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiMongodb,
  SiTailwindcss,
  SiHtml5,
  SiCss,
} from 'react-icons/si'


const STACKS = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    invert: true,
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Framer Motion",
    icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    invert: true,
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
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

  if (w >= 1280) {
    return {
      planet: 520,
      RX: 340,
      RY: 115,
      box: 54,
    }
  }

  if (w >= 1024) {
    return {
      planet: 420,
      RX: 280,
      RY: 97,
      box: 55,
    }
  }

  if (w >= 768) {
    return {
      planet: 280,
      RX: 210,
      RY: 72,
      box: 36,
    }
  }

  return {
    planet: 210,
    RX: 155,
    RY: 55,
    box: 30,
  }
}

function genStars(count) {
  return Array.from(
    { length: count },
    (_, i) => {
      const a = (i * 137.508) % 360

      const r =
        20 + ((i * 73) % 80)

      return {
        x:
          50 +
          r *
            Math.cos(
              (a * Math.PI) / 180
            ) *
            0.6,

        y:
          50 +
          r *
            Math.sin(
              (a * Math.PI) / 180
            ) *
            0.6,

        size:
          i % 7 === 0
            ? 2
            : i % 3 === 0
            ? 1.5
            : 1,

        opacity:
          0.25 +
          ((i * 31) % 55) / 100,
      }
    }
  )
}

function Stack() {
  const hoveredRef = useRef(null)
  const sectionRef = useRef(null);

const framesRef = useRef([]);

const [frameIndex, setFrameIndex] = useState(0);

useEffect(() => {
  const frames = [];

  for (let i = 1; i <= 32; i++) {
    const img = new Image();

    img.src = `/Neptune/ezgif-frame-${String(i).padStart(3, "0")}.png`;

    frames.push(img);
  }

  framesRef.current = frames;
}, []);

useEffect(() => {
  function handleScroll() {
    if (!sectionRef.current) return;

    const rect =
      sectionRef.current.getBoundingClientRect();

    const progress = Math.max(
      0,
      Math.min(
        1,
        (window.innerHeight - rect.top) /
          (window.innerHeight + rect.height)
      )
    );

    setFrameIndex(
      Math.min(
        31,
        Math.floor(progress * 32)
      )
    );
  }

  handleScroll();

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );
}, []);
  const boxRefs = useRef([])

  const animRef = useRef(null)

  const tRef = useRef(0)

  const stars = useMemo(
    () => genStars(80),
    []
  )

  const [config, setConfig] =
    useState(() => getSceneConfig())

  const configRef = useRef(config)

  useEffect(() => {
    configRef.current = config
  }, [config])

  useEffect(() => {
    function handleResize() {
      setConfig(getSceneConfig())
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      )
  }, [])

  useEffect(() => {
    function tick() {
      tRef.current += 0.008

      const t = tRef.current

      const {
        RX,
        RY,
      } = configRef.current

      const computed = OFFSETS.map(
        (offset, i) => {
          const angle = t + offset

          const {
            x,
            y,
            depth,
          } = project(
            angle,
            RX,
            RY
          )

         let scale =
  0.65 + depth * 0.45

let opacity =
  0.3 + depth * 0.7

if (hoveredRef.current === i) {
  scale *= 1.35
  opacity = 1
}

return {
  i,
  x,
  y,
  depth,
  scale,
  opacity,
}
        }
      )

      computed
        .sort(
          (a, b) =>
            a.depth - b.depth
        )
        .forEach(
          ({
            i,
            x,
            y,
            depth,
            scale,
            opacity,
          }) => {
            const el =
              boxRefs.current[i]

            if (!el) return

            el.style.transform = `
              translate(
                calc(${x}px - 50%),
                calc(${y}px - 50%)
              )
              scale(${scale})
            `

            el.style.opacity =
              opacity

            el.style.zIndex =
              depth < 0.5
                ? 5
                : 20
          }
        )

      animRef.current =
        requestAnimationFrame(tick)
    }

    animRef.current =
      requestAnimationFrame(tick)

    return () =>
      cancelAnimationFrame(
        animRef.current
      )
  }, [])

  return (
    // <div className='min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-black z-10'>
    <div
  ref={sectionRef}
  className='min-h-[200vh] w-full relative bg-black z-10'
>
  <div className='sticky top-0 h-screen flex justify-center items-center overflow-hidden'>
      

      {/* stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className='absolute rounded-full pointer-events-none'
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: '#fff',
            opacity: s.opacity,
          }}
        />
      ))}

      {/* glow */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at center, rgba(30,40,90,0.28) 0%, transparent 72%)',
        }}
      />

      {/* orbiting boxes */}
      {/* {Array.from({
        length: COUNT,
      }).map((_, i) => (
        <div
          key={i}
          ref={(el) =>
            (boxRefs.current[i] = el)
          }
          className='absolute rounded-md border border-blue-400/30 bg-blue-950/40 backdrop-blur-sm'
          style={{
            width: config.box,
            height: config.box,
          }}
        />
      ))} */}

      {/* orbiting tech cards */}
{STACKS.map((Icon, i) => (
  <div
    key={i}
    ref={(el) =>
      (boxRefs.current[i] = el)
    }
    onMouseEnter={() => {
      hoveredRef.current = i
    }}
    className='
      absolute
      rounded-2xl
      border
      border-blue-400/20
      bg-white/5
      backdrop-blur-md
      flex
      items-center
      justify-center
      shadow-[0_0_30px_rgba(80,120,255,0.10)]
    '
    style={{
      width: config.box,
      height: config.box,
    }}
  >
    {/* <Icon
      className='
        text-white/90
        w-[52%]
        h-[52%]
      '
    /> */}

    <img src={Icon.icon} className='text-white/90
        w-[52%]
        h-[52%]' alt="" />
  </div>
))}

      {/* saturn */}
      <div
        className='absolute rounded-full overflow-hidden border  z-10'
        style={{
          width: config.planet,
          height: config.planet,
        }}
      >
        {/* <img
          src='/Saturn.png'
          alt=''
          className='absolute inset-0 w-full h-full object-cover scale-175'
        /> */}

        <img
        src={
          framesRef.current[frameIndex]?.src ||
          "/Neptune/ezgif-frame-001.png"
        }
        alt=''
        className='z-10 absolute inset-0 w-full h-full object-cover scale-175 '
      />
      </div>
    </div>
    </div>
  )
}

export default Stack