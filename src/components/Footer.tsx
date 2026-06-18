import { Link } from 'react-router-dom';
import { Facebook, Instagram, Award, MapPin, Phone, ArrowUp, Compass } from 'lucide-react';

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#061409] text-brand-cream border-t border-brand-gold/10 overflow-hidden">
      
      {/* Decorative Stamp Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-serif font-extrabold text-brand-gold/[0.01] uppercase tracking-[0.3em] select-none pointer-events-none whitespace-nowrap">
        Green Cucina
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Monogram and Brand Statement */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex flex-col select-none">
              <span className="font-serif text-2xl font-bold tracking-wider text-brand-gold">
                GREEN CUCINA
              </span>
              <span className="text-[9px] uppercase tracking-widest text-brand-cream/50 font-mono">
                Ristorante Italiano
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-brand-cream/60 leading-relaxed font-light">
              We bring true premium, uncompromised dry-aged vegetarian Italian recipes right opposite Bansal Classes in the heart of Rajiv Gandhi Nagar, Kota.
            </p>

            {/* Social media bubbles */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-brand-cream/10 rounded-full text-brand-cream/70 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 transition-all cursor-pointer"
                aria-label="Instagram Profile Link"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-brand-cream/10 rounded-full text-brand-cream/70 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 transition-all cursor-pointer"
                aria-label="Facebook Page Link"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider bg-brand-gold/10 px-2.5 py-0.5 rounded-full select-none">
                <Award className="h-3.5 w-3.5 text-brand-gold" />
                <span>RUG-IN #324</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links Navigation map */}
          <div>
            <h3 className="font-serif text-sm font-extrabold text-brand-gold uppercase tracking-wider mb-6">
              Menu Map
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm font-light text-brand-cream/80 font-sans">
              {[
                { name: 'Reserve Table', id: 'reservation' },
                { name: 'Ristorante Story', id: 'about' },
                { name: 'Dynamic Menu', id: 'menu' },
                { name: 'Photo Gallery', id: 'gallery' },
                { name: 'Verified Reviews', id: 'reviews' },
                { name: 'Reach Us/Contact', id: 'contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleQuickScroll(link.id)}
                    className="hover:text-brand-gold transition-colors block text-left w-full cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact information details quick reference */}
          <div>
            <h3 className="font-serif text-sm font-extrabold text-brand-gold uppercase tracking-wider mb-6">
              Reservations Support
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-light text-brand-cream/80">
              <li className="flex gap-3">
                <Phone className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase text-brand-cream/50 tracking-wider">Dial hotline</p>
                  <a href="tel:+917733076060" className="hover:text-brand-gold font-semibold font-serif block">
                    +91 77330 76060
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase text-brand-cream/50 tracking-wider">Kota Location</p>
                  <p className="font-sans leading-relaxed">
                    164, Rajiv Gandhi Special, Opp. Bansal Classes, Kota, RJ 324005
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter or Local Highlight stamp */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-sm font-extrabold text-brand-gold uppercase tracking-wider">
              Italian Excellence
            </h3>
            <p className="text-xs text-brand-cream/60 leading-relaxed font-light">
              Join our gourmet membership list to get notifications about seasonal truffles, pizza contests, pasta masterclasses, and weekend food deliveries in Kota.
            </p>
            
            {/* Quick Membership Form */}
            <div className="relative">
              <input
                type="email"
                placeholder="Your culinary email..."
                className="w-full px-4 py-2.5 pr-10 rounded bg-white/5 border border-brand-cream/10 text-xs text-brand-cream focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all font-medium text-ellipsis"
              />
              <button
                onClick={() => alert("Subscribed! We will keep you updated with our new gourmet seasons.")}
                className="absolute right-2 top-2 p-1 text-brand-gold hover:text-brand-cream transition-colors cursor-pointer"
              >
                <Compass className="h-4 w-4 animate-spin-slow" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner Copyright Row */}
        <div className="border-t border-brand-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-mono tracking-wider text-brand-cream/50 text-center md:text-left">
            © {new Date().getFullYear()} Green Cucina. Crafted with standard culinary precision. All rights reserved.
          </p>

          <button
            onClick={scrollUp}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded border border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-green-dark transition-all text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
          >
            <span>Back To Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
