import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const cx = useMotionValue(-400);
  const cy = useMotionValue(-400);
  const hoverScale = useMotionValue(1);

  const dotX = useSpring(cx, { stiffness: 950, damping: 44 });
  const dotY = useSpring(cy, { stiffness: 950, damping: 44 });
  const ringX = useSpring(cx, { stiffness: 155, damping: 24 });
  const ringY = useSpring(cy, { stiffness: 155, damping: 24 });
  const ringScale = useSpring(hoverScale, { stiffness: 280, damping: 22 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as Element;
      hoverScale.set(
        t.closest("a,button,[role='button'],input,textarea,select") ? 2.2 : 1,
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cx, cy, hoverScale]);

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
        }}
      />
      {/* Inner dot — snappy */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: 5,
          height: 5,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
