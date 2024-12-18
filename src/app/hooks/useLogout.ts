'use client'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const { logout } = useAuth() // Acessa a função logout do contexto de autenticação
  const router = useRouter()

  const handleLogout = async () => {
    logout() // Chama o método de logout
    router.replace('/login') // Redireciona para a página de login
  }

  return handleLogout
}
