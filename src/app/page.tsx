'use client'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import UpdateMenu from '@/app/(pages)/update_menu/page'
import LoadingScreen from './components/Loading/Loading'

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
    return <LoadingScreen />
  }

  if (!user) {
    return null // Evita renderizar algo enquanto redireciona
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-ufcat">
      <UpdateMenu />
    </div>
  )
}
