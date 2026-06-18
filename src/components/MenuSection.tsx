import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Flame, Sparkles, Filter, SlidersHorizontal, Settings, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { INITIAL_MENU_ITEMS, migrateMenuImages } from '../data';
import SafeImage from './SafeImage';

export default function MenuSection() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load menu from localStorage, or initialize with defaults if not present
  useEffect(() => {
    const savedMenu = localStorage.getItem('green_cucina_menu');
    if (savedMenu) {
      try {
        const parsed = JSON.parse(savedMenu);
        const migrated = migrateMenuImages(parsed);
        setMenu(migrated);
        // Persist the migrated clean version so the issue is permanently fixed
        localStorage.setItem('green_cucina_menu', JSON.stringify(migrated));
      } catch (err) {
        console.error('Error parsing saved menu, resetting to initial', err);
        setMenu(INITIAL_MENU_ITEMS);
        localStorage.setItem('green_cucina_menu', JSON.stringify(INITIAL_MENU_ITEMS));
      }
    } else {
      setMenu(INITIAL_MENU_ITEMS);
      localStorage.setItem('green_cucina_menu', JSON.stringify(INITIAL_MENU_ITEMS));
    }

    // Refresh menu listings when storage updates (e.g., from Admin CMS page)
    const handleStorageChange = () => {
      const updatedMenu = localStorage.getItem('green_cucina_menu');
      if (updatedMenu) {
        try {
          const parsed = JSON.parse(updatedMenu);
          setMenu(migrateMenuImages(parsed));
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Custom event dispatching inside our app too
    window.addEventListener('menuUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('menuUpdated', handleStorageChange);
    };
  }, []);

  const categories = [
    { key: 'all', label: 'All Dishes' },
    { key: 'pizza', label: 'Pizzas' },
    { key: 'pasta', label: 'Pastas' },
    { key: 'appetizers', label: 'Appetizers' },
    { key: 'beverages', label: 'Mocktails & Drinks' },
    { key: 'desserts', label: 'Desserts' },
  ];

  // Filtering & search logic
  const filteredMenu = menu.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="relative py-24 bg-brand-cream/40 overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/4 left-0 h-44 w-12 bg-brand-gold/10 rounded-r-full blur-xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-brand-gold" />
              <span className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold">Ristorante Menu</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green-dark sm:text-5xl">
              Handcrafted Italian <br />
              <span className="text-brand-gold font-normal italic">Masterpieces</span>
            </h2>
          </div>

          {/* Quick Info & CMS Launcher button */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-gold hover:bg-brand-green-light rounded-md font-semibold text-xs transition-all uppercase tracking-wider font-mono shadow-md border-b-2 border-brand-gold/40 cursor-pointer"
            >
              <Settings className="h-4 w-4 animate-spin-slow text-brand-gold" />
              <span>CMS Menu Editor</span>
            </Link>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-brand-green/5 border border-brand-green/5 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Buttons Carousel */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <div className="flex items-center gap-2 mr-2 text-brand-green-dark/60 font-medium text-xs uppercase tracking-wider font-mono">
                <Filter className="h-3.5 w-3.5" />
                <span>Categories:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full font-medium text-xs uppercase font-sans tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-brand-green text-brand-gold shadow-md shadow-brand-green/20 scale-[1.02]'
                      : 'bg-brand-cream/60 text-brand-green-dark hover:bg-brand-gold/25'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Dynamic Search Input with visual feedback */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search favorite pizzas or recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-md bg-brand-cream/50 text-brand-charcoal text-sm font-medium border border-brand-green/10 focus:outline-none focus:border-brand-gold focus:bg-white transition-all text-ellipsis"
              />
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-brand-green-dark/40" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-[10px] text-brand-green-dark/50 hover:text-brand-gold uppercase font-mono cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Dishes Grid with clean Framer Motion handling */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="flex flex-col rounded-xl overflow-hidden bg-white hover:shadow-xl hover:border-brand-gold/30 border border-brand-green/5 transition-all duration-300 shadow-md relative"
              >
                {/* Popular Chef Badge overlay */}
                {item.isPopular && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-brand-gold/90 text-brand-green-dark px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-md">
                    <Sparkles className="h-3 w-3 fill-brand-green-dark" />
                    <span>Popular</span>
                  </div>
                )}

                {/* Spicy Flame overlay */}
                {item.isSpicy && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-red-600/90 text-white px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-md">
                    <Flame className="h-3 w-3 fill-white" />
                    <span>Spicy</span>
                  </div>
                )}

                {/* Dynamic Safe Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    category={item.category}
                  />
                  
                  {/* Category Stamp underlaying of image bottom */}
                  <div className="absolute bottom-3 left-4 bg-brand-green-dark/75 text-brand-gold/90 px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-mono select-none">
                    {item.category}
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-lg font-bold text-brand-green-dark leading-snug line-clamp-1" title={item.name}>
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-bold text-brand-gold bg-brand-green/5 px-2.5 py-0.5 rounded shrink-0">
                      ₹{item.price}
                    </span>
                  </div>
                  
                  <p className="text-brand-charcoal/70 text-xs sm:text-sm leading-relaxed font-light mb-6 flex-grow line-clamp-3">
                    {item.description}
                  </p>

                  <div className="border-t border-brand-green/5 pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-brand-green/70 font-mono">
                      Code: GC-{item.id.replace('pizza-', 'P').replace('pasta-', 'PA').replace('bev-', 'BV').replace('des-', 'DS').replace('app-', 'A').toUpperCase()}
                    </span>
                    <button
                      onClick={() => {
                        const target = document.getElementById('reservation');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-brand-green hover:text-brand-gold transition-colors font-mono cursor-pointer uppercase flex items-center gap-1"
                    >
                      <span>Reserve Plate</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty fallback state */}
          {filteredMenu.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white border border-dashed border-brand-green/10 rounded-xl">
              <SlidersHorizontal className="h-10 w-10 text-brand-gold mx-auto stroke-[1.5] animate-pulse mb-3" />
              <h3 className="font-serif text-lg font-bold text-brand-green-dark mb-1">No Dishes Found</h3>
              <p className="text-sm text-brand-charcoal/60 font-light max-w-sm mx-auto mb-6">
                No matching dishes with search term "{searchQuery}" under {selectedCategory} category. Feel free to clear filter search or add this dish in CMS manager!
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-4 py-2 bg-brand-cream text-brand-green-dark font-semibold text-xs uppercase"
                >
                  Clear Filters
                </button>
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-brand-green text-brand-gold font-semibold text-xs uppercase font-mono flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Dish in CMS</span>
                </Link>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
