//Authors: Oleg Borshch

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/shopping-list/')
      .then(response => response.json())
      .then(data => setShoppingList(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleRemoveIngredient = (itemId, ingredientIndex) => {
    // Make a request to your API to remove the ingredient
    fetch(`http://localhost:8000/api/remove-ingredient/${itemId}/${ingredientIndex}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // If the API request is successful, update the state
          const updatedShoppingList = shoppingList.map(item => {
            if (item.id === itemId) {
              const ingredients = item.ingredients.split(',');
              ingredients.splice(ingredientIndex, 1);
              item.ingredients = ingredients.join(',');
            }
            return item;
          });
          setShoppingList(updatedShoppingList);
        } else {
          console.error('Error removing ingredient:', response.statusText);
        }
      })
      .catch(error => console.error('Error removing ingredient:', error));
  };

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id} <br />
            <strong>Ingredients:</strong>
            <ul>
              {item.ingredients.split(',').map((ingredient, index) => (
                <li key={index}>
                  {ingredient}{' '}
                  <button onClick={() => handleRemoveIngredient(item.id, index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <strong>Created At:</strong> {item.created_at} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
