import React from 'react';
import { ThemeToogle } from '@/theme/theme-toogle';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex p-4 items-center place-content-between fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black">
      <div className="flex items-center gap-4">
        <Link href={'/articles'}>
          <Image src={'/code-kitchen/leo.webp'} alt={'logo'} width={'36'} height={'36'} />
        </Link>
        <Link href={'/articles'}>
          <div className="prose dark:prose-invert">CodeKichen</div>
        </Link>
      </div>
      <ThemeToogle />
    </header>
  );
}
