import type { ReactNode } from "react";
import { DocsHeader } from "@/components/docs-header";
import { DocsSidebar, MobileDocsNav } from "@/components/site";
import { docsNavGroups, docsNavItems } from "@/lib/docs";
import { docsSearchIndex } from "@/lib/docs/search";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="site-shell">
      <DocsHeader searchRecords={docsSearchIndex} />

      <div className="docs-layout mx-auto grid max-w-[1680px] gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-8 xl:grid-cols-[250px_minmax(0,1fr)_220px] xl:gap-16">
        <div>
          <DocsSidebar groups={docsNavGroups} items={docsNavItems} />
          <MobileDocsNav groups={docsNavGroups} items={docsNavItems} />
        </div>

        {children}
      </div>
    </main>
  );
}
