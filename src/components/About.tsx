import { motion } from 'motion/react';
import { Award, Leaf, HeartHandshake, MapPin } from 'lucide-react';
import SafeImage from './SafeImage';

export default function About() {
  const highlights = [
    {
      icon: Award,
      title: 'Handcrafted With Love',
      desc: 'Our sour doughs are fermented for 48 hours and hand-stretched for the ultimate Neapolitan crust.'
    },
    {
      icon: Leaf,
      title: '100% Vegetarian & Fresh',
      desc: 'Sourcing the finest local organic tomatoes, fresh local herbs, and imported premium Italian cheeses.'
    },
    {
      icon: HeartHandshake,
      title: 'Quality Over Everything',
      desc: 'Honoring strict Italian culinary traditions with zero compromises on ingredients and presentation.'
    },
    {
      icon: MapPin,
      title: 'Iconic Kota Landmark',
      desc: 'Centrally situated directly opposite Bansal Classes in Rajiv Gandhi Nagar, welcoming families and students alike.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="about" className="relative py-24 bg-brand-cream overflow-hidden">
      {/* Subtle details background */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-brand-green-dark/[0.02] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Story Craft */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-brand-gold" />
                <span className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold">Our Story</span>
              </div>
              
              <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green-dark sm:text-5xl mb-6">
                Redefining Italian Dine-In <br />
                <span className="italic text-brand-gold font-normal">in the Heart of Kota</span>
              </h2>

              <p className="text-brand-charcoal/80 text-base sm:text-lg leading-relaxed mb-6 font-light">
                Green Cucina was born from a simple, passionate dream: to bring true, uncompromised Italian dining to Rajasthan. Located right in the vibrant hub of Rajeev Gandhi Nagar, opposite Bansal Classes, we recreate the warm, comforting atmosphere of a traditional Italian suburban home.
              </p>

              <p className="text-brand-charcoal/80 text-base leading-relaxed mb-10 font-light">
                Every dish tells a tale of rigorous seasoning, fresh muddled herbs, and slow baking. From our loaded Cheese Burst breads to rich, hand-whipped Fettuccine Alfredo, we believe that dining is an art form of community and joy. Our kitchen respects old-world Mediterranean recipes while tailoring them for Kota’s vegetarian palates.
              </p>
            </motion.div>

            {/* Quick Badges Highlights */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-150px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-5 rounded-lg bg-white shadow-md shadow-brand-green/5 border border-brand-green/5 flex gap-4 hover:shadow-lg hover:border-brand-gold/30 hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-brand-green/5 rounded-full text-brand-gold">
                      <h.icon className="h-6 w-6 stroke-[1.5]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-green-dark mb-1">{h.title}</h3>
                    <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Imagery Collage */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-4/5 w-full max-w-sm sm:max-w-md mx-auto"
            >
              {/* Outer Elegant Frame */}
              <div className="absolute inset-0 border-2 border-brand-gold/40 rounded-xl translate-x-4 translate-y-4 -z-10" />

              {/* Main Image */}
              <SafeImage
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600"
                alt="Green Cucina Restaurant Interior Table"
                className="rounded-xl shadow-2xl h-full w-full object-cover"
                category="ambience"
              />

              {/* Overlapping Absolute Thumbnail */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-8 -left-8 w-1/2 aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-brand-cream hidden sm:block"
              >
                <SafeImage
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400"
                  alt="Delicious Pizza hand-pulled"
                  className="h-full w-full"
                  category="pizza"
                />
              </motion.div>

              {/* Authentic Italian Stamp */}
              <div className="absolute top-4 right-4 glass-panel-dark px-3 py-1.5 rounded-full border border-brand-gold/20 font-mono text-[9px] text-brand-gold font-bold uppercase tracking-widest">
                Kota, RJ, IN
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
