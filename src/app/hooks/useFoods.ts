import { useEffect, useState } from 'react'
import { firestoreService } from '@/app/services/FirestoreServices'

interface Food {
  id: string
  name: string
  category: string
}

const useFoods = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true)
        const data = await firestoreService.getCollection('/ru/options/food')
        setFoods(data as Food[])
      } catch (err: any) {
        console.error('Error fetching foods:', err)
        setError(err.message || 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchFoods()
  }, [])

  // Função para adicionar uma nova comida
  const addFood = async (name: string, category: string) => {
    try {
      const newFood = await firestoreService.addDocument('/ru/options/food', {
        name,
        category,
      })
      setFoods((prev) => [...prev, { ...newFood, id: newFood.id } as Food])
    } catch (err) {
      console.error('Error adding food:', err)
      setError('Erro ao adicionar comida')
    }
  }

  // Função para atualizar uma comida existente
  const updateFood = async (id: string, name: string, category: string) => {
    try {
      await firestoreService.updateDocument('/ru/options/food', id, {
        name,
        category,
      })
      setFoods((prev) =>
        prev.map((food) =>
          food.id === id ? { ...food, name, category } : food
        )
      )
    } catch (err) {
      console.error('Error updating food:', err)
      setError('Erro ao atualizar comida')
    }
  }

  // Função para deletar uma comida
  const deleteFood = async (id: string) => {
    try {
      await firestoreService.deleteDocument('/ru/options/food', id)
      setFoods((prev) => prev.filter((food) => food.id !== id))
    } catch (err) {
      console.error('Error deleting food:', err)
      setError('Erro ao deletar comida')
    }
  }

  return { foods, loading, error, addFood, updateFood, deleteFood }
}

export default useFoods
