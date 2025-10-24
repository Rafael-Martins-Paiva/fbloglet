import { courseDocs, courseMeta } from "@/.source";
import { DocsBody } from "fumadocs-ui/page";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditableDiv from "@/components/test"

interface PageProps {
  params: Promise<{ slug: string }>;
}

const courseSource = loader({
  baseUrl: "/posts",
  source: createMDXSource(courseDocs, courseMeta),
});

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const page = courseSource.getPage([slug]);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
<div>
      {/* ... outros elementos da página */}
      <EditableDiv 
        initialContent="<h1>Título Editável</h1><p>Clique e edite. Use CTRL+B para <b>negrito</b>!</p>" 
      />
    </div>
  );
}
