import { motion } from "framer-motion";
import { Section } from "./section";

type Skill = {
  name: string;
  slug: string;
  color: string;
};

const skills: Skill[] = [
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css3", color: "1572B6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "SCSS", slug: "sass", color: "CC6699" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "jQuery", slug: "jquery", color: "0769AD" },
  { name: "Framer Motion", slug: "framer", color: "0055FF" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
  { name: "Vite", slug: "vite", color: "646CFF" },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tech Stack"
      description="A curated stack I use to build modern, responsive, and maintainable web apps."
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-elegant"
          >
            <div className="grid h-14 w-14 place-items-center">
              <img
                src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                alt={`${skill.name} logo`}
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
