import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = REVIEWS[currentIndex];

  const starArray = Array(5).fill(0);

  return (
    <section id="reviews" className="relative py-24 bg-brand-green-dark text-brand-cream overflow-hidden">
      {/* Decorative light elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 bg-brand-gold/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-48 right-10 h-96 w-96 bg-brand-green-light/25 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Rating aggregates */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="h-px w-6 bg-brand-gold" />
              <span className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold">Local Feedback</span>
            </div>
            
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-cream sm:text-5xl mb-6">
              Loved & Rated by <br />
              <span className="italic text-brand-gold font-normal">Our Community</span>
            </h2>

            <p className="text-brand-cream/70 text-sm sm:text-base font-light mb-8 max-w-md mx-auto lg:mx-0">
              Thousands of students, coaches, and local families from Rajeev Gandhi Nagar have dined with us. Here is what makes Green Cucina their favorite retreat.
            </p>

            {/* Rating display card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block p-8 rounded-xl bg-white/5 border border-brand-gold/20 backdrop-blur-sm shadow-xl"
            >
              <div className="flex flex-col items-center">
                <span className="font-mono text-5xl font-extrabold text-brand-gold">4.6</span>
                <div className="flex items-center gap-1 my-3 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-brand-gold' : 'fill-brand-gold/30 text-brand-gold/50'}`} />
                  ))}
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-brand-cream/60">
                  Google Maps Rating
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono tracking-wider font-semibold bg-emerald-500/10 px-3 py-1 rounded-full">
                  <Check className="h-3 w-3" /> VERIFIED REVIEW SOURCE
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Slider Carousel */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative min-h-[340px] flex items-center justify-center bg-brand-green/35 border border-brand-gold/10 p-6 sm:p-12 rounded-2xl shadow-2xl backdrop-blur-sm">
              {/* Quote marks background decoration */}
              <Quote className="absolute top-8 left-8 h-12 w-12 text-brand-gold/10 rotate-180 select-none hidden sm:block" />
              <Quote className="absolute bottom-8 right-8 h-12 w-12 text-brand-gold/10 select-none hidden sm:block" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col h-full justify-between relative z-10 w-full"
                >
                  <div>
                    {/* Testimonial rating star blocks */}
                    <div className="flex items-center gap-1 text-brand-gold mb-6">
                      {starArray.map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-gold" />
                      ))}
                    </div>

                    {/* Testimonial text quote */}
                    <p className="text-base sm:text-lg leading-relaxed text-brand-cream/90 font-serif italic mb-8">
                      "{activeReview.text}"
                    </p>
                  </div>

                  {/* Profile user row */}
                  <div className="flex items-center justify-between border-t border-brand-cream/10 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-brand-gold/50 flex-shrink-0 bg-brand-gold/10 flex items-center justify-center font-mono font-extrabold text-brand-gold uppercase text-base select-none">
                        <img
                          src={activeReview.avatar}
                          alt={activeReview.name}
                          className="h-full w-full object-cover absolute inset-0 z-10"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity = '0';
                          }}
                        />
                        <span className="relative z-0">{activeReview.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-brand-cream">{activeReview.name}</h4>
                        <p className="text-[10px] font-mono text-brand-gold font-medium uppercase tracking-widest mt-0.5">
                          {activeReview.date}
                        </p>
                      </div>
                    </div>

                    {/* Left/Right Action Arrows absolute or simple right layout */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={prevReview}
                        className="p-2 bg-brand-cream/5 hover:bg-brand-gold hover:text-brand-green-dark border border-brand-cream/10 rounded-full transition-all cursor-pointer text-brand-cream"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={nextReview}
                        className="p-2 bg-brand-cream/5 hover:bg-brand-gold hover:text-brand-green-dark border border-brand-cream/10 rounded-full transition-all cursor-pointer text-brand-cream"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-brand-gold' : 'w-2 bg-brand-cream/30'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
