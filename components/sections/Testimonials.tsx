'use client';

import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The attention to detail is unparalleled. From the lobby to the residence interiors, every material choice feels deliberate and exceptional.",
    author: "Elena R.",
    role: "Resident"
  },
  {
    quote: "Swasha Realty has fundamentally redefined luxury for us. It is not just about the amenities, but the pervasive sense of calm throughout the building.",
    author: "Marcus T.",
    role: "Resident"
  },
  {
    quote: "Moving here was the easiest decision. The architectural restraint and generous spaces allow for truly personalized living.",
    author: "Sarah J.",
    role: "Resident"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    observer.observe(section);

    const handleVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || document.hidden) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="deferred-section py-24 md:py-32 bg-offwhite text-charcoal">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Quote className="text-gold mx-auto mb-12 opacity-50" size={48} />
        
        <div className="relative h-[250px] md:h-[200px]">
          <div key={currentIndex} className="absolute inset-0 flex flex-col items-center justify-center animate-[testimonial-in_600ms_ease-out_both]">
              <p className="font-serif text-2xl md:text-4xl text-charcoal leading-relaxed mb-8">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              <div className="flex flex-col items-center">
                <span className="font-semibold tracking-widest uppercase text-sm">{testimonials[currentIndex].author}</span>
                <span className="text-charcoal/50 text-sm tracking-widest uppercase mt-1">{testimonials[currentIndex].role}</span>
              </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-[2px] transition-all duration-500 ${
                currentIndex === idx ? 'w-12 bg-gold' : 'w-6 bg-charcoal/20'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
