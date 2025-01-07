import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import NavBarWithAuth from './components/NavBarWithAuth/NavBarWithAuth'

export const metadata: Metadata = {
  title: 'Cardápio Serviços UFCAT - Admin',
  description: 'Sistema de gerenciamento de cardápio para os serviços da UFCAT',
}

const rawline = localFont({ src: '/fonts/rawline-500.ttf' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${rawline.className} bg-gray-ufcat`}>
        <AuthProvider>
          <NavBarWithAuth>
            <main className="flex flex-1 justify-center">{children}</main>
          </NavBarWithAuth>
        </AuthProvider>
      </body>
    </html>
  )
}
