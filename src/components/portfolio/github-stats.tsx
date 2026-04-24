import { motion } from "framer-motion";
import { GitBranch, GitCommit, Github, Star } from "lucide-react";
import { Section } from "./section";

const stats = [
  { icon: Github, value: "120+", label: "Public Repos" },
  { icon: GitCommit, value: "2.4k", label: "Contributions" },
  { icon: Star, value: "340", label: "Stars Earned" },
  { icon: GitBranch, value: "85", label: "Pull Requests" },
];

export function GithubStats() {
  return (
    <Section
      eyebrow="GitHub"
      title="Open source activity"
      description="A snapshot of my activity across repositories and contributions."
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}