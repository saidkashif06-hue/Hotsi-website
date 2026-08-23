import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Fish, ChefHat, Utensils, Flame } from "lucide-react";

export default function Preloader({ onComplete, duration = 3000 }) {
  const rootRef = useRef(null);
  const orbitRef = useRef(null);
  const logoRef = useRef(null);
  const barFillRef = useRef(null);
  const [percent, setPercent] = useState(0);

  const icons = [
    { Icon: Fish, angle: 0 },
    { Icon: ChefHat, angle: 90 },
    { Icon: Utensils, angle: 180 },
    { Icon: Flame, angle: 270 },
  ];

  useEffect(() => {
    const root = rootRef.current;
    const orbit = orbitRef.current;
    if (!root || !orbit) return;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onComplete && onComplete();
    };

    // Hard safety net: no matter what GSAP does (StrictMode double-invoke,
    // a killed tween, a thrown error mid-timeline, a slow/broken image),
    // the site becomes interactive again no later than duration + ~1s.
    const fallback = setTimeout(finish, duration + 1000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(".preloader-icon", { opacity: 0, scale: 0.4 })
        .set(logoRef.current, { opacity: 0, scale: 0.85 })
        .to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        })
        .to(
          ".preloader-icon",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: 0.08,
          },
          "-=0.25"
        );

      gsap.to(orbit, {
        rotate: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
      gsap.utils.toArray(".preloader-icon").forEach((el) => {
        gsap.to(el, {
          rotate: -360,
          duration: 14,
          repeat: -1,
          ease: "none",
        });
      });

      gsap.to(logoRef.current, {
        scale: 1.06,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });

      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: duration / 1000,
        ease: "power1.inOut",
        onUpdate: () => {
          const v = Math.round(counter.value);
          setPercent(v);
          if (barFillRef.current) {
            barFillRef.current.style.width = `${counter.value}%`;
          }
        },
        onComplete: () => {
          gsap.to(root, {
            opacity: 0,
            scale: 1.03,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: finish,
          });
        },
      });
    }, root);

    return () => {
      clearTimeout(fallback);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]/5 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[360px] sm:w-[360px]">
          <div ref={orbitRef} className="absolute inset-0">
            {icons.map(({ Icon, angle }, i) => (
              <div
                key={i}
                className="preloader-icon absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3EA] shadow-[0_14px_32px_rgba(92,58,40,0.15)] sm:h-[70px] sm:w-[70px]"
                style={{
                  transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                  marginLeft: "-32px",
                  marginTop: "-32px",
                }}
              >
                <Icon size={30} strokeWidth={1.5} className="text-[#FF5A1F]" />
              </div>
            ))}
          </div>

          <img
            ref={logoRef}
            src="/logo.webp"
            alt="Hotsi Sushi"
            className="relative z-10 h-24 w-auto sm:h-32"
            // Decode/priority hints so this specific image never becomes
            // a bottleneck for the rest of the page's asset queue.
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onError={(e) => {
              // If the logo 404s (wrong base path after deploy), don't let
              // a broken image icon sit in the layout — just hide it.
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>

        <div className="mt-10 h-[3px] w-[200px] overflow-hidden rounded-full bg-[#5C3A28]/10 sm:w-[240px]">
          <div
            ref={barFillRef}
            className="h-full w-0 rounded-full bg-[#FF5A1F]"
          />
        </div>

        <p
          className="mt-3 text-sm tabular-nums text-[#5C3A28]/50"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {percent}%
        </p>
      </div>
    </div>
  );
}
