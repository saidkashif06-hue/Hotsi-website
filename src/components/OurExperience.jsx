import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChefHat, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10+", label: "Years of Craft" },
  { value: "200+", label: "Signature Creations" },
  { value: "3", label: "Core Principles" },
];

const card1Points = ["Fresh ingredients", "Handcrafted daily", "Quality-first preparation"];
const card3Points = ["Freshly prepared", "Premium ingredients", "Bold Japanese-inspired flavors"];

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(".exp-reveal", { opacity: 0, y: 26 });
        gsap.to(".exp-reveal", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        });

        gsap.set(".exp-stat", { opacity: 0, y: 14 });
        gsap.to(".exp-stat", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: { trigger: ".exp-card-1", start: "top 82%" },
        });

        gsap.fromTo(
          ".exp-card-1-img",
          { opacity: 0, scale: 1.06 },
          {
            opacity: 0.14,
            scale: 1,
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: { trigger: ".exp-card-1", start: "top 82%" },
          }
        );

        gsap.fromTo(
          ".exp-card-bg-img",
          { opacity: 0, scale: 1.06 },
          {
            opacity: 0.14,
            scale: 1,
            duration: 1.3,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FFF9F4] px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ===================== HEADER ===================== */}
        <div className="exp-reveal mb-10 text-center md:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
            Our Experience
          </span>
          <h2
            className="mx-auto mt-3 max-w-lg text-2xl leading-tight text-[#5C3A28] md:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafted with experience.{" "}
            <span className="italic text-[#FF5A1F]">Served with passion.</span>
          </h2>
        </div>

        {/* ===================== CARDS ===================== */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[46fr_27fr_27fr]">
          {/* ============ CARD 1 — EXPERIENCE (image-backed) ============ */}
          <article className="exp-reveal exp-card-1 group relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-[#EFDDC9] bg-white p-7 shadow-[0_20px_60px_rgba(92,58,40,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(92,58,40,0.12)] md:col-span-2 lg:col-span-1">
            {/* background image, low opacity */}
            <img
              src="/growthimg.webp"
              alt=""
              aria-hidden="true"
              className="exp-card-1-img pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/10" />

            {/* content */}
            <div className="relative z-10 flex h-full flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A5A3A]">
                Our Experience
              </span>

              <h3
                className="mt-3 text-2xl leading-tight text-[#5C3A28] md:text-[1.7rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                10+ Years of Craft
              </h3>

              {/* stats row */}
              <div className="mt-7 flex items-start gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="exp-stat">
                    <div
                      className="text-[2rem] leading-none text-[#5C3A28] md:text-[2.3rem]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </div>
                    <p className="mt-2 max-w-[6rem] text-[11px] leading-[1.3] text-[#8A5A3A]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* supporting points */}
              <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-8">
                {card1Points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-[12.5px] font-medium text-[#5C3A28]"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF5A1F]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* ============ CARD 2 — HANDCRAFTED SUSHI (image-backed) ============ */}
          <article className="exp-reveal group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#EFDDC9] bg-[#F8EEE5] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(92,58,40,0.10)]">
            {/* background image, low opacity */}
            <img
              src="/card2img.webp"
              alt=""
              aria-hidden="true"
              className="exp-card-bg-img pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F8EEE5] via-[#F8EEE5]/70 to-[#F8EEE5]/10" />

            <div className="relative z-10">
              <h3
                className="text-xl leading-tight text-[#5C3A28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Handcrafted Sushi
              </h3>
              <p className="mt-3 text-[13px] leading-[1.6] text-[#8A5A3A]">
                Every piece is carefully prepared with fresh ingredients,
                balanced flavors, and attention to detail.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex h-10 w-10 items-center justify-center rounded-full border border-[#DDBFA7] bg-white transition-transform duration-300 group-hover:scale-105">
              <ChefHat size={16} strokeWidth={1.6} className="text-[#FF5A1F]" />
            </div>
          </article>

          {/* ============ CARD 3 — SIGNATURE EXPERIENCE (image-backed) ============ */}
          <article className="exp-reveal group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#EFDDC9] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(92,58,40,0.10)]">
            {/* background image, low opacity */}
            <img
              src="/card3.webp"
              alt=""
              aria-hidden="true"
              className="exp-card-bg-img pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/10" />

            <div className="relative z-10">
              <h3
                className="text-xl leading-tight text-[#5C3A28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Signature Experience
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {card3Points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#5C3A28]"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF5A1F]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 mt-8 flex h-10 w-10 items-center justify-center rounded-full border border-[#EFDDC9] bg-[#F8EEE5] transition-transform duration-300 group-hover:scale-105">
              <Sparkles size={16} strokeWidth={1.6} className="text-[#FF5A1F]" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
