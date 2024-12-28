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
    <div className="w-full bg-white rounded-r-lg md:rounded-lg shadow-md p-6">
      {tabs.map(
        (tab) =>
          activeTab === tab.id && (
            <div key={tab.id} id={`${tab.id}Content`} className="tab-content">
              <h4 className="text-2xl mb-8 font-bold text-gray-600">
                {tab.title}
              </h4>
              <p>Selecione o período:</p>
              <div className="flex space-x-4 mt-4 mb-6">
                {['Almoço', 'Jantar'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setMealTime(time as 'Almoço' | 'Jantar')}
                    className={`px-4 py-2 rounded-lg text-white ${
                      mealTime === time
                        ? 'bg-blue-500'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {categories.map((category) => (
                <div key={category.category} className="mb-6">
                  <h5 className="text-md font-semibold text-gray-700 mb-2">
                    {category.category}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {category.foods.map((food) => (
                      <button
                        key={food}
                        onClick={() => toggleFood(food)}
                        className={`px-3 py-2 rounded-full border ${
                          mealTime &&
                          selectedMeals[activeTab][mealTime].includes(food)
                            ? 'bg-green-500 text-white border-green-500'
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
