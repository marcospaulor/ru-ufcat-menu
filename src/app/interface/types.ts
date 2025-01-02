export interface MealCategory {
  category: string
  foods: string[]
}

export interface MealData {
  id: string
  actual_date: string
  comment: string
  dataMeal: {
    acompanhamento: string
    guarnicao: string
    prato_principal: string
    prato_vegano: string
    salada: string
    sobremesa: string
  }
  day: string
  meal: string
  rating: number
}
