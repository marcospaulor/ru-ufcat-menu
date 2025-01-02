'use client'

import React, { useState } from 'react'
import { useMealReviews } from '@/app/hooks/useMealReviews'
import Filters from '@/app/(pages)/rating/components/Filters'
import MealReviewItem from '@/app/(pages)/rating/components/MealReviewsItem'
import LoadingScreen from '@/app/components/Loading/Loading'

const MealReviewsPage: React.FC = () => {
  const { reviews, loading, error } = useMealReviews()
  const [filters, setFilters] = useState({
    meal: 'Todos',
    day: 'Todos',
    rating: 'Todos',
    orderByDate: 'Mais recentes',
  })

  const filteredReviews = React.useMemo(() => {
    const filtered = reviews.filter((review) => {
      const mealFilter =
        filters.meal === 'Todos' || review.meal === filters.meal
      const dayFilter = filters.day === 'Todos' || review.day === filters.day
      const ratingFilter =
        filters.rating === 'Todos' ||
        review.rating === parseInt(filters.rating, 10)

      return mealFilter && dayFilter && ratingFilter
    })

    // Ordenação por data
    return filtered.sort((a, b) => {
      const dateA = new Date(a.actual_date).getTime()
      const dateB = new Date(b.actual_date).getTime()
      return filters.orderByDate === 'Mais recentes'
        ? dateB - dateA // Mais recentes primeiro
        : dateA - dateB // Mais antigos primeiro
    })
  }, [reviews, filters])

  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    Array(filteredReviews.length).fill(false)
  )

  React.useEffect(() => {
    // Atualizar o estado apenas quando o número de itens mudar
    if (expandedStates.length !== filteredReviews.length) {
      setExpandedStates(Array(filteredReviews.length).fill(false))
    }
  }, [filteredReviews.length, expandedStates.length])

  const toggleExpand = (index: number) => {
    setExpandedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    )
  }

  if (loading) return <LoadingScreen />
  if (error) return <p>{error}</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Avaliações das Refeições
      </h1>
      <Filters filters={filters} onChange={setFilters} />
      <ul className="space-y-6">
        {filteredReviews.map((review, index) => (
          <MealReviewItem
            key={review.id}
            review={review}
            expanded={expandedStates[index]} // Passar o estado de expandido
            onToggleExpand={() => toggleExpand(index)} // Manipulador do botão
          />
        ))}
      </ul>
    </div>
  )
}

export default MealReviewsPage
