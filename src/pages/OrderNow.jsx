import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Flame,
  Leaf,
  Award,
  Plus,
  Minus,
  Truck,
  Store,
  Banknote,
  CreditCard,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ImageOff,
  Lock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ===================== DATA ===================== */

const categories = [
  { id: "starters", label: "Starters" },
  { id: "sushi", label: "Sushi & Rolls" },
  { id: "beverages", label: "Beverages" },
];

const menu = {
  starters: [
    {
      id: "miso-soup",
      name: "Miso Soup",
      description: "Silken tofu, wakame, scallion, dashi broth.",
      price: 6,
      tags: ["veg"],
      image: "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "edamame",
      name: "Edamame",
      description: "Steamed and salted, finished with togarashi.",
      price: 7,
      tags: ["veg"],
      image: "https://images.unsplash.com/photo-1622542086635-6a19bdd28e4a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "agedashi-tofu",
      name: "Agedashi Tofu",
      description: "Lightly fried, bonito-ginger dashi, grated daikon.",
      price: 9,
      tags: ["veg"],
      image: "https://images.unsplash.com/photo-1583224964978-2d8e695b7b0a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "hotsi-gyoza",
      name: "Hotsi Gyoza",
      description: "Pan-seared pork dumplings, chili-garlic oil.",
      price: 11,
      tags: ["spicy"],
      image: "https://images.unsplash.com/photo-1626804475297-411f7d2a2a6b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "tuna-tataki",
      name: "Tuna Tataki",
      description: "Seared bluefin, ponzu, crispy garlic, micro shiso.",
      price: 16,
      tags: ["pick"],
      image: "https://images.unsplash.com/photo-1615361200141-f45961d6c17e?q=80&w=800&auto=format&fit=crop",
    },
  ],
  sushi: [
    {
      id: "signature-platter",
      name: "Signature Sushi Platter",
      description: "Chef's daily selection of nigiri, sashimi, and maki.",
      price: 38,
      tags: ["pick"],
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "salmon-roll",
      name: "Premium Salmon Roll",
      description: "Torched salmon, avocado, spicy mayo, crispy shallot.",
      price: 17,
      tags: ["spicy"],
      image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "hotsi-maki",
      name: "Hotsi Special Maki",
      description: "Eel, cream cheese, cucumber, unagi glaze, sesame.",
      price: 19,
      tags: ["pick"],
      image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "rainbow-roll",
      name: "Rainbow Roll",
      description: "California base topped with tuna, salmon, yellowtail, avocado.",
      price: 18,
      tags: [],
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "veg-maki",
      name: "Vegetable Maki",
      description: "Avocado, cucumber, pickled radish, shiso leaf.",
      price: 13,
      tags: ["veg"],
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "nigiri-duo",
      name: "Nigiri Duo — Salmon & Tuna",
      description: "Two pieces each, hand-pressed over seasoned rice.",
      price: 15,
      tags: [],
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=800&auto=format&fit=crop",
    },
  ],
  beverages: [
    {
      id: "sake",
      name: "Junmai Ginjo Sake",
      description: "Served warm or chilled, light and fragrant.",
      price: 14,
      tags: [],
      image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "yuzu-sour",
      name: "Yuzu Sour",
      description: "Shochu, fresh yuzu, soda, candied peel.",
      price: 13,
      tags: [],
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "hojicha",
      name: "Iced Hojicha",
      description: "Roasted green tea, brewed cold, lightly sweet.",
      price: 6,
      tags: ["veg"],
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "ramune",
      name: "Ramune",
      description: "Classic Japanese soda, original or melon.",
      price: 5,
      tags: ["veg"],
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    },
  ],
};

const allItems = Object.values(menu).flat();
const itemsById = Object.fromEntries(allItems.map((item) => [item.id, item]));

const tagMeta = {
  spicy: { icon: Flame, label: "Spicy", color: "#FF5A1F" },
  veg: { icon: Leaf, label: "Vegetarian", color: "#5C8A4A" },
  pick: { icon: Award, label: "Chef's Pick", color: "#B8862F" },
};

const DELIVERY_FEE = 4.5;
const FREE_DELIVERY_AT = 40;

/**
 * Dish thumbnail with an on-brand orange-toned fallback if the image
 * ever fails to load, so a bad URL never shows a broken-image icon.
 */
function DishImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-[#FFD9C2] to-[#FF5A1F]/25">
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
          <ImageOff size={18} strokeWidth={1.6} className="text-[#E8480D]" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
    </div>
  );
}

/* ===================== COMPONENT ===================== */

export default function OrderPage() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const summaryRef = useRef(null);

  const [active, setActive] = useState("sushi");
  const [cart, setCart] = useState({}); // { itemId: qty }
  const [orderType, setOrderType] = useState("delivery"); // delivery | pickup
  const [payment, setPayment] = useState("cash"); // cash | card
  const [address, setAddress] = useState({ street: "", city: "", note: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [placed, setPlaced] = useState(false);

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const cardIsValid =
    card.number.replace(/\s/g, "").length === 16 &&
    /^\d{2}\/\d{2}$/.test(card.expiry) &&
    card.cvc.length >= 3;

  const addItem = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const cartEntries = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ ...itemsById[id], qty })),
    [cart]
  );
  const itemCount = cartEntries.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartEntries.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = orderType === "delivery" && subtotal > 0 && subtotal < FREE_DELIVERY_AT ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const canPlaceOrder =
    itemCount > 0 &&
    (orderType === "pickup" || (address.street.trim() && address.city.trim())) &&
    (payment === "cash" || cardIsValid);

  /* ---------- scroll animations ---------- */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // banner load-in
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".ord-hero-tag", { opacity: 1, y: 0, duration: 0.7 }, 0.05)
          .to(".ord-hero-h1", { opacity: 1, y: 0, duration: 0.9 }, 0.2)
          .to(".ord-hero-sub", { opacity: 1, y: 0, duration: 0.8 }, 0.4);

        // generic section reveals
        gsap.utils.toArray(".ord-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

        // menu card grid stagger (once)
        gsap.fromTo(
          ".ord-card",
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          }
        );

        // order type + payment option cards stagger
        gsap.utils.toArray(".ord-option-group").forEach((group) => {
          gsap.fromTo(
            group.querySelectorAll(".ord-option"),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: group, start: "top 88%" },
            }
          );
        });

        // summary ticket entrance
        gsap.fromTo(
          summaryRef.current,
          { opacity: 0, y: 34, rotate: -1.5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: summaryRef.current, start: "top 88%" },
          }
        );

        // ambient blobs drift with scroll
        gsap.to(".ord-blob-a", {
          y: 140,
          x: 30,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".ord-blob-b", {
          y: -140,
          x: -20,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // re-stagger cards on category switch
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".ord-card"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.05 }
    );
  }, [active]);

  // small bump animation on the cart badge whenever item count changes
  useEffect(() => {
    if (!itemCount) return;
    gsap.fromTo(
      ".ord-cart-badge",
      { scale: 1.35 },
      { scale: 1, duration: 0.35, ease: "back.out(3)" }
    );
  }, [itemCount]);

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return;
    setPlaced(true);
    gsap.fromTo(
      ".ord-confirm",
      { opacity: 0, y: 14, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  };

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#FFF9F4] pb-10">
      {/* ===================== BANNER ===================== */}
      <section className="relative overflow-hidden px-6 pb-14 pt-36 md:px-10 md:pb-16 md:pt-44">
        <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-[-160px] h-[420px] w-[420px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div
            className="ord-hero-tag mb-5 inline-flex translate-y-4 items-center gap-2 rounded-full border border-[#EFDDC9] bg-white px-4 py-2 opacity-0"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5C3A28]">
              Order Now
            </span>
          </div>

          <h1
            className="ord-hero-h1 translate-y-6 text-[2.75rem] leading-[1.03] tracking-[-0.03em] text-[#5C3A28] opacity-0 sm:text-5xl md:text-[3.75rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Build your <span className="italic text-[#FF5A1F]">order.</span>
          </h1>

          <p
            className="ord-hero-sub mx-auto mt-5 max-w-lg translate-y-5 text-[15px] leading-7 text-[#8A5A3A] opacity-0"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Pick your dishes, choose delivery or pickup, and pay however's
            easiest — cash at the door or card right now.
          </p>
        </div>
      </section>

      {/* ambient blobs */}
      <div className="ord-blob-a pointer-events-none absolute -left-40 top-40 h-[460px] w-[460px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />
      <div className="ord-blob-b pointer-events-none absolute -right-40 bottom-40 h-[460px] w-[460px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      {/* ===================== MAIN LAYOUT ===================== */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-[1.35fr_0.95fr] lg:gap-10 lg:px-16">
        {/* ============ LEFT: MENU SELECTION ============ */}
        <div className="flex flex-col gap-10">
          {/* category tabs */}
          <div className="ord-reveal flex flex-wrap gap-3">
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

          {/* menu grid */}
          <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {menu[active].map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="ord-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EFDDC9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5A1F]/40 hover:shadow-[0_16px_40px_rgba(92,58,40,0.12)]"
                >
                  <DishImage src={item.image} alt={item.name} />

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="text-[1rem] leading-snug text-[#5C3A28]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {item.name}
                        </h3>
                        <span
                          className="whitespace-nowrap text-[1rem] font-bold text-[#FF5A1F]"
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
                      <div className="flex items-center gap-1.5">
                        {item.tags.map((tag) => {
                          const meta = tagMeta[tag];
                          const Icon = meta.icon;
                          return (
                            <span
                              key={tag}
                              title={meta.label}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#EFDDC9] bg-[#F8EEE5]"
                            >
                              <Icon size={11} strokeWidth={2.2} style={{ color: meta.color }} />
                            </span>
                          );
                        })}
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(item.id)}
                          className="flex items-center gap-1.5 rounded-full bg-[#5C3A28] px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-[#FF5A1F]"
                          style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                          <Plus size={12} strokeWidth={2.4} />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 rounded-full border border-[#FF5A1F]/30 bg-[#FF5A1F]/10 px-2 py-1">
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove one ${item.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[#5C3A28] transition-colors duration-200 hover:text-[#FF5A1F]"
                          >
                            <Minus size={13} strokeWidth={2.4} />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-[#5C3A28]">{qty}</span>
                          <button
                            onClick={() => addItem(item.id)}
                            aria-label={`Add one more ${item.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[#5C3A28] transition-colors duration-200 hover:text-[#FF5A1F]"
                          >
                            <Plus size={13} strokeWidth={2.4} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============ ORDER TYPE ============ */}
          <div className="ord-reveal">
            <h2
              className="mb-4 text-xl text-[#5C3A28]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How should it get to you?
            </h2>
            <div className="ord-option-group grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => setOrderType("delivery")}
                className={`ord-option flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  orderType === "delivery"
                    ? "border-[#FF5A1F] bg-white shadow-[0_14px_34px_rgba(255,90,31,0.14)]"
                    : "border-[#EFDDC9] bg-white hover:border-[#FF5A1F]/50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                    orderType === "delivery" ? "bg-[#FF5A1F] text-white" : "bg-[#F8EEE5] text-[#5C3A28]"
                  }`}
                >
                  <Truck size={18} strokeWidth={1.8} />
                </span>
                <div style={{ fontFamily: "'Manrope', sans-serif" }}>
                  <p className="text-sm font-bold text-[#5C3A28]">Delivery</p>
                  <p className="mt-1 text-xs leading-5 text-[#8A5A3A]">
                    30–45 min · ${DELIVERY_FEE.toFixed(2)} fee, free over ${FREE_DELIVERY_AT}
                  </p>
                </div>
              </button>

              <button
                onClick={() => setOrderType("pickup")}
                className={`ord-option flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  orderType === "pickup"
                    ? "border-[#FF5A1F] bg-white shadow-[0_14px_34px_rgba(255,90,31,0.14)]"
                    : "border-[#EFDDC9] bg-white hover:border-[#FF5A1F]/50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                    orderType === "pickup" ? "bg-[#FF5A1F] text-white" : "bg-[#F8EEE5] text-[#5C3A28]"
                  }`}
                >
                  <Store size={18} strokeWidth={1.8} />
                </span>
                <div style={{ fontFamily: "'Manrope', sans-serif" }}>
                  <p className="text-sm font-bold text-[#5C3A28]">Pickup</p>
                  <p className="mt-1 text-xs leading-5 text-[#8A5A3A]">
                    Ready in 15–20 min · 128 Harbor Lane
                  </p>
                </div>
              </button>
            </div>

            {/* delivery address, only when delivery is selected */}
            {orderType === "delivery" && (
              <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl border border-[#EFDDC9] bg-white p-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    Street address
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                    placeholder="123 Maple Street, Apt 4"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    City
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                    placeholder="Riverside"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    Delivery note <span className="font-normal normal-case text-[#8A5A3A]/60">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={address.note}
                    onChange={(e) => setAddress((a) => ({ ...a, note: e.target.value }))}
                    placeholder="Gate code, floor, etc."
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ============ PAYMENT METHOD ============ */}
          <div className="ord-reveal">
            <h2
              className="mb-4 text-xl text-[#5C3A28]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How will you pay?
            </h2>
            <div className="ord-option-group grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => setPayment("cash")}
                className={`ord-option flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  payment === "cash"
                    ? "border-[#FF5A1F] bg-white shadow-[0_14px_34px_rgba(255,90,31,0.14)]"
                    : "border-[#EFDDC9] bg-white hover:border-[#FF5A1F]/50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                    payment === "cash" ? "bg-[#FF5A1F] text-white" : "bg-[#F8EEE5] text-[#5C3A28]"
                  }`}
                >
                  <Banknote size={18} strokeWidth={1.8} />
                </span>
                <div style={{ fontFamily: "'Manrope', sans-serif" }}>
                  <p className="text-sm font-bold text-[#5C3A28]">
                    Cash on {orderType === "delivery" ? "Delivery" : "Pickup"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8A5A3A]">Pay in person, no card needed now.</p>
                </div>
              </button>

              <button
                onClick={() => setPayment("card")}
                className={`ord-option flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  payment === "card"
                    ? "border-[#FF5A1F] bg-white shadow-[0_14px_34px_rgba(255,90,31,0.14)]"
                    : "border-[#EFDDC9] bg-white hover:border-[#FF5A1F]/50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                    payment === "card" ? "bg-[#FF5A1F] text-white" : "bg-[#F8EEE5] text-[#5C3A28]"
                  }`}
                >
                  <CreditCard size={18} strokeWidth={1.8} />
                </span>
                <div style={{ fontFamily: "'Manrope', sans-serif" }}>
                  <p className="text-sm font-bold text-[#5C3A28]">Pay Now</p>
                  <p className="mt-1 text-xs leading-5 text-[#8A5A3A]">Card or wallet, charged at checkout.</p>
                </div>
              </button>
            </div>

            {payment === "card" && (
              <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl border border-[#EFDDC9] bg-white p-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    Card number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={card.number}
                    onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    Expiry
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={card.expiry}
                    onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5C3A28]">
                    CVC
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={card.cvc}
                    onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    placeholder="123"
                    className="w-full rounded-xl border border-[#EFDDC9] bg-[#FFF9F4] px-4 py-3 text-sm text-[#5C3A28] outline-none transition-colors duration-200 placeholder:text-[#8A5A3A]/50 focus:border-[#FF5A1F]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8A5A3A]/70 sm:col-span-2">
                  <Lock size={12} strokeWidth={2} className="flex-shrink-0" />
                  Payments are encrypted and processed securely.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============ RIGHT: ORDER SUMMARY "TICKET" ============ */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div ref={summaryRef} className="relative">
            <div className="absolute left-1/2 top-0 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#FFF9F4] bg-[#5C3A28]" />

            <div className="relative overflow-hidden rounded-2xl border border-[#4A2E1F] bg-[#5C3A28] p-7 text-[#FFF9F4] shadow-[0_20px_60px_rgba(92,58,40,0.25)]">
              <div
                className="absolute inset-x-0 top-6 h-px opacity-30"
                style={{ backgroundImage: "repeating-linear-gradient(90deg, #FFF9F4 0 6px, transparent 6px 12px)" }}
              />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
                  Your Order
                </span>
                <span className="ord-cart-badge flex h-7 w-7 items-center justify-center rounded-full bg-[#FF5A1F] text-xs font-bold text-white">
                  {itemCount}
                </span>
              </div>

              <h3
                className="mt-2 text-xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Ticket
              </h3>

              {/* item lines */}
              <div className="mt-6 flex max-h-64 flex-col gap-3 overflow-y-auto pr-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {cartEntries.length === 0 && (
                  <div className="flex items-center gap-2 py-6 text-[13px] text-[#FFF9F4]/60">
                    <ShoppingBag size={16} strokeWidth={1.8} />
                    Nothing added yet — pick a few dishes to get started.
                  </div>
                )}
                {cartEntries.map((item) => (
                  <div key={item.id} className="flex items-baseline justify-between gap-2 text-[13px]">
                    <span className="flex-shrink-0 text-[#FFF9F4]/90">
                      {item.qty}× {item.name}
                    </span>
                    <span className="flex-1 border-b border-dotted border-white/25 translate-y-[-3px]" />
                    <span className="flex-shrink-0 font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* totals */}
              <div
                className="mt-6 flex flex-col gap-2 border-t border-dashed border-white/20 pt-5 text-[13px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <div className="flex items-center justify-between text-[#FFF9F4]/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[#FFF9F4]/70">
                  <span>{orderType === "delivery" ? "Delivery fee" : "Pickup"}</span>
                  <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-base font-bold text-[#FFF9F4]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!canPlaceOrder}
                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#FF5A1F] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,90,31,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8480D] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {payment === "cash" ? (
                  <>
                    <Banknote size={16} strokeWidth={2} />
                    Place Order · ${total.toFixed(2)}
                  </>
                ) : (
                  <>
                    <Lock size={15} strokeWidth={2.2} />
                    Pay Now · ${total.toFixed(2)}
                  </>
                )}
                <ArrowRight size={15} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {!canPlaceOrder && itemCount > 0 && orderType === "delivery" && !address.street.trim() && (
                <p className="mt-3 text-center text-[11px] text-[#FFF9F4]/60">
                  Add your delivery address to place the order.
                </p>
              )}

              {!canPlaceOrder && itemCount > 0 && payment === "card" && !cardIsValid && (
                <p className="mt-3 text-center text-[11px] text-[#FFF9F4]/60">
                  Enter complete card details to pay now.
                </p>
              )}

              {placed && (
                <div
                  className="ord-confirm mt-4 flex items-center gap-2 rounded-xl border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 px-4 py-3 text-[13px] font-semibold text-[#FFF9F4]"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  <CheckCircle2 size={16} strokeWidth={2} className="flex-shrink-0 text-[#FF5A1F]" />
                  {payment === "cash"
                    ? "Order sent to the kitchen — pay when it arrives."
                    : "Payment received — your order is on its way to the kitchen."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
