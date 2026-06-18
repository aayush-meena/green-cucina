import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Settings2, CalendarCheck2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', targetId: 'hero' },
    { name: 'About', targetId: 'about' },
    { name: 'Menu', targetId: 'menu' },
    { name: 'Gallery', targetId: 'gallery' },
    { name: 'Reviews', targetId: 'reviews' },
    { name: 'Contact', targetId: 'contact' },
  ];

  const handleNavClick = (targetId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-green-dark/95 backdrop-blur-md border-b border-brand-gold/20 shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="group flex flex-col justify-center select-none">
                <span className="font-serif text-2xl font-bold tracking-wider text-brand-gold group-hover:text-brand-cream transition-colors">
                  GREEN CUCINA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-brand-cream/60 group-hover:text-brand-gold transition-colors font-mono">
                  Ristorante Italiano
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.targetId)}
                  className="font-medium text-sm text-brand-cream/80 hover:text-brand-gold transition-colors tracking-wide uppercase cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              
              {/* CMS Admin Button */}
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-brand-gold/30 gold text-brand-gold hover:bg-brand-gold hover:text-brand-green-dark transition-all text-xs uppercase font-semibold font-mono"
                title="CMS Menu Admin"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span>CMS Manager</span>
              </Link>

              {/* CTA Reservation Button */}
              <button
                onClick={() => handleNavClick('reservation')}
                className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark px-4 py-2 rounded-md font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer hover:shadow-brand-gold/20 hover:shadow-lg"
              >
                <CalendarCheck2 className="h-4 w-4" />
                <span>Reserve Table</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                to="/admin"
                className="p-2 rounded-md border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/20"
                title="CMS Menu Admin"
              >
                <Settings2 className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-brand-cream hover:bg-brand-green-light hover:text-brand-gold focus:outline-none cursor-pointer"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-brand-green-dark border-b border-brand-gold/25"
            >
              <div className="space-y-1 px-4 pb-6 pt-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.targetId)}
                    className="block w-full text-left rounded-md px-3 py-3 text-base font-semibold text-brand-cream/90 hover:bg-brand-green-light hover:text-brand-gold transition-colors uppercase tracking-wider border-b border-brand-green/30"
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="pt-4 flex flex-col gap-3">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full border border-brand-gold text-brand-gold rounded-md py-2.5 text-center font-medium font-mono text-sm uppercase"
                  >
                    <Settings2 className="h-4 w-4" />
                    <span>CMS Menu Admin</span>
                  </Link>

                  <button
                    onClick={() => handleNavClick('reservation')}
                    className="flex items-center justify-center gap-2 w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark rounded-md py-2.5 text-center font-bold text-sm uppercase"
                  >
                    <CalendarCheck2 className="h-4 w-4" />
                    <span>Reserve a Table</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
