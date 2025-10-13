import { useState } from "react";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MealPlanner({ recipes }) {
  const [plan, setPlan] = useState(Array(7).fill(null));
  const assignRecipe = (dayIdx, recipe) => {
    const newPlan = [...plan];
    newPlan[dayIdx] = recipe;
    setPlan(newPlan);
  };

  return (
    <div className="planner">
      {days.map((d, i) => (
        <div key={d} className="planner-day">
          <h4>{d}</h4>
          {plan[i] ? (
            <div>
              <span>{plan[i].title}</span>
              <button onClick={() => assignRecipe(i, null)}>Remove</button>
            </div>
          ) : (
            <select onChange={e => assignRecipe(i, recipes[e.target.value])}>
              <option value="">Choose recipe...</option>
              {recipes.map((r, idx) => (
                <option key={r._id || idx} value={idx}>{r.title}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
