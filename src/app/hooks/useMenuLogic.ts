import { useState, useEffect } from 'react'
import { Food } from '@/app/interface/types'
import useFoods from './useFoods'
import { MealCategory } from '@/app/interface/types'
import { firestoreService } from '@/app/services/FirestoreServices'

type MealTime = 'Almoço' | 'Jantar'

export function useMenuLogic() {
  const { foods } = useFoods() // Assumindo que useFoods retorna um objeto com 'foods'
  const [activeTab, setActiveTab] = useState('segunda-feira')
  const [mealTime, setMealTime] = useState<MealTime | null>(null)
  const [selectedMeals, setSelectedMeals] = useState<
    Record<string, Record<MealTime, string[]>>
  >({
    'segunda-feira': { Almoço: [], Jantar: [] },
    'terca-feira': { Almoço: [], Jantar: [] },
    'quarta-feira': { Almoço: [], Jantar: [] },
    'quinta-feira': { Almoço: [], Jantar: [] },
    'sexta-feira': { Almoço: [], Jantar: [] },
  })

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const [categories, setCategories] = useState<MealCategory[]>([])

  const tabs = [
    { id: 'segunda-feira', title: 'Segunda-feira' },
    { id: 'terca-feira', title: 'Terça-feira' },
    { id: 'quarta-feira', title: 'Quarta-feira' },
    { id: 'quinta-feira', title: 'Quinta-feira' },
    { id: 'sexta-feira', title: 'Sexta-feira' },
  ]

  useEffect(() => {
    if (foods.length > 0) {
      const uniqueCategories = new Set<string>()
      const allFoods = new Map<string, string[]>()

      foods.forEach((food: Food) => {
        uniqueCategories.add(food.category)
        if (!allFoods.has(food.category)) allFoods.set(food.category, [])
        allFoods.get(food.category)?.push(food.name)
      })

      setCategories(
        Array.from(uniqueCategories).map((category) => ({
          category,
          foods: allFoods.get(category) || [],
        }))
      )
    }
  }, [foods]) // Este efeito será recalculado sempre que 'foods' mudar

  const toggleFood = (food: string) => {
    if (!mealTime) {
      setIsAlertModalOpen(true)
      return
    }
    setSelectedMeals((prev) => {
      const currentSelection = prev[activeTab][mealTime]
      const isSelected = currentSelection.includes(food)

      const updatedSelection = isSelected
        ? currentSelection.filter((item) => item !== food)
        : [...currentSelection, food]

      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [mealTime]: updatedSelection,
        },
      }
    })
  }

  const clearSelection = () => {
    setSelectedMeals({
      'segunda-feira': { Almoço: [], Jantar: [] },
      'terca-feira': { Almoço: [], Jantar: [] },
      'quarta-feira': { Almoço: [], Jantar: [] },
      'quinta-feira': { Almoço: [], Jantar: [] },
      'sexta-feira': { Almoço: [], Jantar: [] },
    })
  }

  const handleFinalSubmit = async () => {
    try {
      const menuData = Object.entries(selectedMeals).reduce(
        (acc, [day, meals]) => {
          acc[day] = {
            almoco: {},
            janta: {},
          }

          Object.entries(meals).forEach(([time, foods]) => {
            const mealTime = time === 'Almoço' ? 'almoco' : 'janta'
            const groupedFoods = foods.reduce((acc, food) => {
              const category = categories
                .find((cat) => cat.foods.includes(food))
                ?.category.toLowerCase()
                .replace(' ', '_')
              if (category) {
                acc[category] = acc[category]
                  ? [...acc[category], food]
                  : [food]
              }
              return acc
            }, {} as Record<string, string[]>)

            // Formatar cada grupo de alimentos antes de atribuir ao resultado
            const formattedGroupedFoods = Object.fromEntries(
              Object.entries(groupedFoods).map(([category, foodList]) => [
                category,
                foodList.length > 1
                  ? `${foodList.slice(0, -1).join(', ')} e ${
                      foodList[foodList.length - 1]
                    }`
                  : foodList[0], // Apenas um alimento
              ])
            )

            acc[day][mealTime] = formattedGroupedFoods
          })

          return acc
        },
        {} as Record<
          string,
          { almoco: Record<string, string>; janta: Record<string, string> }
        >
      )
      await firestoreService.updateDocument('ru', 'menu', menuData)
      setIsSubmitModalOpen(false)
    } catch (error) {
      console.error('Erro ao enviar cardápio:', error)
      alert('Ocorreu um erro ao enviar o cardápio.')
    }
  }

  return {
    activeTab,
    setActiveTab,
    mealTime,
    setMealTime,
    selectedMeals,
    toggleFood,
    clearSelection,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isAlertModalOpen,
    setIsAlertModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    handleFinalSubmit,
    tabs,
    categories,
  }
}
