import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Marquee from './components/Marquee';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Register from './components/Register';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Modals from './components/Modals';
import Toast from './components/Toast';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBtt(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
  }, [activeModal]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('on');
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal, .reveal-right, .ticker, .gallery-strip, .stat-card');
    elements.forEach(el => observer.observe(el));

    // Fallback un-hide safety
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-right').forEach(el => el.classList.add('on'));
    }, 3000);

    return () => observer.disconnect();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const addToCart = (id, name, day) => {
    if (cart.find(i => i.id === id)) {
      showToast(`${name} already in cart`);
      return;
    }
    setCart([...cart, { id, name, day }]);
    showToast(`${name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
    showToast('Event removed from cart');
  };

  return (
    <>
      <Cursor />
      <Toast message={toastMsg} />
      <CartDrawer isCartOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} cart={cart} removeFromCart={removeFromCart} />
      <Modals activeModal={activeModal} closeM={() => setActiveModal("")} addToCart={addToCart} cart={cart} showToast={showToast} />
      
      <Nav cartCount={cart.length} openCart={() => setIsCartOpen(true)} />
      <Hero />
      <Ticker />
      <About />
      <Events openModal={(id) => setActiveModal(id)} addToCart={addToCart} cart={cart} />
      <Schedule />
      <Marquee />
      <Speakers />
      <Sponsors />
      <FAQ />
      <Register cart={cart} removeFromCart={removeFromCart} showToast={showToast} />
      <Footer />

      <button className={`btt ${showBtt ? 'show' : ''}`} id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </button>
    </>
  );
}
