import type { Metadata } from "next"
import "./globals.css"

import { AppStoreProvider } from "@/store/app-provider"
import { ThemeProvider } from "@mui/material/styles"
import theme from "@/app/theme"

import Nav from "@/components/nav/nav"
import Footer from "@/components/footer/footer"

import { inter, lato } from "@/app/fonts"

// import { Inter } from "next/font/google"
// import { Lato } from "next/font/google"

// const inter = Inter({ subsets: ["latin"] })
// const lato = Lato({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["100", "300", "400", "700", "900"],
//   //👇 Add variable to our object
//   variable: "--font-lato",
// })

// mains

export const metadata: Metadata = {
  title: "Hillmed",
  description: "Hillmed - Description",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body id="main-body"
        className={`${inter.className} ${lato.className} font-lato relative`}
      >
        <AppStoreProvider>
          <ThemeProvider theme={theme}>
            <Nav />
            <main className="flex flex-col items-center">
              {/* <div className="w-full p-4 bg-slate-200">App Layout</div>
            <hr /> */}
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AppStoreProvider>
      </body>
    </html>
  )
}
