import { courseDocs, courseMeta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { Suspense } from "react";
import { BlogCard } from "@/components/blog-card"; 
import PaginationComponent462 from "@/components/comp-462";

interface CourseData {
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
  thumbnail?: string;
}

interface CoursePageType {
  url: string;
  data: CourseData;
}

const courseSource = loader({
  baseUrl: "/courses",
  source: createMDXSource(courseDocs, courseMeta),
});

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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

  // --- Pagination Logic --- //
  const pageSize = 10; 
  const totalItems = sortedCourses.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);
const DEFAULT_THUMBNAIL_URL = "/thumbnails/nextjs-portfolio-templates.jpg";

  return (
    <div className="min-h-screen bg-background relative">
      <div className="p-6 flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Our Courses
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Learn new skills with our comprehensive video courses and articles.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading courses...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden`}
          >
            {paginatedCourses.map((course) => {
              const date = new Date(course.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={course.url}
                  url={course.url}
                  title={course.data.title}
                  description={course.data.description}
                  date={formattedDate}
                  thumbnail={course.data.thumbnail ?? DEFAULT_THUMBNAIL_URL}
                />
              );
            })}
          </div>
        </Suspense>
        <div className="flex justify-center w-full mt-8">
          <PaginationComponent462 currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}