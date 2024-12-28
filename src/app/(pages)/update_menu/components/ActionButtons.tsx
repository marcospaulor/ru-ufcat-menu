interface ActionButtonsProps {
  handleClearClick: () => void
  handleSubmitClick: () => void
}

export default function ActionButtons({
  handleClearClick,
  handleSubmitClick,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end space-x-3 w-full">
      <button
        onClick={handleClearClick}
        className="mt-6 px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
      >
        Limpar Tudo
      </button>
      <button
        onClick={handleSubmitClick}
        className="mt-6 px-6 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600"
      >
        Enviar Cardápio
      </button>
    </div>
  )
}
