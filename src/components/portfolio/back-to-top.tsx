import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 h-12 w-12 sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          {/* Scroll progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
          >
            {/* Background track */}
            <circle cx="24" cy="24" r="22" strokeWidth="2" className="stroke-border" />
            {/* Animated progress arc */}
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-foreground"
              style={{ pathLength }}
            />
          </svg>
          {/* Inner button */}
          <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-card border border-border/40 shadow-soft">
            <ArrowUp className="h-4 w-4 text-foreground" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
