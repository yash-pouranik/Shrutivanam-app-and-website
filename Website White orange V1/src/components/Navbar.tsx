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
            ? "bg-[#FEF7ED]/95 backdrop-blur-md border-b border-[#EBDBCD] shadow-sm"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#FF7F32] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-200 transition-transform group-hover:scale-110">
                ॐ
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#3B2E2A]">
                Shruti<span className="text-[#FF7F32]">vanam</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold tracking-wide transition-colors duration-200 ${pathname === link.href
                      ? "text-[#FF7F32]"
                      : "text-[#3B2E2A] hover:text-[#FF7F32]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/courses"
                className="btn-primary px-8 py-3.5 text-sm shadow-xl shadow-orange-100"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-[#EBDBCD] text-[#3B2E2A] shadow-sm"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMenuOpen(false)}
        style={{ background: "rgba(59, 46, 42, 0.4)", backdropFilter: "blur(4px)" }}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 md:hidden w-80 transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          background: "#FEF7ED",
          borderLeft: "2px solid #EBDBCD",
        }}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-[#EBDBCD] text-[#3B2E2A]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Logo in drawer */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7F32] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-orange-200">
              ॐ
            </div>
            <p className="text-xl font-black text-[#3B2E2A] tracking-tight">
              Shrutivanam
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all duration-200 ${pathname === link.href
                    ? "bg-[#FF7F32] text-white shadow-lg shadow-orange-100"
                    : "text-[#3B2E2A] hover:bg-white"
                  }`}
              >
                <span>{link.label}</span>
                <span className={pathname === link.href ? "text-white/70" : "text-[#FF7F32]"}>
                  {link.labelHi}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-12 space-y-4">
            <Link
              href="/courses"
              className="btn-primary w-full py-4 flex items-center justify-center text-base shadow-xl shadow-orange-100"
            >
              Explore Courses
            </Link>
          </div>

          <p className="text-center text-[#A89F9B] text-sm mt-auto font-medium italic">
            "सा विद्या या विमुक्तये"
          </p>
        </div>
      </div>
    </>
  );
}
