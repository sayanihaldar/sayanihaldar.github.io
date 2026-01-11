import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Sayani Haldar | Digital Marketing & Business Analyst",
  description: "Portfolio of Sayani Haldar - Digital Marketing Specialist, Business Analyst, and Creative Artist."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://s.pageclip.co/v1/pageclip.css"
          media="screen"
        />
        <link rel="icon" href="/img-favicon.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
      <script async src="https://s.pageclip.co/v1/pageclip.js"></script>
    </html>
  )
}
