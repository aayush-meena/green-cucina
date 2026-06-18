import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CalendarDays, Users, Phone, UserRound, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Reservation } from '../types';

export default function ReservationForm() {
  const [formData, setFormData] = useState<Reservation>({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please tell us your guest name';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required for SMS updates';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number (starting 6-9)';
    }

    // Guests Validation
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'At least 1 guest must be booked';
    } else if (formData.guests > 12) {
      newErrors.guests = 'For parties larger than 12 guests, please click to call us directly';
    }

    // Date Validation
    if (!formData.date) {
      newErrors.date = 'Please pick a booking date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Dining date cannot be in the past!';
      }
    }

    // Time Validation
    if (!formData.time) {
      newErrors.time = 'Please pick a dining time slot';
    } else {
      const hour = parseInt(formData.time.split(':')[0], 10);
      // Restaurant operational hours: 11:00 AM to 11:00 PM (11 to 23)
      if (hour < 11 || hour > 23) {
        newErrors.time = 'We operate from 11:00 AM to 11:00 PM';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable API endpoint posting delays
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      // Generate unique green-cucina ticket ref
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setTicketId(`GC-RES-${randomNum}`);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      guests: 2,
      date: '',
      time: '',
      specialRequests: ''
    });
    setErrors({});
    setIsCompleted(false);
    setTicketId('');
  };

  return (
    <section id="reservation" className="relative py-24 bg-brand-cream overflow-hidden border-t border-brand-green/5">
      {/* Background vector nodes */}
      <div className="absolute top-10 left-10 h-72 w-72 bg-brand-gold/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 h-72 w-72 bg-brand-green/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        
        {/* Header Intro Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-6 bg-brand-gold" />
            <span className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold">Secure a table</span>
            <span className="h-px w-6 bg-brand-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green-dark sm:text-5xl">
            Ristorante Table <br />
            <span className="text-brand-gold font-normal italic">Reservations</span>
          </h2>
          <p className="mt-4 text-brand-charcoal/70 text-sm sm:text-base font-light font-sans max-w-md mx-auto">
            Reserve your tables beforehand to enjoy flawless handcrafted doughs and candlelit dining without wait periods.
          </p>
        </div>

        {/* Real Form Block */}
        <div className="bg-white rounded-2xl shadow-xl shadow-brand-green/5 border border-brand-green/5 overflow-hidden">
          
          <div className="bg-brand-green px-8 py-4 flex items-center justify-between border-b border-brand-gold/10">
            <span className="font-serif text-sm text-brand-gold tracking-widest uppercase font-semibold">
              Live Reservation System
            </span>
            <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
              ● Server Active
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name field */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-brand-green-dark/80 tracking-wider mb-2">
                  Guest Name <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-brand-cream/40 rounded-md border text-brand-charcoal focus:outline-none transition-all ${
                      errors.name ? 'border-red-500 focus:border-red-500 focus:bg-white' : 'border-brand-green/10 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  <UserRound className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-green-dark/50" />
                </div>
                {errors.name && <p className="text-[11px] text-red-500 font-sans mt-1.5 flex items-center gap-1">⚠ {errors.name}</p>}
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-brand-green-dark/80 tracking-wider mb-2">
                  Contact Number <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7733076060"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-brand-cream/40 rounded-md border text-brand-charcoal focus:outline-none transition-all ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:bg-white' : 'border-brand-green/10 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-green-dark/50" />
                </div>
                {errors.phone && <p className="text-[11px] text-red-500 font-sans mt-1.5 flex items-center gap-1">⚠ {errors.phone}</p>}
              </div>

              {/* Guests Count select options */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-brand-green-dark/80 tracking-wider mb-2">
                  Total Guests <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-brand-cream/40 rounded-md border text-brand-charcoal focus:outline-none transition-all ${
                      errors.guests ? 'border-red-500 focus:border-red-500 focus:bg-white' : 'border-brand-green/10 focus:border-brand-gold focus:bg-white'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-green-dark/50 pointer-events-none" />
                </div>
                {errors.guests && <p className="text-[11px] text-red-500 font-sans mt-1.5 flex items-center gap-1">⚠ {errors.guests}</p>}
              </div>

              {/* Date field */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-brand-green-dark/80 tracking-wider mb-2">
                  Date <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-brand-cream/40 rounded-md border text-brand-charcoal focus:outline-none transition-all ${
                      errors.date ? 'border-red-500 focus:border-red-500 focus:bg-white' : 'border-brand-green/10 focus:border-brand-gold focus:bg-white'
                    }`}
                  />
                  <CalendarDays className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-green-dark/50" />
                </div>
                {errors.date && <p className="text-[11px] text-red-500 font-sans mt-1.5 flex items-center gap-1">⚠ {errors.date}</p>}
              </div>

              {/* Time slot field */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-brand-green-dark/80 tracking-wider mb-2">
                  Dining Time Slot <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.time}
                    required
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-brand-cream/40 rounded-md border text-brand-charcoal focus:outline-none transition-all ${
                      errors.time ? 'border-red-500 focus:border-red-500' : 'border-brand-green/10 focus:border-brand-gold'
                    }`}
                  >
                    <option value="">-- Choose Slot --</option>
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:00">01:00 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Lunch)</option>
                    <option value="15:00">03:00 PM (Lunch)</option>
                    <option value="18:30">06:30 PM (Dinner Hour)</option>
                    <option value="19:35">07:35 PM (Dinner Hour)</option>
                    <option value="20:00">08:00 PM (Dinner Hour)</option>
                    <option value="21:15">09:15 PM (Chef Peak)</option>
                    <option value="22:00">10:00 PM (Late Night Specialty)</option>
                  </select>
                  <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-green-dark/50 pointer-events-none" />
                </div>
                {errors.time && <p className="text-[11px] text-red-500 font-sans mt-1.5 flex items-center gap-1">⚠ {errors.time}</p>}
              </div>

              {/* Special instructions */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-semibold uppercase text-brand-green-dark/80 tracking-wider mb-2">
                  Special Requests / Dietary Restrictions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Need candle setup, high chair, or extra spice? State it here..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-brand-cream/40 rounded-md border border-brand-green/10 text-brand-charcoal focus:outline-none focus:border-brand-gold focus:bg-white transition-all resize-none"
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-green-light text-brand-gold py-4 rounded-md font-bold text-sm sm:text-base transition-all duration-300 shadow-lg cursor-pointer uppercase tracking-widest border-b-4 border-brand-gold/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 fill-brand-gold text-brand-green" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>

      {/* Success Modal overlay */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-green-dark/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative max-w-md w-full bg-white border-2 border-brand-gold rounded-2xl p-8 shadow-2xl text-center text-brand-charcoal"
            >
              <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 stroke-[1.5]" />
              </div>

              <h3 className="font-serif text-2xl font-extrabold text-brand-green-dark mb-2">
                Table Reserved!
              </h3>
              
              <div className="bg-brand-gold/10 inline-block px-4 py-1.5 rounded-md font-mono text-xs text-brand-green-dark font-bold mb-6">
                Booking Reference: {ticketId}
              </div>

              <p className="text-brand-charcoal/80 text-sm font-light mb-6 leading-relaxed">
                Thank you <strong className="text-brand-green-dark">{formData.name}</strong>! We have locked in your slot for <strong className="text-brand-green-dark">{formData.guests} {formData.guests === 1 ? 'guest' : 'guests'}</strong> on <strong className="text-brand-green-dark">{formData.date}</strong> at <strong className="text-brand-green-dark">{formData.time}</strong>.
              </p>

              <div className="bg-brand-cream/60 p-4 rounded-lg text-left text-xs text-brand-charcoal/70 space-y-2 mb-8">
                <p>💡 <strong>Note:</strong> Table bookings are held for a maximum of 15 minutes past the slot. If delayed, please notify us.</p>
                <p>📍 <strong>Directions:</strong> Green Cucina sits Opp. Bansal Classes, Rajiv Gandhi Nagar, Kota.</p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-brand-green text-brand-gold uppercase font-mono font-bold text-xs tracking-wider rounded-md hover:bg-brand-green-light transition-all cursor-pointer"
              >
                Book Another Table / Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
