import { motion } from "framer-motion";
import { Linkedin, Mail, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Section } from "./section";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Have a project in mind, or just want to say hello? I'd love to hear from you."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
          {[
            {
              icon: Mail,
              label: "Email",
              value: "patelsankit16@gmail.com",
              href: "mailto:patelsankit16@gmail.com",
            },
            { icon: Phone, label: "Phone", value: "+91 95745 40106", href: "tel:+919574540106" },
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: "linkedin.com/in/sankit-parasiya",
              href: "https://www.linkedin.com/",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {c.label}
                </div>
                <div className="font-medium">{c.value}</div>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <input
            placeholder="Subject"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            required
            rows={5}
            placeholder="Tell me about your project…"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01]"
          >
            {sent ? "Message sent ✓" : "Send Message"}
            {!sent && (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}