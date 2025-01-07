import React from "react"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"
import { Footer, Header } from "@/components/layout"
import { ReactQueryProvider } from "@/providers/ReactQuery"
import type { Metadata } from "next"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Galeria de Fotos",
  description: "Galeria de fotos com Next.js e Tailwind CSS",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
