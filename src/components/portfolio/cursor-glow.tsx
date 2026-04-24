import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, oklch(0.20 0.01 260 / 0.05), transparent 60%)`,
      }}
    />
  );
}