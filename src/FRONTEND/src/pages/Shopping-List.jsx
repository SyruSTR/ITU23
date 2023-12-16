import React, { useState, useEffect } from 'react';

function AddRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    // Fetch ingredients from your API
    fetch('http://127.0.0.1:8000/api/add-recipes/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Extract ingredients from the response
          const allIngredients = data.flatMap((recipe) => recipe.ingredients.split(' '));
          // Remove duplicates by converting to a Set and back to an array
          const uniqueIngredients = [...new Set(allIngredients)];
          setIngredients(uniqueIngredients);
        } else {
          console.error('API response is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching ingredients:', error));
  }, []);

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((name) => name !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleAddRecipe = () => {
    // Logic to add recipe using selected ingredients
    // ...

    // For demonstration purposes, log the selected ingredients
    console.log('Selected ingredients:', selectedIngredients);

    // Create a shopping list with the selected ingredients
    const shoppingListData = {
      user: 1, // Replace with the actual user ID
      ingredients: selectedIngredients,
      created_at: new Date().toISOString(),
    };

    fetch('http://127.0.0.1:8000/api/shopping-list/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shoppingListData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create shopping list');
        }
        // Reset selected ingredients after successful creation
        setSelectedIngredients([]);
        return response.json();
      })
      .then((data) => {
        console.log('Shopping list created successfully:', data);
        // Handle success, e.g., redirect to a success page or update state
      })
      .catch((error) => console.error('Error creating shopping list:', error));
  };

  return (
    <div className="add-recipe">
      <h1>Add Recipe</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient)}
                onChange={() => handleCheckboxChange(ingredient)}
              />
              {ingredient}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRecipe}>Add Recipe and Create Shopping List</button>
    </div>
  );
}

export default AddRecipe;
