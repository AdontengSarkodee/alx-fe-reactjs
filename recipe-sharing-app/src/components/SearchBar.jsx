import { useRecipeStore } from '../components/recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="🔍 Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default SearchBar;
