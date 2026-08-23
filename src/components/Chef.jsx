import { useEffect, useRef, useState } from "react";

// NOTE: gsap isn't available in this preview environment, so the scroll-triggered
// stagger below is built with IntersectionObserver + CSS transitions instead of
// gsap/ScrollTrigger. The effect is the same (fade + rise, staggered per card) —
// if you're dropping this into a project with gsap installed, swap the
// useStaggerReveal hook for:
//
//   gsap.from(cardsRef.current.children, {
//     y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
//     scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
//   });

function useStaggerReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default function ChefsSection() {
  const [cardsRef, cardsVisible] = useStaggerReveal();

  const chefs = [
    {
      name: "Chef Hiroshi",
      role: "Master Sushi Chef",
      note: "20 years perfecting nigiri technique",
      img: "/chef/chef1.webp",
    },
    {
      name: "Chef Aiko",
      role: "Fusion Specialist",
      note: "Where tradition meets bold flavor",
      img: "/chef/chef2.webp",
    },
    {
      name: "Chef Kenji",
      role: "Executive Chef",
      note: "Leads every plate that leaves the kitchen",
      img: "/chef/chef3.webp",
    },
  ];

  return (
    <section className="bg-[#FFF9F4] py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-14 max-w-xl mx-auto">
          <span className="block text-[11px] font-semibold tracking-[0.2em] text-[#8A5A3A] uppercase mb-3">
            Our Team
          </span>
          <h2
            className="text-3xl md:text-4xl text-[#5C3A28]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Hands Behind Every Roll
          </h2>
          <p className="mt-4 text-[#8A5A3A] text-sm md:text-base">
            Three chefs, one standard: every piece cut, rolled, and
            plated by hand, with years of craft behind each one.
          </p>
        </div>

        {/* CHEF GRID */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {chefs.map((chef, i) => (
            <div
              key={i}
              className="group bg-white border border-[#EFDDC9] rounded-2xl p-4 transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src={chef.img}
                  alt={chef.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h4 className="text-lg font-semibold text-[#5C3A28]">
                {chef.name}
              </h4>

              <p className="text-sm text-[#8A5A3A]">{chef.role}</p>

              <p className="mt-2 text-xs text-[#8A5A3A]/80 italic">
                {chef.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
