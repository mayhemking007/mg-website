import { notFound } from "next/navigation";
import { DocsArticle } from "@/components/docs";
import { getDocPage, getDocSlugs } from "@/lib/docs";

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({
    slug: slug.split("/"),
  }));
}

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getDocPage(slug.join("/"));

  if (!page) {
    notFound();
  }

  return <DocsArticle page={page} />;
}
