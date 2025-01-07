import { MealCategory } from '@/app/interface/types'

interface TabContentProps {
  activeTab: string
  tabs: { id: string; title: string }[]
  mealTime: 'Almoço' | 'Jantar' | null
  setMealTime: (time: 'Almoço' | 'Jantar' | null) => void
  categories: MealCategory[]
  toggleFood: (food: string) => void
  selectedMeals: Record<string, Record<'Almoço' | 'Jantar', string[]>>
}

export default function TabContent({
  activeTab,
  tabs,
  mealTime,
  setMealTime,
  categories,
  selectedMeals,
  toggleFood,
}: TabContentProps) {
  const currentMeals = selectedMeals[activeTab] || { Almoço: [], Jantar: [] }

  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg shadow-lg p-6">
      {tabs.map(
        (tab) =>
          activeTab === tab.id && (
            <div key={tab.id} id={`${tab.id}Content`} className="tab-content">
              <h4 className="text-3xl font-bold text-gray-800 mb-8">
                {tab.title}
              </h4>

              {/* Seletor de Período */}
              <p className="text-lg font-medium text-gray-600 mb-4">
                Escolha o período:
              </p>
              <div className="flex space-x-4 mb-8">
                {['Almoço', 'Jantar'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setMealTime(time as 'Almoço' | 'Jantar')}
                    className={`px-6 py-3 rounded-lg font-medium shadow-sm ${
                      mealTime === time
                        ? 'bg-red-ufcat text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Refeições Selecionadas */}
              {mealTime && (
                <div className="mb-10">
                  <h5 className="text-xl font-semibold text-gray-700 mb-4">
                    Refeições Selecionadas ({mealTime})
                  </h5>
                  <div className="flex flex-wrap gap-4">
                    {currentMeals[mealTime].length > 0 ? (
                      currentMeals[mealTime].map((food) => (
                        <div
                          key={food}
                          className="flex items-center bg-green-ufcat hover:bg-orange-400 text-white px-4 py-2 rounded-full shadow-md"
                        >
                          <span>{food}</span>
                          <button
                            onClick={() => toggleFood(food)}
                            className="flex items-center justify-center ml-4 rounded-full text-white font-black py-2 px-4"
                          >
                            x
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        Nenhuma refeição selecionada.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Categorias de Refeições */}
              {categories.map((category) => (
                <div
                  key={category.category}
                  className="mb-6 border-t border-gray-300 pt-6"
                >
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">
                    {category.category}
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {category.foods.map((food) => (
                      <button
                        key={food}
                        onClick={() => toggleFood(food)}
                        className={`px-4 py-2 rounded-lg border shadow-sm ${
                          mealTime &&
                          selectedMeals[activeTab][mealTime].includes(food)
                            ? 'bg-orange-ufcat text-white border-orange-ufcat'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {food}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
      )}
    </div>
  )
}
