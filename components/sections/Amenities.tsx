'use client';

import Image from 'next/image';
import { Waves, Dumbbell, Briefcase, Gamepad2, UtensilsCrossed, Sofa, Baby, Trees, PartyPopper } from 'lucide-react';

const amenities = [
  {
    title: 'Infinity Edge Pool',
    description: 'A temperature-controlled lap pool merging seamlessly with the horizon, flanked by private cabanas and lush native landscaping.',
    icon: Waves,
    gif: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1789533925/swimming.gif',
    image: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1789371690/Generated_Image_September_11_2026_-_12_05PM.jpg',
    imageFit: 'contain',
  },
  {
    title: 'Wellness Pavilion',
    description: 'State-of-the-art fitness center with panoramic views, dedicated yoga studio, and private treatment rooms for in-house spa therapies.',
    icon: Dumbbell,
    gif: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790403476/treadmill.gif',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Co-Working Lounge',
    description: 'A dedicated business space with private offices and a reception, built for residents who work from home without ever feeling like they left it.',
    icon: Briefcase,
    gif: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408614/worker.gif',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Indoor Games Room',
    description: 'A dedicated recreation hall with billiards, table tennis, and lounge seating — a gathering point for residents of every age.',
    icon: Gamepad2,
    gifs: [
      'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408612/table-tennis.gif',
      'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408607/ping-pong.gif',
      'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408978/game-controller.gif',
      'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408976/chess.gif',
    ],
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: "Residents' Lounge",
    description: 'A casual sitting area with sofas and soft lighting — the everyday gathering spot before you reach the formal event spaces.',
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: "Kids' Outdoor Play Zone",
    description: 'An open-air turfed play deck with slides and toys, positioned for natural light and easy sightlines from the lounge.',
    icon: Baby,
    gifs: [
      'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408608/playground.gif',
      'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408607/seesaw.gif',
    ],
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Central Courtyard & Play Garden',
    description: 'A second, larger turfed courtyard at the heart of the plan, doubling as a play garden and a green breather between both wings.',
    icon: Trees,
    gif: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408606/growing-plant.gif',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Dining Hall',
    description: 'A full-service dining room served by an open kitchen, seating residents and guests across a run of round tables.',
    icon: UtensilsCrossed,
    gif: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790409243/dining-room.gif',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Banquet Hall & Dance Floor',
    description: 'A grand event hall with a curtained stage and open dance floor, ready to host celebrations alongside its own dining tables.',
    icon: PartyPopper,
    gif: 'https://res.cloudinary.com/do2wjxwp/image/upload/v1790408605/festival.gif',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
  }
];

export default function Amenities() {
  return (
    <section id="amenities" className="deferred-section py-24 md:py-32 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal text-center mb-20">
          <span className="text-gold tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Refined Living</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-offwhite">Curated Amenities</h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {amenities.map((amenity, index) => {
            const isEven = index % 2 === 0;
            const Icon = amenity.icon;
            const gifs = 'gifs' in amenity ? amenity.gifs ?? [] : amenity.gif ? [amenity.gif] : [];
            return (
              <div
                key={amenity.title}
                className={`reveal flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 aspect-[4/3] relative overflow-hidden group">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    loading="lazy"
                    quality={70}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onLoad={(event) => {
                      if (amenity.imageFit !== 'contain') return;
                      const { naturalWidth, naturalHeight } = event.currentTarget;
                      event.currentTarget.parentElement?.style.setProperty(
                        'aspect-ratio',
                        `${naturalWidth} / ${naturalHeight}`,
                      );
                    }}
                    className={`transition-transform duration-700 ease-out ${
                      amenity.imageFit === 'contain' ? 'object-contain' : 'object-cover group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-charcoal/10 transition-opacity duration-700 group-hover:bg-charcoal/20" />
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-gold mb-6">
                    {gifs.length > 0 ? (
                      gifs.map((gif) => (
                        <Image
                          key={gif}
                          src={gif}
                          alt=""
                          width={48}
                          height={48}
                          unoptimized
                          className="rounded-full border border-gold/30 object-cover"
                        />
                      ))
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-offwhite mb-4">{amenity.title}</h3>
                  <p className="text-offwhite/70 text-lg leading-relaxed max-w-md">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}