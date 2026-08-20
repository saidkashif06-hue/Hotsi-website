import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChefHat, Sparkles, Clock3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: ChefHat, label: "Chef-crafted, every plate" },
  { icon: Clock3, label: "Est. 2013" },
  { icon: Sparkles, label: "Fresh fish, daily" },
];

export default function AboutHero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // hero load-in
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".about-hero-tag", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(".about-hero-h1", { opacity: 1, y: 0, duration: 1 }, 0.25)
        .to(".about-hero-sub", { opacity: 1, y: 0, duration: 0.9 }, 0.45);

      // hero image parallax
      gsap.to(".about-hero-img", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ambient ink blobs drift with scroll
      gsap.to(".about-blob-a", {
        y: 140,
        x: 30,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".about-blob-b", {
        y: -120,
        x: -25,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      // value strip + story reveal
      gsap.utils.toArray(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#FFF9F4]">
      {/* ===================== HERO ===================== */}
      <section className="about-hero relative flex h-[64vh] min-h-[440px] items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1800&auto=format&fit=crop"
          alt="Hotsi chef hand-pressing nigiri"
          className="about-hero-img absolute inset-[-10%_0_0_0] h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1A0F]/20 via-[#2B1A0F]/45 to-[#1F120A]/85" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-14 text-center md:px-10 md:pb-16">
          <div
            className="about-hero-tag mb-4 inline-flex translate-y-4 items-center gap-3 rounded-full border border-white/25 bg-black/20 px-4 py-2 opacity-0 backdrop-blur-md"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              About Us
            </span>
          </div>

          <h1
            className="about-hero-h1 translate-y-6 text-4xl leading-[1.05] tracking-[-0.03em] text-white opacity-0 sm:text-5xl lg:text-[3.6rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About <span className="italic text-[#FF9B6B]">Hotsi</span>
          </h1>

          <p
            className="about-hero-sub mx-auto mt-6 max-w-xl translate-y-5 text-[15px] leading-7 text-white/85 opacity-0"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Where tradition meets bold creativity. Hotsi Sushi is crafted
            with precision, passion, and a modern twist — delivering a
            premium sushi experience that goes beyond expectations.
          </p>
        </div>
      </section>

      {/* ambient blobs */}
      <div className="about-blob-a pointer-events-none absolute -left-40 top-24 h-[460px] w-[460px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="about-blob-b pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      {/* ===================== VALUE STRIP ===================== */}
      <div className="relative z-10 px-6 py-10 md:px-10 lg:px-16">
        <div
          className="about-reveal mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {values.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[12px] font-semibold text-[#8A5A3A]">
              <Icon size={14} strokeWidth={2} className="text-[#FF5A1F]" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ===================== STORY ===================== */}
      <section className="relative z-10 px-6 pb-24 pt-6 md:px-10 lg:px-16">
        <div className="about-reveal relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl shadow-[0_30px_60px_-25px_rgba(92,58,40,0.35)]">
              <img
                src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=1200&auto=format&fit=crop"
                alt="Selection of Hotsi Sushi dishes"
                className="h-[360px] w-full object-cover md:h-[440px]"
              />
            </div>

            {/* signature seal, echoes a Japanese hanko stamp */}
            <div className="absolute -bottom-6 -left-6 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#FF5A1F] text-center shadow-lg md:-bottom-8 md:-left-8 md:h-28 md:w-28">
              <span
                className="text-sm tracking-widest text-[#FFF9F4] md:text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HOTSI
              </span>
              <span
                className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#FFF9F4]/80"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Est. Sushi Co.
              </span>
            </div>
          </div>

          <div className="order-1 max-w-md lg:order-2">
            <div className="mb-5 flex items-center gap-4">
              <span
                className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5A1F]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Our Story
              </span>
              <span className="h-px max-w-[64px] flex-1 bg-[#FF5A1F]/40" />
            </div>

            <h2
              className="text-3xl leading-[1.15] text-[#5C3A28] sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Built on rice, discipline<span className="italic text-[#FF5A1F]">,</span> and a little rebellion.
            </h2>

            <p
              className="mt-5 text-[15px] leading-7 text-[#8A5A3A]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Hotsi started as a single counter and a stubborn belief that
              sushi could be both rigorous and playful. Every roll still
              passes through the same hands that opened our first door —
              seasoned rice, sharp knives, and fish sourced the same morning
              it's served.
            </p>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <p
                  className="text-2xl text-[#5C3A28]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  12+
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#8A5A3A]/70">
                  Years crafting
                </p>
              </div>
              <span className="h-10 w-px bg-[#5C3A28]/15" />
              <div>
                <p
                  className="text-2xl text-[#5C3A28]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  100%
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#8A5A3A]/70">
                  Fresh, daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
