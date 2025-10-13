import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then(res => res.json())
      .then(setRecipes);
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((r, idx) => <RecipeCard key={r._id || idx} recipe={r} />)}
    </div>
  );
}
