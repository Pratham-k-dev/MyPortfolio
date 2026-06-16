"use client"

import React from "react"
import PropTypes from "prop-types"
import { Mail } from "lucide-react"

export function Last({
  eyebrow = "Available for opportunities",
  title = "Let's build something great together.",
  subtitle = "Got a project in mind, a hard problem to solve, or just want to talk tech? I'm always up for a good conversation.",
  linkedinUrl = "https://linkedin.com/in/yourusername",
  githubUrl = "https://github.com/yourusername",
  gmailAddress = "your.email@gmail.com",
}) {
  return (
    <section
      id="connect"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]  
      dark:bg-[linear-gradient(to_bottom,#000,#0000_30%,#898e8e_78%,#ffffff_99%_50%)] 
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-white dark:bg-black 
        bg-[radial-gradient(closest-side,#fff_82%,#000000)] 
        dark:bg-[radial-gradient(closest-side,#000_82%,#ffffff)] 
        animate-fade-up"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <div className="flex justify-center mb-8">
          <span
            className="text-xs text-gray-500 dark:text-gray-400 font-geist px-4 py-2 
            border border-gray-300/40 dark:border-white/10 
            rounded-full w-fit tracking-widest uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            {eyebrow}
          </span>
        </div>
      )}

      {/* Title */}
      <h2
        className="animate-fade-in -translate-y-4 text-balance 
        bg-gradient-to-br from-black from-30% to-black/40 
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter 
        text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-8xl 
        dark:from-white dark:to-white/40 max-w-4xl mx-auto"
      >
        {title}
      </h2>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-12 mx-auto max-w-lg -translate-y-4 text-balance 
        text-base tracking-tight text-gray-500 dark:text-gray-400 
        opacity-0 leading-relaxed"
      >
        {subtitle}
      </p>

      {/* Social Links Row */}
      <div className="relative z-20 flex flex-wrap justify-center items-center gap-3 max-w-2xl mx-auto px-4 animate-fade-in mb-10">
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl 
            border border-gray-300/40 dark:border-white/10 
            bg-white/50 dark:bg-black/50 backdrop-blur-sm
            text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white
            hover:bg-white dark:hover:bg-white/5
            transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20
            text-sm font-medium tracking-tight font-geist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl 
            border border-gray-300/40 dark:border-white/10 
            bg-white/50 dark:bg-black/50 backdrop-blur-sm
            text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white
            hover:bg-white dark:hover:bg-white/5
            transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20
            text-sm font-medium tracking-tight font-geist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            GitHub
          </a>
        )}

        {gmailAddress && (
          <a
            href={gmailAddress.startsWith("mailto:") ? gmailAddress : `mailto:${gmailAddress}`}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl 
            border border-gray-300/40 dark:border-white/10 
            bg-white/50 dark:bg-black/50 backdrop-blur-sm
            text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white
            hover:bg-white dark:hover:bg-white/5
            transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20
            text-sm font-medium tracking-tight font-geist"
          >
            <Mail className="w-4 h-4" />
            Email me
          </a>
        )}
      </div>

      {/* Inline email fallback */}
      {gmailAddress && (
        <p className="text-sm text-gray-400 dark:text-gray-500 animate-fade-in">
          or reach me directly at{" "}
          <a
            href={`mailto:${gmailAddress}`}
            className="text-gray-600 dark:text-gray-300 underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors"
          >
            {gmailAddress}
          </a>
        </p>
      )}
    </section>
  )
}

Last.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  linkedinUrl: PropTypes.string,
  githubUrl: PropTypes.string,
  gmailAddress: PropTypes.string,
}