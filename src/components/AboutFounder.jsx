import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Heart, Eye, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// small cards each get a subject-matched background photo at low
// opacity, the same treatment used elsewhere on the site (image behind
// content, gradient wash on top so text stays legible)
const smallCards = [
  {
    key: "experience",
    icon: Award,
    title: "Experience",
    text: "Years of dedication shaped into every carefully crafted piece.",
    bg: "white",
    image:
      "https://images.unsplash.com/photo-1607247664873-4204f6273c34?q=80&w=600&auto=format&fit=crop",
  },
  {
    key: "vision",
    icon: Eye,
    title: "Vision",
    text: "Bringing Japanese-inspired craftsmanship to every dining experience.",
    bg: "cream",
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=600&auto=format&fit=crop",
  },
  {
    key: "values",
    icon: Heart,
    title: "Values",
    text: "Freshness, precision, quality, and genuine care in every detail.",
    bg: "cream",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
  },
  {
    key: "people",
    icon: Users,
    title: "People First",
    text: "Creating a warm, memorable experience for every guest.",
    bg: "white",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
  },
];

export default function FounderSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // section header
      gsap.fromTo(
        ".founder-eyebrow",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".founder-eyebrow", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".founder-heading",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: ".founder-heading", start: "top 88%" },
        }
      );

      // main founder card
      gsap.fromTo(
        ".founder-main-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".founder-grid", start: "top 82%" },
        }
      );

      // stat card
      gsap.fromTo(
        ".founder-stat-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: { trigger: ".founder-grid", start: "top 82%" },
        }
      );

      // small cards, staggered
      gsap.fromTo(
        ".founder-small-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.18,
          scrollTrigger: { trigger: ".founder-grid", start: "top 82%" },
        }
      );

      // founder portrait, gentle scale-settle as it reveals
      gsap.fromTo(
        ".founder-photo",
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".founder-grid", start: "top 82%" },
        }
      );

      // section background photo, slow parallax drift
      gsap.to(".founder-bg-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ambient ink blobs
      gsap.to(".founder-blob-a", {
        y: 100,
        x: 24,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".founder-blob-b", {
        y: -90,
        x: -20,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#FFF9F4] px-6 py-24 md:px-10 md:py-28">
      {/* subtle photographic backdrop — a soft, low-opacity wood/table
          texture behind the whole section, echoing the hero's imagery
          without competing with the cards on top */}
      <img
        src="https://images.unsplash.com/photo-1615361200141-f45961d6c17e?q=80&w=1800&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        className="founder-bg-img pointer-events-none absolute inset-[-6%_0_0_0] h-[112%] w-full object-cover opacity-[0.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#FFF9F4]/85" />

      {/* ambient blobs, consistent with the hero section above */}
      <div className="founder-blob-a pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="founder-blob-b pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mb-8">
          <span className="founder-eyebrow inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A5A3A]">
            Meet The Founder
          </span>

          <h2
            className="founder-heading mt-3 max-w-xl text-3xl leading-tight text-[#5C3A28] md:text-[2.35rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The vision behind every piece.
          </h2>
        </div>

        {/* =====================================================
            BENTO COMPOSITION

            DESKTOP:
            42% LARGE | 24% MEDIUM | 30% SMALL GRID
            (medium card widened, small-card column narrowed)
        ====================================================== */}
        <div className="founder-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[42%_24%_30%]">
          {/* =====================================================
              CARD 1 — MAIN FOUNDER CARD
          ====================================================== */}
          <article className="founder-main-card group flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-[#EFDDC9] bg-white p-5 shadow-[0_20px_60px_rgba(92,58,40,0.08)] transition-shadow duration-500 ease-out hover:shadow-[0_25px_70px_rgba(92,58,40,0.12)]">
            {/* FOUNDER IMAGE */}
            <div className="relative h-[280px] overflow-hidden rounded-xl bg-[#F8EEE5]">
              <img
                src="/aboutmainimg.webp"
                alt="Founder of Hotsi Sushi"
                // object-[center_12%] keeps the crop focused just above
                // eye-level so the top of the head is never clipped,
                // without relying on a negative margin hack that pulled
                // the image up out of its own frame
                className="founder-photo h-full w-full object-cover object-[center_12%]"
              />

              <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white">
                  Hotsi Sushi
                </span>
              </div>
            </div>

            {/* FOUNDER INFORMATION */}
            <div className="flex flex-1 flex-col pt-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#8A5A3A]">
                Founder &amp; Head Chef
              </p>

              <h3 className="mt-1 text-xl font-semibold text-[#5C3A28]">
                The Heart Behind Hotsi
              </h3>

              <h4
                className="mt-4 text-[1.8rem] leading-[1.08] text-[#5C3A28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A vision built with purpose.
              </h4>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#8A5A3A]">
                Hotsi Sushi was created from a deep appreciation for
                craftsmanship, fresh ingredients, and the art of bringing
                Japanese-inspired flavors to the table.
              </p>
            </div>
          </article>

          {/* =====================================================
              CARD 2 — MEDIUM STATISTIC CARD (widened)
          ====================================================== */}
          <article className="founder-stat-card group flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-[#EFDDC9] bg-[#F8EEE5] p-6 transition-shadow duration-500 ease-out hover:shadow-[0_20px_55px_rgba(92,58,40,0.10)]">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8A5A3A]">
                Experience
              </span>

              <div
                className="mt-6 text-[4rem] leading-none text-[#5C3A28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                15+
              </div>

              <p className="mt-3 text-sm leading-5 text-[#8A5A3A]">
                Years of
                <br />
                Culinary Experience
              </p>
            </div>

            {/* ILLUSTRATION — girl eating sushi */}
            <div className="-mx-6 -mb-6 mt-6">
              <img
                src="/illus.webp"
                alt="Illustration of a girl enjoying sushi"
                className="h-80 w-full object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </article>

          {/* =====================================================
              FOUR SMALL CARDS — 2 × 2 (narrowed column)
              each carries a subject-matched photo at low opacity
              behind the content, same language as the rest of the site
          ====================================================== */}
          <div className="grid min-h-[500px] grid-cols-2 grid-rows-2 gap-4">
            {smallCards.map((card) => {
              const Icon = card.icon;
              const isCream = card.bg === "cream";
              return (
                <article
                  key={card.key}
                  className={`founder-small-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EFDDC9] ${
                    isCream ? "bg-[#F8EEE5]" : "bg-white"
                  } p-4 transition-shadow duration-500 ease-out hover:shadow-[0_18px_50px_rgba(92,58,40,0.10)]`}
                >
                  {/* low-opacity background photo */}
                  <img
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                      isCream
                        ? "from-[#F8EEE5] via-[#F8EEE5]/75 to-[#F8EEE5]/20"
                        : "from-white via-white/75 to-white/20"
                    }`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                        isCream ? "border-[#DDBFA7]" : "border-[#EFDDC9]"
                      } bg-white/70 backdrop-blur-sm`}
                    >
                      <Icon size={14} strokeWidth={1.5} className="text-[#8A5A3A]" />
                    </div>

                    <h3
                      className="mt-3 text-[1.05rem] leading-tight text-[#5C3A28]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {card.title}
                    </h3>

                    <p className="mt-1.5 text-[10px] leading-[1.15rem] text-[#8A5A3A]">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
