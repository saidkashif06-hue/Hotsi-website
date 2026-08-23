import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FaInstagram, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";

/**
 * Hotsi Sushi — Navbar
 * -----------------------------------------------------------------------
 * Layout: social icons (left) — Home / Menu / Logo / About / Location
 * grouped together as one centered cluster — Book Table / Order Now (right).
 *
 * Links now match the routes defined in App.jsx:
 *   Home     -> "/"
 *   Menu     -> "/menu"
 *   About    -> "/about"
 *   Location -> "/location"
 *   Book Table -> "/contact"
 *   Order Now  -> "/order-now"
 *
 * Social icons: replace SOCIAL_LINKS below with your real profile URLs.
 * They open in a new tab and no longer jump the page to the top when
 * clicked (the old href="#" placeholder caused that).
 * -----------------------------------------------------------------------
 */

const LEFT_LINKS = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
];

const RIGHT_LINKS = [
  { label: "About", to: "/about" },
  { label: "Location", to: "/location" },
];

const ALL_MOBILE_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

const SOCIAL_LINKS = [
  { Icon: FaInstagram, href: "https://instagram.com/", label: "Instagram" },
  { Icon: FaFacebookF, href: "https://facebook.com/", label: "Facebook" },
  { Icon: FaMapMarkerAlt, href: "https://maps.google.com/", label: "Find us on Maps" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const iconRefs = useRef([]);
  const logoRef = useRef(null);
  const linkRefs = useRef([]);
  const ctaRefs = useRef([]);

  const barTopRef = useRef(null);
  const barMidRef = useRef(null);
  const barBotRef = useRef(null);

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const mobileLinkRefs = useRef([]);

  // ---- Intro (page-load) animation -------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(navRef.current, { autoAlpha: 1 })
        .from(iconRefs.current, { y: -10, autoAlpha: 0, duration: 0.4, stagger: 0.06 })
        .from(
          [linkRefs.current[0], linkRefs.current[1]],
          { y: -12, autoAlpha: 0, duration: 0.45, stagger: 0.07 },
          "-=0.2"
        )
        .from(logoRef.current, { y: -16, scale: 0.9, autoAlpha: 0, duration: 0.55 }, "-=0.25")
        .from(
          [linkRefs.current[2], linkRefs.current[3]],
          { y: -12, autoAlpha: 0, duration: 0.45, stagger: 0.07 },
          "-=0.4"
        )
        .from(ctaRefs.current, { scale: 0.85, autoAlpha: 0, duration: 0.4, stagger: 0.08 }, "-=0.25");
    }, navRef);

    return () => ctx.revert();
  }, []);

  // ---- Scroll: shrink / shadow ------------------------------------------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.to(navRef.current, {
      paddingTop: scrolled ? "0.7rem" : "1.4rem",
      paddingBottom: scrolled ? "0.7rem" : "1.4rem",
      boxShadow: scrolled
        ? "0 10px 28px -14px rgba(92,58,40,0.25)"
        : "0 0 0 rgba(92,58,40,0)",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(logoRef.current, {
      scale: scrolled ? 0.86 : 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [scrolled]);

  // ---- Hamburger <-> X morph ---------------------------------------------
  // Built ONCE and reused — recreating this timeline on every toggle meant
  // "close" built a fresh paused timeline instead of reversing the one that
  // was actually playing, so the icon got stuck as a cross.
  const hamburgerTlRef = useRef(null);

  useEffect(() => {
    hamburgerTlRef.current = gsap
      .timeline({ paused: true, defaults: { duration: 0.35, ease: "power2.inOut" } })
      .to(barTopRef.current, { y: 7, rotate: 45 }, 0)
      .to(barMidRef.current, { autoAlpha: 0, scaleX: 0 }, 0)
      .to(barBotRef.current, { y: -7, rotate: -45 }, 0);

    return () => hamburgerTlRef.current?.kill();
  }, []);

  useEffect(() => {
    if (!hamburgerTlRef.current) return;
    if (isOpen) hamburgerTlRef.current.play();
    else hamburgerTlRef.current.reverse();
  }, [isOpen]);

  // ---- Mobile overlay open / close ---------------------------------------
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        gsap.set(overlayRef.current, { display: "block" });
        const tl = gsap.timeline();
        tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" })
          .from(panelRef.current, { x: "100%", duration: 0.45, ease: "power3.out" }, 0)
          .from(
            mobileLinkRefs.current,
            { y: 18, autoAlpha: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" },
            "-=0.2"
          );
      } else {
        document.body.style.overflow = "";
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 invisible bg-white/95 backdrop-blur-sm px-6 md:px-10 py-[1.4rem] border-b border-[#EFDDC9]"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: social icons (desktop) + logo (mobile) */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="hidden md:flex items-center gap-6">
              {SOCIAL_LINKS.map(({ Icon, href, label }, i) => (
                <a
                  key={label}
                  ref={(el) => (iconRefs.current[i] = el)}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-[#EFDDC9] text-[#8A5A3A] hover:text-white hover:bg-[#FF5A1F] hover:border-[#FF5A1F] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Mobile: logo sits left */}
            <Link to="/" className="md:hidden flex items-center" aria-label="Hotsi Sushi — home">
              <img src="/logo.webp" alt="Hotsi Sushi" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Center: Home · Menu · Logo · About · Location, grouped as one cluster */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {LEFT_LINKS.map((link, i) => (
                <li key={link.to} ref={(el) => (linkRefs.current[i] = el)}>
                  <NavLink label={link.label} to={link.to} />
                </li>
              ))}
            </ul>

            <Link to="/" ref={logoRef} className="flex items-center" aria-label="Hotsi Sushi — home">
              <img src="/logo.webp" alt="Hotsi Sushi" className="h-20 w-auto" />
            </Link>

            <ul className="flex items-center gap-8">
              {RIGHT_LINKS.map((link, i) => (
                <li key={link.to} ref={(el) => (linkRefs.current[LEFT_LINKS.length + i] = el)}>
                  <NavLink label={link.label} to={link.to} />
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CTAs + hamburger */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-3">
              <Link
                ref={(el) => (ctaRefs.current[0] = el)}
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FF5A1F] hover:text-white text-sm font-semibold tracking-wide px-5 py-2.5 transition-colors duration-200"
              >
                Book Table
              </Link>
              <Link
                ref={(el) => (ctaRefs.current[1] = el)}
                to="/order-now"
                className="inline-flex items-center justify-center rounded-full bg-[#FF5A1F] hover:bg-[#E8480D] text-white text-sm font-semibold tracking-wide px-5 py-2.5 transition-colors duration-200"
              >
                Order Now
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden relative h-11 w-11 flex items-center justify-center rounded-full border border-[#EFDDC9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]"
            >
              <span className="relative block w-6 h-4">
                <span
                  ref={barTopRef}
                  className="absolute left-0 top-0 h-[2.5px] w-6 bg-[#FF5A1F] rounded-full origin-center"
                />
                <span
                  ref={barMidRef}
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] w-6 bg-[#FF5A1F] rounded-full origin-center"
                />
                <span
                  ref={barBotRef}
                  className="absolute left-0 bottom-0 h-[2.5px] w-6 bg-[#FF5A1F] rounded-full origin-center"
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        ref={overlayRef}
        className="hidden fixed inset-0 z-40 invisible md:!hidden"
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-[#5C3A28]/35" />

        <div
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 right-0 h-full w-[78%] max-w-xs bg-white shadow-2xl flex flex-col pt-24 px-8"
        >
          <ul className="flex flex-col gap-6">
            {ALL_MOBILE_LINKS.map((link, i) => (
              <li key={link.to} ref={(el) => (mobileLinkRefs.current[i] = el)}>
                <Link
                  to={link.to}
                  onClick={closeMenu}
                  className="text-2xl font-medium text-[#5C3A28] hover:text-[#FF5A1F] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              ref={(el) => (mobileLinkRefs.current[ALL_MOBILE_LINKS.length] = el)}
              to="/contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#FF5A1F] text-[#FF5A1F] text-sm font-semibold tracking-wide px-6 py-3 transition-colors duration-200"
            >
              Book Table
            </Link>
            <Link
              ref={(el) => (mobileLinkRefs.current[ALL_MOBILE_LINKS.length + 1] = el)}
              to="/order-now"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-full bg-[#FF5A1F] hover:bg-[#E8480D] text-white text-sm font-semibold tracking-wide px-6 py-3 transition-colors duration-200"
            >
              Order Now
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center h-9 w-9 rounded-full border border-[#EFDDC9] text-[#8A5A3A] hover:text-white hover:bg-[#FF5A1F] hover:border-[#FF5A1F] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/** Desktop nav link with a center-out underline reveal (GSAP on hover). */
function NavLink({ label, to }) {
  const underlineRef = useRef(null);

  const grow = () =>
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  const shrink = () =>
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in" });

  return (
    <Link
      to={to}
      onMouseEnter={grow}
      onMouseLeave={shrink}
      className="relative text-[15px] font-medium text-[#5C3A28] py-1 whitespace-nowrap"
    >
      {label}
      <span
        ref={underlineRef}
        className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-[#FF5A1F] origin-center scale-x-0"
      />
    </Link>
  );
}
