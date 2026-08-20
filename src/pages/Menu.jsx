import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Leaf, Award, Plus, ImageOff } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "starters", label: "Starters" },
  { id: "sushi", label: "Sushi & Rolls" },
  { id: "beverages", label: "Beverages" },
];

const menu = {
  starters: [
    {
      name: "Miso Soup",
      description: "Silken tofu, wakame, scallion, dashi broth.",
      price: "6",
      tags: ["veg"],
      image:
        "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Edamame",
      description: "Steamed and salted, finished with togarashi.",
      price: "7",
      tags: ["veg"],
      image:
        "https://images.unsplash.com/photo-1622542086635-6a19bdd28e4a?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Agedashi Tofu",
      description: "Lightly fried, bonito-ginger dashi, grated daikon.",
      price: "9",
      tags: ["veg"],
      image:
        "https://images.unsplash.com/photo-1583224964978-2d8e695b7b0a?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Hotsi Gyoza",
      description: "Pan-seared pork dumplings, chili-garlic oil.",
      price: "11",
      tags: ["spicy"],
      image:
        "https://images.unsplash.com/photo-1626804475297-411f7d2a2a6b?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Tuna Tataki",
      description: "Seared bluefin, ponzu, crispy garlic, micro shiso.",
      price: "16",
      tags: ["pick"],
      image:
        "https://images.unsplash.com/photo-1615361200141-f45961d6c17e?q=80&w=800&auto=format&fit=crop",
    },
  ],
  sushi: [
    {
      name: "Signature Sushi Platter",
      description: "Chef's daily selection of nigiri, sashimi, and maki.",
      price: "38",
      tags: ["pick"],
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Premium Salmon Roll",
      description: "Torched salmon, avocado, spicy mayo, crispy shallot.",
      price: "17",
      tags: ["spicy"],
      image:
        "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Hotsi Special Maki",
      description: "Eel, cream cheese, cucumber, unagi glaze, sesame.",
      price: "19",
      tags: ["pick"],
      image:
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Rainbow Roll",
      description: "California base topped with tuna, salmon, yellowtail, avocado.",
      price: "18",
      tags: [],
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Vegetable Maki",
      description: "Avocado, cucumber, pickled radish, shiso leaf.",
      price: "13",
      tags: ["veg"],
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Nigiri Duo — Salmon & Tuna",
      description: "Two pieces each, hand-pressed over seasoned rice.",
      price: "15",
      tags: [],
      image:
        "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=800&auto=format&fit=crop",
    },
  ],
  beverages: [
    {
      name: "Junmai Ginjo Sake",
      description: "Served warm or chilled, light and fragrant.",
      price: "14",
      tags: [],
      image:
        "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Yuzu Sour",
      description: "Shochu, fresh yuzu, soda, candied peel.",
      price: "13",
      tags: [],
      image:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Sakura Old Fashioned",
      description: "Cherry-blossom bitters, whisky, orange oil.",
      price: "15",
      tags: ["pick"],
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Iced Hojicha",
      description: "Roasted green tea, brewed cold, lightly sweet.",
      price: "6",
      tags: ["veg"],
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Ramune",
      description: "Classic Japanese soda, original or melon.",
      price: "5",
      tags: ["veg"],
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Umeshu Spritz",
      description: "Plum wine, prosecco, soda, twist of lime.",
      price: "13",
      tags: [],
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop",
    },
  ],
};

const tagMeta = {
  spicy: { icon: Flame, label: "Spicy", color: "#FF5A1F" },
  veg: { icon: Leaf, label: "Vegetarian", color: "#5C8A4A" },
  pick: { icon: Award, label: "Chef's Pick", color: "#B8862F" },
};

/**
 * Dish/beverage thumbnail. Falls back to a warm gradient + icon if the
 * source image ever fails to load, so a bad URL never shows a broken
 * image icon on the live menu.
 */
function DishImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[#F8EEE5] to-[#EFDDC9]">
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      )}
      {failed && (
        <div className="flex h-full w-full items-center justify-center">
          <ImageOff size={20} strokeWidth={1.4} className="text-[#C9A47C]" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
    </div>
  );
}

export default function MenuPage() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const tabsRef = useRef(null);
  const tabsWrapRef = useRef(null);
  const [active, setActive] = useState("sushi");

  // scroll reveals + scrub-based effects (run once)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // hero load-in
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".menu-hero-tag", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(".menu-hero-h1", { opacity: 1, y: 0, duration: 1 }, 0.25)
        .to(".menu-hero-sub", { opacity: 1, y: 0, duration: 0.9 }, 0.45);

      // hero image parallax
      gsap.to(".menu-hero-img", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: ".menu-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // fade-in-once reveals for legend, tabs, CTA
      gsap.utils.toArray(".menu-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // menu cards, one-time stagger reveal
      gsap.fromTo(
        ".menu-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        }
      );

      // ambient blobs drift with scroll (parallax, scrubbed to scroll position)
      gsap.to(".menu-blob-a", {
        y: 160,
        x: 40,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".menu-blob-b", {
        y: -160,
        x: -30,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      // category tab bar pins in place while the menu grid scrolls past it
      ScrollTrigger.create({
        trigger: tabsWrapRef.current,
        start: "top 88px",
        endTrigger: gridRef.current,
        end: "bottom bottom",
        pin: tabsRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // animate card swap whenever the active category changes
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".menu-card"),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 }
    );
  }, [active]);

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#FFF9F4] py-10 md:py-14">
      {/* ===================== HERO ===================== */}
      <section className="menu-hero relative flex h-[64vh] min-h-[440px] items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=1800&auto=format&fit=crop"
          alt="Selection of Hotsi Sushi dishes"
          className="menu-hero-img absolute inset-[-10%_0_0_0] h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1A0F]/20 via-[#2B1A0F]/45 to-[#1F120A]/85" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-14 text-center md:px-10 md:pb-16">
          <div
            className="menu-hero-tag mb-4 inline-flex translate-y-4 items-center gap-3 rounded-full border border-white/25 bg-black/20 px-4 py-2 opacity-0 backdrop-blur-md"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              The Menu
            </span>
          </div>

          <h1
            className="menu-hero-h1 translate-y-6 text-4xl leading-[1.05] tracking-[-0.03em] text-white opacity-0 sm:text-5xl lg:text-[3.6rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafted plate
            <br className="hidden sm:block" /> by plate<span className="italic text-[#FF9B6B]">.</span>
          </h1>

          <p
            className="menu-hero-sub mx-auto mt-6 max-w-xl translate-y-5 text-[15px] leading-7 text-white/85 opacity-0"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            From the first bowl of miso to the last pour of sake — everything
            on this menu is prepared fresh, in-house, every service.
          </p>
        </div>
      </section>

      {/* ambient blobs, positioned relative to the rest of the page */}
      <div className="menu-blob-a pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="menu-blob-b pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      {/* dietary legend */}
      <div className="relative z-10 px-6 pt-10 md:px-10 lg:px-16">
        <div
          className="menu-reveal mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {Object.entries(tagMeta).map(([key, meta]) => {
            const Icon = meta.icon;
            return (
              <div key={key} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#8A5A3A]">
                <Icon size={13} strokeWidth={2} style={{ color: meta.color }} />
                {meta.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* category tabs — pins to the top while the grid below scrolls past it */}
      <div ref={tabsWrapRef} className="relative z-20 mt-8">
        <div
          ref={tabsRef}
          className="border-b border-transparent bg-[#FFF9F4]/95 px-6 py-4 backdrop-blur-sm transition-shadow duration-300 md:px-10 lg:px-16"
        >
          <div className="menu-reveal mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`rounded-full border px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "border-[#FF5A1F] bg-[#FF5A1F] text-white shadow-[0_10px_24px_rgba(255,90,31,0.25)]"
                      : "border-[#EFDDC9] bg-white text-[#5C3A28] hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                  }`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* menu grid */}
      <section className="relative z-10 px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div
          ref={gridRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {menu[active].map((item) => (
            <div
              key={item.name}
              className="menu-card group flex flex-col overflow-hidden rounded-2xl border border-[#EFDDC9] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(92,58,40,0.10)]"
            >
              <DishImage src={item.image} alt={item.name} />

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-[1.05rem] leading-snug text-[#5C3A28]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="whitespace-nowrap text-[1.05rem] font-bold text-[#FF5A1F]"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      ${item.price}
                    </span>
                  </div>

                  <p
                    className="mt-2 text-[13px] leading-[1.5] text-[#8A5A3A]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.tags.map((tag) => {
                      const meta = tagMeta[tag];
                      const Icon = meta.icon;
                      return (
                        <span
                          key={tag}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-[#EFDDC9] bg-[#F8EEE5]"
                          title={meta.label}
                        >
                          <Icon size={11} strokeWidth={2.2} style={{ color: meta.color }} />
                        </span>
                      );
                    })}
                  </div>

                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EFDDC9] text-[#5C3A28] transition-all duration-300 group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F] group-hover:text-white"
                    aria-label={`Add ${item.name}`}
                  >
                    <Plus size={14} strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* closing CTA */}
      <section className="relative z-10 px-6 pb-24 md:px-10 lg:px-16">
        <div className="menu-reveal mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-[#EFDDC9] bg-[#F8EEE5] px-8 py-12 text-center">
          <h2
            className="text-2xl text-[#5C3A28] md:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hungry already?
          </h2>
          <p
            className="max-w-md text-sm leading-6 text-[#8A5A3A]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Order online for pickup or delivery, or reserve a seat at the
            counter and watch it made in front of you.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a
              href="#order"
              className="rounded-full bg-[#FF5A1F] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,90,31,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8480D]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Order Now
            </a>
            <a
              href="#book"
              className="rounded-full border-2 border-[#5C3A28]/20 px-7 py-3.5 text-sm font-bold text-[#5C3A28] transition-all duration-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Book a Table
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
