import { Metadata } from "next";
import { courseDocs, courseMeta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { siteConfig } from "@/lib/site";

const courseSource = loader({
  baseUrl: "/courses",
  source: createMDXSource(courseDocs, courseMeta),
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Course Not Found",
        description: "The requested course could not be found.",
      };
    }

    const page = courseSource.getPage([slug]);

    if (!page) {
      return {
        title: "Course Not Found",
        description: "The requested course could not be found.",
      };
    }

    const ogUrl = `${siteConfig.url}/courses/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;

    return {
      title: page.data.title,
      description: page.data.description,
      keywords: [
        page.data.title,
        "Course",
        "Video Tutorial",
        "Learning",
        "Education",
        "Web Development",
        "Programming",
        "Technology",
        "Software Engineering",
      ],
      creator: "Bloglet",
      publisher: "Bloglet",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: page.data.title,
        description: page.data.description,
        type: "article",
        url: ogUrl,
        publishedTime: page.data.date,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: page.data.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: page.data.title,
        description: page.data.description,
        images: [ogImage],
        creator: "@dillionverma",
        site: "@dillionverma",
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }
}
