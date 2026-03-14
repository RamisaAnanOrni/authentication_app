import "./globals.css"
import Header from "@/components/Header"

export const metadata = {
  title: "AgriCore",
  description: "Authentication System"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>

        <Header />

        {children}

      </body>
    </html>
  )
}