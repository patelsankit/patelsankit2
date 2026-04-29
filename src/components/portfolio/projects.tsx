import { motion } from "framer-motion";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Section } from "./section";

import latesthubImg from "@/assets/latesthub.png";
import livenotepadImg from "@/assets/livenotepad.png";
import woltointernationalImg from "@/assets/woltointernational.png";
import bhavyaquartzImg from "@/assets/bhavyaquartz.png";
import clasteraImg from "@/assets/clastera.png";
import cleangoImg from "@/assets/cleango.webp";
import ytMp3Img from "@/assets/yt-mp3.png";
import rayBanTegImg from "@/assets/RayBan-TEG.webp";

type Project = {
  title: string;
  description: string;
  stack: string[];
  category?: string;
  href?: string;
  image?: string;
};

const projects: Project[] = [
  // {
  //   title: "Spanish Fork River Management",
  //   description:
  //     "A canal & sub-canal management platform for daily flow reporting. Built the UI from scratch and integrated APIs across modules with a focus on smooth UX.",
  //   stack: ["Next.js", "TypeScript", "Tailwind", "Zustand", "Shadcn"],
  //   category: "Web App",
  // },
  {
    title: "Live Notepad",
    description:
      "A real-time notepad app — write notes on one device and access them anywhere with instant updates across sessions.",
    stack: ["React", "Firebase", "Tailwind CSS"],
    category: "Productivity",
    href: "https://livenotepad-five.vercel.app/",
    image: livenotepadImg,
  },
  {
    title: "LatestHub",
    description:
      "A modern blog platform built with Next.js and Firebase for seamless content management. Clean, fully responsive UI that adapts perfectly to every screen size.",
    stack: ["Next.js", "Firebase", "Tailwind CSS"],
    category: "Blog Platform",
    href: "https://latesthub.vercel.app/",
    image: latesthubImg,
  },

  {
    title: "Wolto International",
    description:
      "A sustainability-driven agricultural brand site showcasing premium cattle feed, farming solutions, and eco-friendly bagasse tableware.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Brand Site",
    href: "https://woltointernational.com/",
    image: woltointernationalImg,
  },
  {
    title: "Bhavya Quartz",
    description:
      "Corporate website for a quartz stone manufacturer & distributor. Highlights product range, services, and industries served with a focus on quality.",
    stack: ["Next.js", "Tailwind CSS", "SCSS"],
    category: "Corporate",
    href: "https://www.bhavyaquartz.com/",
    image: bhavyaquartzImg,
  },
  {
    title: "Clastera",
    description:
      "Brand site for a tile manufacturing & exporting company specializing in ceramic wall, floor, and porcelain tiles.",
    stack: ["Next.js", "Tailwind CSS"],
    category: "Brand Site",
    href: "https://clastera.in/",
    image: clasteraImg,
  },
  {
    title: "Cleango",
    description:
      "Marketing site and dual portals (admin + user) for a professional upholstery cleaning service, with a focus on mobile-first responsive design.",
    stack: ["Next.js", "Tailwind CSS", "HTML"],
    category: "Service Site",
    image: cleangoImg,
  },
  {
    title: "YT to MP3 Converter",
    description:
      "A web app that converts YouTube videos into high-quality MP3 files. Paste a URL, process the conversion, and download for offline listening.",
    stack: ["React", "Node.js", "Tailwind CSS"],
    category: "Utility",
    href: "https://yt-convert-wheat.vercel.app/",
    image: ytMp3Img,
  },
  {
    title: "RayBan-TEG",
    description:
      "A Ray-Ban inspired eyewear storefront featuring prescription sunglasses and eyeglasses with iconic styles and a refined shopping experience.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery"],
    category: "E-commerce",
    image: rayBanTegImg,
  },
  // {
  //   title: "Cypherplus",
  //   description:
  //     "Investment & account management platform. Designed required modules and contributed to state handling for design components.",
  //   stack: ["Vue", "SCSS", "HTML/CSS"],
  //   category: "Fintech",
  // },
  // {
  //   title: "Yaalago",
  //   description:
  //     "A booking & task management tool for travel agencies. Designed module pages and updated existing pages for full responsiveness.",
  //   stack: ["Tailwind", "SCSS", "Laravel-UI"],
  //   category: "SaaS",
  // },
  // {
  //   title: "TNGNET",
  //   description:
  //     "The Next Generation Network — a server buyer platform with admin & user portals, built with attention to cross-browser compatibility.",
  //   stack: ["HTML", "Tailwind", "jQuery", "DataTables"],
  //   category: "Marketplace",
  // },
];

function ProjectImage({ image, title }: { image?: string; title: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="relative grid h-full w-full place-items-center bg-muted">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
        <ImageIcon className="h-8 w-8 opacity-60" />
        <span className="text-xs uppercase tracking-[0.2em]">Preview</span>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A small selection of products I've designed, built, or contributed to."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href ?? undefined}
            target={p.href ? "_blank" : undefined}
            rel={p.href ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift transition-all"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted">
              <ProjectImage image={p.image} title={p.title} />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              {p.category && (
                <span className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                  {p.category}
                </span>
              )}
              <h3 className="mb-3 text-xl font-semibold tracking-tight leading-snug">{p.title}</h3>
              <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground border border-border/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-all group-hover:gap-2.5">
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
