'use client'
import { useState } from 'react'

export default function UpdateMenu() {
  // Estado para rastrear a aba ativa
  const [activeTab, setActiveTab] = useState('segunda')

  // Dados para as abas
  const tabs = [
    { id: 'segunda', title: 'Segunda', content: 'Conteúdo da Segunda-feira.' },
    { id: 'terca', title: 'Terça', content: 'Conteúdo da Terça-feira.' },
    { id: 'quarta', title: 'Quarta', content: 'Conteúdo da Quarta-feira.' },
    { id: 'quinta', title: 'Quinta', content: 'Conteúdo da Quinta-feira.' },
    { id: 'sexta', title: 'Sexta', content: 'Conteúdo da Sexta-feira.' },
  ]

  return (
    <div className="font-sans p-4">
      {/* Abas */}
      <ul className="flex w-max border-b space-x-4 overflow-hidden">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tab text-center text-sm py-3 px-6 rounded-tl-2xl rounded-tr-2xl cursor-pointer ${
              activeTab === tab.id
                ? 'text-white font-bold bg-blue-600'
                : 'text-gray-600 font-semibold bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>

      {/* Conteúdo das abas */}
      <div className="mt-8">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div
                key={tab.id}
                id={`${tab.id}Content`}
                className="tab-content max-w-2xl"
              >
                <h4 className="text-lg font-bold text-gray-600">{tab.title}</h4>
                <p className="text-sm text-gray-600 mt-4">{tab.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  )
}
