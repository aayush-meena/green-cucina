import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import SafeImage from './SafeImage';

export default function Gallery() {
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Gallery' },
    { key: 'dishes', label: 'Artisanal Dishes' },
    { key: 'ambience', label: 'Ambiance & Seating' },
    { key: 'kitchen', label: 'Beverages & Behind-scenes' },
  ];

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const openLightbox = (itemIndexInFiltered: number) => {
    // Find index in overall list or map to filtered item
    const clickedItem = filteredItems[itemIndexInFiltered];
    const overallIndex = GALLERY_ITEMS.findIndex((item) => item.id === clickedItem.id);
    setSelectedItemIdx(overallIndex);
  };

  const closeLightbox = () => setSelectedItemIdx(null);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedItemIdx === null) return;
    const count = GALLERY_ITEMS.length;
    let nextIdx = selectedItemIdx + (direction === 'next' ? 1 : -1);
    if (nextIdx < 0) nextIdx = count - 1;
    if (nextIdx >= count) nextIdx = 0;
    setSelectedItemIdx(nextIdx);
  };

  return (
    <section id="gallery" className="relative py-24 bg-brand-cream overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute bottom-10 right-0 h-44 w-12 bg-brand-green/5 rounded-l-full blur-xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-6 bg-brand-gold/60" />
            <span className="text-[11px] uppercase font-mono tracking-widest text-brand-gold font-bold">Visual Journey</span>
            <span className="h-px w-6 bg-brand-gold/60" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green-dark sm:text-5xl">
            Sights of Italian <br />
            <span className="text-brand-gold font-normal italic">Cucina Elegance</span>
          </h2>
          <p className="mt-4 text-brand-charcoal/70 text-sm sm:text-base font-light font-sans max-w-xl mx-auto">
            Take a visual tour around our warm wooden dining counters, handmade dough kneaders, and signature sizzling recipes in Kota.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4.5 py-1.5 rounded-full font-medium text-xs uppercase font-mono tracking-wider transition-all cursor-pointer ${
                filter === cat.key
                  ? 'bg-brand-green text-brand-gold shadow-md border border-brand-green-light'
                  : 'bg-white text-brand-green-dark border border-brand-green/10 hover:bg-brand-gold/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Modern Masonry/Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Custom spanning heights for realistic masonry style on big grids
              const isLarge = index === 1 || index === 5;
              const spanClass = isLarge ? 'sm:row-span-2' : '';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className={`group relative overflow-hidden rounded-xl bg-brand-green border border-brand-green/5 shadow-md cursor-pointer ${spanClass}`}
                >
                  {/* Image wrapper */}
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    category={item.category === 'dishes' ? 'pizza' : 'ambience'}
                  />

                  {/* Dark Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-6" />

                  {/* Icon Indicator popping */}
                  <div className="absolute top-4 right-4 p-2 bg-brand-gold/20 text-brand-gold border border-brand-gold/30 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Hover Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-brand-gold">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-cream mt-1 drop-shadow-sm">
                      {item.title}
                    </h3>
                    <span className="text-xs text-brand-cream/80 flex items-center gap-1 mt-2.5 font-mono">
                      <Eye className="h-3 w-3" /> View Large
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedItemIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          >
            {/* Close touch trigger outer */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

            {/* Close Button top-right */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-brand-cream/10 text-brand-cream hover:bg-brand-gold hover:text-brand-green-dark transition-all cursor-pointer border border-brand-cream/10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Left */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 sm:left-8 z-30 p-2 sm:p-3 rounded-full bg-brand-cream/10 text-brand-cream hover:bg-brand-gold hover:text-brand-green-dark transition-all cursor-pointer border border-brand-cream/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Navigation Right */}
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 sm:right-8 z-30 p-2 sm:p-3 rounded-full bg-brand-cream/10 text-brand-cream hover:bg-brand-gold hover:text-brand-green-dark transition-all cursor-pointer border border-brand-cream/10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Content Card Wrapper */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full bg-brand-green-dark border border-brand-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-20"
            >
              <div className="relative flex-grow min-h-[300px] overflow-hidden">
                <SafeImage
                  src={GALLERY_ITEMS[selectedItemIdx].imageUrl}
                  alt={GALLERY_ITEMS[selectedItemIdx].title}
                  className="h-full w-full object-contain max-h-[70vh] pointer-events-none"
                  category="ambience"
                />
              </div>

              {/* Bottom text info */}
              <div className="p-6 bg-brand-green-dark/95 border-t border-brand-gold/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold bg-brand-gold/10 px-2.5 py-0.5 rounded">
                    {GALLERY_ITEMS[selectedItemIdx].category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-brand-cream mt-2">
                    {GALLERY_ITEMS[selectedItemIdx].title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-brand-cream/60">
                  Image {selectedItemIdx + 1} of {GALLERY_ITEMS.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
