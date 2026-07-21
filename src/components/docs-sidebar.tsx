"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

type DocsNavItem = {
  href: string;
  label: string;
};

type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

const scrollStorageKey = "memo-grafter-docs-sidebar-scroll";

export function DocsSidebar({
  items,
  groups,
  activeHref,
}: {
  items: DocsNavItem[];
  groups?: DocsNavGroup[];
  activeHref?: string;
}) {
  const navGroups = groups ?? [{ title: "Docs", items }];
  const sidebarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    const storedPosition = window.sessionStorage.getItem(scrollStorageKey);

    if (sidebar && storedPosition !== null) {
      sidebar.scrollTop = Number(storedPosition);
    }
  }, [activeHref]);

  function preserveScrollPosition() {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      window.sessionStorage.setItem(scrollStorageKey, String(sidebar.scrollTop));
    }
  }

  return (
    <aside
      ref={sidebarRef}
      onScroll={preserveScrollPosition}
      className="docs-sidebar hidden max-h-[calc(100vh-140px)] overflow-y-auto py-2 pl-2 pr-4 lg:block"
    >
      <div className="mb-3 flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white">
        <FileText className="h-4 w-4 text-sky-300" />
        Documentation
      </div>
      <nav className="grid gap-5 text-sm">
        {navGroups.map((group) => (
          <div key={group.title}>
            <div className="mb-2 px-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              {group.title}
            </div>
            <div className="grid gap-1">
              {group.items.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-active={isActive ? "true" : undefined}
                    onClick={preserveScrollPosition}
                    className={`rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "docs-nav-link bg-emerald-300/12 text-emerald-100"
                        : "docs-nav-link text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
