import React, { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route, useLocation } from "react-router-dom";

import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Route-level code splitting: each page now ships as its own JS chunk
// instead of all six pages (and their images/animations) being bundled
// into one giant file that has to be downloaded + parsed before anything
// can render. This is the most common cause of a page "hanging" for
// 60-120s on a slow connection right after deploy.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const MenuPage = lazy(() => import("./pages/Menu"));
const LocationPage = lazy(() => import("./pages/Location"));
const ContactPage = lazy(() => import("./pages/Contact"));
const OrderPage = lazy(() => import("./pages/OrderNow"));

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

      // Give the just-revealed page a moment to actually paint/layout
      // before ScrollTrigger measures it. A single rAF right after
      // unmount can fire before images/lazy chunks have affected layout,
      // producing wrong trigger positions and extra reflow work.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
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
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
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
      {/* Suspense fallback is intentionally empty/null: the Preloader
          already owns the loading UI for first paint. On subsequent
          route changes, chunks are tiny and load near-instantly. */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order-now" element={<OrderPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
