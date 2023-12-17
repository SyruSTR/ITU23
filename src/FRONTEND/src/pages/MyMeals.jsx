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
    <div className="my-meals-container">
      <h1>My Meals</h1>
      <ul className="meal-list">
        {mealPlanners.map((meal, index) => (
          <li key={meal.id} className="meal-item">
            <Link to={`meal-details/${meal.id}`} className="meal-link">
              <p className="meal-title">{`Meal #${index + 1}`}</p>
            </Link>
            <p className="meal-date">Date: {meal.date}</p>
            <p className="meal-type">Meal Type: {meal.meal_type}</p>
            <p className="meal-recipes">Recipes:</p>
            <ul className="recipe-list">
              {meal.recipes.map((recipeId) => (
                <li key={recipeId} className="recipe-item">
                  {getRecipeNameById(recipeId)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-link">
        Back to Main Page
      </Link>
    </div>
  );
};

export default MyMeals;
