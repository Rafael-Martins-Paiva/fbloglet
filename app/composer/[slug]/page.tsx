import { courseDocs, courseMeta } from "@/.source";
import { DocsBody } from "fumadocs-ui/page";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const courseSource = loader({
  baseUrl: "/composer",
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
    <div className="min-h-screen bg-background relative">
      <div className="space-y-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6">
              <Link href="/courses">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all courses</span>
              </Link>
            </Button>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {page.data.title}
          </h1>

          {page.data.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              {page.data.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <main className="w-full p-0 overflow-hidden">
          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
              <DocsBody>
                <MDX />
              </DocsBody>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
