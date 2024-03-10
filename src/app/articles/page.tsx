import Link from 'next/link';
import { readdir } from 'fs/promises';
import path from 'path';

export default async function Page() {
  const articlesDir = path.join(process.cwd(), 'articles');
  const files = await readdir(articlesDir);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>ブログ記事一覧</h1>
        <ul>
          {files.map((file) => (
            <li key={file}>
              <Link href={`/articles/${file.replace(/\.mdx?$/, '')}`}>
                {file.replace(/\.mdx?$/, '')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
