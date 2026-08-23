import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Symmetric two-column showcase with a basic scroll reveal (fade + slide
 * up as each block enters the viewport — no pinning, no scrub).
 *
 * BOTH columns: image on top, title (+ price) below, short description below.
 *
 * Each block (intro, left-image, left-text, right-image, right-text)
 * animates in independently and staggered, triggered by its own
 * position in the viewport. Within each text block, the title/price and
 * the description reveal as their own staggered sub-steps.
 */
export default function SushiShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Top-level blocks: intro, each image, each text block
      const targets = section.querySelectorAll("[data-reveal]");

      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Within each text block, stagger the inner pieces (heading+price row,
      // then description) so the text itself reads as a small reveal moment.
      const textBlocks = section.querySelectorAll("[data-reveal-group='text']");

      textBlocks.forEach((block) => {
        const items = block.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[1050px] overflow-hidden bg-[#FFF9F4] py-24 md:py-15">
      {/* Ambient blobs, consistent with the rest of the site */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-0 h-[500px] w-[500px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Section intro */}
        <div data-reveal className="mb-16 max-w-xl md:mb-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
              Chef's Selection
            </span>
          </div>
          <h2
            className="text-4xl leading-[0.95] tracking-[-0.03em] text-[#5C3A28] sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafted to
            <br />
            <span className="italic text-[#FF5A1F]">be savored.</span>
          </h2>
          <p
            className="mt-6 text-base leading-7 text-[#8A5A3A]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Two signature plates, built layer by layer with the same care
            that goes into everything at Hotsi.
          </p>
        </div>

        {/* Two-column showcase — same structure both sides */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          {/* ============ LEFT ============ */}
          <div className="flex flex-col gap-6">
            <div data-reveal className="overflow-hidden rounded-[2rem]">
              <img
                src="/sushi1.webp"
                alt="Ember Blossom Roll"
                className="h-[420px] w-full object-cover shadow-[0_30px_60px_rgba(92,58,40,0.18)] md:h-[480px]"
              />
            </div>

            <div
              data-reveal
              data-reveal-group="text"
              className="flex flex-col gap-3 border-b border-[#EFDDC9] pb-6"
            >
              <div data-reveal-item className="flex items-start justify-between gap-6">
                <h3
                  className="text-3xl italic tracking-[-0.02em] text-[#5C3A28] sm:text-4xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ember Blossom Roll
                </h3>
                <span
                  className="mt-2 shrink-0 text-sm font-bold text-[#FF5A1F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  $16
                </span>
              </div>
              <p
                data-reveal-item
                className="text-sm leading-6 text-[#8A5A3A]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Torched salmon draped over seasoned rice, finished with a
                spicy yuzu glaze and a whisper of citrus zest. Rolled tight,
                sliced thin, and torched to order for that final smoky edge.
              </p>
            </div>
          </div>

          {/* ============ RIGHT ============ */}
          <div className="flex flex-col gap-6">

            {/* TEXT ABOVE */}
            <div
              data-reveal
              data-reveal-group="text"
              className="flex flex-col gap-3 border-b border-[#EFDDC9] pb-6"
            >
              <div data-reveal-item className="flex items-start justify-between gap-6">
                <h3
                  className="text-3xl italic tracking-[-0.02em] text-[#5C3A28] sm:text-4xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sunrise Umi Roll
                </h3>

                <span
                  className="mt-2 shrink-0 text-sm font-bold text-[#FF5A1F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  $18
                </span>
              </div>

              <p
                data-reveal-item
                className="text-sm leading-6 text-[#8A5A3A]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Seared tuna layered with bright citrus ponzu and a light
                touch of chili oil for warmth. Finished with fresh herbs and
                a scatter of sesame, balancing rich and sharp in every bite.
              </p>
            </div>

            {/* IMAGE BELOW */}
            <div data-reveal className="overflow-hidden rounded-[2rem]">
              <img
                src="/sushi2.webp"
                alt="Sunrise Umi Roll"
                className="h-[420px] w-full object-cover shadow-[0_30px_60px_rgba(92,58,40,0.18)] md:h-[480px]"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
