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
        className="mt-6 px-6 py-2 rounded-lg bg-red-ufcat text-white hover:text-black font-bold hover:bg-gray-ufcat border border-red-ufcat hover:border-oceangreen-ufcat"
      >
        Limpar Tudo
      </button>
      <button
        onClick={handleSubmitClick}
        className="mt-6 px-6 py-2 rounded-lg bg-green-ufcat text-white font-bold hover:bg-orange-ufcat border border-green-ufcat hover:border-orange-ufcat"
      >
        Enviar Cardápio
      </button>
    </div>
  )
}
