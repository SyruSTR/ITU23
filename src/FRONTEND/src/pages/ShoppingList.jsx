//Authors: Oleg Borshch

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ShoppingList = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipe details based on the recipeId
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${recipeId}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleIngredientToggle = (ingredientId) => {
    setSelectedIngredients((prevIngredients) => {
      if (prevIngredients.includes(ingredientId)) {
        // Remove the ingredient if already selected
        return prevIngredients.filter((id) => id !== ingredientId);
      } else {
        // Add the ingredient if not selected
        return [...prevIngredients, ingredientId];
      }
    });
  };

  const handleCreateShoppingList = async () => {
    try {
      // Make a POST request to create a shopping list
      const response = await fetch('http://localhost:8000/api/shopping-list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          selectedIngredients,
        }),
      });

      if (response.ok) {
        console.log('Shopping list created successfully');
        // Redirect to 'Your shopping lists' page after successful creation
        navigate('/your-shopping-lists');
      } else {
        console.error('Failed to create shopping list');
      }
    } catch (error) {
      console.error('Error creating shopping list:', error);
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Shopping List for {recipe.name}</h1>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient.id)}
                onChange={() => handleIngredientToggle(ingredient.id)}
              />
              {ingredient.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateShoppingList}>Create Shopping List</button>
      <Link to={`/myrecipes/recipe/${recipeId}`}>Back to Recipe</Link>
    </div>
  );
};

export default ShoppingList;
