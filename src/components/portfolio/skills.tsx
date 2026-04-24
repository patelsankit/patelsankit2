import { motion } from "framer-motion";
import { Section } from "./section";

const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "SCSS",
  "HTML",
  "CSS",
  "jQuery",
  "Shadcn UI",
  "Radix UI",
  "Zustand",
  "Framer Motion",
  "Figma",
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I work with"
      description="A curated stack I use to build modern, responsive, and maintainable web apps."
    >
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
            whileHover={{ scale: 1.06, y: -2 }}
            className="cursor-default rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-soft hover:shadow-elegant transition-shadow"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}