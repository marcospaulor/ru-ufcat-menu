import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Texto de Loading */}
        <p className="mt-4 text-gray-600 font-semibold">Carregando...</p>
      </div>
    </div>
  )
}
