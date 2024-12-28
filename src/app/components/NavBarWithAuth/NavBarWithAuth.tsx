'use client' // Diretriz para garantir que o código seja executado no lado do cliente

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import NavBar from '@/app/components/NavBar/NavBar'

function NavBarWithAuth() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Garantir que o código só seja executado no lado do cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Não renderiza nada até que o componente esteja montado no cliente
  if (!mounted) {
    return null
  }

  return user ? <NavBar /> : null
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarWithAuth />
      {children}
    </>
  )
}
