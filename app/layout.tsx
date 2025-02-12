import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Site Islamique",
  description: "Lecture du Coran et des 99 noms d'Allah",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navigation />
        <main className="relative z-10 bg-[#f8f9fa] min-h-screen pt-16">{children}</main>
      </body>
    </html>
  )
}

