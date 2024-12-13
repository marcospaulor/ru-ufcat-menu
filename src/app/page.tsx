'use client'
import Login from './pages/Login/Login'
import UpdateMenu from './pages/UpdateMenu/UpdateMenu'

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <UpdateMenu />
      </div>
    </>
  )
}
