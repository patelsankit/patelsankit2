import { motion } from "framer-motion";
import { Section } from "./section";

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

type Skill = {
  name: string;
  image: string;
  invert?: boolean;
};

const skills: Skill[] = [
  { name: "HTML", image: htmlLogo },
  { name: "CSS", image: cssLogo },
  { name: "JS", image: jsLogo },
  { name: "JQUERY", image: jqueryLogo },
  { name: "TAILWIND CSS", image: tailwindLogo },
  { name: "BOOTSTRAP", image: bootstrapLogo },
  { name: "REACTJS", image: reactLogo },
  { name: "NEXTJS", image: nextLogo },
  { name: "GITHUB", image: githubLogo, invert: true },
  { name: "FIGMA", image: figmaLogo },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tech Stack"
      description="A curated stack I use to build modern, responsive, and maintainable web apps."
    >
      <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="group relative flex aspect-square items-center justify-center rounded-3xl border border-border/40 bg-card/40 p-6 shadow-soft transition-all hover:border-border/80 hover:bg-card/80 hover:shadow-elegant"
            title={skill.name}
          >
            <img
              src={skill.image}
              alt={`${skill.name} logo`}
              loading="lazy"
              className={`h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110 ${
                skill.invert ? "invert dark:invert-0" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
