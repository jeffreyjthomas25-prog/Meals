import { useEffect, useState } from "react";
import MealPlanner from "../components/MealPlanner";
import ScrapeRecipeForm from "../components/ScrapeRecipeForm";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then(res => res.json())
      .then(setRecipes);
  }, []);

  function handleScrape(recipe) {
    // Save scraped recipe to backend
    fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    }).then(() => {
      setRecipes(r => [...r, recipe]);
    });
  }

  return (
    <div>
      <h1>Weekly Meal Planner</h1>
      <ScrapeRecipeForm onScrape={handleScrape} />
      <MealPlanner recipes={recipes} />
    </div>
  );
}
