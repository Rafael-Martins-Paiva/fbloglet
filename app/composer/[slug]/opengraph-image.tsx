import { ImageResponse } from "next/og";
import { courseDocs, courseMeta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

export const runtime = "nodejs";
export const alt = "Course";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const courseSource = loader({
  baseUrl: "/courses",
  source: createMDXSource(courseDocs, courseMeta),
});

const getAssetData = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const assetUrls = {
      clashDisplay: `${baseUrl}/fonts/ClashDisplay-Semibold.ttf`,
      cabinetGrotesk: `${baseUrl}/fonts/CabinetGrotesk-Medium.ttf`,
      logo: `${baseUrl}/magicui-logo.png`,
    };

    const fetchPromises = [
      fetch(assetUrls.clashDisplay),
      fetch(assetUrls.cabinetGrotesk),
      fetch(assetUrls.logo),
    ];

    const responses = await Promise.all(fetchPromises);
    const [clashDisplayRes, cabinetGroteskRes, logoRes] = responses;

    if (!clashDisplayRes.ok || !cabinetGroteskRes.ok || !logoRes.ok) {
      return null;
    }

    const assetPromises = [
      clashDisplayRes.arrayBuffer(),
      cabinetGroteskRes.arrayBuffer(),
      logoRes.arrayBuffer(),
    ];

    const assetBuffers = await Promise.all(assetPromises);
    const [clashDisplay, cabinetGrotesk, logoImage] = assetBuffers;

    const logoBase64 = `data:image/png;base64,${Buffer.from(logoImage).toString(
      "base64"
    )}`;

    return {
      clashDisplay,
      cabinetGrotesk,
      logoBase64,
    };
  } catch (error) {
    console.error("Error loading assets:", error);
    return null;
  }
};

const styles = {
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "40px",
  },
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    border: "4px solid black",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "60px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "20px",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: "40px",
    fontWeight: 700,
    color: "black",
    lineHeight: 1.2,
    marginBottom: "10px",
    letterSpacing: "0.5px",
  },
  summary: {
    fontSize: "25px",
    fontWeight: 500,
    color: "#4A4A4A",
    lineHeight: 1.5,
    letterSpacing: "0.5px",
  },
  metaContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    alignItems: "center",
  },
  metaBase: {
    fontSize: "19px",
    fontWeight: 500,
    lineHeight: 1.4,
    padding: "4px 0px",
  },
  dateMeta: {
    color: "black",
  },
} as const;

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const page = await courseSource.getPage([params.slug]);

    if (!page) {
      return new Response("Course not found", { status: 404 });
    }

    const assetData = await getAssetData();

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return new ImageResponse(
      (
        <div
          style={{
            ...styles.wrapper,
            fontFamily: assetData ? "Clash Display" : "system-ui",
          }}
        >
          <div style={styles.container}>
            <div style={styles.titleContainer}>
              <img
                src={
                  assetData?.logoBase64 ||
                  `${process.env.NEXT_PUBLIC_SITE_URL}/magicui-logo.png`
                }
                alt="MagicUI Logo"
                width={80}
                height={80}
                style={styles.logo}
              />
              <h1 style={styles.title}>{page.data.title}</h1>
              {page.data.description && (
                <p style={styles.summary}>{page.data.description}</p>
              )}
            </div>
            <div style={styles.metaContainer}>
              {page.data.date && (
                <p style={{ ...styles.metaBase, ...styles.dateMeta }}>
                  {formatDate(page.data.date)}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: size.width,
        height: size.height,
        fonts: assetData
          ? [
              {
                name: "Clash Display",
                data: assetData.clashDisplay,
                weight: 500,
                style: "normal",
              },
              {
                name: "Cabinet Grotesk",
                data: assetData.cabinetGrotesk,
                weight: 500,
                style: "normal",
              },
            ]
          : undefined,
      }
    );
  } catch (error) {
    return new Response(
      `Failed to generate image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      {
        status: 500,
      }
    );
  }
}
