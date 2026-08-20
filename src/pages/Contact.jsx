import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Send, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: "Mon – Thu", time: "11:00 AM – 9:30 PM" },
  { day: "Fri – Sat", time: "11:00 AM – 10:30 PM" },
  { day: "Sunday", time: "12:00 PM – 9:00 PM" },
];

const faqs = [
  {
    q: "Do you take walk-ins?",
    a: "Always welcome at the counter. For parties of 4+, a reservation keeps the wait short.",
  },
  {
    q: "Can you host private events?",
    a: "Yes — our back room seats up to 20. Send a message with your date and headcount.",
  },
  {
    q: "Is there parking nearby?",
    a: "Free lot behind the building, plus metered street parking along Harbor Lane.",
  },
];

export default function ContactPage() {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const mapRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sent

  // Page-load banner animation
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.set(".pb-reveal", { opacity: 0, y: 22 })
          .to(".pb-reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 });
      }, bannerRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  // Scroll-triggered reveals for the rest of the page
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(".ct-reveal", { opacity: 0, y: 26 });
        gsap.to(".ct-reveal", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        });

        gsap.set(".ct-field", { opacity: 0, y: 16 });
        gsap.to(".ct-field", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
          scrollTrigger: { trigger: ".ct-form", start: "top 82%" },
        });

        gsap.fromTo(
          ".ct-ticket",
          { opacity: 0, y: 30, rotate: -2 },
          {
            opacity: 1,
            y: 0,
            rotate: -1.5,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ct-ticket", start: "top 85%" },
          }
        );

        gsap.set(".faq-reveal", { opacity: 0, y: 20 });
        gsap.to(".faq-reveal", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".faq-list", start: "top 85%" },
        });
      }, contentRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Map strip reveal + subtle parallax on the pin
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(".map-reveal", { opacity: 0, y: 24 });
        gsap.to(".map-reveal", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 85%" },
        });

        gsap.to(".map-pin", {
          y: -14,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }, mapRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // Wire this up to your form handler / API route of choice.
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <main className="bg-[#FFF9F4]">
      {/* =====================================================
          PAGE BANNER
      ====================================================== */}
      <section
        ref={bannerRef}
        className="relative overflow-hidden px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44"
      >
        <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-[-160px] h-[420px] w-[420px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="pb-reveal mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A3A]/70">
            <span>Home</span>
            <span className="text-[#FF5A1F]">/</span>
            <span className="text-[#5C3A28]">Contact</span>
          </div>

          <h1
            className="pb-reveal text-[3rem] leading-[1.02] tracking-[-0.03em] text-[#5C3A28] sm:text-[3.75rem] md:text-[4.5rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Save your seat at the
            <br />
            <span className="italic text-[#FF5A1F]">counter.</span>
          </h1>

          <p
            className="pb-reveal mx-auto mt-6 max-w-lg text-[15px] leading-7 text-[#8A5A3A] sm:text-base"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Questions, private events, or a table for tonight — send word and
            we'll get right back to you.
          </p>
        </div>
      </section>

      {/* =====================================================
          FORM + INFO TICKET
      ====================================================== */}
      <section ref={contentRef} className="px-6 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* ============ FORM CARD ============ */}
          <div className="ct-reveal ct-form rounded-2xl border border-[#EFDDC9] bg-white p-7 shadow-[0_20px_60px_rgba(92,58,40,0.08)] md:p-9">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="ct-field">
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    Phone <span className="font-normal normal-case text-[#8A5A3A]/60">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              <div className="ct-field">
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                />
              </div>

              <div className="ct-field">
                <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Party size, date, or anything we should know…"
                  className="w-full resize-none rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                />
              </div>

              <div className="ct-field mt-2 flex items-center gap-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#FF5A1F] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,90,31,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8480D]"
                >
                  Send Message
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <Send size={12} strokeWidth={2.2} />
                  </span>
                </button>

                {status === "sent" && (
                  <span className="text-xs font-semibold text-[#8A5A3A]">
                    Message sent — talk soon!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* ============ INFO "TICKET" CARD ============ */}
          <div className="ct-ticket relative">
            {/* punch-hole clip at top, like an order chit on a rail */}
            <div className="absolute left-1/2 top-0 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#FFF9F4] bg-[#5C3A28]" />

            <div className="relative overflow-hidden rounded-2xl border border-[#4A2E1F] bg-[#5C3A28] p-7 text-[#FFF9F4] shadow-[0_20px_60px_rgba(92,58,40,0.25)] md:p-8">
              {/* perforated tear line */}
              <div
                className="absolute inset-x-0 top-6 h-px opacity-30"
                style={{ backgroundImage: "repeating-linear-gradient(90deg, #FFF9F4 0 6px, transparent 6px 12px)" }}
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
                Visit Hotsi
              </span>

              <h3
                className="mt-2 text-xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Ticket
              </h3>

              <div className="mt-7 flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <MapPin size={14} strokeWidth={1.8} className="text-[#FF5A1F]" />
                  </span>
                  <div style={{ fontFamily: "'Manrope', sans-serif" }}>
                    <p className="text-[13px] font-semibold">128 Harbor Lane</p>
                    <p className="text-[13px] text-[#FFF9F4]/70">Riverside District, Suite 4</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <Phone size={14} strokeWidth={1.8} className="text-[#FF5A1F]" />
                  </span>
                  <div style={{ fontFamily: "'Manrope', sans-serif" }}>
                    <p className="text-[13px] font-semibold">(555) 812-0173</p>
                    <p className="text-[13px] text-[#FFF9F4]/70">Reservations & takeout</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <Clock size={14} strokeWidth={1.8} className="text-[#FF5A1F]" />
                  </span>
                  <div className="w-full" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between text-[13px]">
                        <span className="text-[#FFF9F4]/70">{h.day}</span>
                        <span className="font-semibold">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-dashed border-white/20 pt-6">
                <a
                  href="#book"
                  className="text-xs font-bold uppercase tracking-wider text-[#FF5A1F] transition-colors duration-200 hover:text-white"
                >
                  Book a Table →
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                  >
                    <FaInstagram size={13} />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                  >
                    <FaFacebookF size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ FAQ ============ */}
        <div className="mx-auto mt-16 max-w-3xl md:mt-20">
          <h3
            className="ct-reveal mb-8 text-center text-2xl text-[#5C3A28]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A few things people ask
          </h3>

          <div className="faq-list flex flex-col divide-y divide-[#EFDDC9] rounded-2xl border border-[#EFDDC9] bg-white">
            {faqs.map((item) => (
              <div key={item.q} className="faq-reveal flex flex-col gap-1.5 px-6 py-5 md:px-7">
                <p
                  className="text-[15px] font-bold text-[#5C3A28]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.q}
                </p>
                <p
                  className="text-sm leading-6 text-[#8A5A3A]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP / FIND US STRIP
      ====================================================== */}
      <section ref={mapRef} className="relative overflow-hidden bg-[#5C3A28] px-6 py-16 md:px-10 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%">
            <pattern id="dotgrid" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#FFF9F4" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotgrid)" />
          </svg>
        </div>

        <div className="map-reveal relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-4">
            <span className="map-pin flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#FF5A1F] shadow-[0_12px_30px_rgba(255,90,31,0.35)]">
              <MapPin size={22} strokeWidth={2} className="text-white" />
            </span>
            <div>
              <p
                className="text-xl text-[#FFF9F4]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Find us on Harbor Lane
              </p>
              <p className="mt-1 text-[13px] text-[#FFF9F4]/60" style={{ fontFamily: "'Manrope', sans-serif" }}>
                128 Harbor Lane, Riverside District — 4 min from the pier
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#FFF9F4]/20 px-7 py-4 text-sm font-bold text-[#FFF9F4] transition-all duration-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Get Directions
            <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
