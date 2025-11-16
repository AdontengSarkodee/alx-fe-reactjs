import { useRecipeStore } from '../components/recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const recipes = useRecipeStore((s) => s.recipes);
  const favorites = useRecipeStore((s) => s.favorites);

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>You haven’t added any favorites yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipes/${recipe.id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
