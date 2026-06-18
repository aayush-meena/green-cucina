import { motion } from 'motion/react';
import { Phone, MessageSquarePlus, MapPin, Compass, Clock, Star, Map } from 'lucide-react';

export default function Contact() {
  const phone = '7733076060';
  const displayPhone = '+91 77330 76060';
  const whatsappUrl = `https://wa.me/91${phone}?text=Hi%20Green%20Cucina%2C%20I'd%20like%20to%20inquire%20about%20your%20Italian%20dishes%20or%20book%20a%20catering%20celebration.`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=164,+Rajeev+Gandhi+special,+opp.+Bansal+classes,+Rajeev+Gandhi+Nagar,+special,+Kota,+Rajasthan+324005`;
  const mapEmbedSrc = "https://maps.google.com/maps?q=164,%20Rajeev%20Gandhi%20special,%20opp.%20Bansal%20classes,%20Rajeev%20Gandhi%20Nagar,%20special,%20Kota,%20Rajasthan%20324005&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="relative py-24 bg-brand-green-dark text-brand-cream overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-6 bg-brand-gold/60" />
            <span className="text-[11px] uppercase font-mono tracking-widest text-brand-gold font-bold">Find Us</span>
            <span className="h-px w-6 bg-brand-gold/60" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-cream sm:text-5xl">
            Location & Contact <br />
            <span className="text-brand-gold font-normal italic">Channels</span>
          </h2>
          <p className="mt-4 text-brand-cream/70 text-sm sm:text-base font-light font-sans max-w-xl mx-auto">
            Ready for true Italian flavors? Connect with us directly or navigate to our dining lounge in Rajiv Gandhi Nagar.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Cards detailing contacts and hours */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Address Bento Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-xl bg-white/5 border border-brand-gold/15 flex gap-4 backdrop-blur-sm"
            >
              <div className="p-3.5 bg-brand-gold/10 text-brand-gold rounded-lg h-fit">
                <MapPin className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-wider text-brand-gold font-semibold uppercase mb-1">Physical Address</p>
                <h3 className="font-serif text-base font-bold text-brand-cream mb-1">Green Cucina</h3>
                <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed font-sans">
                  164, Rajeev Gandhi special,<br />
                  Opp. Bansal classes, Rajeev Gandhi Nagar,<br />
                  Special, Kota, Rajasthan 324005
                </p>
              </div>
            </motion.div>

            {/* Telephone Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-xl bg-white/5 border border-brand-gold/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <div className="p-3.5 bg-brand-gold/10 text-brand-gold rounded-lg h-fit">
                  <Phone className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-brand-gold font-semibold uppercase mb-1">Hotline Call</p>
                  <p className="font-serif text-lg font-bold text-brand-cream">{displayPhone}</p>
                  <p className="text-[10px] text-brand-cream/60 font-sans">Click to call immediately</p>
                </div>
              </div>
              <a
                href={`tel:${phone}`}
                className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark text-xs font-mono font-bold uppercase rounded-md tracking-wider shadow-md w-full sm:w-auto text-center cursor-pointer"
              >
                Call Hotline
              </a>
            </motion.div>

            {/* WhatsApp Integration Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-xl bg-white/5 border border-brand-gold/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-lg h-fit">
                  <MessageSquarePlus className="h-6 w-6 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-wider text-emerald-400 font-semibold uppercase mb-1">WhatsApp Chat</p>
                  <p className="font-serif text-base font-bold text-brand-cream">Instant Inquiries</p>
                  <p className="text-[10px] text-brand-cream/60 font-sans">Chat online with our operators</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-mono font-bold uppercase rounded-md tracking-wider shadow-md w-full sm:w-auto text-center cursor-pointer"
              >
                Open WhatsApp
              </a>
            </motion.div>

            {/* Working Timings Card */}
            <div className="p-6 rounded-xl bg-brand-green/30 border border-brand-gold/10 flex gap-4">
              <div className="p-3.5 bg-brand-gold/5 text-brand-gold rounded-lg h-fit ring-1 ring-brand-gold/10">
                <Clock className="h-5 w-5 text-brand-gold" />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-wider text-brand-gold font-semibold uppercase mb-1">Dining Windows</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-sans text-xs sm:text-sm text-brand-cream/80 font-light">
                  <span>Everyday:</span>
                  <span className="font-semibold text-brand-cream">11:00 AM - 11:00 PM</span>
                  <span>Kitchen break:</span>
                  <span className="font-semibold text-brand-cream">None (Served Continuously)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded interactive Map Frame */}
          <div className="col-span-1 lg:col-span-7 flex flex-col">
            <div className="relative flex-grow rounded-2xl overflow-hidden border border-brand-gold/20 shadow-2xl h-[350px] lg:h-full bg-brand-green/20">
              <iframe
                title="Green Cucina Location Map opposite Bansal Classes Kota"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1) invert(0.01)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Directions Action Row */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-grow flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark rounded-md font-bold text-xs uppercase tracking-widest font-mono shadow-lg transition-transform active:scale-[0.98] cursor-pointer text-center"
              >
                <Compass className="h-4 w-4 animate-spin-slow" />
                <span>Get Driving Directions</span>
              </a>
              
              <a
                href="https://maps.apple.com/?q=Green+Cucina+Kota+Rajasthan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-gold/40 hover:border-brand-gold bg-brand-cream/5 hover:bg-brand-cream/10 text-brand-gold rounded-md font-semibold text-xs uppercase font-mono transition-colors cursor-pointer text-center"
              >
                <Map className="h-4 w-4" />
                <span>Apple Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
