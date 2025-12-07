import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage({ recipes, setRecipes }){
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (recipes) return
    setLoading(true)
    fetch('/src/data.json').then(r=>r.json()).then(data=>{
      setRecipes(data)
      setLoading(false)
    }).catch(err=>{
      console.error(err)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading recipes...</div>
  if (!recipes) return <div className="text-gray-500">No recipes available.</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(r=>(
          <article key={r.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img src={r.image} alt={r.title} className="w-full h-44 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p className="text-gray-600 mt-2">{r.summary}</p>
            <div className="mt-4 flex items-center justify-between">
              <Link to={`/recipe/${r.id}`} className="text-sm text-blue-600">View Recipe</Link>
              <span className="text-sm text-gray-500">Ingredients: {r.ingredients.length}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
