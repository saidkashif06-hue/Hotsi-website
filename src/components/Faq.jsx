import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlinePlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate()

  const faqs = [
    {
      question: "Do I need a reservation to dine at Hotsi?",
      answer:
        "Reservations are recommended, especially during dinner and on weekends. Walk-ins are always welcome when tables are available.",
    },
    {
      question: "What kind of sushi does Hotsi serve?",
      answer:
        "Hotsi serves a mix of classic and contemporary sushi, including fresh sashimi, nigiri, maki rolls, and signature creations from our kitchen.",
    },
    {
      question: "Does Hotsi offer vegetarian sushi?",
      answer:
        "Yes. We have several vegetarian-friendly rolls and dishes made with fresh vegetables, avocado, cucumber, and other seasonal ingredients.",
    },
    {
      question: "Can I order takeaway from Hotsi?",
      answer:
        "Absolutely. Most of our menu is available for takeaway, carefully packed so your sushi arrives looking and tasting as fresh as it does at the counter.",
    },
    {
      question: "Does Hotsi cater for private events?",
      answer:
        "Yes. Hotsi can accommodate private gatherings and special occasions. Speak with our team about your group size, menu preferences, and event details.",
    },
    {
      question: "How fresh is the fish at Hotsi?",
      answer:
        "Freshness is at the heart of Hotsi. Our ingredients are selected carefully and prepared throughout service to maintain the quality and texture we expect from every plate.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* --------------------------------
         EYEBROW
      -------------------------------- */

      const badge = section.querySelector("[data-faq='badge']");

      gsap.fromTo(
        badge,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         HEADING
      -------------------------------- */

      const headingLines = section.querySelectorAll(
        "[data-faq='heading-line'] span"
      );

      gsap.fromTo(
        headingLines,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         DESCRIPTION
      -------------------------------- */

      const description = section.querySelector(
        "[data-faq='description']"
      );

      gsap.fromTo(
        description,
        {
          y: 40,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* --------------------------------
         FAQ ITEMS
      -------------------------------- */

      const items = section.querySelectorAll(
        "[data-faq='item']"
      );

      gsap.fromTo(
        items,
        {
          y: 55,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-faq='list']"),
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /* --------------------------------
     ACCORDION
  -------------------------------- */

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFF9F4] py-20 md:py-28"
    >
      {/* Ambient blobs */}

      <div className="pointer-events-none absolute -left-52 top-20 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-52 bottom-0 h-[600px] w-[600px] rounded-full bg-[#5C3A28]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">

        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">

          <div>
            {/* Eyebrow */}

            <div
              data-faq="badge"
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />

              <span
                className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Good to Know
              </span>
            </div>

            {/* Heading */}

            <h2
              className="text-4xl leading-[0.95] tracking-[-0.035em] text-[#5C3A28] sm:text-5xl md:text-6xl"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <span
                data-faq="heading-line"
                className="block overflow-hidden"
              >
                <span className="block">
                  Questions,
                </span>
              </span>

              <span
                data-faq="heading-line"
                className="block overflow-hidden"
              >
                <span className="block italic text-[#FF5A1F]">
                  Answered.
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}

          <p
            data-faq="description"
            className="max-w-md text-base leading-7 text-[#8A5A3A] md:self-center"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            From reservations and takeaway to the ingredients behind every
            roll, here are a few things guests often ask before joining us
            at the counter.
          </p>
        </div>

        {/* --------------------------------
            FAQ LIST
        -------------------------------- */}

        <div
          data-faq="list"
          className="mt-14 border-t border-[#5C3A28]/15 md:mt-20"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                data-faq="item"
                className="border-b border-[#5C3A28]/15"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
                >
                  {/* Number */}

                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FF5A1F]/30 text-xs font-bold text-[#FF5A1F] transition-all duration-300 group-hover:bg-[#FF5A1F] group-hover:text-white"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}

                  <span
                    className="flex-1 text-lg text-[#5C3A28] transition-transform duration-300 group-hover:translate-x-1 sm:text-xl md:text-2xl"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* Plus */}

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#5C3A28]/15 text-[#5C3A28] transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 bg-[#FF5A1F] text-white"
                        : "group-hover:border-[#FF5A1F] group-hover:text-[#FF5A1F]"
                    }`}
                  >
                    <HiOutlinePlus size={20} />
                  </span>
                </button>

                {/* Answer */}

                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="pb-7 pl-14 pr-12 md:pl-14 md:pr-20">
                      <p
                        className="max-w-2xl text-sm leading-7 text-[#8A5A3A] md:text-base"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --------------------------------
            BOTTOM CTA
        -------------------------------- */}

        <div
          className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-[#5C3A28] p-7 sm:flex-row sm:items-center md:mt-16 md:p-9"
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A1F]"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Still curious?
            </p>

            <h3
              className="mt-2 text-2xl italic text-white md:text-3xl"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Come taste it for yourself.
            </h3>
          </div>

          <button
            onClick={()=>navigate('/contact')}
            className="rounded-full bg-[#FF5A1F] cursor-pointer px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:scale-105"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Book a Table
          </button>
        </div>
      </div>
    </section>
  );
}