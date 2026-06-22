import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "RoamMate - Find Your Perfect Caravan Spot",
  description: "Australia's peer-to-peer caravan and RV camping marketplace",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
