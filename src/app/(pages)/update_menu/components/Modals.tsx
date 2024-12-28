import Modal from './Modal'

interface ModalProps {
  isConfirmModalOpen: boolean
  onCloseConfirm: () => void
  onConfirmClear: () => void
  isAlertModalOpen: boolean
  onCloseAlert: () => void
  isSubmitModalOpen: boolean
  onCloseSubmit: () => void
  onSubmit: () => void
  selectedMeals: any // You can replace 'any' with a more specific type if available
  tabs: any // You can replace 'any' with a more specific type if available
  categories: any // You can replace 'any' with a more specific type if available
}

export default function Modals({
  isConfirmModalOpen,
  onCloseConfirm,
  onConfirmClear,
  isAlertModalOpen,
  onCloseAlert,
  isSubmitModalOpen,
  onCloseSubmit,
  onSubmit,
  selectedMeals,
  tabs,
  categories,
}: ModalProps) {
  return (
    <>
      {isConfirmModalOpen && (
        <Modal
          title="Confirmar Limpeza"
          message="Tem certeza de que deseja apagar todas as seleções?"
          onClose={onCloseConfirm}
          onConfirm={onConfirmClear}
        />
      )}
      {isAlertModalOpen && (
        <Modal
          title="Alerta"
          message="Por favor, selecione o período antes de escolher os alimentos."
          onClose={onCloseAlert}
        />
      )}
      {isSubmitModalOpen && (
        <Modal
          title="Confirmar Envio do Cardápio"
          message={tabs.map((tab: { id: string; title: string }) => (
            <div key={tab.id} className="mb-6">
              <h4 className="font-black text-lg mb-4">{tab.title}</h4>
              {['Almoço', 'Jantar'].map((time) => (
                <div key={time} className="mb-4">
                  <h5 className="font-medium text-md mb-2">{time}:</h5>
                  <div className="space-y-4">
                    {categories.map(
                      (category: { category: string; foods: string[] }) => {
                        const selectedFoods = selectedMeals[tab.id][
                          time
                        ].filter((food: string) =>
                          category.foods.includes(food)
                        )
                        return (
                          selectedFoods.length > 0 && (
                            <div key={category.category}>
                              <p className="text-sm font-light italic text-gray-700 mb-2">
                                {category.category}:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {selectedFoods.map((food: string) => (
                                  <span
                                    key={food}
                                    className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                                  >
                                    {food}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        )
                      }
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          onClose={onCloseSubmit}
          onConfirm={onSubmit}
        />
      )}
    </>
  )
}
