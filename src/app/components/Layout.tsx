'use client'
import React from 'react'
import NavBar from './NavBar/NavBar'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-ufcat w-full min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Layout
