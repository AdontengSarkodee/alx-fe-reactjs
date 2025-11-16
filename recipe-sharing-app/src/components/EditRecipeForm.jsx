import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../components/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const navigate = useNavigate();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (!title.trim() || !description.trim()) return;

    updateRecipe({
      id: recipeId,
      title: title.trim(),
      description: description.trim(),
    });

    navigate(`/recipes/${recipeId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <br />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        required
      />
      <br />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
