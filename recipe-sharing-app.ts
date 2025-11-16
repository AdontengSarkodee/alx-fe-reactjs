const fs = require('fs');
const path = require('path');

const projectName = 'recipe-sharing-app';
const baseDir = path.join(__dirname, projectName);

const files = {
  'src/store/recipeStore.js': `
import create from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  updateRecipe: (id, updatedFields) =>
    set(state => ({
      recipes: state.recipes.map(r => r.id === id ? { ...r, ...updatedFields } : r)
    })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(r => r.id !== id) })),
  setRecipes: (recipes) => set({ recipes }),
}));
  `,
  'src/components/AddRecipeForm.jsx': `
import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
  `,
  'src/components/RecipeList.jsx': `
import { useRecipeStore } from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  if (recipes.length === 0) return <p>No recipes yet.</p>;

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={\`/recipes/\${recipe.id}\`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
  `,
  'src/components/RecipeDetails.jsx': `
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId));
  const navigate = useNavigate();

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton id={recipe.id} onDeleted={() => navigate('/')} />
    </div>
  );
};

export default RecipeDetails;
  `,
  'src/components/EditRecipeForm.jsx': `
import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe.id, { title, description });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
  `,
  'src/components/DeleteRecipeButton.jsx': `
import { useRecipeStore } from '../store/recipeStore';

const DeleteRecipeButton = ({ id, onDeleted }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
      onDeleted?.();
    }
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
  `,
  'src/App.jsx': `
import { Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>Recipe Sharing App</h1>
      <Routes>
        <Route path="/" element={
          <div>
            <AddRecipeForm />
            <RecipeList />
          </div>
        } />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}
  `,
  'src/main.jsx': `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
  `,
  'src/index.css': `
body {
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  margin: 0;
  padding: 0;
}
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  font-size: 14px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
  `,
  'package.json': `
{
  "name": "recipe-sharing-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "zustand": "^4.3.8"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
  `,
  'README.md': `
# Recipe Sharing App

This is a simple React application for sharing recipes, using Zustand for state management.

## Features
- Add, edit, delete recipes
- View recipe details
- React Router navigation
- Zustand for state management
`
};

// Function to recursively create directories and files
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(baseDir, filePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf-8');
}

console.log(`Project ${projectName} created successfully!`);
