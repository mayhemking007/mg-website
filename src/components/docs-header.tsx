"use client";

import { MemoryStick, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DocsSearch } from "@/components/docs-search";
import type { DocSearchRecord } from "@/lib/docs/search";

const githubUrl = "https://github.com/mayhemking007/memo-grafter";

export function DocsHeader({ searchRecords }: { searchRecords: DocSearchRecord[] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      } else if (event.key === "Escape") {
        const returnFocusTo = searchOpen ? searchTriggerRef.current : menuOpen ? menuTriggerRef.current : null;
        setSearchOpen(false);
        setMenuOpen(false);
        window.requestAnimationFrame(() => returnFocusTo?.focus());
      }
    }

    function onResize() {
      if (window.innerWidth >= 768) {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, searchOpen]);

  function closePanels() {
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="docs-header">
      <a
        href="#docs-content"
        className="sr-only z-[70] rounded-md bg-emerald-300 px-3 py-2 font-medium text-slate-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to documentation
      </a>

      <div className="docs-header-shell">
        <div className="flex min-w-0 items-center">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 text-white" aria-label="MemoGrafter home">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-emerald-300/30 bg-emerald-300/10">
              <MemoryStick className="h-4 w-4 text-emerald-300" />
            </span>
            <span className="hidden text-sm font-semibold sm:inline">MemoGrafter</span>
          </Link>
          <span className="mx-3 h-5 w-px bg-white/15" aria-hidden="true" />
          <Link href="/docs" className="truncate text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Documentation
          </Link>
        </div>

        <div
          className={`docs-header-search ${
            searchOpen ? "docs-header-search-open" : ""
          }`}
        >
          <DocsSearch
            records={searchRecords}
            overlay
            focusWhen={searchOpen}
            onNavigate={closePanels}
          />
        </div>

        <nav className="hidden items-center justify-end gap-1 md:flex" aria-label="Documentation navigation">
          <ExternalNavLink href={githubUrl} label="GitHub" />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <button
            ref={searchTriggerRef}
            type="button"
            aria-label={searchOpen ? "Close documentation search" : "Open documentation search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((open) => !open);
            }}
            className="docs-header-icon-button"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <button
            ref={menuTriggerRef}
            type="button"
            aria-label={menuOpen ? "Close documentation menu" : "Open documentation menu"}
            aria-controls="docs-header-mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setSearchOpen(false);
              setMenuOpen((open) => !open);
            }}
            className="docs-header-icon-button"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="docs-header-mobile-menu"
        hidden={!menuOpen}
        className="docs-header-mobile-menu md:hidden"
      >
        <nav aria-label="Documentation links" className="grid gap-1">
          <Link href="/" onClick={closePanels}>Back to website</Link>
          <a className="text-white!" href={githubUrl} target="_blank" rel="noreferrer noopener" onClick={closePanels}>
            GitHub <GitHubMark />
          </a>
        </nav>
      </div>
    </header>
  );
}

function ExternalNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} (opens in a new tab)`}
      className="docs-external-button docs-github-button"
    >
      <GitHubMark />
      {label}
    </a>
  );
}

function GitHubMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.2c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.98 10.98 0 0 1 12 6.21c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.4-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.16c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}
