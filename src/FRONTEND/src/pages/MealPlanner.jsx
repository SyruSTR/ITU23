import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        // Fetch Recipes data
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
      // Recipe is selected, remove it
      setNewMealPlanner((prevMealPlanner) => ({
        ...prevMealPlanner,
        recipes: prevMealPlanner.recipes.filter((id) => id !== recipeId),
      }));
    } else {
      // Recipe is not selected, add it
      setNewMealPlanner((prevMealPlanner) => ({
        ...prevMealPlanner,
        recipes: [...prevMealPlanner.recipes, recipeId],
      }));
    }
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

        // Reset the newMealPlanner state for the next meal planner
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

  return (
    <div>
      <h1>Meal Planner</h1>
      <div>
        <h2>Create New Meal Planner</h2>
        <label>Date:</label>
        <input
          type="date"
          value={newMealPlanner.date}
          onChange={(e) => setNewMealPlanner({ ...newMealPlanner, date: e.target.value })}
        />
        <label>Meal Type:</label>
        <select
          value={newMealPlanner.meal_type}
          onChange={(e) => setNewMealPlanner({ ...newMealPlanner, meal_type: e.target.value })}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
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
        <button onClick={handleCreateMealPlanner}>Create a meal plan</button>
      </div>
      <div>
        <h2>Existing Meal Planners</h2>
        <ul>
          {mealPlanner.map((meal) => (
            <li key={meal.id}>
              <p>Date: {meal.date}</p>
              <p>Meal Type: {meal.meal_type}</p>
              <p>Recipes:</p>
              <ul>
                {meal.recipes.map((recipeId) => (
                  <li key={recipeId}>Recipe Name: {recipes.find((r) => r.id === recipeId)?.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealPlanner;

