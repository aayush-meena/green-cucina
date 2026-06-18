import { motion } from 'motion/react';
import { Calendar, Compass, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center overflow-hidden bg-brand-green-dark"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
          alt="Green Cucina Restaurant Ambiance"
          className="h-full w-full object-cover opacity-35 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" /> {/* Extra layer of luxurious dark */}
      </div>

      {/* Luxury Gold/Green floating accent blur bubbles */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-green-light/25 blur-[120px] pointer-events-none" />

      {/* Floating Design Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 right-10 md:right-32 z-10 hidden sm:block pointer-events-none"
      >
        <div className="glass-panel-dark px-3.5 py-2.5 rounded-lg border-brand-gold/20 flex items-center gap-2">
          <span className="p-1.5 rounded-full bg-brand-gold/15 text-brand-gold text-xs">⭐</span>
          <div>
            <p className="text-[10px] uppercase font-mono text-brand-cream/60 tracking-wider">Top Rated</p>
            <p className="text-xs font-serif font-semibold text-brand-gold">4.6★ Google Choice</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-28 left-8 md:left-24 z-10 hidden sm:block pointer-events-none"
      >
        <div className="glass-panel-dark px-4 py-3 rounded-lg border-brand-gold/20 flex items-center gap-3">
          <span className="p-2 rounded-full bg-brand-gold/25 text-brand-gold text-sm font-bold font-mono">🇮🇹</span>
          <div>
            <p className="text-[11px] uppercase font-mono text-brand-cream/60 tracking-wider font-semibold">Truly Italian</p>
            <p className="text-xs text-brand-cream font-medium">100% Handcrafted Dishes</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content Card Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Monogram or Little Italian Flag Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center items-center gap-1.5"
        >
          <span className="h-0.5 w-6 bg-brand-gold/40" />
          <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-brand-gold font-bold">
            Benvenuti a Green Cucina
          </span>
          <span className="h-0.5 w-6 bg-brand-gold/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl font-extrabold tracking-tight text-brand-cream sm:text-6xl md:text-7xl leading-[1.1]"
        >
          Authentic Italian <br />
          <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold bg-clip-text text-transparent">
            Flavors in Kota
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base text-brand-cream/80 sm:text-xl font-light tracking-wide leading-relaxed"
        >
          Experience handcrafted Italian cuisine made with passion, fresh imported cheeses,
          and organic garden-fresh ingredients, served in an exquisite premium setting.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollToSection('reservation')}
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark px-8 py-4 rounded-md font-bold text-base transition-all duration-300 shadow-xl shadow-brand-gold/10 hover:shadow-brand-gold/20 hover:scale-[1.02] cursor-pointer"
          >
            <Calendar className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>Book A Table</span>
          </button>
          
          <button
            onClick={() => scrollToSection('menu')}
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto border-2 border-brand-cream hover:border-brand-gold bg-brand-cream/5 hover:bg-brand-cream/10 text-brand-cream hover:text-brand-gold px-8 py-4 rounded-md font-semibold text-base transition-all duration-300 cursor-pointer"
          >
            <Compass className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>Explore Menu</span>
          </button>
        </motion.div>
      </div>

      {/* Smooth Scroll indicator CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-brand-cream/60 hover:text-brand-gold cursor-pointer flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] uppercase font-mono tracking-wider">Discover More</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
