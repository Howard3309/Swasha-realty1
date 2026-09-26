'use client';

import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function ImageReveal({ children, className = '' }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || shouldReduceMotion) return;

      gsap.fromTo(
        containerRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [shouldReduceMotion], revertOnUpdate: true },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}