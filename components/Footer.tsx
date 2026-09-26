import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-20 pb-10 border-t border-offwhite/10 text-offwhite/60 text-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-widest text-offwhite block mb-6 hover:text-gold transition-colors">
              SWASHA REALTY
            </Link>
            <p className="max-w-sm leading-relaxed mb-8">
              Developing exceptional living spaces that combine timeless architecture with unprecedented levels of service and quality.
            </p>
          </div>

          <div>
            <h4 className="text-offwhite font-semibold tracking-widest uppercase mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#overview" className="hover:text-gold transition-colors">Overview</Link></li>
              <li><Link href="#amenities" className="hover:text-gold transition-colors">Amenities</Link></li>
              <li><Link href="#residences" className="hover:text-gold transition-colors">Residences</Link></li>
              <li><Link href="#gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="#contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-offwhite font-semibold tracking-widest uppercase mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-offwhite/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider">
          <p>&copy; {new Date().getFullYear()} Swasha Realty. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right opacity-50">
            RERA Registration No: PR/KN/123456/789. The imagery used is indicative and for illustrative purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
