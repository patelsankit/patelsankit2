import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 28 });

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A timeline of building things"
      description="A look at where I've spent my time and the products I've helped ship."
      className="overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div aria-hidden className="absolute inset-0 -z-10 noise opacity-60" />

      <div ref={containerRef} className="relative">
        {/* Draw-on-scroll timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px overflow-hidden -translate-x-px">
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-border to-border/40"
          />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -48 : 48,
                y: 16,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div
                className={`pl-12 md:pl-0 ${
                  i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                }`}
              >
                {/* Animated timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 grid h-5 w-5 place-items-center">
                  {/* Pulsing glow ring */}
                  <span className="absolute h-5 w-5 rounded-full bg-gradient-primary opacity-30 animate-glow-ping" />
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="relative h-3 w-3 rounded-full bg-gradient-primary ring-4 ring-background block"
                  />
                </div>

                <div className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
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
