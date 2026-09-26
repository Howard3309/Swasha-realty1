'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const heroScenes = [
  {
    src: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1789371668/WEST_SIDE.png',
    alt: 'Luxury residence in daylight',
  },
  {
    src: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1789203398/Generated_Image_September_11_2026_-_1_49AM.jpg',
    alt: 'Luxury skyline residence at night',
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isLowPower, setIsLowPower] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  // Once true (set on the first click), the scene is controlled by clicks only,
  // forever — scroll can no longer change what's displayed.
  const [isManual, setIsManual] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const ref = useRef(null);
  const idleTimerRef = useRef<number | null>(null);
  const cycleTimerRef = useRef<number | null>(null);
  const hasInteractedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const lowPower = navigator.hardwareConcurrency <= 4 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsLowPower(lowPower);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const animateHero = !shouldReduceMotion && !isLowPower;
  const y = useTransform(scrollYProgress, [0, 1], ['0%', animateHero ? '40%' : '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, animateHero ? 0 : 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, animateHero ? 1.1 : 1]);
const dayOpacity = useTransform(
  scrollYProgress,
  [0, 0.25],
  [1, 0]
);

const nightOpacity = useTransform(
  scrollYProgress,
  [0.15, 0.30],
  [0, 1]
);

  // Idle auto-cycle: arms once on mount, fires only if the user hasn't scrolled or
  // clicked yet. After any interaction, this is permanently disabled.
  useEffect(() => {
    if (!animateHero) return;

    const startIdleCycle = () => {
      if (hasInteractedRef.current || window.scrollY > 20) return;
      setIsIdle(true);
      setActiveScene(1);
      cycleTimerRef.current = window.setInterval(() => {
        setActiveScene((scene) => (scene + 1) % heroScenes.length);
      }, 6500);
    };

    const stopIdleCyclePermanently = () => {
      hasInteractedRef.current = true;
      setIsIdle(false);
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
      if (cycleTimerRef.current !== null) window.clearInterval(cycleTimerRef.current);
    };

    idleTimerRef.current = window.setTimeout(startIdleCycle, 4500);
    window.addEventListener('scroll', stopIdleCyclePermanently, { passive: true });

    return () => {
      window.removeEventListener('scroll', stopIdleCyclePermanently);
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
      if (cycleTimerRef.current !== null) window.clearInterval(cycleTimerRef.current);
    };
  }, [animateHero]);

  const stopIdleAutoplay = () => {
    hasInteractedRef.current = true;
    if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
    if (cycleTimerRef.current !== null) window.clearInterval(cycleTimerRef.current);
  };

const handlePhotoClick = () => {
  stopIdleAutoplay();

  setIsManual(true);

  setIsIdle(true);
  setActiveScene((scene) => (scene === 0 ? 1 : 0));
};

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopIdleAutoplay();
  };

  // Fixed (non-scroll-driven) display applies for reduced motion, the pre-interaction
  // idle cycle, AND — this is the fix — permanently once the user has clicked once.
  // isManual takes priority and never gets cleared, so scroll can't override it again.
  const useFixedDisplay = !animateHero || isIdle || isManual;
  const fixedOpacity = (index: number) => (index === activeScene ? 1 : 0);

  return (
    <section
      ref={ref}
      onClick={handlePhotoClick}
      className="relative h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Background Image with Parallax, Zoom, and day-to-night cross-fade */}
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        {heroScenes.map((scene, index) => (
          <motion.div
            key={scene.src + index}
            className="absolute inset-0"
            transition={{ opacity: { duration: animateHero ? 1.8 : 0, ease: 'easeInOut' } }}
            style={{
              opacity: useFixedDisplay
                ? fixedOpacity(index)
                : index === 0
                  ? dayOpacity
                  : nightOpacity,
            }}
                animate={useFixedDisplay ? { opacity: fixedOpacity(index) } : undefined}
          >
            <Image
              src={scene.src}
              alt={scene.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              quality={index === 0 ? 70 : 65}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          onClick={handleContentClick}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-gold tracking-[0.2em] text-sm md:text-base font-medium mb-6 uppercase"
        >
          Residences at the Peak
        </motion.p>

        <motion.h1
          onClick={handleContentClick}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-offwhite max-w-5xl leading-tight md:leading-none tracking-tight mb-10"
        >
          Elevated Living, Rooted in Craft
        </motion.h1>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#contact"
            onClick={handleContentClick}
            className="inline-block px-10 py-4 bg-offwhite text-charcoal font-semibold tracking-widest hover:bg-gold hover:text-charcoal transition-colors duration-300"
          >
            SCHEDULE A TOUR
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        onClick={handleContentClick}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-offwhite/60 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-offwhite/30 relative overflow-hidden">
          <motion.div
            animate={{ y: animateHero ? ['-100%', '100%'] : '0%' }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 bg-offwhite"
          />
        </div>
      </motion.div>
    </section>
  );
}