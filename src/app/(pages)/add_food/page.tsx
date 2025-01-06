'use client'
import React, { useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa6'
import useFoods from '@/app/hooks/useFoods'
import { Food } from '@/app/interface/types'
import LoadingScreen from '@/app/components/Loading/Loading'

const AddFood: React.FC = () => {
  const { foods, loading, error, addFood, updateFood, deleteFood } = useFoods()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [editingFood, setEditingFood] = useState<null | Food>(null)
  const [deleteFoodId, setDeleteFoodId] = useState<string | null>(null)

  const categories = [
    'Prato Principal',
    'Vegano/Vegetariano',
    'Acompanhamento',
    'Guarnição',
    'Salada',
    'Sobremesa',
  ]

  const MAX_NAME_LENGTH = 50

  const validateName = (name: string) => {
    const regex = /^[a-zA-ZÀ-ÿ '-]{1,50}$/ // Permite letras, acentos, espaços, apóstrofos e hífens, com no máximo 50 caracteres
    return regex.test(name)
  }

  const handleNameChange = (name: string) => {
    if (name !== '' && !validateName(name)) {
      return
    }
    setName(name)
  }

  const handleEditNameChange = (name: string) => {
    if (name !== '' && !validateName(name)) {
      return
    }

    if (editingFood) {
      setEditingFood({ ...editingFood, name })
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <p>Erro: {error}</p>
  }

  const handleAddOrEditFood = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingFood) {
      await updateFood(editingFood.id, name, category)
      setEditingFood(null)
    } else {
      await addFood(name, category)
    }
    setName('')
    setCategory('')
  }

  const handleEditFood = (foodToEdit: Food) => {
    setEditingFood(foodToEdit)
  }

  const handleDeleteFood = async () => {
    if (deleteFoodId) {
      await deleteFood(deleteFoodId)
      setDeleteFoodId(null)
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-8 space-y-6">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Cardápio</h1>

        {/* Formulário para adicionar ou editar comida */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-600">
            Adicionar Nova Comida
          </h2>
          <form
            onSubmit={handleAddOrEditFood}
            className="flex flex-col space-y-4"
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700">
                Nome da Comida
              </label>
              <input
                id="name"
                type="text"
                maxLength={MAX_NAME_LENGTH}
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ex: Arroz"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="text-gray-700">
                Categoria
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Adicionar Comida
            </button>
          </form>
        </div>
      </div>

      {/* Tabela de comidas */}
      <div className="w-full space-y-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-600">
          Lista de Comidas
        </h2>
        {foods.length === 0 ? (
          <p className="text-gray-500">Nenhuma comida adicionada.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Categoria</th>
                <th className="border border-gray-300 px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">
                    {food.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {food.category}
                  </td>
                  <td className="flex flex-col md:flex-row justify-center items-center border border-gray-300 px-2 py-2 space-y-2 md:space-x-2">
                    <button
                      onClick={() => handleEditFood(food)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <FaPen />
                    </button>
                    <span
                      onClick={() => setDeleteFoodId(food.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {deleteFoodId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Excluir Comida
            </h2>
            <p className="text-gray-600 mb-4">
              Tem certeza que deseja excluir a comida?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setDeleteFoodId(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteFood}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {editingFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Editar Comida
            </h2>
            <input
              type="text"
              placeholder="Nome da comida"
              value={editingFood.name}
              onChange={(e) => handleEditNameChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              maxLength={MAX_NAME_LENGTH}
            />
            <select
              value={editingFood.category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setEditingFood(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddOrEditFood}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddFood
