import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import About from "./pages/About";



import ScrollToTop from "./components/ScrollToTop";
import LocationPage from "./pages/Location";
import MenuPage from "./pages/Menu";
import ContactPage from "./pages/Contact";
import OrderPage from "./pages/OrderNow";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ==============================
  // LENIS
  // ==============================
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", updateScrollTrigger);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);

    // DON'T disable GSAP lag smoothing
    // gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // ==============================
  // PRELOADER
  // ==============================
  useEffect(() => {
    if (!window.lenis) return;

    if (loading) {
      window.lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.lenis.start();
      document.body.style.overflow = "";

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // ==============================
  // ROUTE CHANGE
  // ==============================
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        immediate: true,
      });
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      {/* PRELOADER */}
      {loading && (
        <Preloader
          duration={3000}
          onComplete={() => setLoading(false)}
        />
      )}

      {/* GLOBAL */}
      <ScrollToTop />
      <Navbar />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order-now" element={<OrderPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;