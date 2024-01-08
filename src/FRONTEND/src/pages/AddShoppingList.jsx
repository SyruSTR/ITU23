import React, { useState, useEffect } from 'react';

const ShoppingListPage = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch recipe details from the API
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/add-recipes/${recipeId}`);
        const data = await response.json();
        setRecipe(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleCheckboxChange = (ingredient) => {
    // Toggle the selected state of the ingredient
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const handleAddToShoppingList = async () => {
    try {
      // Post selected ingredients to the shopping list endpoint
      await fetch('http://127.0.0.1:8000/api/shopping-list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          ingredients: selectedIngredients,
        }),
      });
      // Optionally, you can handle success or navigate to a different page
      console.log('Ingredients added to shopping list successfully!');
    } catch (error) {
      console.error('Error adding ingredients to shopping list:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{recipe?.name} - Shopping List</h1>
      <p>{recipe?.description}</p>
      <ul>
        {recipe?.ingredients.split(',').map((ingredient, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={ingredient.trim()}
                onChange={() => handleCheckboxChange(ingredient.trim())}
                checked={selectedIngredients.includes(ingredient.trim())}
              />
              {ingredient.trim()}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAddToShoppingList}>Add to Shopping List</button>
    </div>
  );
};

export default ShoppingListPage;
