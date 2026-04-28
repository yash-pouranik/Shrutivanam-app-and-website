"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MouseOrb() {
  const [isClient, setIsClient] = useState(false);

  // Smooth springs for the glowing orb
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Defer to avoid synchronous state update in effect warning
    requestAnimationFrame(() => setIsClient(true));
    
    // Set initial position to center before mouse movement
    cursorX.set(document.documentElement.clientWidth / 2);
    cursorY.set(document.documentElement.clientHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  if (!isClient) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none mix-blend-screen z-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(42,29,122,0.02) 50%, transparent 80%)",
        filter: "blur(20px)",
        willChange: "transform",
      }}
    />
  );
}
