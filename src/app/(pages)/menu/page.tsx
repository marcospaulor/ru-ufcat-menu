import { useEffect, useState } from 'react'
import { firestoreService } from '@/app/services/FirestoreServices' // Substitua pelo caminho correto da configuração do Firebase

interface MenuData {
  [day: string]: {
    almoco: Record<string, string>
    janta: Record<string, string>
  }
}

const orderedDays: Record<
  | 'segunda-feira'
  | 'terca-feira'
  | 'quarta-feira'
  | 'quinta-feira'
  | 'sexta-feira',
  string
> = {
  'segunda-feira': 'Segunda-feira',
  'terca-feira': 'Terça-feira',
  'quarta-feira': 'Quarta-feira',
  'quinta-feira': 'Quinta-feira',
  'sexta-feira': 'Sexta-feira',
}

const Cardapio = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const doc = await firestoreService.getDocument('ru', 'menu')
        setMenuData(doc || {})
      } catch (error) {
        console.error('Erro ao carregar cardápio:', error)
        setMenuData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Carregando...</div>
  }

  if (!menuData) {
    return (
      <div className="text-center mt-10 text-red-500">
        Não foi possível carregar o cardápio.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Cardápio da Semana
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(orderedDays)
          .filter((day) => menuData[day]) // Garante que somente os dias com dados sejam exibidos
          .map((day) => (
            <div
              key={day}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 p-8 border-t-4 border-orange-ufcat"
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {orderedDays[day as keyof typeof orderedDays]}
              </h2>
              {['almoco', 'janta'].map((mealTime) => (
                <div key={mealTime} className="mb-6">
                  <h3 className="text-lg font-semibold text-orange-ufcat uppercase">
                    {mealTime === 'almoco' ? 'Almoço' : 'Jantar'}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {Object.entries(
                      menuData[day][mealTime as 'almoco' | 'janta']
                    ).map(([category, description], index, array) => (
                      <div key={category}>
                        <li className="flex flex-col items-start text-gray-600">
                          <span className="mr-2 font-semibold text-green-ufcat capitalize">
                            {category.replace('_', ' ')}:
                          </span>
                          <span>{description}</span>
                        </li>
                        {/* Adiciona uma linha divisória entre os atributos, exceto o último */}
                        {index < array.length - 1 && (
                          <hr className="my-3 border-t border-gray-200" />
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Cardapio
