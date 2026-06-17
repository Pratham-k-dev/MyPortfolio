import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaMapPin,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";

import {

  
 
 
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
} from 'react-icons/si';

import {Mail} from "lucide-react"
import { section } from "motion/react-client";

export default function Footer() {
  return (
        
   <section
  id="contact"
  className="relative bg-black px-6 md:px-12 py-16 md:py-20 overflow-hidden"
>
  <div className="max-w-7xl mx-auto">

    <div className="grid lg:grid-cols-2 gap-12 md:gap-16">

      {/* Left Side */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs tracking-[0.3em] text-cyan-400 uppercase">
            05 / Contact
          </span>

          <div className="w-20 h-px bg-cyan-400/30" />
        </div>

        <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white">
          Let's build
          <br />
          <span className="text-cyan-400">
            something amazing.
          </span>
        </h2>

        <p className="mt-8 max-w-xl text-slate-400 text-lg leading-relaxed">
          Whether you have a project idea, internship opportunity,
          collaboration, or simply want to connect, my inbox is
          always open.
        </p>

        <a
          href="https://www.linkedin.com/in/pratham-kulkarni-5253a8335/"
          className="
            inline-flex
            items-center
            gap-3
            mt-10
            px-8
            py-4
            rounded-full
            bg-cyan-500
            text-black
            font-semibold
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Let's Connect <FaPaperPlane />
        </a>
      </div>

      {/* Right Side */}
      <div className="space-y-4 mt-[10%]">

        {[
          {
            icon: <Mail size={24} />,
            title: "Email",
            value: "pratham.k3007@gmail.com@gmail.com",
            href: "mailto:pratham.k3007@gmail.com@gmail.com",
          },
          {
            icon: <FaGithub size={24} />,
            title: "GitHub",
            value: "github.com/Pratham-K-dev",
            href: "https://github.com/Pratham-K-dev",
          },
          {
            icon: <FaLinkedin size={24} />,
            title: "LinkedIn",
            value: "Pratham Kulkarni",
            href: "https://www.linkedin.com/in/pratham-kulkarni-5253a8335/",
          },
          
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="
              group
              flex
              items-center
              justify-between
              p-6
              rounded-3xl
              border
              border-white/10
              bg-white/[0.02]
              transition-all
              duration-300
              hover:border-cyan-400/40
              hover:bg-white/[0.04]
              hover:-translate-y-1
            "
          >
            <div className="flex items-center gap-5">

              <div
                className="
                  text-slate-300
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-medium text-white truncate">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm truncate">
                  {item.value}
                </p>
              </div>

            </div>

            <span
              className="
                text-slate-500
                text-xl
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </a>
        ))}

      </div>
    </div>

    {/* Footer Strip */}

    <div
      className="
        mt-16
        pt-8
        border-t
        border-white/10
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
      "
    >
      <p className="text-sm text-slate-500">
        © {new Date().getFullYear()} Pratham Kulkarni
      </p>

      <p className="text-sm text-slate-400 flex items-center gap-1.5">
        Built with React and 💖
      </p>

      <p className="text-sm text-slate-500">
        B.Tech • IIIT Pune • Full Stack Developer
      </p>
    </div>

  </div>
</section>
   
  );
}