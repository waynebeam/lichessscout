import './globals.css'
import Header from './header'
import Footer from './Footer'

export const metadata = {
  title: 'Lichess Scout by waynebeam.net',
  description: 'A tool to scout out your next Lichess opponent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
