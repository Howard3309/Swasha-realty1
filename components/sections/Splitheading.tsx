'use client';

import { useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

type SplitHeadingProps = {
  children: string;
  /** Heading level to render. Defaults to h2 (the level every section title in this site uses). */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Seconds to wait after the reveal is triggered before it starts. */
  delay?: number;
  /** ScrollTrigger "start" position — how far into the viewport before it fires. */
  start?: string;
};

/**
 * Splits its text into characters and reveals them with a staggered
 * slide-up, either on scroll-into-view (default) or immediately if the
 * heading is already on screen at load (e.g. the Hero headline).
 *
 * Ported from the GSAP Observer/SplitText fullpage-scroll demo, but
 * deliberately WITHOUT the Observer-driven full-page scroll takeover —
 * this only handles the char-reveal effect, layered on top of the
 * existing page scroll rather than replacing it.
 */
export default function SplitHeading({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  start = 'top 85%',
}: SplitHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current || shouldReduceMotion) return;

      const split = new SplitText(ref.current, {
        type: 'chars,words,lines',
        linesClass: 'split-line',
      });

      gsap.set(split.chars, { autoAlpha: 0, yPercent: 130 });

      const tween = gsap.to(split.chars, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: 'power3.out',
        delay,
        stagger: { each: 0.02, from: 'random' },
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [children, shouldReduceMotion] },
  );

  // Reduced motion (or no JS yet): render the plain heading, no split/animation.
  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}