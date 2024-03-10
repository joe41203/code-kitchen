import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import clsx from "clsx";
import Header from '@/feature/layout/header';
import Footer from "@/feature/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Kitchen",
  description: "Code Kitchen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className={clsx(inter.className, 'h-full bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="h-full flex flex-col">
            <Header/>
            <div className="flex-1 max-w-lg m-auto py-20 w-full">{children}</div>
            <Footer/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
