import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";

export async function getStaticProps() {
  try {
    const files = fs.readdirSync("public/posts");

    const posts = files.map((fileName) => {
      const slug = fileName.replace(".md", "");
      const readFile = fs.readFileSync(`public/posts/${fileName}`, "utf-8");
      const { data: frontmatter } = matter(readFile);

      return {
        slug,
        frontmatter,
      };
    });

    return {
      props: { posts },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}

function Blog({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 md:p-0 mt-8">
      {posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <Link href={`/post/${slug}`} legacyBehaviour>
            <Image
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUP5pxDAAEawIUhORdgwAAAABJRU5ErkJggg=="
              placeholder="blur"
              // loading="lazy"
              width={650}
              height={340}
              alt={frontmatter.title}
              objectFit={"cover"}
              src={`/${frontmatter.socialImage}`}
            />

            <h1 className="p-4">{frontmatter.title}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Blog;
