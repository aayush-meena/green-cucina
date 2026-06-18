import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: 'pizza' | 'pasta' | 'ambience' | 'dessert' | 'desserts' | 'beverage' | 'beverages' | 'appetizers' | 'general';
}

const categoryFallbacks: Record<string, string> = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?auto=format&fit=crop&q=80&w=600',
  ambience: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
  dessert: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
  desserts: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
  beverage: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
  beverages: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
  appetizers: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600',
  general: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600',
};

export default function SafeImage({ src, alt, className = '', category = 'general' }: SafeImageProps) {
  const fallbackSrc = categoryFallbacks[category] || categoryFallbacks.general;
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setIsLoaded(false);
    setTriedFallback(false);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!triedFallback && currentSrc !== fallbackSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-brand-cream/80 ${className}`}>
      {/* Loading Shimmer Effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-brand-green/10 via-brand-gold/10 to-brand-green/10" />
      )}

      {hasError ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-4 bg-brand-green/5 text-brand-gold">
          <ImageOff className="h-10 w-10 stroke-[1.5]" />
          <span className="mt-2 text-xs text-brand-green/80 font-mono text-center truncate w-full px-2" title={alt}>
            {alt}
          </span>
        </div>
      ) : (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      )}
    </div>
  );
}
