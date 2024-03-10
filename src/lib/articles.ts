import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'articles');

interface ArticleMeta {
  title: string;
  tags: string[];
  date: string;
}

interface ArticleData extends ArticleMeta {
  content: string;
  slug: string;
}

export function getArticleBySlug(slug: string): ArticleData {
  const fullPath = path.join(articlesDirectory, slug, 'index.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const data = matterResult.data as unknown as ArticleMeta;

  return { slug, ...data, content: matterResult.content };
}

export function getAllArticles(): ArticleData[] {
  const slugs = fs.readdirSync(articlesDirectory);
  const articles = slugs.map((slug) => getArticleBySlug(slug));

  return articles;
}
