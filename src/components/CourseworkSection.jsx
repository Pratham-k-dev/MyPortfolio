// import React, { useRef } from 'react';
// import { motion } from 'motion/react';
// import { Code, Database, Globe, Cpu } from 'lucide-react';
// import { ScrollSequenceCanvas } from './ScrollSequenceCanvas';

// const courses = [
//   {
//     id: 1,
//     title: 'Core Foundations',
//     description:
//       'Deep dive into Data Structures, Algorithms, and the mathematical foundations of computer science. Mastered Big-O analysis and complex problem solving.',
//     tags: ['Algorithms', 'Data Structures', 'Discrete Math'],
//     icon: <Code size={20} />,
//   },
//   {
//     id: 2,
//     title: 'Computer Architecture',
//     description:
//       'Understanding the machine at a granular level. From logic gates and assembly language to memory hierarchy and CPU pipelining.',
//     tags: ['Assembly', 'C', 'Hardware'],
//     icon: <Cpu size={20} />,
//   },
//   {
//     id: 3,
//     title: 'Database Systems',
//     description:
//       'Relational algebra, SQL, transactions, and distributed databases. Built a custom SQL parser and optimized query execution plans.',
//     tags: ['PostgreSQL', 'SQL', 'ACID'],
//     icon: <Database size={20} />,
//   },
//   {
//     id: 4,
//     title: 'Web Engineering',
//     description:
//       'Modern web application architecture, scalable backend services, and interactive frontend experiences using the latest frameworks.',
//     tags: ['React', 'Node.js', 'System Design'],
//     icon: <Globe size={20} />,
//   },
// ];

// export function CourseworkSection() {
//   const containerRef = useRef(null);

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full text-white"
//       style={{ height: `${courses.length * 150}vh` }}
//     >
//       {/* Rocket Sequence */}
//       <ScrollSequenceCanvas
//         totalFrames={35}
//         directory="/rocket"
//         prefix="ezgif-frame-"
//         extension="jpg"
//         pad={3}
//         containerRef={containerRef}
//         z = {1}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 z-10">
//         <div className="relative w-full">
//           {courses.map((course, index) => {
//             const isLeft = index % 2 === 0;

//             return (
//               <div
//                 key={course.id}
//                 className={`sticky top-0 h-screen flex items-center px-6 md:px-20 ${
//                   isLeft ? 'justify-start' : 'justify-end'
//                 }`}
//               >
//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                     y: 80,
//                   }}
//                   whileInView={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.8,
//                     delay: index * 0.08,
//                   }}
//                   viewport={{
//                     once: false,
//                     amount: 0.4,
//                   }}
//                   className="max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 pointer-events-auto"
//                 >
//                   {/* Header */}
//                   <div className="flex items-start gap-4 mb-5">
//                     <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-lunar-gold">
//                       {course.icon}
//                     </div>

//                     <div>
//                       <p className="text-xs uppercase tracking-[0.3em] text-lunar-gold font-mono mb-1">
//                         Coursework
//                       </p>

//                       <h3 className="text-2xl font-bold">
//                         {course.title}
//                       </h3>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <p className="text-slate-300 leading-relaxed mb-6">
//                     {course.description}
//                   </p>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2">
//                     {course.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useRef,useState,useEffect } from 'react';
import { motion } from 'motion/react';
import { Code, Database, Globe, Cpu, ExternalLink } from 'lucide-react';
import { ScrollSequenceCanvas } from './ScrollSequenceCanvas';

const skills = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'React, Vue, Tailwind CSS',
    icon: <Code size={24} />,
  },
  {
    id: 2,
    title: 'Backend Systems',
    description: 'Node.js, Python, PostgreSQL',
    icon: <Database size={24} />,
  },
  {
    id: 3,
    title: 'Cloud & DevOps',
    description: 'AWS, Docker, Kubernetes',
    icon: <Globe size={24} />,
  },
  {
    id: 4,
    title: 'System Architecture',
    description: 'Scalable design, microservices',
    icon: <Cpu size={24} />,
  },
];

const projects = [
  {
    id: 1,
    title: 'Next-Gen Analytics Dashboard',
    description: 'A real-time analytics platform built with React and WebSockets. Visualizes data streams with interactive charts and predictive insights.',
    techStack: ['React', 'WebSockets', 'D3.js', 'Node.js', 'PostgreSQL'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 2,
    title: 'Distributed Cache System',
    description: 'High-performance distributed caching layer supporting multi-region replication. Reduced latency by 60% in production environments.',
    techStack: ['Go', 'Redis', 'gRPC', 'Kubernetes', 'Prometheus'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 3,
    title: 'AI-Powered Content Generator',
    description: 'Leveraging LLMs to generate contextual content. Integrated with production workflows serving 10k+ daily requests.',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'Vercel', 'Supabase'],
    color: 'from-orange-500/20 to-red-500/20',
  },
];

export function CourseworkSection() {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsActive(entry.isIntersecting);
    },
    { threshold: 0.5 }
  );

  if (ref.current) {
    observer.observe(ref.current);
  }

  return () => observer.disconnect();
}, []);
  return (
    <section
      ref={containerRef}
      className="relative w-full text-white"
      style={{ height: '500vh' }}
    >
      {/* Background Animation */}
      
      <ScrollSequenceCanvas
        totalFrames={35}
        directory="/rocket"
        prefix="ezgif-frame-"
        extension="jpg"
        pad={3}
        containerRef={containerRef}
        z={isActive? 20 :0}
      />
      

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10">
        <div className="relative w-full">
          {/* ========== SKILLS SECTION ========== */}
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
              className="w-full max-w-6xl"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
                Skills & Expertise
              </h2>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none" />

                      {/* Icon */}
                      <div className="relative mb-6 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        {skill.icon}
                      </div>

                      {/* Content */}
                      <h3 className="relative text-2xl font-bold mb-3 group-hover:text-cyan-200 transition-colors">
                        {skill.title}
                      </h3>
                      <p className="relative text-slate-300 text-sm leading-relaxed">
                        {skill.description}
                      </p>

                      {/* Accent Line */}
                      <div className="relative mt-6 h-1 w-0 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-12 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========== PROJECTS SECTION ========== */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                viewport={{ once: false, amount: 0.5 }}
                whileHover={{ y: -12 }}
                className="w-full max-w-2xl group"
              >
                <div className={`relative rounded-3xl border border-white/10 bg-gradient-to-br ${project.color} backdrop-blur-xl p-10 md:p-14 transition-all duration-300 hover:border-white/30`}>
                  {/* Hover Glow Background */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/5 to-white/0" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Project Number */}
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-mono mb-4">
                      Project {String(index + 1).padStart(2, '0')}
                    </p>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full text-sm font-mono border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors font-medium"
                      >
                        <ExternalLink size={18} />
                        View Project
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium"
                      >
                        {/* <Github size={18} /> */}
                        Source Code
                      </motion.button>
                    </div>
                  </div>

                  {/* Accent Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-75 opacity-50 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                </div>
              </motion.div>
            </div>
          ))}

          {/* ========== CLOSING SECTION ========== */}
          <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-center max-w-2xl"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Let's Build Something Great
              </h2>
              <p className="text-xl text-slate-300 mb-10">
                Interested in collaborating? Let's connect and create something amazing together.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-white text-black font-bold hover:bg-slate-100 transition-colors"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
