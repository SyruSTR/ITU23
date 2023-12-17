import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyMeals = () => {
  const [mealPlanners, setMealPlanners] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealPlannersResponse = await fetch('http://127.0.0.1:8000/api/meal-planner/');
        const mealPlannersData = await mealPlannersResponse.json();
        setMealPlanners(mealPlannersData);

        const recipesResponse = await fetch('http://127.0.0.1:8000/api/add-recipes/');
        const recipesData = await recipesResponse.json();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getRecipeNameById = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    return recipe ? recipe.name : 'Recipe not found';
  };

  return (
    <div>
      <h1>My Meals</h1>
      <ul>
        {mealPlanners.map((meal, index) => (
          <li key={meal.id}>
            <Link to={`meal-details/${meal.id}`}>
              <p>{`Meal #${index + 1}`}</p>
              </Link>
              <p>Date: {meal.date}</p>
              <p>Meal Type: {meal.meal_type}</p>
              <p>Recipes:</p>
              <ul>
                {meal.recipes.map((recipeId) => (
                  <li key={recipeId}>
                    {getRecipeNameById(recipeId)}
                  </li>
                ))}
              </ul>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyMeals;
