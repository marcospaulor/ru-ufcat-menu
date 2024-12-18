'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'

function Login() {
  const { login } = useAuth()
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    // Verifica se existe um e-mail salvo no localStorage
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true) // Marca a opção como selecionada
    }
  }, [])

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const visibilityHandle = passwordVisible ? 'text' : 'password'

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
    if (!rememberMe) {
      // Salva o e-mail no localStorage
      localStorage.setItem('rememberedEmail', email)
    } else {
      // Remove o e-mail do localStorage
      localStorage.removeItem('rememberedEmail')
    }
  }

  const handleSubmit = async () => {
    try {
      if (rememberMe) {
        // Garante que o e-mail será salvo caso "Lembrar" esteja marcado
        localStorage.setItem('rememberedEmail', email)
      }
      await login(email, password) // Chama a função de login com os valores de e-mail e senha
      console.log('Login efetuado com sucesso!')
      router.replace('/') // Redireciona para a página inicial
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao efetuar login:', error.message)
      } else {
        console.error('Erro ao efetuar login:', error)
      }
    }
  }

  return (
    <div className="bg-green-ufcat w-full">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full mt-10 lg:mt-2">
          <a href="javascript:void(0)">
            <img
              src="/images/logo_completa.png"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Log in
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Usuário (E-mail)
                </label>
                <div className="relative flex items-center">
                  <input
                    name="e-mail"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Insira o e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={visibilityHandle}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Insira a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={togglePasswordVisibility}
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-orange-ufcat border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={handleRememberMe} // Atualiza o estado do "Lembrar"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Lembrar
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-ufcat hover:bg-orange-600 focus:outline-none"
                  onClick={handleSubmit} // Chama a função de login
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
