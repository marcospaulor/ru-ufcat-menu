interface ModalProps {
  title: string
  message: string
  onClose: () => void
  onConfirm?: () => void
}

export default function Modal({
  title,
  message,
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{message}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-green-ufcat text-white rounded-lg hover:bg-orange-ufcat"
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
