import { Play } from 'lucide-react';
import Image from 'next/image';

export default function VirtualTour() {
  return (
    <section className="deferred-section py-24 md:py-32 bg-charcoal text-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="reveal mb-16">
          <span className="text-gold tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Immersive Experience</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-offwhite mb-6">Virtual Walkthrough</h2>
          <p className="text-offwhite/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience the scale, light, and material quality of our model residences from anywhere in the world.
          </p>
        </div>

        <div className="reveal relative aspect-video w-full max-w-5xl mx-auto group cursor-pointer overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop"
            alt="Virtual Tour Thumbnail"
            fill
            loading="lazy"
            quality={70}
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-charcoal/30 transition-colors duration-500 group-hover:bg-charcoal/10" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-charcoal/40 backdrop-blur-md flex items-center justify-center border border-offwhite/20 transition-transform duration-500 group-hover:scale-110">
              <Play className="text-offwhite ml-2" size={32} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
