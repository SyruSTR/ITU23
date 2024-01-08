import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/shopping-list/')
      .then(response => response.json())
      .then(data => setIngredients(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/shopping-list/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setIngredients(prevIngredients =>
            prevIngredients.filter(ingredient => ingredient.id !== id)
          );
        } else {
          console.error('Failed to delete ingredient');
        }
      })
      .catch(error => console.error('Error deleting ingredient:', error));
  };

  const handleBackToMainMenu = () => {
    navigate("/");
  };

  return (
    <div className="shopping-list-container">
      <h1>Shopping List</h1>
      {ingredients.length === 0 ? (
        <p>No ingredients in the shopping list.</p>
      ) : (
        <>
          <ul>
            {ingredients.map(ingredient => (
              <li key={ingredient.id}>
                <span>{ingredient.ingredient}</span>
                <button onClick={() => handleDelete(ingredient.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="navigation-links">
            <button className="button" onClick={handleBackToMainMenu}>Back to main page</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingList;
