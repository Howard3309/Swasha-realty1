import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import Amenities from '@/components/sections/Amenities';
import Location from '@/components/sections/Location';
import VirtualTour from '@/components/sections/VirtualTour';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const FloorPlans = dynamic(() => import('@/components/sections/FloorPlans'));
const Gallery = dynamic(() => import('@/components/sections/Gallery'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Overview />
      <Amenities />
      <FloorPlans />
      <Gallery />
      <Location />
      <VirtualTour />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
