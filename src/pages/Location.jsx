import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Phone, Mail, ArrowRight, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery source images — swap these /paths for your own local assets
 * (/loc-1.jpg etc.) the same way Hero.jsx uses /1.jpg, /2.jpg, /3.jpg.
 * Left as hosted Unsplash images for now since this section has no
 * asset files yet.
 */
const gallery = [
  {
    src: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop",
    label: "The Counter",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop",
    label: "Dining Room",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=900&auto=format&fit=crop",
    label: "Nigiri Selection",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1000&auto=format&fit=crop",
    label: "Private Booths",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1000&auto=format&fit=crop",
    label: "Evening Service",
    span: "col-span-1 row-span-1",
  },
];

const hours = [
  { day: "Monday", time: "Closed", today: false },
  { day: "Tuesday – Wednesday", time: "11:30 AM – 9:30 PM", today: false },
  { day: "Thursday", time: "11:30 AM – 9:30 PM", today: true },
  { day: "Friday – Saturday", time: "11:30 AM – 10:30 PM", today: false },
  { day: "Sunday", time: "12:00 PM – 9:00 PM", today: false },
];

function SeamDivider() {
  return (
    <div className="relative flex h-28 items-center justify-center bg-[#FFF9F4] md:h-32">
      <svg width="4" height="112" viewBox="0 0 4 112" className="overflow-visible">
        <path
          className="loc-seam-path"
          d="M2 0 L2 112"
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="112"
          strokeDashoffset="112"
        />
      </svg>
    </div>
  );
}

export default function LocationPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- hero load-in ----
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".loc-hero-tag", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(".loc-hero-h1", { opacity: 1, y: 0, duration: 1 }, 0.25)
        .to(".loc-hero-sub", { opacity: 1, y: 0, duration: 0.9 }, 0.45)
        .to(
          ".loc-hero-pill",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.6
        );

      // ---- hero image parallax ----
      gsap.to(".loc-hero-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: ".loc-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ---- generic reveal-on-scroll ----
      gsap.utils.toArray(".loc-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // ---- gallery stagger ----
      gsap.fromTo(
        ".loc-gallery-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".loc-gallery", start: "top 82%" },
        }
      );

      // ---- kintsugi-style seam line draw ----
      gsap.utils.toArray(".loc-seam-path").forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDashoffset: 112 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path,
              start: "top 90%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-[#FFF9F4]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="loc-hero relative flex min-h-screen items-end overflow-hidden">
        <div className="absolute inset-[-10%_0_0_0] h-[120%] w-full">
          <img
            src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1800&auto=format&fit=crop"
            alt="Warm interior of Hotsi Sushi"
            className="loc-hero-img h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1A0F]/15 via-[#2B1A0F]/40 to-[#1F120A]/80" />

        {/* ambient ombré blobs, matching Hero.jsx language */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[-180px] h-[500px] w-[500px] rounded-full bg-[#5C3A28]/10 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20 lg:px-16">
          <div
            className="loc-hero-tag mb-5 inline-flex translate-y-4 items-center gap-3 rounded-full border border-white/25 bg-black/20 px-4 py-2 opacity-0 backdrop-blur-md"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              Now Seating · Portside District
            </span>
          </div>

          <h1
            className="loc-hero-h1 max-w-3xl translate-y-6 text-[3rem] leading-[0.98] tracking-[-0.04em] text-white opacity-0 sm:text-[4.2rem] lg:text-[5.2rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find your seat
            <br />
            <span className="italic text-[#FF9B6B]">at the counter.</span>
          </h1>

          <p
            className="loc-hero-sub mt-6 max-w-lg translate-y-5 text-base leading-7 text-white/85 opacity-0 sm:text-[17px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            One dining room, one open kitchen, a short walk from the harbor.
            Here&apos;s everything you need to plan your visit to Hotsi Sushi.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="loc-hero-pill flex translate-y-4 items-center gap-3 rounded-2xl bg-white/95 px-5 py-3.5 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8EEE5] border border-[#EFDDC9]">
                <MapPin size={15} strokeWidth={1.6} className="text-[#FF5A1F]" />
              </span>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A5A3A]">
                  Address
                </p>
                <p className="mt-0.5 text-[13.5px] font-semibold text-[#5C3A28]">
                  42 Sakura Lane, Portside
                </p>
              </div>
            </div>

            <div className="loc-hero-pill flex translate-y-4 items-center gap-3 rounded-2xl bg-white/95 px-5 py-3.5 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8EEE5] border border-[#EFDDC9]">
                <Clock size={15} strokeWidth={1.6} className="text-[#FF5A1F]" />
              </span>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A5A3A]">
                  Open Today
                </p>
                <p className="mt-0.5 text-[13.5px] font-semibold text-[#5C3A28]">
                  11:30 AM – 9:30 PM
                </p>
              </div>
            </div>

            <div className="loc-hero-pill flex translate-y-4 items-center gap-3 rounded-2xl bg-white/95 px-5 py-3.5 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8EEE5] border border-[#EFDDC9]">
                <Phone size={15} strokeWidth={1.6} className="text-[#FF5A1F]" />
              </span>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A5A3A]">
                  Reservations
                </p>
                <p className="mt-0.5 text-[13.5px] font-semibold text-[#5C3A28]">
                  (555) 014–2288
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeamDivider />

      {/* =====================================================
          STEP INSIDE — GALLERY
      ====================================================== */}
      <section className="px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="loc-reveal mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-[#FF5A1F]" />
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Step Inside
                </span>
              </div>
              <h2
                className="loc-reveal max-w-xl text-3xl leading-tight text-[#5C3A28] md:text-[2.5rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A room built around the counter.
              </h2>
            </div>
            <p
              className="loc-reveal max-w-xs text-sm leading-6 text-[#8A5A3A]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Low light, warm wood, and a straight sightline to the chefs.
              No two seats have quite the same view of the pass.
            </p>
          </div>

          <div className="loc-gallery grid grid-cols-2 gap-4 md:grid-cols-3 md:auto-rows-[180px]">
            {gallery.map((item) => (
              <div
                key={item.label}
                className={`loc-gallery-item group relative overflow-hidden rounded-2xl border border-[#EFDDC9] ${item.span}`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                <span
                  className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeamDivider />

      {/* =====================================================
          PLAN YOUR VISIT
      ====================================================== */}
      <section className="px-6 pb-24 pt-4 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="loc-reveal mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-[#FF5A1F]" />
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Plan Your Visit
                </span>
              </div>
              <h2
                className="loc-reveal max-w-xl text-3xl leading-tight text-[#5C3A28] md:text-[2.5rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We hold the counter seats.
                <br />
                Everything else, walk in.
              </h2>
            </div>
            <p
              className="loc-reveal max-w-xs text-sm leading-6 text-[#8A5A3A]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              A short walk from the Portside ferry stop. Street parking
              after 6 PM, or the harbor garage two blocks north.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            {/* HOURS + CONTACT CARD */}
            <div className="loc-reveal rounded-2xl border border-[#EFDDC9] bg-white p-8 shadow-[0_20px_60px_rgba(92,58,40,0.08)] md:p-9">
              <h3
                className="text-xl text-[#5C3A28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Hours
              </h3>

              <div className="mt-5" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between border-b border-[#EFDDC9] py-3 text-[13.5px] last:border-none"
                  >
                    <span className="flex items-center gap-2 font-semibold text-[#5C3A28]">
                      {h.day}
                      {h.today && (
                        <span className="rounded-full border border-[#EFDDC9] bg-[#F8EEE5] px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.1em] text-[#FF5A1F]">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="text-[#8A5A3A]">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#EFDDC9] bg-[#F8EEE5]">
                    <MapPin size={14} strokeWidth={1.6} className="text-[#FF5A1F]" />
                  </span>
                  <div>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#8A5A3A]">
                      Address
                    </p>
                    <p className="mt-0.5 text-[13.5px] font-medium text-[#5C3A28]">
                      42 Sakura Lane, Portside District
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#EFDDC9] bg-[#F8EEE5]">
                    <Phone size={14} strokeWidth={1.6} className="text-[#FF5A1F]" />
                  </span>
                  <div>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#8A5A3A]">
                      Phone
                    </p>
                    <p className="mt-0.5 text-[13.5px] font-medium text-[#5C3A28]">
                      (555) 014–2288
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#EFDDC9] bg-[#F8EEE5]">
                    <Mail size={14} strokeWidth={1.6} className="text-[#FF5A1F]" />
                  </span>
                  <div>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#8A5A3A]">
                      Email
                    </p>
                    <p className="mt-0.5 text-[13.5px] font-medium text-[#5C3A28]">
                      hello@hotsisushi.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3" style={{ fontFamily: "'Manrope', sans-serif" }}>
                <a
                  href="#book"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5A1F] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,90,31,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8480D]"
                >
                  Reserve a Table
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={12} />
                  </span>
                </a>
                <a
                  href="#directions"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#5C3A28]/20 px-6 py-3 text-sm font-bold text-[#5C3A28] transition-all duration-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                >
                  <Compass size={14} />
                  Get Directions
                </a>
              </div>
            </div>

            {/* MAP */}
            <div className="loc-reveal relative min-h-[420px] overflow-hidden rounded-2xl border border-[#EFDDC9]">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[12px] font-semibold text-[#5C3A28] shadow-[0_10px_26px_rgba(0,0,0,0.12)]">
                <MapPin size={14} strokeWidth={1.8} className="text-[#FF5A1F]" />
                Portside District
              </div>
              <iframe
                title="Hotsi Sushi location"
                src="https://www.google.com/maps?q=harbor+district+waterfront&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[420px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
