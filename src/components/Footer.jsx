import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaFacebookF,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

const SOCIAL_LINKS = [
    { Icon: FaInstagram, href: "https://instagram.com/", label: "Instagram", size: 16 },
    { Icon: FaFacebookF, href: "https://facebook.com/", label: "Facebook", size: 15 },
];

const EXPLORE_LINKS = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About Us", to: "/about" },
    { label: "Location", to: "/location" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-[#E8480D] bg-[#FF5A1F]">

            {/* Main Footer */}

            <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
                <div className="grid gap-12 md:grid-cols-12 md:gap-8">

                    {/* Brand */}

                    <div className="md:col-span-5">
                        <Link
                            to="/"
                            aria-label="Hotsi Sushi — home"
                            className="inline-flex items-center"
                        >
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_12px_35px_rgba(92,58,40,0.15)]">
                                <img
                                    src="/logo.png"
                                    alt="Hotsi Sushi"
                                    className="h-24 w-auto"
                                />
                            </div>
                        </Link>

                        <p
                            className="mt-5 max-w-sm text-sm leading-7 text-white/75"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                            Fresh sushi, bold flavors, and a little Hotsi energy.
                            Come by for a seat, stay for another roll.
                        </p>

                        {/* Social Icons */}

                        <div className="mt-7 flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ Icon, href, label, size }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#FF5A1F]"
                                >
                                    <Icon size={size} />
                                </a>
                            ))}

                            <Link
                                to="/location"
                                aria-label="Location"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#FF5A1F]"
                            >
                                <FaMapMarkerAlt size={15} />
                            </Link>
                        </div>
                    </div>

                    {/* Explore */}

                    <div className="md:col-span-2">
                        <h3
                            className="text-lg text-white"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Explore
                        </h3>

                        <ul
                            className="mt-5 space-y-3"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                            {EXPLORE_LINKS.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-white/70 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visit */}

                    <div className="md:col-span-2">
                        <h3
                            className="text-lg text-white"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Visit Us
                        </h3>

                        <div
                            className="mt-5 space-y-4"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt
                                    size={14}
                                    className="mt-1 shrink-0 text-white"
                                />

                                <p className="text-sm leading-6 text-white/70">
                                    123 Sushi Street
                                    <br />
                                    Your City, Pakistan
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt
                                    size={13}
                                    className="shrink-0 text-white"
                                />

                                <a
                                    href="tel:+920000000000"
                                    className="text-sm text-white/70 transition-colors hover:text-white"
                                >
                                    +92 000 0000000
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}

                    <div className="md:col-span-3">
                        <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6">

                            <span
                                className="text-xs font-bold uppercase tracking-[0.22em] text-white"
                                style={{ fontFamily: "'Manrope', sans-serif" }}
                            >
                                Ready for Hotsi?
                            </span>

                            <h3
                                className="mt-3 text-2xl leading-tight text-white"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Your next roll is waiting.
                            </h3>

                            <Link
                                to="/contact"
                                className="group mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#5C3A28] transition-colors duration-200 hover:bg-[#5C3A28] hover:text-white"
                                style={{ fontFamily: "'Manrope', sans-serif" }}
                            >
                                Book a Table

                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5A1F]/15 transition-transform duration-300 group-hover:rotate-45">
                                    <HiOutlineArrowUpRight size={14} />
                                </span>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}

            <div className="border-t border-white/20">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">

                    <p
                        className="text-xs text-white/55"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                        © 2026 Hotsi Sushi. All rights reserved.
                    </p>

                    <div
                        className="flex items-center gap-5"
                        style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                        <Link
                            to="/privacy"
                            className="text-xs text-white/55 transition-colors hover:text-white"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="text-xs text-white/55 transition-colors hover:text-white"
                        >
                            Terms
                        </Link>
                    </div>

                </div>
            </div>

        </footer>
    );
}
