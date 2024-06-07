import type { Metadata } from "next"
// import { Inter } from 'next/font/google'
import "../globals.css"

// import Nav from '@/components/nav'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Hillmed Admin",
  description: "Hillmed Admin - Description",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // <div className={`w-full min-h-[50vw] flex flex-col justify-center items-center theme-dark`}>
  //   <div className={'w-auto'}></div>
  // </div>
  return (
    <div className={`w-full min-h-[50vw] flex flex-col theme-dark`}>
      {children}
    </div>
  )
}
