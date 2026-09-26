import { MapPin, Navigation, Compass } from 'lucide-react';

const landmarks = [
  { name: 'Financial District', time: '5 mins', type: 'drive' },
  { name: 'International Airport', time: '25 mins', type: 'drive' },
  { name: 'Luxury Retail Hub', time: '10 mins', type: 'walk' },
  { name: 'Metro Station', time: '2 mins', type: 'walk' },
  { name: 'Central Park', time: '15 mins', type: 'drive' },
];

export default function Location() {
  return (
    <section id="location" className="deferred-section py-24 md:py-32 bg-offwhite text-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-5">
            <div className="reveal">
              <span className="text-charcoal/60 tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Location</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8">Connected to the Core</h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mb-12">
                Situated in the city&apos;s most coveted zip code, Swasha Realty places you at the intersection of commerce, culture, and convenience. Enjoy quiet residential streets just moments away from the vibrant urban pulse.
              </p>
            </div>

            <div className="reveal space-y-6">
              {landmarks.map((landmark, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between border-b border-charcoal/10 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gold">
                      {landmark.type === 'walk' ? <Navigation size={20} /> : <Compass size={20} />}
                    </span>
                    <span className="font-medium text-lg">{landmark.name}</span>
                  </div>
                  <span className="text-sm tracking-widest text-charcoal/50 uppercase">{landmark.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 h-[500px] lg:h-[700px] relative w-full bg-charcoal/5">
            {/* Map Placeholder - Using a styled iframe or static image */}
            <div className="reveal w-full h-full p-2 bg-white shadow-xl">
              <div className="w-full h-full relative overflow-hidden bg-charcoal/10 flex items-center justify-center flex-col gap-4">
                <MapPin size={48} className="text-gold" />
                <span className="font-serif text-xl tracking-widest text-charcoal/50 uppercase">Map Integration Here</span>
                {/* 
                  In production, replace with actual Google Maps embed:
                  <iframe src="..." className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy" />
                */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
