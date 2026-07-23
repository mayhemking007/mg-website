"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteBrand } from "@/components/site-brand";

const links = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "How it Works", href: "/#how-it-works", section: "how-it-works" },
  { label: "Why MemoGrafter", href: "/#features", section: "features" },
  { label: "API", href: "/#api", section: "api" },
  { label: "Studio", href: "/#studio", section: "studio" },
];

export function LandingNavigation({ githubUrl }: { githubUrl: string }) {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (window.location.pathname !== "/" || navigation?.type !== "reload") return;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.history.replaceState(window.history.state, "", "/");
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    return () => { window.history.scrollRestoration = previousScrollRestoration; };
  }, []);

  useEffect(() => {
    const sections = links.flatMap((link) => {
      const element = link.section ? document.getElementById(link.section) : null;
      return element ? [element] : [];
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -58%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="landing-header">
      <div className="landing-nav-shell">
        <SiteBrand animated />

        <nav className="landing-desktop-nav" aria-label="Primary navigation">
          <div className="landing-nav-links">{links.map((link) => (
            <Link key={link.label} href={link.href} className="landing-nav-link" data-active={link.section === activeSection}>{link.label}</Link>
          ))}</div>
          <div className="landing-nav-actions"><a href={githubUrl} target="_blank" rel="noreferrer noopener" className="landing-github-button" aria-label="GitHub (opens in a new tab)"><GitHubMark />GitHub</a><Link className="landing-nav-cta" href="/docs/quick-start">Get Started <ArrowRight className="h-[17px] w-[17px]" /></Link></div>
        </nav>
        <button className="landing-menu-button" type="button" aria-expanded={menuOpen} aria-controls="landing-mobile-menu" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div id="landing-mobile-menu" className="landing-mobile-menu" data-open={menuOpen} hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
          <a className="landing-mobile-github" href={githubUrl} target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" onClick={() => setMenuOpen(false)}><GitHubMark />GitHub</a>
          <Link className="landing-mobile-cta" href="/docs/quick-start" onClick={() => setMenuOpen(false)}>Get Started <ArrowRight className="h-4 w-4" /></Link>
        </nav>
      </div>
    </header>
  );
}

function GitHubMark() {
  return <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.2c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.98 10.98 0 0 1 12 6.21c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.4-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.16c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
}
