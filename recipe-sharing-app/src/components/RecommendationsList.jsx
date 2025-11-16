import { useEffect } from 'react';
import { useRecipeStore } from '../components/recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Add some favorites!</p>
      ) : (
        recommendations.map((recipe) => (
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

export default RecommendationsList;
