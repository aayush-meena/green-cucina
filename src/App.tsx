import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import MenuSection from './components/MenuSection';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Statistics from './components/Statistics';
import ReservationForm from './components/ReservationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import NotFound from './components/NotFound';

function MainLanding() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to section requested from other routes (e.g., from Admin Panel back to reservation/menu)
    if (location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      const element = document.getElementById(targetId);
      if (element) {
        // Subtle debounce to guarantee page DOM is fully mounted
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <div className="bg-brand-cream/40 min-h-screen text-brand-charcoal selection:bg-brand-gold selection:text-brand-green-dark">
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Statistics />
      <MenuSection />
      <Gallery />
      <Reviews />
      <ReservationForm />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
