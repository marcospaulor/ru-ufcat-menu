'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import ProfileDropdown from '@/app/components/ProfileDropdown/ProfileDropdown'
import SideBar from '@/app/components/SideBar/SideBar'
import { useLogout } from '@/app/hooks/useLogout'
import Image from 'next/image'

const NavBar: React.FC = () => {
  const [SideBarOpen, setSideBarOpen] = useState(false)
  const [ProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string>('/') // Estado para o link ativo
  const handleLogout = useLogout()

  const toggleSideBar = () => {
    setSideBarOpen((prev) => !prev)
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev)
  }

  return (
    <header
      className="flex shadow-md py-3 px-4 sm:px-10 bg-green-ufcat min-h-[70px] tracking-wide relative"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo_completa.png"
            width={1000}
            height={1000}
            alt="logo"
            className="w-36"
            priority
          />
        </Link>
        <ul className="hidden lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
          {[
            { href: '/', label: 'Cardápio' },
            { href: 'update_menu', label: 'Atualizar Cardápio' },
            { href: 'add_food', label: 'Cadastrar Alimentos' },
            { href: 'rating', label: 'Avaliações' },
          ].map((link) => (
            <li
              key={link.href}
              className={`max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:after:absolute lg:after:bg-white lg:after:transition-all lg:after:duration-300 ${
                activeLink === link.href
                  ? 'lg:after:w-full lg:after:h-[2px]' // Estilo para o link ativo
                  : 'lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:w-0' // Estilo para o link inativo
              }`}
            >
              <Link
                href={link.href}
                onClick={() => setActiveLink(link.href)} // Define o link ativo
                className={`text-[15px] block text-white`} // Classe de cor para o link ativo
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center max-sm:ml-auto space-x-6">
          <ul>
            <li className="relative hidden lg:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                className="cursor-pointer fill-white hover:fill-orange-ufcat"
                onClick={toggleProfileDropdown}
                viewBox="0 0 512 512"
              >
                <path d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z" />
              </svg>
              <ProfileDropdown
                isOpen={ProfileDropdownOpen}
                toggleDropdown={toggleProfileDropdown}
                onLogout={handleLogout}
              />
            </li>
          </ul>
          <div>
            {/* Botão para abrir o SideBar */}
            <button
              id="toggleOpen"
              onClick={toggleSideBar}
              className="lg:hidden"
            >
              <svg className="w-7 h-7" fill="#fff" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {/* Componente SideBar */}
            <SideBar
              sideBarOpen={SideBarOpen}
              toggleSideBar={toggleSideBar}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
