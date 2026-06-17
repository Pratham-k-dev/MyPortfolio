import React, { useEffect } from 'react';
import Lenis from 'lenis';
import './index.css';
import { Main } from './components/narrative/Main3';
import { RocketSection } from './components/narrative/RocketSection';
import Stack from './components/Stack';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
    <Navbar />
    <main className="w-full min-h-screen bg-void-black text-white selection:bg-nebula-blue/30 overflow-x-hidden">
      <section ><Main /></section>
      <section ><RocketSection /></section>
      <section ><Stack /></section>
      {/* Contact Footer */}
    </main>
      <Footer/>
    </>
  );
}

export default App;
