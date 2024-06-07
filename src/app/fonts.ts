import { Inter } from "next/font/google"
import { Lato } from "next/font/google"

export const inter = Inter({ subsets: ["latin"] })
export const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  //👇 Add variable to our object
  variable: "--font-lato",
})