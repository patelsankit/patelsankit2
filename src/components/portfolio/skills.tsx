import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

import htmlLogo from "@/assets/skills/htmllogo.png";
import cssLogo from "@/assets/skills/csslogo.png";
import jsLogo from "@/assets/skills/jslogo.png";
import jqueryLogo from "@/assets/skills/jquerylogo.png";
import tailwindLogo from "@/assets/skills/tailwindlogo.png";
import bootstrapLogo from "@/assets/skills/bootstraplogo.png";
import reactLogo from "@/assets/skills/reactlogo.png";
import nextLogo from "@/assets/skills/nextlogo.png";
import githubLogo from "@/assets/skills/githublogo.png";
import figmaLogo from "@/assets/skills/figmalogo.png";

type Skill = { name: string; image: string; invert?: boolean };

const ROW_1: Skill[] = [
  { name: "HTML", image: htmlLogo },
  { name: "CSS", image: cssLogo },
  { name: "JavaScript", image: jsLogo },
  { name: "jQuery", image: jqueryLogo },
  { name: "Tailwind CSS", image: tailwindLogo },
];

const ROW_2: Skill[] = [
  { name: "Bootstrap", image: bootstrapLogo },
  { name: "React", image: reactLogo },
  { name: "Next.js", image: nextLogo },
  { name: "GitHub", image: githubLogo, invert: true },
  { name: "Figma", image: figmaLogo },
];

/* ── 3-D tilt card ──────────────────────────────────── */
function SkillCard({ skill }: { skill: Skill }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotX = useSpring(rx, { stiffness: 420, damping: 32 });
  const rotY = useSpring(ry, { stiffness: 420, damping: 32 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rx.set(((e.clientY - r.top) / r.height - 0.5) * 26);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * -26);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 700 }}
      className="relative flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center rounded-2xl border border-border/40 bg-card/60 shadow-soft backdrop-blur-sm transition-colors duration-300 hover:border-border/80 hover:bg-card hover:shadow-elegant group"
      title={skill.name}
    >
      <img
        src={skill.image}
        alt={skill.name}
        loading="lazy"
        className={`h-[60px] w-[60px] object-contain transition-transform duration-300 group-hover:scale-110 ${skill.invert ? "invert dark:invert-0" : ""}`}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 55%)" }}
      />
    </motion.div>
  );
}

/* ── Infinite marquee row ───────────────────────────── */
function MarqueeRow({ skills, reverse }: { skills: Skill[]; reverse?: boolean }) {
  /* 8 copies → track ≈ 8 × 380 = 3040 px, always wider than the container.
     Animation moves exactly 380 px (1 copy), so the loop is seamless. */
  const copies = Array.from({ length: 8 }, () => skills).flat();
  return (
    <div className="overflow-hidden py-2 marquee-track">
      <div className={`flex gap-4 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {copies.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-14 max-w-2xl">
          {/* Eyebrow */}
          <motion.span
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            <motion.span
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="h-px w-6 bg-foreground/40 origin-left inline-block"
            />
            Skills
          </motion.span>

          {/* Title */}
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight flex flex-wrap gap-x-3">
            {["Tech", "Stack"].map((word, i) => (
              <span key={i} className="inline-block" style={{ overflow: "hidden", lineHeight: 1.25 }}>
                <motion.span
                  animate={inView ? { y: 0 } : { y: "102%" }}
                  transition={{ duration: 0.58, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Description */}
          <motion.p
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            A curated stack I use to build modern, responsive, and maintainable web apps.
          </motion.p>
        </div>
        {/* Marquee — contained inside the same max-w-6xl as Projects */}
        <div className="space-y-3">
          <MarqueeRow skills={ROW_1} />
          <MarqueeRow skills={ROW_2} reverse />
        </div>
      </div>
    </section>
  );
}
