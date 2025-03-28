import { MealData } from '@/app/interface/types'

interface MealReviewItemProps {
  review: MealData
  expanded: boolean
  onToggleExpand: () => void
}

const MealReviewItem: React.FC<MealReviewItemProps> = ({
  review,
  expanded,
  onToggleExpand,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={i < rating ? 'gold' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 text-yellow-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    ))
  }

  const LabelNames: { [key: string]: string } = {
    acompanhamento: 'Acompanhamento',
    guarnição: 'Guarnição',
    prato_principal: 'Prato Principal',
    'vegano/vegetariano': 'Prato Vegano/Vegetariano',
    salada: 'Salada',
    sobremesa: 'Sobremesa',
  }

  return (
    <li
      key={review.id}
      className="border border-gray-300 rounded-lg p-6 shadow-md bg-white"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {review.day} - {review.meal}
        </h2>
        <span className="text-sm text-gray-500">
          {new Date(review.actual_date).toLocaleDateString('pt-BR')}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <strong className="mr-2">Avaliação:</strong>
          {renderStars(review.rating)}
        </div>
        {review.comment && (
          <p className="mt-2 text-gray-600">
            <strong>Comentário:</strong> {review.comment}
          </p>
        )}
      </div>
      <button onClick={onToggleExpand} className="text-blue-500 text-lg mt-4">
        {expanded ? 'Ver menos -' : 'Ver mais +'}
      </button>
      {expanded && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {Object.entries(review.dataMeal).map(([key, value]) => (
            <p key={key}>
              <strong>{LabelNames[key]}:</strong> {value}
            </p>
          ))}
        </div>
      )}
    </li>
  )
}

export default MealReviewItem
