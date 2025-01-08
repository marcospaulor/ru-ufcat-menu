'use client'

import Link from 'next/link'

interface ProfileDropdownProps {
  isOpen: boolean
  toggleDropdown: () => void
  onLogout: () => void
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  toggleDropdown,
  onLogout,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Fundo clicável para fechar o ProfileDropdown */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleDropdown} // Fecha o dropdown ao clicar fora
      ></div>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } bg-green-ufcat text-white shadow-lg py-6 px-6 rounded sm:min-w-[320px] max-sm:min-w-[250px] absolute right-4 top-14 z-50`}
      >
        <div className="flex justify-between items-center">
          <h5 className="text-sm font-bold">Bem-vindo(a), [USUÁRIO]</h5>

          <button
            type="button"
            className="bg-transparent hover:text-orange-ufcat rounded px-2 py-1 text-white transition-colors"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <hr className="border-b-0 my-4" />
        <ul className="space-y-3">
          <li>
            <Link
              href="help"
              className="block text-sm hover:text-white hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={toggleDropdown}
            >
              Ajuda
            </Link>
          </li>
          <li>
            <Link
              href="login"
              className="block text-sm hover:text-white hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={onLogout}
            >
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ProfileDropdown
