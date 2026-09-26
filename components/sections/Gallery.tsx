'use client';

import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageReveal from '@/components/ImageReveal';
import SplitHeading from '@/components/sections/Splitheading';

const images = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', alt: 'Grand Lobby' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop', alt: 'Exterior Facade' },
  { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop', alt: 'Living Area' },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop', alt: 'Master Bathroom' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop', alt: 'Dining Space' },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop', alt: 'Private Balcony' },
];

export default function Gallery() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="deferred-section py-24 md:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="reveal text-gold tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Visuals</span>
          <SplitHeading className="font-serif text-4xl md:text-5xl lg:text-6xl text-offwhite">
            A Closer Look
          </SplitHeading>
        </div>

        {/* Simple Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className={`reveal relative overflow-hidden cursor-pointer group bg-charcoal/50 ${
                idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
            >
              <ImageReveal className="absolute inset-0 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  quality={70}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-offwhite font-serif tracking-widest text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{img.alt}</span>
                </div>
              </ImageReveal>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-offwhite/70 hover:text-gold transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-6 text-offwhite/70 hover:text-gold transition-colors z-10"
              onClick={prevImage}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <motion.div 
              key={selectedIdx}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-[16/9] md:aspect-video px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIdx].src}
                alt={images[selectedIdx].alt}
                fill
                className="object-contain"
                sizes="100vw"
                quality={75}
              />
            </motion.div>

            <button 
              className="absolute right-6 text-offwhite/70 hover:text-gold transition-colors z-10"
              onClick={nextImage}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-offwhite/70 font-serif tracking-widest">
              {selectedIdx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
