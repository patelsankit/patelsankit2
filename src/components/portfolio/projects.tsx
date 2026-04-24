import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Section } from "./section";

type Project = {
  title: string;
  description: string;
  stack: string[];
  featured?: boolean;
  href?: string;
};

const projects: Project[] = [
  {
    title: "Spanish Fork River Management",
    description:
      "A canal & sub-canal management platform for daily flow reporting. Built the UI from scratch and integrated APIs across modules with a focus on smooth UX.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Zustand", "Shadcn"],
    featured: true,
  },
  {
    title: "LatestHub",
    description:
      "A modern blog platform built with Next.js and Firebase for seamless content management. Clean, fully responsive UI that adapts perfectly to every screen size.",
    stack: ["Next.js", "Firebase", "Tailwind CSS"],
    href: "https://latesthub.vercel.app/",
  },
  {
    title: "Live Notepad",
    description:
      "A real-time notepad app — write notes on one device and access them anywhere with instant updates across sessions.",
    stack: ["React", "Firebase", "Tailwind CSS"],
    href: "https://livenotepad-five.vercel.app/",
  },
  {
    title: "Wolto International",
    description:
      "A sustainability-driven agricultural brand site showcasing premium cattle feed, farming solutions, and eco-friendly bagasse tableware.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    href: "https://woltointernational.com/",
  },
  {
    title: "Bhavya Quartz",
    description:
      "Corporate website for a quartz stone manufacturer & distributor. Highlights product range, services, and industries served with a focus on quality.",
    stack: ["Next.js", "Tailwind CSS", "SCSS"],
    href: "https://www.bhavyaquartz.com/",
  },
  {
    title: "Clastera",
    description:
      "Brand site for a tile manufacturing & exporting company specializing in ceramic wall, floor, and porcelain tiles.",
    stack: ["Next.js", "Tailwind CSS"],
    href: "https://clastera.in/",
  },
  {
    title: "Cleango",
    description:
      "Marketing site and dual portals (admin + user) for a professional upholstery cleaning service, with a focus on mobile-first responsive design.",
    stack: ["Next.js", "Tailwind CSS", "HTML"],
  },
  {
    title: "YT to MP3 Converter",
    description:
      "A web app that converts YouTube videos into high-quality MP3 files. Paste a URL, process the conversion, and download for offline listening.",
    stack: ["React", "Node.js", "Tailwind CSS"],
    href: "https://yt-convert-wheat.vercel.app/",
  },
  {
    title: "RayBan-TEG",
    description:
      "A Ray-Ban inspired eyewear storefront featuring prescription sunglasses and eyeglasses with iconic styles and a refined shopping experience.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery"],
  },
  {
    title: "Cypherplus",
    description:
      "Investment & account management platform. Designed required modules and contributed to state handling for design components.",
    stack: ["Vue", "SCSS", "HTML/CSS"],
  },
  {
    title: "Yaalago",
    description:
      "A booking & task management tool for travel agencies. Designed module pages and updated existing pages for full responsiveness.",
    stack: ["Tailwind", "SCSS", "Laravel-UI"],
  },
  {
    title: "TNGNET",
    description:
      "The Next Generation Network — a server buyer platform with admin & user portals, built with attention to cross-browser compatibility.",
    stack: ["HTML", "Tailwind", "jQuery", "DataTables"],
  },
];

export function Projects() {
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A small selection of products I've designed, built, or contributed to."
    >
      {/* Featured */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className="group relative mb-10 overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-soft hover:shadow-lift transition-shadow"
      >
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Featured Project
          </span>
          <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            {featured.title}
          </h3>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {featured.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featured.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href ?? undefined}
            target={p.href ? "_blank" : undefined}
            rel={p.href ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft hover:shadow-lift transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:rotate-12" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}