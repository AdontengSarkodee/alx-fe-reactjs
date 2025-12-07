import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipeDetail from './pages/RecipeDetail'
import AddRecipePage from './pages/AddRecipePage'

export default function App(){
  // App-level state: keep recipes in memory so AddRecipe works across routes
  const [recipes, setRecipes] = useState(null)

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">RecipeShare</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm">Home</Link>
            <Link to="/add" className="text-sm">Add Recipe</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage recipes={recipes} setRecipes={setRecipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
          <Route path="/add" element={<AddRecipePage recipes={recipes} setRecipes={setRecipes} />} />
        </Routes>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-500">Built with React + Tailwind</div>
      </footer>
    </div>
  )
}
