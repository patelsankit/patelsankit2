import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, Eye } from "lucide-react";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import { useTheme } from "@/components/portfolio/theme-provider";
import { Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

const RESUMES = [
  { id: "latest", label: "Latest Resume", file: "sankit_parasiya_resume.pdf", badge: "Latest" },
  { id: "v4", label: "Resume v4", file: "sankit_parasiya_resume_4.pdf", badge: null },
  { id: "v3", label: "Resume v3", file: "sankit_parasiya_resume_3.pdf", badge: null },
  { id: "v2", label: "Resume v2", file: "sankit_parasiya_resume_2.pdf", badge: null },
  { id: "v1", label: "Resume v1", file: "sankit_parasiya_resume_1.pdf", badge: null },
  { id: "old", label: "Resume (Old)", file: "sankit_parasiya_resume_old.pdf", badge: null },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={(e) => {
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-md transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function ResumeContent() {
  const [selected, setSelected] = useState(RESUMES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <span className="hidden text-sm font-semibold text-foreground sm:block">
            Resume Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/pdf/${selected.file}`}
            download={selected.file}
            className="flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 260 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0 overflow-hidden border-r border-border bg-muted/30"
        >
          <div className="flex h-full w-[260px] flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                All Resumes
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {RESUMES.length}
              </span>
            </div>

            <nav className="flex flex-col gap-1 overflow-y-auto px-2 pb-4">
              {RESUMES.map((resume, i) => (
                <motion.button
                  key={resume.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(resume)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                    selected.id === resume.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <FileText
                    className={`h-4 w-4 shrink-0 ${selected.id === resume.id ? "text-background" : "text-muted-foreground group-hover:text-foreground"}`}
                  />
                  <span className="flex-1 truncate font-medium">{resume.label}</span>
                  {resume.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        selected.id === resume.id
                          ? "bg-background/20 text-background"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {resume.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Toggle sidebar button */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 translate-x-[calc(var(--sidebar-w,0px))] hidden"
        />

        {/* PDF Viewer */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Viewer toolbar */}
          <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border bg-background/50 px-4 backdrop-blur-sm">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Eye className="h-3.5 w-3.5" />
              {sidebarOpen ? "Hide" : "Show"} sidebar
            </button>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs text-muted-foreground">{selected.label}</span>
          </div>

          <motion.div
            key={selected.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden bg-muted/20"
          >
            <object
              data={`/pdf/${selected.file}`}
              type="application/pdf"
              className="h-full w-full"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
                <FileText className="h-12 w-12 opacity-30" />
                <p className="text-sm">PDF preview not supported in this browser.</p>
                <a
                  href={`/pdf/${selected.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  <Eye className="h-4 w-4" />
                  Open PDF
                </a>
              </div>
            </object>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ResumePage() {
  return (
    <ThemeProvider>
      <ResumeContent />
    </ThemeProvider>
  );
}
