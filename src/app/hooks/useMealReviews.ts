import { useEffect, useState } from 'react'
import { firestoreService } from '@/app/services/FirestoreServices'
import { MealData } from '@/app/interface/types'

export const useMealReviews = () => {
  const [reviews, setReviews] = useState<MealData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await firestoreService.getCollection(
          'ru/rating/avaliacoes'
        )
        const mealData = data.map((item: any) => ({
          id: item.id,
          actual_date: item.actual_date || '',
          comment: item.comment || '',
          dataMeal: item.dataMeal || '',
          day: item.day || '',
          meal: item.meal || '',
          rating: item.rating || 0,
        }))
        setReviews(mealData as MealData[])
      } catch (err) {
        setError('Erro ao buscar avaliações.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return { reviews, loading, error }
}
