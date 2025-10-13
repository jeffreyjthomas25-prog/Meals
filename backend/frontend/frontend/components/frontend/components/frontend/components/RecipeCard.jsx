export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      {recipe.image && <img src={recipe.image} alt={recipe.title} width={200} />}
      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>
      <h4>Instructions</h4>
      <ol>
        {recipe.instructions.map((ins, idx) => <li key={idx}>{ins}</li>)}
      </ol>
      {recipe.tags && <p>Tags: {recipe.tags.join(', ')}</p>}
    </div>
  );
}
