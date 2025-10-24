import { courseDocs, courseMeta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import EditableDiv from "@/components/test"

interface CourseData {
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
}

interface CoursePageType {
  url: string;
  data: CourseData;
}

const courseSource = loader({
  baseUrl: "/posts",
  source: createMDXSource(courseDocs, courseMeta),
});


export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const allPages = courseSource.getPages() as CoursePageType[];
  const sortedCourses = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  // --- Pagination Logic ---
  const pageSize = 10; // You can adjust this value
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const startIndex = (currentPage - 1) * pageSize;
  // --- End Pagination Logic ---

  return (
    <div>
    {/* ... outros elementos da página */}
    <EditableDiv 
      initialContent="<h1>Título Editável</h1><p>Clique e edite. Use CTRL+B para <b>negrito</b>!</p>" 
    />
  </div>
  );
}