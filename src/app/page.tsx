'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import UpdateMenu from './(pages)/updateMenu/page'
import Layout from './components/Layout'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redireciona para /login se o usuário não estiver autenticado
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <p>Carregando...</p>
  }

  if (!user) {
    return null // Evita renderizar algo enquanto redireciona
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-ufcat">
      <Layout>
        <UpdateMenu />
      </Layout>
    </div>
  )
}
