import React from 'react';
import './index.css';
import { HeroSection } from './components/HeroSection';
// import { SaturnStack } from './components/SaturnStack';
import { CourseworkSection } from './components/CourseworkSection';
import { ProjectsSection } from './components/ProjectsSection';
import Stack from './components/Stack';
import { Last } from './components/Last';
import Main from './components/Main';
function App() {
  return (
    <main className="w-full min-h-screen bg-void-black text-white selection:bg-nebula-blue/30 overflow-x-hidden">
      {/* <HeroSection /> */}
      {/* <SaturnStack /> */}
      <Main/>
      <CourseworkSection />
      {/* <ProjectsSection /> */}
      <Stack/>
      {/* <Last/> */}
      {/* Contact Footer */}
      <footer className="relative py-20 bg-void-black flex items-center justify-center border-t border-white/5 z-10">
        <div className="glass-card px-10 py-12 rounded-2xl text-center max-w-xl mx-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
          <p className="text-slate-400 mb-8">
            Whether you have a question or just want to say hi, my inbox is always open. I'll try my best to get back to you!
          </p>
          <button className="px-8 py-3 bg-aurora-teal hover:bg-teal-400 text-void-black font-semibold rounded-lg transition-colors shadow-[0_0_20px_rgba(20,184,166,0.3)]">
            Open Comm Channel
          </button>
        </div>
      </footer>
    </main>
  );
}

export default App;
