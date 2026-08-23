import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  { image: "/1.webp", name: "Signature Sushi Platter" },
  { image: "/2.webp", name: "Premium Salmon Roll" },
  { image: "/3.webp", name: "Hotsi Special Maki" },
];

/**
 * ONE pinned section, horizontal scroll, from the very top of the page.
 *
 * Panel 1 = the Hero (headline, dish swapper, buttons) — what used to
 *           be its own normal-scroll section is now the first "slide".
 * Panel 2 = the video, what used to be VideoScrollSection's centerpiece.
 * Panel 3 = closing CTA card.
 *
 * The user scrolls down (normal wheel input) → section pins → that same
 * scroll input drives the track horizontally through panels 1 → 2 → 3 →
 * once the track finishes, the section unpins and normal vertical page
 * scroll resumes for whatever comes after this component.
 */
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [frontIsA, setFrontIsA] = useState(true);

  const imgARef = useRef(null);
  const imgBRef = useRef(null);
  const intervalRef = useRef(null);
const navigate = useNavigate()
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // Dish auto-swap (independent of scroll, runs continuously in panel 1)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      changeDish();
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [activeIndex, frontIsA]);

  const changeDish = () => {
    // Whichever element is currently "front" (visible) plays the outgoing
    // role; the other plays incoming. We never force-reset the element
    // that just finished animating in — it's already sitting exactly
    // where "front" should be, so re-using it as-is is what avoids the
    // double/instant snap glitch.
    const front = frontIsA ? imgARef.current : imgBRef.current;
    const back = frontIsA ? imgBRef.current : imgARef.current;
    if (!front || !back) return;

    const nextIndex = (activeIndex + 1) % dishes.length;

    // Only the incoming ("back") element needs to be placed at its
    // entry position — the front element is already correctly visible.
    gsap.set(back, { x: -130, y: -150, scale: 0.72, rotation: -18, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setActiveIndex(nextIndex);
        // Swap roles: the element that just animated in becomes the new
        // front. No visual reset needed since it's already in the
        // front's exact end state (centered, opaque, scale 1).
        setFrontIsA((prev) => !prev);
      },
    });

    tl.to(front, { x: -130, y: 145, scale: 0.72, rotation: 18, opacity: 0, duration: 1.15 }, 0);
    tl.to(back, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 1.15 }, 0);
  };

  // Pinned horizontal scroll driving all three panels
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Full possible travel would slide the video panel all the way to
      // fully cover the screen. We only want to travel HALF of that, so
      // the scroll stops mid-transition: hero text left, video right,
      // video slightly overflowing the right edge — the split view.
      const getScrollDistance = () =>
        (track.scrollWidth - section.offsetWidth) * 0.5;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen mt-30 overflow-hidden bg-[#FFF9F4]"
    >
      {/* Ambient background blobs, shared across the whole pinned section */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-180px] h-[500px] w-[500px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      <div
        ref={trackRef}
        className="relative z-10 flex h-screen w-max items-center will-change-transform"
      >
        {/* =====================================================
            PANEL 1 — HERO (was its own section, now slide one)
        ====================================================== */}
        <div className="flex h-screen w-screen flex-shrink-0 items-center px-6 md:px-10 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            {/* LEFT — DISH */}
            <div className="relative flex h-[480px] items-center justify-center lg:h-[600px]">
              <svg
                className="pointer-events-none absolute left-[-35px] top-1/2 h-[500px] w-[440px] -translate-y-1/2 opacity-40"
                viewBox="0 0 440 500"
                fill="none"
              >
                <path
                  d="M70 35 C-10 145, -10 350, 85 465"
                  stroke="#FF5A1F"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute left-[8%] top-[8%] h-5 w-5 rounded-full bg-[#FF5A1F]" />
              <div className="absolute bottom-[12%] left-[18%] h-3 w-3 rounded-full bg-[#5C3A28]/40" />

              <div className="relative h-[380px] w-[380px] md:h-[450px] md:w-[450px]">
                <div className="absolute inset-[12%] rounded-full bg-[#5C3A28]/10 blur-3xl" />

                <div ref={imgARef} className="absolute inset-0 flex items-center justify-center" style={frontIsA ? undefined : { opacity: 0 }}>
                  <div className="relative">
                    <img
                      src={dishes[frontIsA ? activeIndex : (activeIndex + 1) % dishes.length].image}
                      alt={dishes[frontIsA ? activeIndex : (activeIndex + 1) % dishes.length].name}
                      className="relative z-10 h-[330px] w-[330px] rounded-full object-cover shadow-[0_30px_60px_rgba(92,58,40,0.20)] md:h-[400px] md:w-[400px]"
                    />
                    <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#EFDDC9] bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-[#5C3A28] backdrop-blur">
                      {dishes[frontIsA ? activeIndex : (activeIndex + 1) % dishes.length].name}
                    </div>
                  </div>
                </div>

                <div ref={imgBRef} className="absolute inset-0 flex items-center justify-center" style={!frontIsA ? undefined : { opacity: 0 }}>
                  <div className="relative">
                    <img
                      src={dishes[!frontIsA ? activeIndex : (activeIndex + 1) % dishes.length].image}
                      alt={dishes[!frontIsA ? activeIndex : (activeIndex + 1) % dishes.length].name}
                      className="relative z-10 h-[330px] w-[330px] rounded-full object-cover shadow-[0_30px_60px_rgba(92,58,40,0.20)] md:h-[400px] md:w-[400px]"
                    />
                    <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#EFDDC9] bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-[#5C3A28] backdrop-blur">
                      {dishes[!frontIsA ? activeIndex : (activeIndex + 1) % dishes.length].name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[17%] right-[5%] hidden items-center gap-2 rounded-full border border-[#EFDDC9] bg-white px-4 py-2 shadow-sm md:flex">
                <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
                <span className="text-xs font-semibold tracking-wide text-[#5C3A28]">Freshly Crafted</span>
              </div>
            </div>

            {/* RIGHT — CONTENT */}
            <div className="max-w-xl lg:pl-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#FF5A1F]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">Hotsi Sushi</span>
              </div>

              <h1
                className="text-[3.5rem] leading-[0.95] tracking-[-0.04em] text-[#5C3A28] sm:text-[4.5rem] lg:text-[5.5rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sushi made
                <br />
                <span className="italic text-[#FF5A1F]">to remember.</span>
              </h1>

              <p
                className="mt-7 max-w-lg text-base leading-7 text-[#8A5A3A] sm:text-[17px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Fresh ingredients, beautifully crafted rolls, and flavors made to bring
                people together. From classic favorites to bold Hotsi creations, every
                plate is prepared with care and served with a little something special.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div
                  onClick={()=>navigate('/order-now')}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#FF5A1F] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,90,31,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8480D]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Order Now
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <div
                   onClick={()=>navigate('/contact')}
                  className="inline-flex items-center cursor-pointer justify-center rounded-full border-2 border-[#5C3A28]/20 bg-transparent px-7 py-3.5 text-sm font-bold text-[#5C3A28] transition-all duration-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Book a Table
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#EFDDC9] pt-6">
                <div>
                  <p className="text-xl font-bold text-[#5C3A28]">100%</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#8A5A3A]">Fresh</p>
                </div>
                <div className="h-10 w-px bg-[#EFDDC9]" />
                <div>
                  <p className="text-xl font-bold text-[#5C3A28]">25+</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#8A5A3A]">Sushi Creations</p>
                </div>
                <div className="h-10 w-px bg-[#EFDDC9]" />
                <div>
                  <p className="text-xl font-bold text-[#5C3A28]">Daily</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#8A5A3A]">Crafted Fresh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PANEL 2 — VIDEO (full-bleed, fills the entire panel)
        ====================================================== */}
        <div className="relative h-screen w-screen flex-shrink-0">
          <video
            className="h-full w-full object-cover"
            src="/1f_low.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#EFDDC9] bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-[#5C3A28] backdrop-blur">
            Rolled fresh, every time
          </div>
        </div>
      </div>
    </section>
  );
}
