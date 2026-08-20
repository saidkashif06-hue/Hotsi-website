import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fish, ChefHat, Utensils, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  cardRefs.current = [];

  const reasons = [
    {
      number: "01",
      title: "Fish, flown in fresh",
      copy: "Sourced daily from trusted markets, never frozen, never sitting more than a day before it reaches your plate.",
      tag: "Sourced daily",
      Icon: Fish,
      rotate: -3,
      image:
        "https://images.pexels.com/photos/246747/pexels-photo-246747.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "02",
      title: "Built by hand, every roll",
      copy: "No shortcuts, no machines — each piece is rolled, sliced, and finished by a chef who's done it a thousand times.",
      tag: "Zero machines",
      Icon: ChefHat,
      rotate: 2.5,
      image:
        "https://images.pexels.com/photos/31129659/pexels-photo-31129659.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "03",
      title: "Small menu, sharp focus",
      copy: "We'd rather perfect a dozen dishes than do a hundred things halfway. Every plate earns its spot on the menu.",
      tag: "12 dishes, done right",
      Icon: Utensils,
      rotate: -2,
      image:
        "https://images.pexels.com/photos/3642030/pexels-photo-3642030.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "04",
      title: "Torched, never rushed",
      copy: "That last pass of open flame right before it hits your table — the char, the aroma, the reason it's ordered twice.",
      tag: "Finished tableside",
      Icon: Flame,
      rotate: 3,
      image:
        "https://images.pexels.com/photos/19356317/pexels-photo-19356317.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
  ];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    if (!section || !cards.length) return;

    const mm = gsap.matchMedia();

    // --- Shared intro text reveal (works the same on all sizes) ---
    const introEls = [badgeRef.current, headingRef.current, paraRef.current].filter(Boolean);
    gsap.set(introEls, { opacity: 0, y: 28 });
    const introTween = gsap.to(introEls, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // ===== DESKTOP / TABLET: pinned scrub stack =====
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          gsap.set(card, { y: "115%", scale: 1, opacity: 1, rotate: 0, zIndex: i + 1 });
        });

        cards.forEach((card) => {
          const innerEls = [
            card.querySelector("[data-reveal='icon']"),
            card.querySelector("[data-reveal='eyebrow']"),
            card.querySelector("[data-reveal='title']"),
            card.querySelector("[data-reveal='copy']"),
            card.querySelector("[data-reveal='tag']"),
          ].filter(Boolean);
          gsap.set(innerEls, { opacity: 0, y: 14 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${cards.length * 400}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          tl.to(card, { y: 0, rotate: reasons[i].rotate, duration: 1, ease: "none" }, i);

          const innerEls = [
            card.querySelector("[data-reveal='icon']"),
            card.querySelector("[data-reveal='eyebrow']"),
            card.querySelector("[data-reveal='title']"),
            card.querySelector("[data-reveal='copy']"),
            card.querySelector("[data-reveal='tag']"),
          ].filter(Boolean);

          tl.to(
            innerEls,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 },
            i + 0.15
          );

          for (let j = 0; j < i; j++) {
            const stepsBack = i - j;
            tl.to(
              cards[j],
              {
                y: -18 - (stepsBack - 1) * 6,
                rotate: reasons[j].rotate * 1.6,
                scale: 1 - stepsBack * 0.035,
                duration: 1,
                ease: "none",
              },
              i
            );
          }
        });
      }, section);

      return () => ctx.revert();
    });

    // ===== MOBILE: no pin, no scrub — simple stagger-reveal list =====
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          gsap.set(card, { y: 0, x: 0, scale: 1, opacity: 1, rotate: 0, zIndex: i + 1 });

          const innerEls = [
            card.querySelector("[data-reveal='icon']"),
            card.querySelector("[data-reveal='eyebrow']"),
            card.querySelector("[data-reveal='title']"),
            card.querySelector("[data-reveal='copy']"),
            card.querySelector("[data-reveal='tag']"),
          ].filter(Boolean);

          gsap.set(card, { opacity: 0, y: 36 });
          gsap.set(innerEls, { opacity: 0, y: 10 });

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          cardTl
            .to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
            .to(
              innerEls,
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
              "-=0.3"
            );
        });
      }, section);

      return () => ctx.revert();
    });

    return () => {
      introTween.scrollTrigger && introTween.scrollTrigger.kill();
      introTween.kill();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FFF9F4] py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#5C3A28]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] top-1/4 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <div className="grid items-center gap-10 sm:gap-14 md:grid-cols-2 md:gap-12">
          <div>
            <div ref={badgeRef} className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
                Why Us
              </span>
            </div>
            <h2
              ref={headingRef}
              className="text-[2.5rem] leading-[0.95] tracking-[-0.03em] text-[#5C3A28] sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Not just
              <br />
              <span className="italic text-[#FF5A1F]">another roll.</span>
            </h2>
            <p
              ref={paraRef}
              className="mt-5 max-w-sm text-base leading-7 text-[#8A5A3A] sm:mt-6"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              A few honest reasons people keep coming back to Hotsi, straight
              from the kitchen to the table. Keep scrolling.
            </p>
          </div>

          {/* Desktop/tablet: absolutely-stacked pinned cards. Mobile: normal flow list (see CSS classes below). */}
          <div
            ref={stackRef}
            className="relative flex flex-col gap-5 md:h-[380px] md:gap-0 lg:h-[400px]"
          >
            {reasons.map((reason) => {
              const { Icon } = reason;
              return (
                <div
                  key={reason.number}
                  ref={addCardRef}
                  className="relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[#EFDDC9] bg-white shadow-[0_25px_60px_rgba(92,58,40,0.15)] will-change-transform md:absolute md:inset-0 md:rounded-[2rem]"
                >
                  {/* Image header */}
                  <div className="relative h-36 w-full shrink-0 overflow-hidden sm:h-40 md:h-44">
                    <img
                      src={reason.image}
                      alt={reason.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A28]/70 via-[#5C3A28]/10 to-transparent" />
                    <span
                      data-reveal="icon"
                      className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#FF5A1F] backdrop-blur-sm sm:h-12 sm:w-12"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span
                      data-reveal="eyebrow"
                      className="absolute right-4 top-3 text-xs font-bold uppercase tracking-[0.25em] text-white/90"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {reason.number}
                    </span>
                  </div>

                  {/* Text body */}
                  <div className="relative flex flex-1 flex-col p-6 sm:p-7 md:p-8">
                    <h3
                      data-reveal="title"
                      className="text-xl italic tracking-[-0.02em] text-[#5C3A28] sm:text-2xl md:text-3xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      data-reveal="copy"
                      className="mt-3 text-sm leading-6 text-[#8A5A3A] md:max-w-[85%]"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {reason.copy}
                    </p>

                    <div className="mt-auto flex items-center gap-2 pt-6">
                      <span className="h-px flex-1 bg-[#EFDDC9]" />
                      <span
                        data-reveal="tag"
                        className="rounded-full bg-[#FFF9F4] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#FF5A1F]"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                      >
                        {reason.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
