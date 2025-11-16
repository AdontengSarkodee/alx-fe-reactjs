import { Link } from 'react-router-dom';
import { useRecipeStore } from '../components/recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes match your search.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #eee',
              padding: '0.5rem',
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipes/${recipe.id}`} style={{ marginRight: 8 }}>
              View
            </Link>
            <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;


