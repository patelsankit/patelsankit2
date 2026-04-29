import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Section } from "./section";

const WEB3FORMS_KEY = "e153fc2c-8be1-4bd3-83a4-061a6ab36217";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { name, email, number, message } = formData;
  const isDisabled = !name || !email || !number || !message || loading;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !number.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formData, access_key: WEB3FORMS_KEY }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message || "Message sent successfully");
        setFormData({ name: "", email: "", number: "", message: "" });
        setSent(true);
        setTimeout(() => setSent(false), 3000);
      } else {
        toast.error("Email not sent");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
              value: "patelsankit16@gmai.com",
              href: "mailto:patelsankit16@gmai.com",
            },
            { icon: Phone, label: "Phone", value: "+91 95745 40106", href: "tel:+919574540106" },
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: "linkedin.com/in/sankit-parasiya-82970416a",
              href: "https://in.linkedin.com/in/sankit-parasiya-82970416a",
            },
            {
              icon: Instagram,
              label: "Instagram",
              value: "@sankitp6",
              href: "https://www.instagram.com/sankitp6",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-foreground text-background">
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
              name="name"
              value={name}
              onChange={handleChange}
              maxLength={100}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              required
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              maxLength={255}
              placeholder="Email address"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <input
            required
            name="number"
            type="tel"
            value={number}
            onChange={handleChange}
            maxLength={20}
            placeholder="Phone number"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            required
            name="message"
            value={message}
            onChange={handleChange}
            maxLength={1000}
            rows={5}
            placeholder="Tell me about your project…"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending…" : sent ? "Message sent ✓" : "Send Message"}
            {!loading && !sent && (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}