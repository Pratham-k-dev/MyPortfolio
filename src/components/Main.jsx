import React,{useRef,useEffect,useState} from 'react'
import { ScrollSequenceCanvas } from './ScrollSequenceCanvas'


function Main() {
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
      <ScrollSequenceCanvas
              totalFrames={35}
              directory="/cubola"
              prefix="frame-"
              extension="png"
              pad={3}
              containerRef={containerRef}
              z={isActive?20:0 }
            />
    </section>
  )
}

export default Main
