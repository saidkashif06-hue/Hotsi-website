import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * About Us — eyebrow + two-line heading + intro copy up top, then a
 * three-card row below where the center card ("Chef's Mastery") sits
 * elevated and enlarged as the featured card, flanked by two shorter
 * side cards.
 *
 * PERFORMANCE NOTES (why this version doesn't lag on scroll):
 * - No clip-path animation. Animating clip-path forces the browser to
 *   repaint the element every frame instead of just compositing a
 *   transform — that was the main source of jank.
 * - Each image's parallax lives on a separate, non-hovered WRAPPER div.
 *   The image itself only gets a plain CSS hover scale. Previously the
 *   image had three different things fighting over its `transform`
 *   (GSAP scale-in, GSAP parallax, CSS hover scale) — GSAP and CSS both
 *   writing inline transforms to the same element every scroll frame is
 *   expensive and visually stutters. Splitting them onto two elements
 *   means each transform is owned by exactly one system.
 * - The reveal animation is opacity-only (no scale), so it never
 *   touches transform at all.
 * - will-change: transform is set on anything GSAP scrubs, as a
 *   compositor hint, and removed again once the animation is done.
 */
export default function AboutUs() {
  const sectionRef = useRef(null);

  const cards = [
    {
      key: "fresh",
      title: "Fresh Daily Catch",
      copy: "Sourced each morning, never frozen.",
      image: "/about/about1.webp",
      featured: false,
    },
    {
      key: "craft",
      title: "Chef's Mastery",
      copy: "Twelve years of hand-rolled precision, plate after plate.",
      image: "/about/about2.webp",
      featured: true,
    },
    {
      key: "loved",
      title: "Loved by Locals",
      copy: "The table regulars keep coming back to.",
      image: "/about/about3.webp",
      featured: false,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Eyebrow badge — simple fade/rise, fires first
      const badge = section.querySelector("[data-reveal='badge']");
      if (badge) {
        gsap.fromTo(
          badge,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Heading — each line masked and slid up independently
      const headingLines = section.querySelectorAll("[data-reveal='line'] span");
      gsap.fromTo(
        headingLines,
        { y: "110%" },
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Intro paragraph — fades slightly after the heading
      const paragraph = section.querySelector("[data-reveal='paragraph']");
      if (paragraph) {
        gsap.fromTo(
          paragraph,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards — rise in with a faint rotation, staggered left to right
      const cardEls = section.querySelectorAll("[data-reveal='card']");
      gsap.fromTo(
        cardEls,
        { y: 60, opacity: 0, rotate: -1.5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Each image fades in — opacity only, so it never competes with
      // the hover scale or the parallax below for control of `transform`
      const imageEls = section.querySelectorAll("[data-reveal='image']");
      gsap.fromTo(
        imageEls,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax lives on the WRAPPER, never on the image itself, and
      // gets a will-change hint only while it's actually animating.
      const parallaxWraps = section.querySelectorAll("[data-parallax]");
      parallaxWraps.forEach((wrap) => {
        gsap.to(wrap, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            onEnter: () => (wrap.style.willChange = "transform"),
            onLeave: () => (wrap.style.willChange = "auto"),
            onEnterBack: () => (wrap.style.willChange = "transform"),
            onLeaveBack: () => (wrap.style.willChange = "auto"),
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FFF9F4] py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-0 h-[500px] w-[500px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Top row: eyebrow + heading on the left, intro copy on the right */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <div data-reveal="badge" className="mb-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
                About Hotsi
              </span>
            </div>
            <h2
              className="text-4xl leading-[0.95] tracking-[-0.03em] text-[#5C3A28] sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span data-reveal="line" className="block overflow-hidden">
                <span className="block">Our Craft,</span>
              </span>
              <span data-reveal="line" className="block overflow-hidden">
                <span className="block italic text-[#FF5A1F]">Your Table.</span>
              </span>
            </h2>
          </div>

          <p
            data-reveal="paragraph"
            className="text-base leading-7 text-[#8A5A3A] md:self-center"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Hotsi started as one chef's answer to reheated, rushed sushi —
            a small kitchen built around fresh fish, patient hands, and a
            menu that never tries to do too much. Every roll that leaves
            our counter carries that same standard.
          </p>
        </div>

        {/* Three-card row: center card elevated as the featured one */}
        <div className="mt-12 grid items-end gap-6 md:mt-16 md:grid-cols-3 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.key}
              data-reveal="card"
              className={`group relative overflow-hidden rounded-[2rem] border border-[#EFDDC9] shadow-[0_20px_45px_rgba(92,58,40,0.15)] ${
                card.featured
                  ? "h-[340px] md:h-[400px] md:-translate-y-6"
                  : "h-[260px] md:h-[320px]"
              }`}
            >
              {/* parallax wrapper owns translateY; the image itself never
                  receives a scroll-linked transform, so its CSS hover
                  scale has nothing to fight with */}
              <div data-parallax className="absolute inset-[-8%] h-[116%] w-full">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  data-reveal="image"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div
                className={`absolute inset-0 ${
                  card.featured
                    ? "bg-gradient-to-t from-[#3A2318]/90 via-[#3A2318]/35 to-transparent"
                    : "bg-gradient-to-t from-[#3A2318]/80 via-[#3A2318]/20 to-transparent"
                }`}
              />

              <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-end">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF9F4]/90 text-[#5C3A28] transition-colors duration-300 group-hover:bg-[#FF5A1F] group-hover:text-white">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-white ${
                      card.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    } italic tracking-[-0.02em]`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[85%] text-sm leading-6 text-white/75"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {card.copy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
