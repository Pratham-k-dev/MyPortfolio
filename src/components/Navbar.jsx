import React, { useEffect, useRef, useState, useCallback } from 'react'

const NAV_ITEMS = [
  { label: 'Home',       id: 'home' },
  { label: 'About',       id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Tech Stack', id: 'techstack' },
  { label: 'Contact',    id: 'contact' },
]

// Smooth scroll that doesn't rely on CSS scroll-behavior (more control)
function smoothScrollTo(targetY, duration = 680) {
  const startY = window.scrollY
  const diff   = targetY - startY
  let start    = null

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(timestamp) {
    if (!start) start = timestamp
    const elapsed  = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + diff * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export default function Navbar() {
  const [activeId, setActiveId]         = useState('home')
  const [indicatorStyle, setIndicator]  = useState({ left: 0, width: 0, opacity: 0 })
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [hoveredId, setHoveredId]       = useState(null)
  const itemRefs   = useRef({})
  const navRef     = useRef(null)
  const observerRef = useRef(null)

  // ── Scroll position → dim navbar bg ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── IntersectionObserver → active section ──
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // pick the entry with the highest intersection ratio that's visible
        let best = null
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry
          }
        })
        if (best) setActiveId(best.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  // ── Slide indicator to hovered or active item ──
  const updateIndicator = useCallback((id) => {
    const el = itemRefs.current[id]
    if (!el || !navRef.current) return
    const navRect  = navRef.current.getBoundingClientRect()
    const itemRect = el.getBoundingClientRect()
    setIndicator({
      left:    itemRect.left - navRect.left,
      width:   itemRect.width,
      opacity: 1,
    })
  }, [])

  useEffect(() => {
    updateIndicator(hoveredId || activeId)
  }, [hoveredId, activeId, updateIndicator])

  function handleNavClick(id) {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    smoothScrollTo(top)
  }

  // ── Close mobile menu on outside click ──
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e) => {
      if (!e.target.closest('[data-navbar]')) setMobileOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [mobileOpen])

  const pillBg = scrolled
    ? 'rgba(8, 10, 24, 0.78)'
    : 'rgba(8, 10, 24, 0.52)'

  return (
    <>
      {/* ── Shared font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        [data-navbar] * { box-sizing: border-box; font-family: 'Inter', sans-serif; }

        @keyframes nb-slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes nb-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .nb-mobile-panel {
          animation: nb-slide-down 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-mobile-panel { animation: nb-fade-in 0.18s ease forwards; }
        }
      `}</style>

      <header
        data-navbar
        style={{
          position:    'fixed',
          top:         0,
          left:        0,
          right:       0,
          zIndex:      999,
          display:     'flex',
          justifyContent: 'center',
          padding:     '14px 20px',
          pointerEvents: 'none',
          animation:   'nb-slide-down 0.4s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >

        {/* ── Pill container ── */}
        <nav
          ref={navRef}
          role="navigation"
          aria-label="Primary"
          style={{
            pointerEvents:   'auto',
            display:         'flex',
            alignItems:      'center',
            gap:             0,
            padding:         '6px 8px',
            borderRadius:    '100px',
            background:      pillBg,
            backdropFilter:  'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border:          '1px solid rgba(255,255,255,0.07)',
            boxShadow:       scrolled
              ? '0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset'
              : '0 4px 20px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.04) inset',
            transition:      'background 0.4s ease, box-shadow 0.4s ease',
            position:        'relative',
          }}
        >
          {/* Sliding indicator */}
          <div
            aria-hidden
            style={{
              position:     'absolute',
              bottom:       '6px',
              height:       '1px',
              background:   'linear-gradient(90deg, transparent 0%, rgba(140,170,255,0.7) 50%, transparent 100%)',
              left:         indicatorStyle.left,
              width:        indicatorStyle.width,
              opacity:      indicatorStyle.opacity,
              transition:   'left 0.32s cubic-bezier(0.4,0,0.2,1), width 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
              borderRadius: '1px',
              pointerEvents: 'none',
            }}
          />

          {/* Desktop nav items */}
          {NAV_ITEMS.map(({ label, id }) => {
            const isActive  = activeId === id
            const isHovered = hoveredId === id

            return (
              <button
                key={id}
                ref={(el) => (itemRefs.current[id] = el)}
                onClick={() => handleNavClick(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display:         'none', // overridden below for desktop
                  background:      'none',
                  border:          'none',
                  cursor:          'pointer',
                  padding:         '7px 16px',
                  borderRadius:    '100px',
                  fontSize:        '13.5px',
                  fontWeight:      isActive ? 500 : 400,
                  letterSpacing:   '0.01em',
                  color:           isActive || isHovered
                    ? 'rgba(230, 238, 255, 0.95)'
                    : 'rgba(160, 175, 210, 0.65)',
                  transition:      'color 0.25s ease, text-shadow 0.25s ease',
                  textShadow:      isHovered && !isActive
                    ? '0 0 18px rgba(140,170,255,0.45)'
                    : isActive
                    ? '0 0 20px rgba(140,170,255,0.35)'
                    : 'none',
                  whiteSpace:      'nowrap',
                  outline:         'none',
                  position:        'relative',
                }}
                className="nb-desktop-item"
              >
                {label}
              </button>
            )
          })}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="nb-hamburger"
            style={{
              display:     'none',
              background:  'none',
              border:      'none',
              cursor:      'pointer',
              padding:     '6px 10px',
              color:       'rgba(200,215,255,0.8)',
              outline:     'none',
            }}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect
                y="0" x="0" width={mobileOpen ? '20' : '20'} height="1.5" rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: '50% 50%',
                  transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                  transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
              <rect
                y="6" x="0" width="20" height="1.5" rx="1"
                fill="currentColor"
                style={{
                  opacity:    mobileOpen ? 0 : 1,
                  transition: 'opacity 0.18s ease',
                }}
              />
              <rect
                y="12" x="0" width={mobileOpen ? '20' : '14'} height="1.5" rx="1"
                fill="currentColor"
                style={{
                  transformOrigin: '50% 50%',
                  transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                  transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </svg>
          </button>
        </nav>

        {/* ── Mobile dropdown panel ── */}
        {mobileOpen && (
          <div
            className="nb-mobile-panel"
            style={{
              position:   'absolute',
              top:        'calc(100% - 6px)',
              left:       '16px',
              right:      '16px',
              borderRadius: '18px',
              background: 'rgba(8,10,24,0.88)',
              backdropFilter:  'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:     '1px solid rgba(255,255,255,0.07)',
              boxShadow:  '0 16px 48px rgba(0,0,0,0.55)',
              padding:    '8px',
              display:    'flex',
              flexDirection: 'column',
              gap:        '2px',
              pointerEvents: 'auto',
            }}
          >
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = activeId === id
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  style={{
                    background:  isActive ? 'rgba(140,170,255,0.08)' : 'none',
                    border:      'none',
                    cursor:      'pointer',
                    padding:     '12px 16px',
                    borderRadius: '12px',
                    textAlign:   'left',
                    fontSize:    '14px',
                    fontWeight:  isActive ? 500 : 400,
                    color:       isActive
                      ? 'rgba(210,225,255,0.95)'
                      : 'rgba(155,170,210,0.7)',
                    letterSpacing: '0.01em',
                    transition:  'background 0.2s ease, color 0.2s ease',
                    outline:     'none',
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '10px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(140,170,255,0.07)'; e.currentTarget.style.color = 'rgba(220,232,255,0.9)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = isActive ? 'rgba(140,170,255,0.08)' : 'none'; e.currentTarget.style.color = isActive ? 'rgba(210,225,255,0.95)' : 'rgba(155,170,210,0.7)' }}
                >
                  {isActive && (
                    <span style={{
                      display: 'block',
                      width: 4, height: 4,
                      borderRadius: '50%',
                      background: 'rgba(140,170,255,0.8)',
                      flexShrink: 0,
                    }} aria-hidden />
                  )}
                  {!isActive && <span style={{ width: 4, flexShrink: 0 }} aria-hidden />}
                  {label}
                </button>
              )
            })}
          </div>
        )}

        {/* Responsive style block */}
        <style>{`
          @media (min-width: 600px) {
            .nb-desktop-item { display: block !important; }
            .nb-hamburger    { display: none   !important; }
          }
          @media (max-width: 599px) {
            .nb-desktop-item { display: none   !important; }
            .nb-hamburger    { display: flex   !important; align-items: center; }
          }
          .nb-desktop-item:focus-visible {
            outline: 2px solid rgba(140,170,255,0.6);
            outline-offset: 2px;
          }
          button.nb-hamburger:focus-visible {
            outline: 2px solid rgba(140,170,255,0.6);
            outline-offset: 2px;
          }
        `}</style>
      </header>
    </>
  )
}