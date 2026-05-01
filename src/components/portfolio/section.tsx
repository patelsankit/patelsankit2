import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

/* ── Animated title — word-stagger slide up from mask ── */
function AnimatedTitle({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const words = title.split(" ");

  return (
    <h2
      ref={ref}
      className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight flex flex-wrap gap-x-3"
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ overflow: "hidden", lineHeight: 1.25 }}
        >
          <motion.span
            animate={inView ? { y: 0 } : { y: "102%" }}
            transition={{
              duration: 0.58,
              delay: i * 0.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || description) && (
          <div className="mb-14 max-w-2xl">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="h-px w-6 bg-foreground/40 origin-left inline-block"
                />
                {eyebrow}
              </motion.span>
            )}

            {title && <AnimatedTitle title={title} />}

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
