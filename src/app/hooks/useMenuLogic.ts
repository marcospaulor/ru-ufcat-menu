import { useState } from 'react'
import { MealCategory } from '@/app/interface/types'

type MealTime = 'Almoço' | 'Jantar'

export function useMenuLogic() {
  const [activeTab, setActiveTab] = useState('segunda')
  const [mealTime, setMealTime] = useState<MealTime | null>(null)
  const [selectedMeals, setSelectedMeals] = useState<
    Record<string, Record<MealTime, string[]>>
  >({
    segunda: { Almoço: [], Jantar: [] },
    terca: { Almoço: [], Jantar: [] },
    quarta: { Almoço: [], Jantar: [] },
    quinta: { Almoço: [], Jantar: [] },
    sexta: { Almoço: [], Jantar: [] },
  })

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const tabs = [
    { id: 'segunda', title: 'Segunda-feira' },
    { id: 'terca', title: 'Terça-feira' },
    { id: 'quarta', title: 'Quarta-feira' },
    { id: 'quinta', title: 'Quinta-feira' },
    { id: 'sexta', title: 'Sexta-feira' },
  ]

  const categories: MealCategory[] = [
    {
      category: 'Prato principal',
      foods: ['Arroz', 'Feijão', 'Frango Assado'],
    },
    {
      category: 'Vegano/Vegetariano',
      foods: ['Salada de Grão-de-Bico', 'Tofu Grelhado'],
    },
    { category: 'Acompanhamento', foods: ['Batata Frita', 'Farofa'] },
    { category: 'Guarnição', foods: ['Vinagrete', 'Molho à Campanha'] },
    { category: 'Salada', foods: ['Alface', 'Tomate', 'Rúcula'] },
    { category: 'Sobremesa', foods: ['Mousse de Maracujá', 'Pudim'] },
  ]

  const toggleFood = (food: string) => {
    if (!mealTime) {
      setIsAlertModalOpen(true)
      return
    }
    setSelectedMeals((prev) => {
      const currentSelection = prev[activeTab][mealTime]
      const isSelected = currentSelection.includes(food)

      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [mealTime]: isSelected
            ? currentSelection.filter((item) => item !== food)
            : [...currentSelection, food],
        },
      }
    })
  }

  const clearSelection = () => {
    setSelectedMeals({
      segunda: { Almoço: [], Jantar: [] },
      terca: { Almoço: [], Jantar: [] },
      quarta: { Almoço: [], Jantar: [] },
      quinta: { Almoço: [], Jantar: [] },
      sexta: { Almoço: [], Jantar: [] },
    })
  }

  const handleFinalSubmit = () => {
    console.log(
      'Dados do cardápio enviados:',
      JSON.stringify(selectedMeals, null, 2)
    )
    alert('Cardápio enviado com sucesso!')
    setIsSubmitModalOpen(false)
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
