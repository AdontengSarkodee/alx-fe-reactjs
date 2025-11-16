import { useRecipeStore } from '../components/recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm('Delete this recipe?')) return;
    deleteRecipe(id);
    navigate('/');
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
