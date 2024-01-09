//Authors: Nikita Vetluzhskikh

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const MyMeals = () => {
  const [mealPlanners, setMealPlanners] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();

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

  const handleDeleteMeal = async (mealId) => {
    try {
      // Send a DELETE request to the API
      await fetch(`http://127.0.0.1:8000/api/meal-planner/${mealId}/`, {
        method: 'DELETE',
      });


      setMealPlanners((prevMealPlanners) =>
        prevMealPlanners.filter((meal) => meal.id !== mealId)
      );
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleBackToMainClick = () => {
    navigate('/');
  };

  return (
    <div className="my-meals-container">
      <Header />
      <h1>My Meals</h1>
      <ul className="meal-list">
        {mealPlanners.map((meal, index) => (
          <li key={meal.id} className="meal-item">
            <div className="meal-details">
              <div className="meal-small-details">
                <Link to={`meal-details/${meal.id}`} className="meal-link">
                  <p className="meal-title">{`Meal #${index + 1}`}</p>
                </Link>
                <p className="meal-date">{meal.meal_type} for {meal.date}</p>
              </div>
              <ul className="recipe-list">
                {meal.recipes.map((recipeId) => (
                  <li key={recipeId} className="recipe-item">
                    {getRecipeNameById(recipeId)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="recipe-actions">
              <button onClick={() => handleDeleteMeal(meal.id)} >
                Delete Meal
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="button" onClick={handleBackToMainClick}>
          Back to main page
        </button>
      </div>
    </div>
  );
};

export default MyMeals;
