import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Smile, Award, Utensils } from 'lucide-react';
import { STATS } from '../data';

// Helper custom hook or component for the counter
function AnimatedCounter({ value, suffix, duration = 1.5 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = value;
    const isDecimal = !Number.isInteger(value);
    
    // Total frames based on 60 FPS
    const totalFrames = Math.max(Math.floor(duration * 60), 1);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Simple easeOutQuad multiplier
      const progress = frame / totalFrames;
      const easeProgress = progress * (2 - progress);
      const currentVal = start + easeProgress * (end - start);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(isDecimal ? Math.round(currentVal * 10) / 10 : Math.round(currentVal));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [hasStarted, value, duration]);

  return (
    <span ref={ref} className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-gold">
      {count}
      <span className="text-brand-cream">{suffix}</span>
    </span>
  );
}

export default function Statistics() {
  const iconMap: Record<string, any> = {
    star: Star,
    smile: Smile,
    award: Award,
    utensils: Utensils,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-16 bg-brand-green border-y border-brand-gold/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-brand-gold/10 text-center"
        >
          {STATS.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Award;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`pt-6 lg:pt-0 flex flex-col items-center justify-center p-4 ${
                  idx === 0 ? 'pt-0' : ''
                }`}
              >
                {/* Icon display bubble */}
                <div className="mb-4 p-3 bg-brand-cream/5 rounded-full text-brand-cream/50 ring-1 ring-brand-cream/10">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>

                {/* Simulated odometer counting trigger */}
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                {/* Descriptive label details */}
                <p className="mt-2 text-xs sm:text-sm font-light font-sans uppercase tracking-widest text-brand-cream/70">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
