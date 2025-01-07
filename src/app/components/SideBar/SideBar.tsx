'use client'
import Link from 'next/link'

interface SideBarProps {
  sideBarOpen: boolean
  toggleSideBar: () => void
  onLogout: () => void
}

const SideBar: React.FC<SideBarProps> = ({
  sideBarOpen,
  toggleSideBar,
  onLogout,
}) => {
  return (
    <>
      {/* Fundo clicável para fechar o SideBar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          sideBarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSideBar} // Fecha o SideBar ao clicar fora
      ></div>
      <nav
        className={`${
          sideBarOpen ? 'block' : 'hidden'
        } bg-green-ufcat text-white shadow-lg h-screen fixed top-0 left-0 min-w-[240px] py-6 px-4 overflow-auto z-50`}
      >
        <ul>
          <li className="mb-10">
            <Link href="/">
              <img
                src="/images/logo_completa.png"
                alt="logo"
                className="w-36"
              />
            </Link>

            {/* Icons X to close */}
            <button
              type="button"
              className="absolute top-6 right-6"
              onClick={toggleSideBar}
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
          </li>
          <li>
            <Link
              href="/"
              className=" hover:text-white text-[15px] block hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={toggleSideBar}
            >
              Cardápio
            </Link>
          </li>
          <li>
            <Link
              href="update_menu"
              className=" hover:text-white text-[15px] block hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={toggleSideBar}
            >
              Atualizar Cardápio
            </Link>
          </li>

          <li>
            <Link
              href="add_food"
              className=" hover:text-white text-[15px] block hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={toggleSideBar}
            >
              Cadastrar Alimentos
            </Link>
          </li>

          <li>
            <Link
              href="rating"
              className=" hover:text-white text-[15px] block hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={toggleSideBar}
            >
              Avaliações
            </Link>
          </li>
          {/* divisa */}
          <hr className="border-b-0 my-4" />
          <li>
            <Link
              href="help"
              className=" hover:text-white text-[15px] block hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={toggleSideBar}
            >
              Ajuda
            </Link>
          </li>
          <li>
            <Link
              href="login"
              className=" hover:text-white text-[15px] block hover:bg-orange-ufcat rounded px-4 py-2.5 transition-all"
              onClick={onLogout}
            >
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default SideBar
