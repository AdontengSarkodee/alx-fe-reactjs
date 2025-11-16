import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../components/recipeStore';
import DeleteRecipeButton from '../components/DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const favorites = useRecipeStore((s) => s.favorites);
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipeId);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => toggleFavorite(recipeId)}
          style={{
            color: isFavorite ? 'gold' : 'gray',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '4px 8px',
            cursor: 'pointer',
          }}
        >
          {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
        </button>

        <DeleteRecipeButton id={recipe.id} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
