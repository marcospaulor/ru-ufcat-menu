'use client'
import React, { useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa6'

interface Food {
  id: number
  name: string
  category: string
}

const AddFood: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [newFood, setNewFood] = useState<Food>({
    id: Date.now(),
    name: '',
    category: '',
  })
  const [editFood, setEditFood] = useState<Food | null>(null)
  const [deleteFoodId, setDeleteFoodId] = useState<number | null>(null)

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
    if (validateName(name)) {
      setNewFood({ ...newFood, name })
    }
  }

  const handleEditNameChange = (name: string) => {
    if (editFood && validateName(name)) {
      setEditFood({ ...editFood, name })
    }
  }

  const handleAddFood = () => {
    if (!newFood.name || !newFood.category) return
    setFoods([...foods, newFood])
    setNewFood({ id: Date.now(), name: '', category: '' })
  }

  const handleEditFood = (id: number) => {
    const food = foods.find((food) => food.id === id)
    if (food) {
      setEditFood(food)
    }
  }

  const handleSaveEdit = () => {
    if (editFood) {
      setFoods((prevFoods) =>
        prevFoods.map((food) => (food.id === editFood.id ? editFood : food))
      )
      setEditFood(null)
    }
  }

  const handleDeleteFood = (id: number) => {
    setFoods(foods.filter((food) => food.id !== id))
    setDeleteFoodId(null) // Fechar o modal após excluir
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gerenciar Cardápio</h1>

      {/* Formulário para adicionar */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-600">
          Adicionar Comida
        </h2>
        <input
          type="text"
          placeholder="Nome da comida"
          maxLength={MAX_NAME_LENGTH}
          value={newFood.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={newFood.category}
          onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddFood}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela de comidas */}
      <div className="space-y-4">
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
                  <td className="border border-gray-300 px-4 py-2">
                    {food.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {food.category}
                  </td>
                  <td className="flex justify-center h-full items-center border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEditFood(food.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <FaPen />
                    </button>
                    <span
                      onClick={() => setDeleteFoodId(food.id)} // Modificar para id do item
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
                onClick={() => setDeleteFoodId(null)} // Fechar o modal
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteFood(deleteFoodId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {editFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Editar Comida
            </h2>
            <input
              type="text"
              placeholder="Nome da comida"
              value={editFood.name}
              onChange={(e) => handleEditNameChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <select
              value={editFood.category}
              onChange={(e) =>
                setEditFood({ ...editFood, category: e.target.value })
              }
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
                onClick={() => setEditFood(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
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
