// Authors: Nikita Vetluzhskikh

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component

const MealDetails = () => {
  const { id } = useParams();
  const [mealPlanner, setMealPlanner] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealPlannerResponse = await fetch(`http://127.0.0.1:8000/api/meal-planner/${id}/`);
        const mealPlannerData = await mealPlannerResponse.json();
        setMealPlanner(mealPlannerData);

        const recipesResponse = await fetch('http://127.0.0.1:8000/api/add-recipes/');
        const recipesData = await recipesResponse.json();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const getRecipeNameById = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    return recipe ? recipe.name : 'Recipe not found';
  };

  const handleDeleteMealPlanner = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/meal-planner/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Meal Planner deleted successfully');
        navigate('/meal-planner/my-meals');
      } else {
        console.error('Failed to delete Meal Planner');
      }
    } catch (error) {
      console.error('Error deleting Meal Planner:', error);
    }
  };

  const handleUpdateMealPlanner = () => {
    // Redirect to the update-meal page
    navigate(`/meal-planner/my-meals/meal-details/${id}/edit-meal/${id}`);
  };

  if (!mealPlanner || !recipes.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <div className="meal-details-container">
        <Header /> {/* Include the Header component */}
        <h1>Meal Details</h1>
        <p className="detail-text">Date: {mealPlanner.date}</p>
        <p className="detail-text">Meal Type: {mealPlanner.meal_type}</p>
        {/* Display other details as needed */}
        <p className="detail-text">Recipes:</p>
        <ul className="recipe-list">
          {mealPlanner.recipes.map((recipeId) => (
            <li key={recipeId} className="recipe-item">
              {getRecipeNameById(recipeId)}
            </li>
          ))}
        </ul>
        <button className="delete-button" onClick={handleDeleteMealPlanner}>
          Delete meal plan
        </button>
        <button className="edit-button" onClick={handleUpdateMealPlanner}>
          Edit meal plan
        </button>
        <Link to='/meal-planner/my-meals'>
          <button className="back-to-menu-button">Back to your meals</button>
        </Link>
      </div>
    </div>
  );
};

export default MealDetails;
