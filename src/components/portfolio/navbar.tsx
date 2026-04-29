import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [profileHover, setProfileHover] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(95%,1104px)]"
    >
      <nav className="relative flex items-center justify-between gap-4 rounded-full border border-border/60 bg-background/60 px-5 py-3.5 shadow-soft backdrop-blur-xl">

        {/* Profile logo with hover card */}
        <div
          className="relative"
          onMouseEnter={() => setProfileHover(true)}
          onMouseLeave={() => setProfileHover(false)}
        >
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
            <img
              src="/favicon.png"
              alt="Sankit Patel"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="hidden sm:inline">Sankit Patel</span>
          </a>

          <AnimatePresence>
            {profileHover && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 top-[calc(100%+12px)] w-72 rounded-2xl border border-border/60 bg-background/95 shadow-elegant backdrop-blur-xl p-4 pointer-events-none"
              >
                {/* Arrow */}
                <div className="absolute -top-1.5 left-5 h-3 w-3 rotate-45 rounded-sm border-l border-t border-border/60 bg-background/95" />

                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/favicon.png"
                    alt="Sankit Patel"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-border/60"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-tight">Sankit Patel</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Frontend Developer</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  5+ years building scalable, user-focused web apps. Passionate about clean UI, performance, and great developer experience.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-medium border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 rounded-full dark:text-white/80 transition-colors hover:text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/70 transition-transform hover:scale-110"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/70 transition-transform hover:scale-110"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden absolute right-2 top-[calc(100%+8px)] w-56 overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-elegant backdrop-blur-xl"
            >
              <ul className="flex flex-col p-2 text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
