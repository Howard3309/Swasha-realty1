'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(shouldReduceMotion ? to : from);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(to);
      return;
    }
    
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, to, from, duration, shouldReduceMotion]);

  return <span ref={ref}>{count}</span>;
}

export default function Overview() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="overview" ref={sectionRef} className="py-24 md:py-32 bg-offwhite text-charcoal">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="max-w-2xl">
            <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              A masterclass in modern architectural restraint.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-charcoal/70 text-lg md:text-xl leading-relaxed mb-6">
              Swasha Realty presents a sanctuary designed for those who appreciate the quiet power of exceptional design. Our flagship development combines meticulous material selection with expansive, light-filled spaces to create an environment that feels simultaneously grounding and limitless.
            </motion.p>
            <motion.p variants={itemVariants} className="text-charcoal/70 text-lg leading-relaxed">
              Here, every detail serves a purpose. The result is a curated living experience that transcends trends, offering lasting elegance and unparalleled comfort.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <motion.div variants={itemVariants} className="border-l border-charcoal/20 pl-6">
              <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                <Counter to={44} />
              </div>
              <div className="text-sm tracking-widest uppercase text-charcoal/60 font-semibold">Luxury Residences</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="border-l border-charcoal/20 pl-6">
              <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                <Counter to={11} />
              </div>
              <div className="text-sm tracking-widest uppercase text-charcoal/60 font-semibold">Floors of Elevation</div>
            </motion.div>

            <motion.div variants={itemVariants} className="border-l border-charcoal/20 pl-6">
              <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                <Counter to={2029} from={2000} duration={2.5} />
              </div>
              <div className="text-sm tracking-widest uppercase text-charcoal/60 font-semibold">Completion</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="border-l border-charcoal/20 pl-6">
              <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">
                <Counter to={15} />+
              </div>
              <div className="text-sm tracking-widest uppercase text-charcoal/60 font-semibold">Curated Amenities</div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
