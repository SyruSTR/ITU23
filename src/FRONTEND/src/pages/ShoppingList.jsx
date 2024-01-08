import React, { useState, useEffect } from 'react';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/shopping-list/')
      .then(response => response.json())
      .then(data => setIngredients(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to the API to delete the ingredient
    fetch(`http://localhost:8000/api/shopping-list/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Update the state to reflect the deleted ingredient
          setIngredients(prevIngredients =>
            prevIngredients.filter(ingredient => ingredient.id !== id)
          );
        } else {
          console.error('Failed to delete ingredient');
        }
      })
      .catch(error => console.error('Error deleting ingredient:', error));
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>
            {ingredient.ingredient}
            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
