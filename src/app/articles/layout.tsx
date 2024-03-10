import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Code Kitchen',
  description: 'Code Kitchen',
};

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-5 justify-center ">
      <div className="px-10 w-4/4">{children}</div>
      <div className="px-10 w-1/4">
        <div className="flex flex-col items-center gap-5">
          <div className="profile flex flex-col gap-5 items-center">
            <Image src={'/leo.webp'} alt={'logo'} width={'250'} height={'250'} />
            <p>web developer</p>
          </div>
          <div className="pr">
          </div>
        </div>
      </div>
    </div>
  );
}
