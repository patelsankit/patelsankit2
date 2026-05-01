import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";
import { ArrowDown, ArrowRight, Download, Github, Instagram, Linkedin, Mail } from "lucide-react";

/* ── Magnetic hook ───────────────────────────────────── */
function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness: 360, damping: 26 });
  const y = useSpring(ry, { stiffness: 360, damping: 26 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rx.set((e.clientX - rect.left - rect.width / 2) * strength);
      ry.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [rx, ry, strength],
  );

  const onMouseLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}

/* ── Floating orbs ───────────────────────────────────── */
const ORB_CONFIG = [
  {
    size: 680,
    color: "oklch(0.50 0.17 260 / 0.11)",
    dur: 20,
    x: [0, 90, -50, 70, 0],
    y: [0, -60, 90, -30, 0],
  },
  {
    size: 500,
    color: "oklch(0.55 0.19 295 / 0.08)",
    dur: 24,
    x: [0, -100, 60, -80, 0],
    y: [0, 80, -55, 90, 0],
  },
  {
    size: 430,
    color: "oklch(0.58 0.14 200 / 0.07)",
    dur: 18,
    x: [0, 70, -90, 40, 0],
    y: [0, -80, 50, -60, 0],
  },
];

/* ── Social icon with magnetic effect ───────────────── */
function SocialIcon({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  external?: boolean;
}) {
  const mag = useMagnetic<HTMLAnchorElement>(0.48);
  return (
    <motion.a
      ref={mag.ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      style={{ x: mag.x, y: mag.y }}
      className="grid h-11 w-11 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted/60 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

const SOCIALS = [
  { href: "mailto:patelsankit16@gmai.com", icon: Mail, label: "Email" },
  { href: "https://github.com/patelsankit", icon: Github, label: "GitHub", external: true },
  {
    href: "https://in.linkedin.com/in/sankit-parasiya-82970416a",
    icon: Linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://www.instagram.com/sankitp6",
    icon: Instagram,
    label: "Instagram",
    external: true,
  },
] as const;

const FULL_NAME = "Sankit Parasiya";

export function Hero() {
  const viewBtn = useMagnetic<HTMLAnchorElement>(0.22);
  const dlBtn = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <section id="home" className="relative pt-36 sm:pt-44 pb-24 xl:pb-40 overflow-hidden">
      {/* Floating gradient orbs */}
      {ORB_CONFIG.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ x: orb.x, y: orb.y }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ width: orb.size, height: orb.size, background: orb.color }}
        />
      ))}

      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div aria-hidden className="absolute inset-0 -z-10 noise opacity-60" />
      <div aria-hidden className="absolute inset-0 -z-10 dot-grid" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md shadow-soft"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for new opportunities
        </motion.div>

        {/* Name — character-split drop animation */}
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="flex flex-wrap justify-center">
            {FULL_NAME.split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden" style={{ lineHeight: 1.12 }}>
                <motion.span
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.56,
                    delay: 0.06 + i * 0.027,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="inline-block pb-1"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Role — blur-in reveal */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.65 }}
          className="mt-5 text-xl sm:text-2xl"
        >
          <span className="font-medium text-foreground">Frontend Developer</span>
          <span className="text-muted-foreground"> crafting refined web experiences</span>
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.8 }}
          className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Frontend Developer with 5+ years of experience building scalable and user-focused web
          applications. I prioritize clear content structure, clean design patterns, and meaningful
          interactions.
        </motion.p>

        {/* CTA buttons — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            ref={viewBtn.ref}
            href="#projects"
            onMouseMove={viewBtn.onMouseMove}
            onMouseLeave={viewBtn.onMouseLeave}
            style={{ x: viewBtn.x, y: viewBtn.y }}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-soft transition-all hover:opacity-90"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            ref={dlBtn.ref}
            href="/sankit_parasiya_resume.pdf"
            download
            onMouseMove={dlBtn.onMouseMove}
            onMouseLeave={dlBtn.onMouseLeave}
            style={{ x: dlBtn.x, y: dlBtn.y }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium backdrop-blur-md transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social icons — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.12 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {SOCIALS.map((s) => (
            <SocialIcon key={s.label} {...s} />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50 font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground/40"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
