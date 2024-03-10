import React from 'react'
import { ThemeToogle } from '@/theme/theme-toogle';
import Image from "next/image"

export default function Header() {
  return (
    <header className="flex p-4 items-center place-content-between">
      <div className="flex items-center gap-4">
        <Image src={"/leo.webp"} alt={"logo"} width={"36"} height={"36"}/>
        <div>CodeKichen</div>
      </div>
      <ThemeToogle/>
    </header>
  )
}
