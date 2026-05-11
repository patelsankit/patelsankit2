import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
export type ToggleFn = (origin?: { x: number; y: number }) => void;

const ThemeCtx = createContext<{ theme: Theme; toggle: ToggleFn }>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle: ToggleFn = (origin) => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      setTheme(next);
    };

    if (
      origin &&
      typeof document !== "undefined" &&
      "startViewTransition" in document
    ) {
      document.documentElement.style.setProperty("--vt-x", `${origin.x}px`);
      document.documentElement.style.setProperty("--vt-y", `${origin.y}px`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
