import { motion } from "framer-motion";
import { Section } from "./section";

const experiences = [
  {
    period: "2025 — Present",
    role: "Frontend Developer",
    company: "Bacancy Technology",
    location: "Ahmedabad, India",
    desc: "Building scalable interfaces with React.js, SCSS, and Tailwind CSS. Focus on performance and clean component architecture.",
  },
  {
    period: "2023 — 2024",
    role: "Frontend Developer",
    company: "Vivansh Infotech",
    location: "Ahmedabad",
    desc: "Delivered production-grade UIs with React.js, DataTables, and Tailwind CSS across several client products.",
  },
  {
    period: "2022 — 2023",
    role: "Associate Software Engineer",
    company: "Covrize IT Solutions",
    location: "Ahmedabad",
    desc: "Worked across the frontend stack with HTML, CSS, JavaScript, jQuery, and React.js on multiple modules.",
  },
  {
    period: "2022",
    role: "Frontend Developer (Trainee)",
    company: "Scanpoint Geomatics Ltd",
    location: "Ahmedabad",
    desc: "Built responsive interfaces and learned the foundations of pixel-perfect frontend development.",
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A timeline of building things"
      description="A look at where I've spent my time and the products I've helped ship."
    >
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div
                className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}
              >
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 grid h-3 w-3 place-items-center">
                  <span className="h-3 w-3 rounded-full bg-gradient-primary ring-4 ring-background" />
                </div>
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-primary">
                  {exp.period}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{exp.role}</h3>
                <div className="text-sm text-muted-foreground">
                  {exp.company} · {exp.location}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
              </div>
              <div />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}