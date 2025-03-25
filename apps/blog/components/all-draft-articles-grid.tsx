import Image from "next/image";
import Link from "next/link";
import { readdirSync } from "fs";

const basePath = "app/content/drafts";
const blurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUP5pxDAAEawIUhORdgwAAAABJRU5ErkJggg==";

export default async function AllDraftArticlesGrid() {
  const files = readdirSync(basePath);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
      {files.map(async (fileName) => {
        const { metadata } = await import(`@/app/content/drafts/${fileName}`);
        return (
          <Link key={fileName} href={`/drafts/${fileName.replace(".mdx", "")}`}>
            <div>
              <Image
                blurDataURL={blurDataURL}
                placeholder="blur"
                loading="lazy"
                alt={metadata.title}
                src={`/${metadata.socialImage}`}
                sizes="250px"
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
                width={0}
                height={0}
              />
              <h4>{metadata.title}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
