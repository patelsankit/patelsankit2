import { motion, useMotionValue, useSpring } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Section } from "./section";

const WEB3FORMS_KEY = "e153fc2c-8be1-4bd3-83a4-061a6ab36217";

/* ── Magnetic contact card ──────────────────────────── */
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness: 320, damping: 26 });
  const y = useSpring(ry, { stiffness: 320, damping: 26 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    ry.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.015 }}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-foreground text-background transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </motion.a>
  );
}

/* ── Animated input field ───────────────────────────── */
function AnimatedField({
  tag = "input",
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  required,
  type,
  rows,
}: {
  tag?: "input" | "textarea";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  type?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = tag;

  return (
    <div className="relative">
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        type={type}
        rows={rows}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40 resize-none"
        style={tag === "textarea" ? { resize: "none" } : {}}
      />
      {/* Animated bottom-border focus indicator */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
        className="absolute bottom-px left-2 right-2 h-px rounded-full bg-foreground pointer-events-none"
      />
    </div>
  );
}

const CONTACTS = [
  { icon: Mail, label: "Email", value: "patelsankit16@gmai.com", href: "mailto:patelsankit16@gmai.com" },
  { icon: Phone, label: "Phone", value: "+91 95745 40106", href: "tel:+919574540106" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sankit-parasiya",
    href: "https://in.linkedin.com/in/sankit-parasiya-82970416a",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@sankitp6",
    href: "https://www.instagram.com/sankitp6",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", number: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { name, email, number, message } = formData;
  const isDisabled = !name || !email || !number || !message || loading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
          {CONTACTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <ContactCard {...c} />
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatedField
              name="name"
              value={name}
              onChange={handleChange}
              maxLength={100}
              placeholder="Your name"
              required
            />
            <AnimatedField
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              maxLength={255}
              placeholder="Email address"
              required
            />
          </div>
          <AnimatedField
            name="number"
            type="tel"
            value={number}
            onChange={handleChange}
            maxLength={20}
            placeholder="Phone number"
            required
          />
          <AnimatedField
            tag="textarea"
            name="message"
            value={message}
            onChange={handleChange}
            maxLength={1000}
            rows={5}
            placeholder="Tell me about your project…"
            required
          />
          <motion.button
            type="submit"
            disabled={isDisabled}
            whileHover={!isDisabled ? { scale: 1.01 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background overflow-hidden transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* Sweep shimmer on hover */}
            <motion.span
              initial={{ x: "-110%" }}
              whileHover={{ x: "110%" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            />
            {loading ? "Sending…" : sent ? "Message sent ✓" : "Send Message"}
            {!loading && !sent && (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </motion.button>
        </motion.form>
      </div>
    </Section>
  );
}
