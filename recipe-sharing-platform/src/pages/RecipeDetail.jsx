import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function RecipeDetail({ recipes }){
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(()=>{
    if (recipes) {
      const found = recipes.find(r=> String(r.id) === String(id))
      setRecipe(found)
    } else {
      // load from data.json fallback
      fetch('/src/data.json').then(r=>r.json()).then(data=>{
        const found = data.find(r=> String(r.id) === String(id))
        setRecipe(found)
      })
    }
  }, [recipes, id])

  if (!recipe) return <div className="text-gray-500">Recipe not found.</div>

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <img src={recipe.image} alt={recipe.title} className="w-full lg:w-1/3 h-64 object-cover rounded-md" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p className="text-gray-600 mt-2">{recipe.summary}</p>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ing, idx)=> <li key={idx}>{ing}</li>)}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Preparation Steps</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.steps.map((s, idx)=> <li key={idx}>{s}</li>)}
            </ol>
          </section>

          <div className="mt-6">
            <Link to="/" className="text-blue-600">← Back to recipes</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
