// UpdateMenu Component Structure
'use client'

import Tabs from './components/Tabs'
import TabContent from './components/TabContent'
import ActionButtons from './components/ActionButtons'
import Modals from './components/Modals'
import { useMenuLogic } from '@/app/hooks/useMenuLogic'

export default function UpdateMenu() {
  const {
    activeTab,
    setActiveTab,
    mealTime,
    setMealTime,
    selectedMeals,
    toggleFood,
    clearSelection,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isAlertModalOpen,
    setIsAlertModalOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    handleFinalSubmit,
    tabs,
    categories,
  } = useMenuLogic()

  return (
    <div className="p-4 flex flex-col md:items-center w-full md:w-[70%]">
      <div className="flex md:flex-col md:items-center w-full">
        {/* Tabs */}
        <Tabs activeTab={activeTab} tabs={tabs} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <TabContent
          activeTab={activeTab}
          tabs={tabs}
          mealTime={mealTime}
          setMealTime={setMealTime}
          categories={categories}
          selectedMeals={selectedMeals}
          toggleFood={toggleFood}
        />
      </div>

      {/* Action Buttons */}
      <ActionButtons
        handleClearClick={() => setIsConfirmModalOpen(true)}
        handleSubmitClick={() => setIsSubmitModalOpen(true)}
      />

      {/* Modals */}
      <Modals
        isConfirmModalOpen={isConfirmModalOpen}
        onCloseConfirm={() => setIsConfirmModalOpen(false)}
        onConfirmClear={() => {
          clearSelection()
          setIsConfirmModalOpen(false)
        }}
        isAlertModalOpen={isAlertModalOpen}
        onCloseAlert={() => setIsAlertModalOpen(false)}
        isSubmitModalOpen={isSubmitModalOpen}
        onCloseSubmit={() => setIsSubmitModalOpen(false)}
        onSubmit={handleFinalSubmit}
        selectedMeals={selectedMeals}
        tabs={tabs}
        categories={categories}
      />
    </div>
  )
}
