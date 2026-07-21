"use client";

import {
  Archive,
  Binary,
  Blocks,
  BookOpen,
  Bot,
  Box,
  Braces,
  CalendarCheck,
  ChevronRight,
  CircleAlert,
  Combine,
  Cpu,
  Database,
  Download,
  Eye,
  FilePlus2,
  FileText,
  Gauge,
  Gem,
  GitBranch,
  Headphones,
  History,
  KeyRound,
  Menu,
  Microscope,
  MonitorPlay,
  Network,
  NotebookPen,
  Package,
  PanelsTopLeft,
  Play,
  PlugZap,
  Radio,
  RefreshCw,
  ScanText,
  Scissors,
  Search,
  SearchCheck,
  SearchCode,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Split,
  SquareTerminal,
  TableProperties,
  Tags,
  Timer,
  Trash2,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { DocNavIcon } from "@/lib/docs";

type DocsNavItem = {
  href: string;
  label: string;
  icon: DocNavIcon;
};

type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

type DocsNavigationProps = {
  items: DocsNavItem[];
  groups?: DocsNavGroup[];
  activeHref?: string;
};

const scrollStorageKey = "memo-grafter-docs-sidebar-scroll";
const groupsStorageKey = "memo-grafter-docs-open-groups";
const groupsChangedEvent = "memo-grafter-docs-groups-changed";

const pageIcons: Record<DocNavIcon, LucideIcon> = {
  archive: Archive,
  binary: Binary,
  blocks: Blocks,
  "book-open": BookOpen,
  bot: Bot,
  box: Box,
  braces: Braces,
  "calendar-check": CalendarCheck,
  "circle-alert": CircleAlert,
  combine: Combine,
  cpu: Cpu,
  database: Database,
  download: Download,
  eye: Eye,
  "file-plus": FilePlus2,
  gauge: Gauge,
  gem: Gem,
  "git-branch": GitBranch,
  headphones: Headphones,
  history: History,
  "key-round": KeyRound,
  microscope: Microscope,
  "monitor-play": MonitorPlay,
  network: Network,
  "notebook-pen": NotebookPen,
  package: Package,
  panels: PanelsTopLeft,
  play: Play,
  plug: PlugZap,
  radio: Radio,
  refresh: RefreshCw,
  "scan-text": ScanText,
  scissors: Scissors,
  search: Search,
  "search-check": SearchCheck,
  "search-code": SearchCode,
  settings: Settings,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  split: Split,
  "square-terminal": SquareTerminal,
  table: TableProperties,
  tags: Tags,
  timer: Timer,
  trash: Trash2,
  users: Users,
  workflow: Workflow,
  wrench: Wrench,
  zap: Zap,
};

function activeGroupTitle(groups: DocsNavGroup[], activeHref?: string) {
  return groups.find((group) => group.items.some((item) => item.href === activeHref))?.title;
}

function initialOpenGroups(groups: DocsNavGroup[], activeHref?: string) {
  const initial = new Set<string>(["Getting Started"]);
  const activeGroup = activeGroupTitle(groups, activeHref);

  if (activeGroup) initial.add(activeGroup);

  return initial;
}

function useOpenGroups(groups: DocsNavGroup[], activeHref?: string) {
  const [openGroups, setOpenGroups] = useState(() => initialOpenGroups(groups, activeHref));

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.sessionStorage.getItem(groupsStorageKey);
      const next = stored ? new Set<string>(JSON.parse(stored) as string[]) : initialOpenGroups(groups, activeHref);
      const activeGroup = activeGroupTitle(groups, activeHref);

      if (activeGroup) next.add(activeGroup);
      setOpenGroups(next);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeHref, groups]);

  useEffect(() => {
    function syncGroups(event: Event) {
      const titles = (event as CustomEvent<string[]>).detail;
      setOpenGroups(new Set(titles));
    }

    window.addEventListener(groupsChangedEvent, syncGroups);
    return () => window.removeEventListener(groupsChangedEvent, syncGroups);
  }, []);

  function toggleGroup(title: string) {
    const next = new Set(openGroups);

    if (next.has(title)) next.delete(title);
    else next.add(title);

    const titles = [...next];
    setOpenGroups(next);
    window.sessionStorage.setItem(groupsStorageKey, JSON.stringify(titles));
    window.dispatchEvent(new CustomEvent(groupsChangedEvent, { detail: titles }));
  }

  return { openGroups, toggleGroup };
}

function DocsGroups({
  groups,
  activeHref,
  openGroups,
  toggleGroup,
  onNavigate,
  idPrefix,
}: {
  groups: DocsNavGroup[];
  activeHref?: string;
  openGroups: Set<string>;
  toggleGroup: (title: string) => void;
  onNavigate?: () => void;
  idPrefix: string;
}) {
  return groups.map((group) => {
    const isOpen = openGroups.has(group.title);
    const groupId = `${idPrefix}-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
      <div key={group.title}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={groupId}
          onClick={() => toggleGroup(group.title)}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium uppercase tracking-[0.14em] text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          <ChevronRight
            className={`h-4 w-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-90" : ""}`}
            aria-hidden="true"
          />
          <span className="min-w-0">{group.title}</span>
        </button>
        <div id={groupId} hidden={!isOpen}>
          <div className="grid gap-1 pb-2">
            {group.items.map((item) => {
              const isActive = activeHref === item.href;
              const PageIcon = pageIcons[item.icon];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive ? "true" : undefined}
                  onClick={onNavigate}
                  className={`group/page flex items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? "docs-nav-link bg-emerald-300/12 text-emerald-100"
                      : "docs-nav-link text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
                  }`}
                >
                  <PageIcon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? "text-emerald-300" : "text-slate-500 group-hover/page:text-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  });
}

export function DocsSidebar({ items, groups, activeHref }: DocsNavigationProps) {
  const navGroups = groups ?? [{ title: "Docs", items }];
  const sidebarRef = useRef<HTMLElement>(null);
  const idPrefix = useId();
  const { openGroups, toggleGroup } = useOpenGroups(navGroups, activeHref);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    const storedPosition = window.sessionStorage.getItem(scrollStorageKey);

    if (sidebar && storedPosition !== null) sidebar.scrollTop = Number(storedPosition);
  }, [activeHref]);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    const activeLink = sidebar?.querySelector<HTMLElement>('[data-active="true"]');

    if (!sidebar || !activeLink) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    if (linkRect.top < sidebarRect.top) sidebar.scrollTop -= sidebarRect.top - linkRect.top + 8;
    else if (linkRect.bottom > sidebarRect.bottom) sidebar.scrollTop += linkRect.bottom - sidebarRect.bottom + 8;
  }, [activeHref, openGroups]);

  function preserveScrollPosition() {
    const sidebar = sidebarRef.current;
    if (sidebar) window.sessionStorage.setItem(scrollStorageKey, String(sidebar.scrollTop));
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
      <nav className="grid gap-2 text-sm">
        <DocsGroups
          groups={navGroups}
          activeHref={activeHref}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          onNavigate={preserveScrollPosition}
          idPrefix={idPrefix}
        />
      </nav>
    </aside>
  );
}

export function MobileDocsNav({ items, groups, activeHref }: DocsNavigationProps) {
  const navGroups = groups ?? [{ title: "Docs", items }];
  const idPrefix = useId();
  const { openGroups, toggleGroup } = useOpenGroups(navGroups, activeHref);

  return (
    <details className="panel p-3 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-semibold text-white">
        <span className="flex items-center gap-2">
          <Menu className="h-4 w-4 text-sky-300" />
          Docs navigation
        </span>
        <X className="h-4 w-4 text-slate-500" />
      </summary>
      <nav className="mt-2 grid gap-2 text-sm">
        <DocsGroups
          groups={navGroups}
          activeHref={activeHref}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          idPrefix={idPrefix}
        />
      </nav>
    </details>
  );
}
