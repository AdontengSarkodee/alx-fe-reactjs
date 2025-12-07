import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddRecipePage({ recipes, setRecipes }){
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [error, setError] = useState(null)

  function validate(){
    if (!title.trim() || !summary.trim() || !ingredients.trim() || !steps.trim()) {
      setError('Please fill all fields. Ingredients and steps should be comma-separated lists.')
      return false
    }
    const ingArr = ingredients.split(',').map(s=>s.trim()).filter(Boolean)
    const stepsArr = steps.split(',').map(s=>s.trim()).filter(Boolean)
    if (ingArr.length < 1) { setError('Please provide at least one ingredient.'); return false }
    if (stepsArr.length < 1) { setError('Please provide at least one step.'); return false }
    return true
  }

  function handleSubmit(e){
    e.preventDefault()
    setError(null)
    if (!validate()) return
    const ingArr = ingredients.split(',').map(s=>s.trim()).filter(Boolean)
    const stepsArr = steps.split(',').map(s=>s.trim()).filter(Boolean)
    const newRecipe = {
      id: recipes? (Math.max(...recipes.map(r=>r.id))+1) : 1,
      title, summary, image: image || 'https://via.placeholder.com/600x400?text=No+Image',
      ingredients: ingArr,
      steps: stepsArr
    }
    const updated = recipes? [newRecipe, ...recipes] : [newRecipe]
    setRecipes(updated)
    navigate('/')
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full rounded border-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-medium">Summary</label>
          <textarea value={summary} onChange={e=>setSummary(e.target.value)} className="mt-1 block w-full rounded border-gray-200" rows="3" />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL (optional)</label>
          <input value={image} onChange={e=>setImage(e.target.value)} className="mt-1 block w-full rounded border-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-medium">Ingredients (comma separated)</label>
          <input value={ingredients} onChange={e=>setIngredients(e.target.value)} className="mt-1 block w-full rounded border-gray-200" placeholder="e.g. 200g spaghetti, 100g bacon" />
        </div>
        <div>
          <label className="block text-sm font-medium">Preparation Steps (comma separated)</label>
          <textarea value={steps} onChange={e=>setSteps(e.target.value)} className="mt-1 block w-full rounded border-gray-200" rows="4" placeholder="e.g. Boil pasta, Fry bacon" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Recipe</button>
          <button type="button" onClick={()=>navigate('/')} className="text-sm text-gray-500">Cancel</button>
        </div>
      </form>
    </div>
  )
}
