import { existsSync, readdirSync } from "fs";

import { PageProps as NextPageProps } from "@/.next/types/app/[...slug]/page";
import { join } from "path";
import { notFound } from "next/navigation";

export default async function Page({ params }: NextPageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  const filePath = join(process.cwd(), "app/content", `${path}.mdx`);
  if (!existsSync(filePath)) {
    notFound();
  }

  try {
    const file = await import(`@/app/content/${path}.mdx`);
    const Content = file.default;
    console.log(file.metadata.title);
    return <Content />;
  } catch (e) {
    notFound();
  }
}
