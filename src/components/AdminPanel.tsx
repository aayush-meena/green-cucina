import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Plus, RotateCcw, Check, ShoppingBag, Eye, Sliders, DollarSign, Sparkles, Flame, Save, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { INITIAL_MENU_ITEMS, migrateMenuImages } from '../data';
import SafeImage from './SafeImage';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Form input states
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MenuItem['category']>('pizza');
  const [isSpicy, setIsSpicy] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [customImage, setCustomImage] = useState('');

  // Load current menu
  useEffect(() => {
    const savedMenu = localStorage.getItem('green_cucina_menu');
    if (savedMenu) {
      try {
        const parsed = JSON.parse(savedMenu);
        const migrated = migrateMenuImages(parsed);
        setMenu(migrated);
        localStorage.setItem('green_cucina_menu', JSON.stringify(migrated));
      } catch (err) {
        console.error(err);
        setMenu(INITIAL_MENU_ITEMS);
        localStorage.setItem('green_cucina_menu', JSON.stringify(INITIAL_MENU_ITEMS));
      }
    } else {
      setMenu(INITIAL_MENU_ITEMS);
      localStorage.setItem('green_cucina_menu', JSON.stringify(INITIAL_MENU_ITEMS));
    }
    
    // Smooth scroll to top when mounting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update localStorage and trigger custom sync events
  const saveMenuToStorage = (updatedMenu: MenuItem[]) => {
    setMenu(updatedMenu);
    localStorage.setItem('green_cucina_menu', JSON.stringify(updatedMenu));
    
    // Dispatch custom events for same-window updates
    window.dispatchEvent(new Event('menuUpdated'));
  };

  // Add Item Logic
  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      alert('Please fill out Name, Price, and Description fields.');
      return;
    }

    const uniqueId = `${category}-${Date.now()}`;
    const newDish: MenuItem = {
      id: uniqueId,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      isSpicy,
      isPopular,
      image: customImage.trim() || undefined
    };

    const updatedMenu = [newDish, ...menu];
    saveMenuToStorage(updatedMenu);
    
    // Reset Form
    setName('');
    setPrice('');
    setDescription('');
    setIsSpicy(false);
    setIsPopular(false);
    setCustomImage('');

    triggerSuccessNotification('Dish added successfully!');
  };

  // Remove Item Logic
  const handleRemoveItem = (id: string) => {
    if (confirm('Are you sure you want to remove this dish from the menu?')) {
      const updatedMenu = menu.filter((item) => item.id !== id);
      saveMenuToStorage(updatedMenu);
      triggerSuccessNotification('Dish removed successfully!');
    }
  };

  // Update Price inline directly
  const handlePriceUpdate = (id: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    const updatedMenu = menu.map((item) => {
      if (item.id === id) {
        return { ...item, price: newPrice };
      }
      return item;
    });
    saveMenuToStorage(updatedMenu);
    triggerSuccessNotification('Price updated!');
  };

  // Toggle boolean fields directly from list
  const handleToggleState = (id: string, field: 'isSpicy' | 'isPopular') => {
    const updatedMenu = menu.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: !item[field] };
      }
      return item;
    });
    saveMenuToStorage(updatedMenu);
  };

  // Reset to Factory placeholders
  const handleResetMenu = () => {
    if (confirm('Warning: This will clear all your custom dishes and restore initial Green Cucina menu placeholders. Continue?')) {
      saveMenuToStorage(INITIAL_MENU_ITEMS);
      triggerSuccessNotification('Green Cucina menu fully restored!');
    }
  };

  const triggerSuccessNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg('');
    }, 2500);
  };

  return (
    <div className="bg-brand-cream/80 min-h-screen pt-24 pb-16 relative">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-brand-gold/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-brand-green/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Action header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-brand-green/10 mb-10">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-3 bg-white hover:bg-brand-gold hover:text-brand-green border border-brand-green/10 rounded-full shadow-md transition-all text-brand-green cursor-pointer"
              title="Return to Home Site"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">Ristorante Admin Console</p>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-green-dark">
                Menu CMS Manager
              </h1>
            </div>
          </div>

          <button
            onClick={handleResetMenu}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-md font-semibold font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Factory Menu</span>
          </button>
        </div>

        {/* Temporary toast notification block */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-green text-brand-gold px-6 py-3 rounded-full border border-brand-gold font-mono font-bold text-xs shadow-2xl tracking-wider uppercase flex items-center gap-2"
            >
              <Check className="h-4 w-4 bg-brand-gold text-brand-green rounded-full p-0.5 animate-bounce" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form and Preview Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Column Left: Add Item Form Block */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-brand-green/5 shadow-xl">
            <div className="flex items-center gap-2.5 mb-6 border-b border-brand-cream pb-4">
              <Plus className="h-5 w-5 text-brand-gold" />
              <h2 className="font-serif text-lg font-extrabold text-brand-green-dark uppercase tracking-wider">
                Create Culinary Entry
              </h2>
            </div>

            <form onSubmit={handleAddItem} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                
                {/* Dish Name */}
                <div className="sm:col-span-8">
                  <label className="block text-xs font-mono font-bold uppercase text-brand-green/80 tracking-wider mb-2">
                    Dish Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gorgonzola Margherita Pizza"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-brand-cream/30 rounded-md border border-brand-green/10 text-brand-charcoal focus:outline-none focus:border-brand-gold focus:bg-white transition-all font-medium text-ellipsis"
                  />
                </div>

                {/* Dish Price */}
                <div className="sm:col-span-4">
                  <label className="block text-xs font-mono font-bold uppercase text-brand-green/80 tracking-wider mb-2">
                    Price (INR) <span className="text-brand-gold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min={10}
                      placeholder="e.g. 350"
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full pl-9 pr-4 py-3 text-sm bg-brand-cream/30 rounded-md border border-brand-green/10 text-brand-charcoal focus:outline-none focus:border-brand-gold focus:bg-white transition-all font-medium"
                    />
                    <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-brand-green-dark/40" />
                  </div>
                </div>

              </div>

              {/* Category selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-brand-green/80 tracking-wider mb-2">
                  Food Category <span className="text-brand-gold">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {[
                    { key: 'pizza', label: 'Pizza 🍕' },
                    { key: 'pasta', label: 'Pasta 🍝' },
                    { key: 'appetizers', label: 'Starter 🥖' },
                    { key: 'beverages', label: 'Drink 🍹' },
                    { key: 'desserts', label: 'Dessert 🍰' }
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setCategory(cat.key as MenuItem['category'])}
                      className={`py-2 px-1 text-center rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        category === cat.key
                          ? 'bg-brand-green text-brand-gold border border-brand-gold shadow-md'
                          : 'bg-brand-cream/40 text-brand-green-dark/70 border border-brand-green/10 hover:bg-brand-gold/15'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image URL Link (Optional) with placeholder tips */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-brand-green/80 tracking-wider mb-2">
                  Optional Image URL (Unsplash/Picsum reference)
                </label>
                <input
                  type="url"
                  placeholder="Leave empty for beautiful default category image"
                  value={customImage}
                  onChange={(e) => setCustomImage(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-brand-cream/30 rounded-md border border-brand-green/10 text-brand-charcoal focus:outline-none focus:border-brand-gold focus:bg-white transition-all font-medium text-ellipsis"
                />
              </div>

              {/* Rich Description */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-brand-green/80 tracking-wider mb-2">
                  Recipe Description <span className="text-brand-gold">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write sensory notes about cheese content, garnish herbs, etc. (e.g. Creamy ricotta dollops, fire roasted mushrooms with sweet olive glaze...)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-brand-cream/30 rounded-md border border-brand-green/10 text-brand-charcoal focus:outline-none focus:border-brand-gold focus:bg-white transition-all resize-none font-sans font-light"
                />
              </div>

              {/* Toggle Checkboxes spicy/popular */}
              <div className="flex flex-wrap items-center gap-6 pt-2 bg-brand-cream/30 p-4 rounded-lg">
                
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isSpicy}
                    onChange={(e) => setIsSpicy(e.target.checked)}
                    className="h-4.5 w-4.5 rounded text-brand-gold border-brand-green/10 focus:ring-brand-gold cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold uppercase text-brand-green-dark flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-red-600 fill-red-600" />
                    <span>Spicy Recipe</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="h-4.5 w-4.5 rounded text-brand-gold border-brand-green/10 focus:ring-brand-gold cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold uppercase text-brand-green-dark flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
                    <span>Popular Highlight</span>
                  </span>
                </label>

              </div>

              {/* Submit Button form */}
              <button
                type="submit"
                className="w-full py-4 bg-brand-green hover:bg-brand-green-light text-brand-gold rounded-md font-bold uppercase tracking-widest font-mono text-xs cursor-pointer shadow-md"
              >
                Insert Dish Into Live Menu
              </button>

            </form>
          </div>

          {/* Column Right: Live Card Preview Block */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-brand-green/5 shadow-xl flex flex-col justify-between h-full lg:sticky lg:top-28">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 border-b border-brand-cream pb-3">
                <Eye className="h-4 w-4 text-brand-gold" />
                <h3 className="font-serif text-sm font-extrabold text-brand-green-dark uppercase tracking-wider">
                  Live Card Preview
                </h3>
              </div>
              <p className="text-[11px] text-brand-charcoal/60 leading-relaxed mb-6 font-light">
                Visualize how this custom entry will display live in the Menu filters section of the main landing screen.
              </p>
            </div>

            {/* Simulated Live Menu Card Container */}
            <div className="border border-brand-green/15 rounded-xl overflow-hidden shadow-lg bg-white relative">
              
              {/* Popular stamp */}
              {isPopular && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-brand-gold text-brand-green-dark px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-md">
                  <Sparkles className="h-3 w-3 fill-brand-green-dark" />
                  <span>Popular</span>
                </div>
              )}

              {/* Spicy stamp */}
              {isSpicy && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-red-600 text-white px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm shadow-md">
                  <Flame className="h-3 w-3 fill-white" />
                  <span>Spicy</span>
                </div>
              )}

              {/* Image Preview */}
              <div className="aspect-[4/3] w-full bg-brand-cream flex items-center justify-center relative overflow-hidden">
                {customImage ? (
                  <img
                    src={customImage}
                    alt={name || 'Dish Preview'}
                    className="h-full w-full object-cover"
                    onError={() => {}}
                  />
                ) : (
                  <div className="text-center p-6 flex flex-col items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-brand-gold mb-2 stroke-[1.5]" />
                    <span className="text-xs uppercase font-mono tracking-wider text-brand-green-dark/50">
                      Empty media box
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-4 bg-brand-green-dark/85 text-brand-gold/90 px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-mono select-none">
                  {category}
                </div>
              </div>

              {/* Info Detail area */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="font-serif text-lg font-bold text-brand-green-dark truncate w-full">
                    {name || 'Golden Neapolitan Sourdough'}
                  </h4>
                  <span className="font-mono text-base font-bold text-brand-gold bg-brand-green/5 px-2.5 py-0.5 rounded shrink-0">
                    ₹{price || '000'}
                  </span>
                </div>
                <p className="text-brand-charcoal/70 text-xs sm:text-sm leading-relaxed font-light mb-4 line-clamp-3">
                  {description || 'Sensorial and sensory description will display here describing cheese consistency, herbs, baking temperature thresholds...'}
                </p>
                <div className="border-t border-brand-green/5 pt-4 text-[10px] text-brand-green/45 font-mono">
                  Code: GC-{category.toUpperCase()[0]}X-DYNAMIC
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Existing Dishes CMS List Area */}
        <div className="bg-white rounded-2xl border border-brand-green/5 shadow-xl overflow-hidden">
          
          <div className="bg-brand-green px-8 py-5 border-b border-brand-gold/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-gold" />
              <h3 className="font-serif text-sm font-extrabold text-brand-gold uppercase tracking-widest leading-none">
                Live Ristorante Cards Catalog ({menu.length} entries)
              </h3>
            </div>
            <span className="text-xs font-mono text-brand-cream/60">
              Interactive database table
            </span>
          </div>

          <div className="p-4 sm:p-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-brand-green/10 text-left">
                    <th className="pb-4 font-mono text-xs uppercase text-brand-green-dark/60 font-semibold">Preview</th>
                    <th className="pb-4 font-mono text-xs uppercase text-brand-green-dark/60 font-semibold">Dish Details</th>
                    <th className="pb-4 font-mono text-xs uppercase text-brand-green-dark/60 font-semibold text-center">Category</th>
                    <th className="pb-4 font-mono text-xs uppercase text-brand-green-dark/60 font-semibold">Attributes</th>
                    <th className="pb-4 font-mono text-xs uppercase text-brand-green-dark/60 font-semibold w-32">Price (₹)</th>
                    <th className="pb-4 font-mono text-xs uppercase text-brand-green-dark/60 font-semibold text-right w-20">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-green/5 text-brand-charcoal">
                  {menu.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-cream/30 transition-colors">
                      
                      {/* Image Thumbnail */}
                      <td className="py-4">
                        <div className="h-10 w-12 rounded overflow-hidden">
                          <SafeImage
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            category={item.category}
                          />
                        </div>
                      </td>

                      {/* Name and sensory details */}
                      <td className="py-4 pr-4">
                        <h4 className="font-serif font-bold text-sm text-brand-green-dark">{item.name}</h4>
                        <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-light font-sans truncate max-w-sm mt-0.5">
                          {item.description}
                        </p>
                      </td>

                      {/* Category Label stamp */}
                      <td className="py-4 text-center">
                        <span className="inline-block font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-green/10 text-brand-green-dark">
                          {item.category}
                        </span>
                      </td>

                      {/* Spicy/Popular Toggles directly in table */}
                      <td className="py-4 space-y-1">
                        <div className="flex gap-2.5">
                          {/* Spicy check */}
                          <button
                            onClick={() => handleToggleState(item.id, 'isSpicy')}
                            className={`p-1 text-[9px] font-mono uppercase font-bold tracking-wider rounded border hover:scale-[1.03] transition-transform flex items-center gap-0.5 cursor-pointer ${
                              item.isSpicy
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : 'bg-transparent text-brand-green-dark/30 border-brand-green/10'
                            }`}
                            title="Toggle Spicy Flag"
                          >
                            <Flame className={`h-3 w-3 ${item.isSpicy ? 'fill-red-600' : ''}`} />
                            <span>Spicy</span>
                          </button>

                          {/* Popular check */}
                          <button
                            onClick={() => handleToggleState(item.id, 'isPopular')}
                            className={`p-1 text-[9px] font-mono uppercase font-bold tracking-wider rounded border hover:scale-[1.03] transition-transform flex items-center gap-0.4 cursor-pointer ${
                              item.isPopular
                                ? 'bg-amber-50 text-brand-gold-dark border-brand-gold/40'
                                : 'bg-transparent text-brand-green-dark/30 border-brand-green/10'
                            }`}
                            title="Toggle Popular Highlight Chef Badge"
                          >
                            <Sparkles className={`h-3 w-3 ${item.isPopular ? 'fill-brand-gold-dark text-brand-gold-dark' : ''}`} />
                            <span>Popular</span>
                          </button>
                        </div>
                      </td>

                      {/* Price change inline */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-brand-green-dark/50 font-mono font-semibold">₹</span>
                          <input
                            type="number"
                            min={1}
                            value={item.price}
                            onChange={(e) => handlePriceUpdate(item.id, Number(e.target.value))}
                            className="w-16 p-1 text-xs text-brand-charcoal font-bold font-mono border border-brand-green/10 focus:outline-none focus:border-brand-gold focus:bg-white text-center rounded bg-brand-cream/30"
                          />
                        </div>
                      </td>

                      {/* Delete dish button */}
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded transition-colors cursor-pointer border border-red-100 shadow-sm inline-flex items-center"
                          title="Delete from catalogue list"
                        >
                          <Trash2 className="h-4 w-4 stroke-[1.5]" />
                        </button>
                      </td>

                    </tr>
                  ))}
                  
                  {menu.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-brand-charcoal/50 font-light text-sm font-sans">
                        No dishes listed in database catalog! Click "Reset Factory Menu" above to restore default Italian recipes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
