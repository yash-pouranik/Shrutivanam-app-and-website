"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", labelHi: "होम" },
  { href: "/about", label: "About", labelHi: "हमारे बारे में" },
  { href: "/courses", label: "Courses", labelHi: "कोर्स" },
  { href: "/contact", label: "Contact", labelHi: "संपर्क" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[#0d0b1e]/95 backdrop-blur-xl border-b border-[rgba(201,168,76,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E2C97E] flex items-center justify-center text-[#0d0b1e] text-lg font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)] group-hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] transition-all duration-300">
                ॐ
              </div>
              <span
                className="font-[family-name:var(--font-cinzel)] text-lg font-semibold tracking-widest"
                style={{ color: "#E2C97E" }}
              >
                Shrutivanam
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium tracking-wider transition-colors duration-300 ${pathname === link.href
                      ? "text-[#E2C97E] active"
                      : "text-[#C8BFAD] hover:text-[#E2C97E]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/917566585848?text=Namaste%2C%20I%20am%20interested%20in%20learning%20more%20about%20Shrutivanam%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-2 rounded-full text-sm font-semibold tracking-wider"
              >
                Inquire Now
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] text-[#E2C97E] transition-all duration-300 hover:bg-[rgba(201,168,76,0.1)]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMenuOpen(false)}
        style={{ background: "rgba(13, 11, 30, 0.85)", backdropFilter: "blur(4px)" }}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 md:hidden w-72 transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          background: "linear-gradient(180deg, #1A1040 0%, #0D0B1E 100%)",
          borderLeft: "1px solid rgba(201, 168, 76, 0.15)",
        }}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] text-[#E2C97E]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Logo in drawer */}
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E2C97E] flex items-center justify-center text-[#0d0b1e] text-xl font-bold mx-auto mb-3 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
              ॐ
            </div>
            <p className="font-[family-name:var(--font-cinzel)] text-[#E2C97E] text-sm tracking-widest">
              Shrutivanam
            </p>
          </div>

          <div className="gold-divider mb-8" />

          {/* Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${pathname === link.href
                    ? "bg-[rgba(201,168,76,0.15)] text-[#E2C97E]"
                    : "text-[#C8BFAD] hover:bg-[rgba(201,168,76,0.08)] hover:text-[#E2C97E]"
                  }`}
              >
                <span className="font-medium tracking-wider">{link.label}</span>
                <span className="text-xs text-[#C9A84C]/60">{link.labelHi}</span>
              </Link>
            ))}
          </nav>

          <div className="gold-divider my-8" />

          <a
            href="https://wa.me/917566585848?text=Namaste%2C%20I%20am%20interested%20in%20learning%20more%20about%20Shrutivanam%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-3 rounded-full text-center text-sm font-semibold tracking-wider"
          >
            Chat on WhatsApp
          </a>

          <p className="text-center text-[#C8BFAD]/40 text-xs mt-auto font-[family-name:var(--font-cormorant)] italic">
            सा विद्या या विमुक्तये
          </p>
        </div>
      </div>
    </>
  );
}
