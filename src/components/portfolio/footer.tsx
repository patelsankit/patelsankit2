import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sankit Parasiya. Crafted with care.
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: Mail, href: "mailto:patelsankit16@gmai.com", label: "Email" },
            { icon: Github, href: "https://github.com/patelsankit", label: "GitHub" },
            { icon: Linkedin, href: "https://in.linkedin.com/in/sankit-parasiya-82970416a", label: "LinkedIn" },
            { icon: Instagram, href: "https://www.instagram.com/sankitp6", label: "Instagram" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-label={l.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
            >
              <l.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}