import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* --------------------------------
         BACKGROUND GLOW
      -------------------------------- */

      gsap.fromTo(
        section.querySelector("[data-cta='glow']"),
        {
          scale: 0.6,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         EYEBROW
      -------------------------------- */

      gsap.fromTo(
        section.querySelector("[data-cta='badge']"),
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         HEADING REVEAL
      -------------------------------- */

      const headingLines = section.querySelectorAll(
        "[data-cta='line'] span"
      );

      gsap.fromTo(
        headingLines,
        {
          yPercent: 115,
        },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         DESCRIPTION
      -------------------------------- */

      gsap.fromTo(
        section.querySelector("[data-cta='description']"),
        {
          y: 35,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         BUTTONS
      -------------------------------- */

      gsap.fromTo(
        section.querySelectorAll("[data-cta='button']"),
        {
          y: 35,
          opacity: 0,
          scale: 0.94,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.35,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         UTENSILS DECORATION
      -------------------------------- */

      gsap.fromTo(
        section.querySelector("[data-cta='icon']"),
        {
          x: 80,
          y: 40,
          rotate: -25,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         FLOATING ICON
      -------------------------------- */

      gsap.to(section.querySelector("[data-cta='icon']"), {
        y: -12,
        rotate: 4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFF9F4] py-14 md:py-15"
    >
      {/* Ambient orange glow */}

      <div
        data-cta="glow"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]/5 blur-[120px]"
      />

      {/* Decorative circles */}

      <div className="pointer-events-none absolute -left-32 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-[#5C3A28]/10" />

      <div className="pointer-events-none absolute -right-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-[#5C3A28]/10" />

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10">

        {/* Eyebrow */}

        <div
          data-cta="badge"
          className="mb-7 flex items-center justify-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />

          <span
            className="text-xs font-bold uppercase tracking-[0.28em] text-[#FF5A1F]"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Your Table Awaits
          </span>

          <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
        </div>

        {/* Heading */}

        <h2
          className="text-5xl leading-[0.9] tracking-[-0.04em] text-[#5C3A28] sm:text-6xl md:text-8xl"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          <span
            data-cta="line"
            className="block overflow-hidden"
          >
            <span className="block">
              Come hungry.
            </span>
          </span>

          <span
            data-cta="line"
            className="block overflow-hidden"
          >
            <span className="block italic text-[#FF5A1F]">
              Leave happy.
            </span>
          </span>
        </h2>

        {/* Description */}

        <p
          data-cta="description"
          className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#8A5A3A] sm:text-base"
          style={{
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Fresh sushi, warm hospitality, and a table waiting for you.
          Make your next meal at Hotsi one worth remembering.
        </p>

        {/* Buttons */}

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <button
            onClick={()=>navigate('/contact')}
            data-cta="button"
            className="group flex items-center cursor-pointer gap-3 rounded-full bg-[#FF5A1F] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#FF6D38]"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Book a Table

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
              <HiOutlineArrowUpRight size={16} />
            </span>
          </button>

          <button
             onClick={()=>navigate('/menu')}
            data-cta="button"
            className="rounded-full border cursor-pointer border-[#5C3A28]/20 px-7 py-3.5 text-sm font-bold text-[#5C3A28] transition-all duration-300 hover:border-[#FF5A1F] hover:bg-[#FF5A1F]/5 hover:text-[#FF5A1F]"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Explore Menu
          </button>
        </div>

        {/* Decorative Utensils */}

        <div
          data-cta="icon"
          className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#FF5A1F]/20 bg-[#FF5A1F]/5">
            <Utensils
              size={52}
              strokeWidth={1}
              className="text-[#FF5A1F]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}