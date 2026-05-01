import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const LOAD_MS = 1500;
const DISPLAY_NAME = "Sankit Patel";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const ctrl = animate(progress, 100, {
      duration: LOAD_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    const t = setTimeout(() => setShow(false), LOAD_MS + 100);
    return () => {
      ctrl.stop();
      clearTimeout(t);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{
            clipPath: "inset(100% 0 0 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-7 right-8 font-mono text-[10px] tracking-[0.38em] text-muted-foreground tabular-nums select-none"
          >
            {String(count).padStart(3, "0")}
          </motion.span>

          {/* Center content */}
          <div className="flex flex-col items-center gap-8 relative z-10">
            <motion.img
              src="/favicon.png"
              alt="Sankit"
              initial={{ scale: 0.35, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-20 w-20 rounded-full object-cover shadow-elegant ring-2 ring-border/40"
            />

            {/* Name — letter by letter */}
            <div className="overflow-hidden">
              <div className="flex items-center">
                {DISPLAY_NAME.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.28 + i * 0.042,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className={`inline-block text-base font-medium tracking-[0.28em] uppercase text-foreground ${ch === " " ? "mr-2.5" : ""}`}
                  >
                    {ch === " " ? "" : ch}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-44 h-px bg-border relative overflow-hidden rounded-full">
              <motion.div
                style={{ scaleX, transformOrigin: "left" }}
                className="absolute inset-0 bg-foreground"
              />
            </div>
          </div>

          {/* Decorative rotating rings */}
          {[220, 360, 520].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 14 + i * 5, repeat: Infinity, ease: "linear" }}
              style={{ width: size, height: size }}
              className="absolute rounded-full border border-border/10 pointer-events-none"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
