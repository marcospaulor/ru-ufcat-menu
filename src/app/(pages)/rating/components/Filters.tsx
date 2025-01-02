interface FiltersProps {
  filters: {
    meal: string
    day: string
    rating: string
    orderByDate: string
  }
  onChange: (newFilters: FiltersProps['filters']) => void
}

const Filters: React.FC<FiltersProps> = ({ filters, onChange }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select
        value={filters.meal}
        onChange={(e) => onChange({ ...filters, meal: e.target.value })}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="Todos">Todas as refeições</option>
        <option value="Almoço">Almoço</option>
        <option value="Jantar">Jantar</option>
      </select>

      <select
        value={filters.day}
        onChange={(e) => onChange({ ...filters, day: e.target.value })}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="Todos">Todos os dias</option>
        <option value="Segunda-feira">Segunda-feira</option>
        <option value="Terça-feira">Terça-feira</option>
        <option value="Quarta-feira">Quarta-feira</option>
        <option value="Quinta-feira">Quinta-feira</option>
        <option value="Sexta-feira">Sexta-feira</option>
      </select>

      <select
        value={filters.rating}
        onChange={(e) => onChange({ ...filters, rating: e.target.value })}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="Todos">Todas as avaliações</option>
        <option value="5">5 estrelas</option>
        <option value="4">4 estrelas</option>
        <option value="3">3 estrelas</option>
        <option value="2">2 estrelas</option>
        <option value="1">1 estrela</option>
      </select>

      <select
        value={filters.orderByDate}
        onChange={(e) => onChange({ ...filters, orderByDate: e.target.value })}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="Mais recentes">Mais recentes</option>
        <option value="Mais antigos">Mais antigos</option>
      </select>
    </div>
  )
}

export default Filters
