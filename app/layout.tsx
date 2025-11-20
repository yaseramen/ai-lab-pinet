import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { MobileNav } from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/lib/language-context"

export const metadata: Metadata = {
  title: "Made with App Studio",
  description: "Multilingual AI toolkit for writing, images, coding, and translation — powered by Pi Network.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <LanguageProvider>
          {children}
          <MobileNav />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
