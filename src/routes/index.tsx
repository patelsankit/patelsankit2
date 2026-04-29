import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { Experience } from "@/components/portfolio/experience";
import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/portfolio/hero";
import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { Navbar } from "@/components/portfolio/navbar";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import { BackToTop } from "@/components/portfolio/back-to-top";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CursorGlow />
      <div className="relative min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
