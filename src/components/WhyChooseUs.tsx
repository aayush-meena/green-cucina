import { motion } from 'motion/react';
import { Leaf, ShieldCheck, Sparkles, Users, Clock, Smile } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Leaf,
      title: 'Fresh Ingredients Only',
      desc: 'Each morning, we hand-pick organic basil, sun-dried tomatoes, and crisp farm vegetables. We strictly use premium olive oils and genuine mozzarella cheese.'
    },
    {
      icon: ShieldCheck,
      title: 'Premium Italian Quality',
      desc: 'We follow traditional Italian cooking rules. Our marinara sauce is slow-cooked for hours, and our pasta dough is pulled to obtain ideal thickness.'
    },
    {
      icon: Sparkles,
      title: 'Comfortable Ambience',
      desc: 'Step into a luxury oasis of warmth and candlelight, customized with elegant cream tones and soft soothing acoustic tracks for a relaxing meal.'
    },
    {
      icon: Users,
      title: 'Family & Student Friendly',
      desc: 'Everyone, from local coaching students celebrating milestones to multi-generational families, is warmly welcomed with open arms.'
    },
    {
      icon: Clock,
      title: 'Fast & Impeccable Service',
      desc: 'We respect your valuable study and work schedules. Enjoy quick, pipingly hot kitchen service paired with smiling promptness, never rushing your comfort.'
    },
    {
      icon: Smile,
      title: 'Professional Hospitality',
      desc: 'Our staff are highly trained culinary hosts. We delight in describing recipes, recommending matching beverages, and tailoring seasonings.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  return (
    <section id="why-choose-us" className="relative py-24 bg-brand-green-dark text-brand-cream overflow-hidden">
      {/* Decorative vector effects */}
      <div className="absolute top-0 right-0 h-80 w-80 bg-brand-gold/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 h-80 w-80 bg-brand-green-light/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-6 bg-brand-gold/60" />
            <span className="text-[11px] uppercase font-mono tracking-widest text-brand-gold font-bold">Unmatched Dining</span>
            <span className="h-px w-6 bg-brand-gold/60" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-cream sm:text-5xl">
            Why Food Lovers Choose <br />
            <span className="text-brand-gold font-normal italic">Green Cucina</span>
          </h2>
          <p className="mt-4 text-brand-cream/70 text-sm sm:text-base font-light font-sans max-w-xl mx-auto">
            Combining premium old-world Italian standards with warm domestic hospitality to create a unique culinary sanctuary.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.1)'
              }}
              className="p-8 rounded-xl bg-brand-green/30 border border-brand-gold/10 relative overflow-hidden group transition-all duration-300 backdrop-blur-sm shadow-xl"
            >
              {/* Background accent blur on card hover */}
              <div className="absolute -top-10 -right-10 h-24 w-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

              {/* Decorative Card Index (Mono) */}
              <div className="absolute top-6 right-8 text-xs font-mono font-bold text-brand-cream/15 block border border-brand-cream/10 rounded-full h-8 w-8 flex items-center justify-center">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Icon Container */}
              <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-green-dark transition-all duration-300">
                <card.icon className="h-6 w-6 stroke-[1.5]" />
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-3">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-cream/75 leading-relaxed font-light font-sans group-hover:text-brand-cream transition-colors duration-300">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
