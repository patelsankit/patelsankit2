import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

function MagneticIcon({
  icon: Icon,
  href,
  label,
  external,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness: 400, damping: 28 });
  const y = useSpring(ry, { stiffness: 400, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set((e.clientX - rect.left - rect.width / 2) * 0.38);
    ry.set((e.clientY - rect.top - rect.height / 2) * 0.38);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.15 }}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

const SOCIAL_LINKS = [
  { icon: Mail, href: "mailto:patelsankit16@gmai.com", label: "Email" },
  { icon: Github, href: "https://github.com/patelsankit", label: "GitHub", external: true },
  {
    icon: Linkedin,
    href: "https://in.linkedin.com/in/sankit-parasiya-82970416a",
    label: "LinkedIn",
    external: true,
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/sankitp6",
    label: "Instagram",
    external: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border py-10 overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-sm text-muted-foreground"
        >
          © {new Date().getFullYear()} Sankit Parasiya. Crafted with care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          {SOCIAL_LINKS.map((l) => (
            <MagneticIcon key={l.label} {...l} />
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
