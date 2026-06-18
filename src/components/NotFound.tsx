import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-green-dark text-brand-cream flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative blurred backdrops */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 bg-brand-gold/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 bg-brand-green-light/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full text-center glass-panel-dark px-8 py-12 rounded-2xl border border-brand-gold/30 shadow-2xl z-10"
      >
        <div className="mx-auto h-16 w-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/30">
          <Utensils className="h-8 w-8 text-brand-gold stroke-[1.5]" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/10">
          Error Code: 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-cream mt-6 mb-4">
          Mamma Mia! <br />
          <span className="italic text-brand-gold font-normal font-sans text-xl sm:text-2xl">Lost In Our Kitchen</span>
        </h1>

        <p className="text-brand-cream/70 text-sm font-light mb-8 leading-relaxed max-w-sm mx-auto font-sans">
          The culinary plate or page path you requested doesn't exist or has been relocated to another dining room. Let's get you back to our gourmet table.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark rounded-md font-bold text-xs uppercase tracking-widest font-mono shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Ristorante</span>
        </Link>
      </motion.div>

      {/* Bottom monogram stamp */}
      <div className="absolute bottom-10 text-center font-mono text-[9px] uppercase tracking-widest text-brand-cream/35 z-0">
        Green Cucina • Rajiv Gandhi Nagar • Kota
      </div>

    </div>
  );
}
