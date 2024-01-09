import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

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

  const getRecipeById = (recipeId) => {
    return recipes.find((r) => r.id === recipeId);
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
    navigate(`/meal-planner/my-meals/meal-details/${id}/edit-meal/${id}`);
  };

  const handleBackToMeals = () => {
    navigate("/meal-planner/my-meals");
  };

  if (!mealPlanner || !recipes.length) {
    return <p>Loading...</p>;
  }

  const handleDeleteRecipeFromMeal = async (recipeId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/meal-planner/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Meal planner deleted successfully');
        navigate('/meal-planner/my-meals');
      } else {
        console.error('Failed to delete meal planner');
      }
    } catch (error) {
      console.error('Error deleting meal planner:', error);
    }
  };

return (
    <div className="meal-details-container">
      <Header />
      <div className="meal-details-content">
        <h1>Meal Details</h1>
        <p className="detail-text">Date: {mealPlanner.date}</p>
        <p className="detail-text">Meal type: {mealPlanner.meal_type}</p>
        <p className="detail-text">Recipes:</p>
        <ul className="recipe-list">
          {recipes.map((recipe) => (
              <li className="recipe-item" key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                  <div className="recipe-details">
                    {recipe.picture && <img src={recipe.picture} alt={recipe.name} className="recipe-image"/>}
                    <div className="text-details">
                      <h2 className="recipe-name">{recipe.name}</h2>
                      <p className="recipe-description">{recipe.description}</p>
                    </div>
                  </div>
                </Link>
                <div className="recipe-actions" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleDeleteRecipeFromMeal(recipe.id)}>
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
        <div className="recipe-actions">
          <button className="edit-button-item" onClick={handleUpdateMealPlanner}>
            Edit Meal Plan
          </button>
          <button className="button-item" onClick={handleBackToMeals}>
            Back to Your Meals
          </button>
        </div>
      </div>
    </div>
);
};

export default MealDetails;