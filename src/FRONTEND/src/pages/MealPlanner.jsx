// Authors: Oleg Borshch, Nikita Vetluzhskikh
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MealPlanner = () => {
  const [mealPlanner, setMealPlanner] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [newMealPlanner, setNewMealPlanner] = useState({
    date: new Date().toISOString().split('T')[0],
    meal_type: 'breakfast',
    recipes: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await fetch('http://127.0.0.1:8000/api/add-recipes/');
        const recipesData = await recipesResponse.json();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes data:', error);
      }
    };

    fetchData();
  }, []);

  const handleToggleRecipe = (recipeId) => {
    const isSelected = newMealPlanner.recipes.includes(recipeId);
    if (isSelected) {
      setNewMealPlanner((prevMealPlanner) => ({
        ...prevMealPlanner,
        recipes: prevMealPlanner.recipes.filter((id) => id !== recipeId),
      }));
    } else {
      setNewMealPlanner((prevMealPlanner) => ({
        ...prevMealPlanner,
        recipes: [...prevMealPlanner.recipes, recipeId],
      }));
    }
  };

  const handleMealTypeChange = (type) => {
    setNewMealPlanner({ ...newMealPlanner, meal_type: type });
  };

  const handleCreateMealPlanner = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/meal-planner/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMealPlanner),
      });

      if (response.ok) {
        const createdMealPlanner = await response.json();
        setMealPlanner([...mealPlanner, createdMealPlanner]);

        navigate('/meal-planner/my-meals/');

        setNewMealPlanner({
          date: new Date().toISOString().split('T')[0],
          meal_type: 'breakfast',
          recipes: [],
        });
      } else {
        console.error('Failed to create Meal Planner');
      }
    } catch (error) {
      console.error('Error creating Meal Planner:', error);
    }
  };

  const handleBackToMainClick = () => {
    navigate('/');
  };

  return (
    <div className="meal-planner-container">
      <Header />
      <div className="meal-planner-form">
        <h1>Create a new meal for the day</h1>
        <label>Date:</label>
        <input
          type="date"
          value={newMealPlanner.date}
          onChange={(e) => setNewMealPlanner({ ...newMealPlanner, date: e.target.value })}
        />
        <label>Meal type:</label>
        <div className="meal-type-options" style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className={`meal-type-button breakfast ${newMealPlanner.meal_type === 'breakfast' ? 'selected' : ''}`}
            onClick={() => handleMealTypeChange('breakfast')}
          >
            Breakfast
          </button>

          <button
            type="button"
            className={`meal-type-button lunch ${newMealPlanner.meal_type === 'lunch' ? 'selected' : ''}`}
            onClick={() => handleMealTypeChange('lunch')}
          >
            Lunch
          </button>

          <button
            type="button"
            className={`meal-type-button dinner ${newMealPlanner.meal_type === 'dinner' ? 'selected' : ''}`}
            onClick={() => handleMealTypeChange('dinner')}
          >
            Dinner
          </button>
        </div>
        <label>Recipes:</label>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <label>
                <input
                  type="checkbox"
                  checked={newMealPlanner.recipes.includes(recipe.id)}
                  onChange={() => handleToggleRecipe(recipe.id)}
                />
                {recipe.name}
              </label>
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button className="create-button" onClick={handleCreateMealPlanner}>
            Create a meal plan
          </button>

          {/* New button for navigating to the 'my-meals' page */}
          <button className="view-my-meals-button" onClick={() => navigate('/meal-planner/my-meals/')}>
            View My Meals
          </button>
        </div>
      </div>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/')}>
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default MealPlanner;
