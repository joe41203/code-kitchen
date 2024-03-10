import { compileMDX } from 'next-mdx-remote/rsc';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), 'articles', `${slug}.mdx`);
  const source = await readFile(filePath, 'utf8');
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      {content}
    </article>
  );
}

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), 'articles');
  const files = await readdir(articlesDir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}
