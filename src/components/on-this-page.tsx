"use client";

import { List } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type TocSection = {
  id: string;
  title: string;
};

type TocMarkerStyle = CSSProperties & {
  "--toc-marker-height": string;
  "--toc-marker-top": string;
};

export function OnThisPage({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [marker, setMarker] = useState({ height: 28, top: 2 });
  const navRef = useRef<HTMLElement>(null);
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    if (!sectionIds.length) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    function updateActiveSection() {
      const pageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;

      if (pageBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      const markerY = 132;
      const current =
        elements
          .filter((element) => element.getBoundingClientRect().top <= markerY)
          .at(-1) ?? elements[0];

      setActiveId(current.id);
    }

    updateActiveSection();

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-96px 0px -62% 0px",
      threshold: [0, 0.2, 0.6, 1],
    });

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`,
    );

    if (!activeLink) {
      return;
    }

    setMarker({
      height: activeLink.offsetHeight,
      top: activeLink.offsetTop,
    });
  }, [activeId, sections]);

  return (
    <aside className="docs-toc sticky top-24 hidden max-h-[calc(100vh-120px)] py-2 xl:block">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
        <List className="h-4 w-4 text-slate-500" />
        On this page
      </div>
      <nav
        ref={navRef}
        className="docs-toc-nav text-sm"
      >
        <span
          className="docs-toc-marker"
          style={
            {
              "--toc-marker-height": `${marker.height}px`,
              "--toc-marker-top": `${marker.top}px`,
            } as TocMarkerStyle
          }
          aria-hidden="true"
        />
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            data-active={activeId === section.id ? "true" : undefined}
            data-toc-id={section.id}
            className="docs-toc-link"
          >
            {section.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
