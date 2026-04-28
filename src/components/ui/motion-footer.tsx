"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables for White Theme Pills */
  --pill-bg-1: rgba(255, 255, 255, 1);
  --pill-bg-2: rgba(248, 250, 252, 1);
  --pill-shadow: rgba(15, 23, 42, 0.05);
  --pill-border: rgba(226, 232, 240, 1);
  
  --pill-bg-1-hover: rgba(255, 237, 213, 1);
  --pill-bg-2-hover: rgba(255, 237, 213, 1);
  --pill-border-hover: rgba(253, 186, 116, 1);
  --pill-shadow-hover: rgba(234, 88, 12, 0.15);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
  100% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.2; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(234, 88, 12, 0.1)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(234, 88, 12, 0.2)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background - Light Mode */
.footer-bg-grid {
  background-size: 80px 80px;
  background-image: 
    linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

/* Warm Sunlight Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(234, 88, 12, 0.1) 0%, 
    rgba(253, 186, 116, 0.05) 40%, 
    transparent 70%
  );
}

/* Light Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow);
  border: 1px solid var(--pill-border);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: #475569; /* slate-600 */
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 15px 30px -10px var(--pill-shadow-hover);
  color: #ea580c; /* orange-600 */
}

/* Giant Background Text Masking - Light Mode */
.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(15, 23, 42, 0.03); /* slight slate stroke */
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.04) 0%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Solid Text Styling (No Glow in Light Mode) */
.footer-text-glow {
  color: #0f172a; /* Slate 900 */
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;

          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
              node;
          }
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Ancient Wisdom</span>
    <Image src="/shrutivanam.logo.png" alt="Shrutivanam logo" width={20} height={20} className="w-5 h-5 object-contain" />
    <span>Modern Learning</span>
    <Image src="/shrutivanam.logo.png" alt="Shrutivanam logo" width={20} height={20} className="w-5 h-5 object-contain" />
    <span>Vedic Mathematics</span>
    <Image src="/shrutivanam.logo.png" alt="Shrutivanam logo" width={20} height={20} className="w-5 h-5 object-contain" />
    <span>Sanskrit Roots</span>
    <Image src="/shrutivanam.logo.png" alt="Shrutivanam logo" width={20} height={20} className="w-5 h-5 object-contain" />
    <span>Spiritual Growth</span>
    <Image src="/shrutivanam.logo.png" alt="Shrutivanam logo" width={20} height={20} className="w-5 h-5 object-contain" />
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", scale: 0.9, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1.5,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Container that sits in the flow and clips the fixed footer reveal */}
      <div
        ref={wrapperRef}
        className="relative h-[80vh] md:h-screen w-full mt-20"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Fixed footer reveal */}
        <footer className="fixed bottom-0 left-0 flex h-[80vh] md:h-screen w-full flex-col justify-between overflow-hidden bg-white text-slate-800 cinematic-footer-wrapper border-t border-slate-200">
          
          {/* Ambient Decor */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-[family-name:var(--font-cinzel)]"
          >
            SHRUTIVANAM
          </div>

          {/* 1. Sleek Marquee */}
          <div className="absolute top-16 left-0 w-full overflow-hidden border-y border-slate-200 bg-slate-50/80 backdrop-blur-md py-6 z-10 -rotate-1 scale-105 shadow-sm">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.4em] text-slate-400 uppercase font-[family-name:var(--font-inter)]">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto text-center">
            <h2
              ref={headingRef}
              className="text-4xl md:text-8xl font-black footer-text-glow tracking-tighter mb-12 font-[family-name:var(--font-cinzel)] uppercase"
            >
              Ready to Begin?
            </h2>

            {/* Interactive Magnetic Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as={Link} href="/courses" className="footer-glass-pill px-10 py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group uppercase tracking-widest bg-white">
                  Explore Courses
                </MagneticButton>
                
                <MagneticButton as={Link} href="/contact" className="footer-glass-pill px-10 py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group uppercase tracking-widest bg-white">
                  Contact Us
                </MagneticButton>
              </div>

              {/* Secondary Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full mt-4 font-[family-name:var(--font-inter)]">
                <Link href="/about" className="text-slate-400 text-[11px] font-bold tracking-widest uppercase hover:text-orange-600 transition-colors">
                  Our Mission
                </Link>
                <Link href="/courses/vedic-maths" className="text-slate-400 text-[11px] font-bold tracking-widest uppercase hover:text-orange-600 transition-colors">
                   Vedic Maths
                </Link>
                <Link href="/courses/yoga" className="text-slate-400 text-[11px] font-bold tracking-widest uppercase hover:text-orange-600 transition-colors">
                   Yoga & Philosophy
                </Link>
                <Link href="/contact" className="text-slate-400 text-[11px] font-bold tracking-widest uppercase hover:text-orange-600 transition-colors">
                   Support
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar */}
          <div className="relative z-20 w-full pb-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Copyright */}
            <div className="text-slate-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase order-2 md:order-1 font-[family-name:var(--font-inter)]">
              © {new Date().getFullYear()} SHRUTIVANAM. SANATANA DHARMA FOUNDATION.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-8 py-3.5 rounded-full flex items-center gap-3 order-1 md:order-2 cursor-default border-slate-200 bg-white">
              <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Guided by</span>
              <Image
                src="/shrutivanam.logo.png"
                alt="Shrutivanam logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain animate-footer-heartbeat"
              />
              <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Wisdom</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full footer-glass-pill flex items-center justify-center text-slate-400 hover:text-orange-600 group order-3 bg-white"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-y-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
