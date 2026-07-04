import { DocsArticle } from "@/components/docs";
import { getDocPage } from "@/lib/docs";

export default function DocsPage() {
  const page = getDocPage("");

  if (!page) {
    return null;
  }

  return <DocsArticle page={page} />;
}
