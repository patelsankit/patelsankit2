import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpg";
import { Section } from "./section";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "5", label: "Companies" },
  { value: "100%", label: "Pixel Perfect" },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A frontend developer focused on detail">
      <div className="grid gap-12 md:grid-cols-5 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-2"
        >
          <div className="relative mx-auto max-w-sm">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <img
                src={portrait}
                alt="Portrait of Sankit Parasiya"
                width={896}
                height={1152}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="md:col-span-3 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          <p>
            I'm a Frontend Developer with{" "}
            <span className="text-foreground font-medium">5+ years of experience</span> building
            and improving user-focused web applications. Currently at Bacancy Technology, I work
            with <span className="text-foreground font-medium">React, Next.js, and Tailwind</span>{" "}
            to ship clean, performant interfaces.
          </p>
          <p>
            I prioritize clear content structure, clean design patterns, and meaningful
            interactions — turning thoughtful product ideas into elegant, accessible experiences
            across every device.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
              >
                <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}