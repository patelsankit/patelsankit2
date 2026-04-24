import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sankit Parasiya — Frontend Developer" },
      {
        name: "description",
        content:
          "Frontend Developer with 5+ years building scalable, user-focused web apps in React, Next.js, and Tailwind.",
      },
      { name: "author", content: "Sankit Parasiya" },
      { property: "og:title", content: "Sankit Parasiya — Frontend Developer" },
      {
        property: "og:description",
        content:
          "Premium frontend developer portfolio — React, Next.js, Tailwind, TypeScript.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Sankit Parasiya — Frontend Developer" },
      { name: "description", content: "Sankit's Studio is a modern, premium portfolio website built with Next.js, Tailwind CSS, and Framer Motion." },
      { property: "og:description", content: "Sankit's Studio is a modern, premium portfolio website built with Next.js, Tailwind CSS, and Framer Motion." },
      { name: "twitter:description", content: "Sankit's Studio is a modern, premium portfolio website built with Next.js, Tailwind CSS, and Framer Motion." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0a2780ef-5fee-4fd4-a6a6-5de5d86b310c/id-preview-439f4a9a--40a13aea-4a20-4952-ac89-ec775f601049.lovable.app-1777023914715.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0a2780ef-5fee-4fd4-a6a6-5de5d86b310c/id-preview-439f4a9a--40a13aea-4a20-4952-ac89-ec775f601049.lovable.app-1777023914715.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
