import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

export default function FollowInstagram() {
  const sectionRef = useRef(null);

  const posts = [
    { key: "insta1", image: "/instagram/insta1.webp" },
    { key: "insta2", image: "/instagram/insta2.webp" },
    { key: "insta3", image: "/instagram/insta3.webp" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* --------------------------------
         BADGE REVEAL
      -------------------------------- */

      const badge = section.querySelector("[data-reveal='badge']");

      if (badge) {
        gsap.fromTo(
          badge,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      /* --------------------------------
         HEADING REVEAL
         Each line comes from below a mask
      -------------------------------- */

      const headingLines = section.querySelectorAll("[data-reveal='line'] span");

      gsap.fromTo(
        headingLines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         PARAGRAPH REVEAL
      -------------------------------- */

      const paragraph = section.querySelector("[data-reveal='paragraph']");

      if (paragraph) {
        gsap.fromTo(
          paragraph,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
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
      }

      /* --------------------------------
         CARD REVEAL
         y + opacity + scale only — no clip-path.
         Animating clip-path forces a repaint every frame instead of a
         cheap composite, which is what was causing the stutter.
      -------------------------------- */

      const cards = section.querySelectorAll("[data-reveal='card']");

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         IMAGE INNER REVEAL
         Slight zoom settles into place.

         This targets the WRAPPER around each image, not the <img>
         itself. The <img> only ever gets the CSS hover scale. Before,
         GSAP's scale-in and the CSS `group-hover:scale-105` were both
         writing `transform` on the same element every frame — two
         systems fighting over one property is what made this laggy.
         Splitting them onto two elements means each transform has
         exactly one owner.
      -------------------------------- */

      const imageWraps = section.querySelectorAll("[data-reveal='card'] [data-img-wrap]");

      gsap.fromTo(
        imageWraps,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FFF9F4] py-14 md:py-15">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="pointer-events-none absolute left-[-180px] bottom-0 h-[500px] w-[500px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            {/* Eyebrow */}
            <div data-reveal="badge" className="mb-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
                Follow Hotsi
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl leading-[0.95] tracking-[-0.03em] text-[#5C3A28] sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span data-reveal="line" className="block overflow-hidden">
                <span className="block">On the Pass,</span>
              </span>

              <span data-reveal="line" className="block overflow-hidden">
                <span className="block italic text-[#FF5A1F]">On Instagram.</span>
              </span>
            </h2>
          </div>

          {/* Paragraph */}
          <p
            data-reveal="paragraph"
            className="text-base leading-7 text-[#8A5A3A] md:self-center"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            A closer look at what leaves the counter each service — new
            rolls, quiet corners of the kitchen, and the regulars who keep
            a seat warm. Follow along for the parts of Hotsi that never
            make it onto the menu.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 md:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.key}
              data-reveal="card"
              className="group relative h-[260px] overflow-hidden rounded-[2rem] border border-[#EFDDC9] shadow-[0_20px_45px_rgba(92,58,40,0.15)] md:h-[320px]"
            >
              {/* wrapper owns the GSAP scale-in; the image only gets the
                  CSS hover scale, so the two never collide */}
              <div data-img-wrap className="absolute inset-0 overflow-hidden">
                <img
                  src={post.image}
                  alt="Hotsi on Instagram"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2318]/80 via-[#3A2318]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-0 right-0 m-6 flex h-9 w-9 translate-y-3 items-center justify-center rounded-full bg-[#FFF9F4]/90 text-[#5C3A28] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <FaInstagram size={15} />
              </div>
            </div>
          ))}

          {/* Explore More */}
          <a
            href="https://www.hotsi.com"
            target="_blank"
            rel="noreferrer"
            data-reveal="card"
            className="group relative flex h-[260px] flex-col justify-between overflow-hidden rounded-[2rem] border border-[#EFDDC9] bg-[#5C3A28] p-6 shadow-[0_20px_45px_rgba(92,58,40,0.15)] transition-colors duration-300 hover:bg-[#4A2E1F] md:h-[320px] md:p-7"
          >
            <div className="flex items-start justify-between">
              <FaInstagram size={22} className="text-[#FF5A1F]" />
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF9F4]/10 text-[#FFF9F4] transition-colors duration-300 group-hover:bg-[#FF5A1F] group-hover:text-white">
                <HiOutlineArrowUpRight size={18} />
              </span>
            </div>

            <div>
              <h3
                className="text-2xl italic tracking-[-0.02em] text-white md:text-3xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Explore More
              </h3>
              <p
                className="mt-2 text-sm leading-6 text-white/70"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                @hotsi · hotsi.com
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
