import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Instagram, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative pt-36 sm:pt-44 pb-24 xl:pb-40 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div aria-hidden className="absolute inset-0 -z-10 noise opacity-60" />
      {/* <div
        aria-hidden
        className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      /> */}

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md shadow-soft"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          Sankit Parasiya
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-5 text-xl sm:text-2xl"
        >
          <span className="font-medium text-foreground">Frontend Developer</span>
          <span className="text-muted-foreground"> crafting refined web experiences</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-3.5xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Frontend Developer with 5+ years of experience building scalable and user-focused web
          applications. I prioritize clear content structure, clean design patterns, and meaningful
          interactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-soft transition-all hover:opacity-90"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/sankit_parasiya_resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium backdrop-blur-md transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4 text-muted-foreground"
        >
          <a
            href="mailto:patelsankit16@gmai.com"
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 transition-all hover:scale-110 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/patelsankit"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 transition-all hover:scale-110 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://in.linkedin.com/in/sankit-parasiya-82970416a"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 transition-all hover:scale-110 hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/sankitp6"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 transition-all hover:scale-110 hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
