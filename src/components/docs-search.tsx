"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { DocSearchRecord } from "@/lib/docs/search";

type RankedResult = DocSearchRecord & {
  excerpt: string;
  score: number;
};

const resultLimit = 8;

export function DocsSearch({
  records,
  onNavigate,
  overlay = false,
  focusWhen = false,
}: {
  records: DocSearchRecord[];
  onNavigate?: () => void;
  overlay?: boolean;
  focusWhen?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const results = useMemo(() => rankRecords(records, query), [query, records]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!focusWhen) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [focusWhen]);

  function navigate() {
    setIsOpen(false);
    onNavigate?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && isOpen && results[activeIndex]) {
      event.preventDefault();
      document.getElementById(`${listboxId}-${activeIndex}`)?.click();
    } else if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  const showResults = isOpen && query.trim().length > 0;

  return (
    <div ref={rootRef} className="relative">
      <label className="sr-only" htmlFor={`${listboxId}-input`}>Search documentation</label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <input
          ref={inputRef}
          id={`${listboxId}-input`}
          type="search"
          value={query}
          placeholder="Search docs..."
          autoComplete="off"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={showResults ? listboxId : undefined}
          aria-activedescendant={showResults && results[activeIndex] ? `${listboxId}-${activeIndex}` : undefined}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="docs-search-input w-full rounded-md border border-white/10 bg-black/20 py-2.5 pl-9 pr-16 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-2 focus:ring-sky-300/10"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
        {!query ? (
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-sans text-[10px] text-slate-500 lg:block">
            ⌘K
          </kbd>
        ) : null}
      </div>

      {showResults ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Documentation search results"
          className={`docs-search-results ${overlay ? "absolute left-0 right-0 top-full" : ""} mt-2 max-h-[min(70vh,560px)] overflow-y-auto rounded-md`}
        >
          {results.length ? (
            results.map((result, index) => (
              <Link
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                key={result.id}
                href={result.href}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={navigate}
                className="docs-search-result block border-b border-white/[0.06] px-3 py-2.5 last:border-b-0"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0 text-sm font-medium text-slate-100">{highlight(result.title, query)}</span>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-slate-500">{result.category}</span>
                </span>
                <SearchBreadcrumb result={result} query={query} />
                {result.excerpt ? (
                  <span className="mt-1 block text-xs leading-5 text-slate-400">{highlight(result.excerpt, query)}</span>
                ) : null}
              </Link>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-slate-400">
              No results for <span className="text-slate-200">“{query.trim()}”</span>. Try a shorter or broader term.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function rankRecords(records: DocSearchRecord[], rawQuery: string): RankedResult[] {
  const query = normalize(rawQuery);
  if (!query) return [];

  const terms = query.split(" ");

  return records
    .map((record) => {
      const title = normalize(record.title);
      const pageTitle = normalize(record.pageTitle);
      const path = normalize(record.path.join(" "));
      const content = normalize(record.content);
      let score = 0;

      if (title === query) score += 200;
      if (title.startsWith(query)) score += 120;
      if (title.includes(query)) score += 80;
      if (pageTitle.includes(query)) score += 45;
      if (path.includes(query)) score += 35;
      if (content.includes(query)) score += 25;

      for (const term of terms) {
        if (title.includes(term)) score += 18;
        if (pageTitle.includes(term)) score += 10;
        if (path.includes(term)) score += 8;
        if (content.includes(term)) score += 4;
        else score -= 8;
      }

      return {
        ...record,
        score,
        excerpt: makeExcerpt(record.content, terms),
      };
    })
    .filter((record) => record.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, resultLimit);
}

function SearchBreadcrumb({ result, query }: { result: RankedResult; query: string }) {
  const path = result.title === result.pageTitle ? result.path.slice(1, -1) : result.path.slice(1);
  if (!path.length) return null;

  return (
    <span className="mt-1 flex min-w-0 items-center gap-1 overflow-hidden text-xs text-sky-300/80">
      {path.map((part, index) => (
        <span key={`${part}-${index}`} className="contents">
          {index > 0 ? <span className="shrink-0 text-slate-600" aria-hidden="true">›</span> : null}
          <span className="truncate">{highlight(part, query)}</span>
        </span>
      ))}
    </span>
  );
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[`_*()[\]{}]/g, " ").replace(/\s+/g, " ").trim();
}

function makeExcerpt(content: string, terms: string[]) {
  const compact = content.replace(/\s+/g, " ").trim();
  if (!compact) return "";

  const normalized = compact.toLowerCase();
  const positions = terms.map((term) => normalized.indexOf(term)).filter((position) => position >= 0);
  const matchPosition = positions.length ? Math.min(...positions) : 0;
  const start = Math.max(0, matchPosition - 45);
  const end = Math.min(compact.length, start + 130);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < compact.length ? "…" : "";

  return `${prefix}${compact.slice(start, end).trim()}${suffix}`;
}

function highlight(text: string, rawQuery: string) {
  const terms = normalize(rawQuery).split(" ").filter(Boolean);
  if (!terms.length) return text;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    terms.includes(part.toLowerCase())
      ? <mark key={`${part}-${index}`} className="bg-transparent font-semibold text-emerald-200">{part}</mark>
      : part
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
