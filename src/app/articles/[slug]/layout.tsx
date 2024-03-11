import type { Metadata } from 'next';
import Image from 'next/image';

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
    <div className='flex flex-col md:flex-row md:px-10'>
      <div className="article w-full flex justify-center p-5 md:w-3/4">{children}</div>
      <div className="sidebar w-full p-5 flex flex-col gap-3 md:w-1/4">
        <div className="profile w-full flex flex-col items-center">
          <Image src={'/code-kitchen/leo.webp'} alt={'logo'} width={250} height={250} className='m-0'/>
          <p>Web Developer</p>
        </div>
        <div className="pr"></div>
      </div>
    </div>
  );
}
