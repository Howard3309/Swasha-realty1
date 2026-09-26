'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Overview', href: '#overview' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Residences', href: '#residences' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Location', href: '#location' },
];

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: shouldReduceMotion ? 0 : '-100%' },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-charcoal/80 backdrop-blur-md border-b border-offwhite/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-widest text-offwhite hover:text-gold transition-colors">
            SWASHA REALTY
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-offwhite/80 hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 px-6 py-2.5 bg-gold text-charcoal text-sm font-semibold tracking-wider hover:bg-offwhite transition-colors duration-300"
            >
              ENQUIRE NOW
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-offwhite hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: shouldReduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-charcoal flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-serif text-xl tracking-widest text-gold">SWASHA</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-offwhite hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-3xl text-offwhite hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-8 px-8 py-4 bg-gold text-charcoal text-lg font-semibold tracking-wider w-3/4 max-w-sm text-center"
              >
                ENQUIRE NOW
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
