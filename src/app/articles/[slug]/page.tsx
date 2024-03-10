import { readdir } from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug } from '@/lib/articles';


type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  return (
    <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </article>
  );
}

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), 'articles');
  const dirs = await readdir(articlesDir, { withFileTypes: true });
  const slugs = dirs.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
  return slugs.map((slug) => ({ slug }));
}
