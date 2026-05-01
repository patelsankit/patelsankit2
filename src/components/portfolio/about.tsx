import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/sankit_patel.jpeg";
import { Section } from "./section";

/* ── Counting stat ──────────────────────────────────── */
function CountStat({
  to,
  suffix,
  label,
}: {
  to: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, to]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
    >
      <div className="text-2xl font-semibold tracking-tight tabular-nums">
        {val}
        {suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

const STATS = [
  { to: 5, suffix: "+", label: "Years Experience" },
  { to: 20, suffix: "+", label: "Projects Shipped" },
  { to: 5, suffix: "", label: "Companies" },
  { to: 100, suffix: "%", label: "Pixel Perfect" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A frontend developer focused on detail" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div aria-hidden className="absolute inset-0 -z-10 noise opacity-60" />
      <div className="grid gap-12 md:grid-cols-5 items-center">
        {/* Photo with rotating gradient ring */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="md:col-span-2"
        >
          <div className="relative mx-auto max-w-xs">
            {/* Rotating conic ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              aria-hidden
              className="absolute -inset-1.5 rounded-[1.2rem] pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 40%, oklch(0.50 0.17 260 / 0.35) 55%, oklch(0.55 0.19 295 / 0.25) 70%, transparent 85%)",
                borderRadius: "1.1rem",
              }}
            />
            {/* Photo */}
            <motion.div
              initial={{ filter: "blur(12px)", scale: 0.95 }}
              whileInView={{ filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
            >
              <img
                src={portrait}
                alt="Portrait of Sankit Parasiya"
                width={896}
                height={1152}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Text + stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          className="md:col-span-3 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          <p>
            Hello! My name is <span className="text-foreground font-medium">Sankit</span>. I am an
            ambitious and skilled Frontend Developer with over{" "}
            <span className="text-foreground font-medium">5+ years of practical experience</span> in
            building and improving user-focused web applications. My expertise allows me to create
            intuitive and responsive user interfaces. I prioritize clean, maintainable code and
            follow best practices in web development.
          </p>
          <p>
            I am passionate about designing seamless user experiences across various devices. My
            deep understanding of web design principles ensures that my projects are visually
            appealing and functional. Problem-solving and adapting to new challenges are key aspects
            of my approach.
          </p>
          <p>
            I continuously learn and stay up to date with industry trends. My goal is to contribute
            to impactful, user-centered projects.
          </p>

          {/* Animated counting stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {STATS.map((s) => (
              <CountStat key={s.label} {...s} />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
