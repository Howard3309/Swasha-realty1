'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 400);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          title="Scroll to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-gold text-charcoal shadow-lg transition-colors hover:bg-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}