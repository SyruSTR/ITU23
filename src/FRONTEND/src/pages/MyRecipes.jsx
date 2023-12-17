
//Authors: Murad Mikogaziev


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const apiUrl = 'http://localhost:8000/api/add-recipes/';
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('API response is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/add-recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to delete recipe');
        return;
      }

      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error while deleting recipe', error);
    }
  };

  const handleBackToMainClick = () => {
    navigate('/');
  };

  const handleCreateShoppingListClick = () => {
    navigate('/myrecipes/shopping-list');
  };

  return (
    <div className="my-recipes">
      <h1>My Recipes</h1>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li className="recipe-item" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <div className="recipe-details">
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
              </div>
            </Link>
            <div className="recipe-actions">
              <button onClick={() => handleDeleteRecipe(recipe.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="navigation-links">
        <button onClick={handleBackToMainClick}>Back to Main Page</button>
        <button onClick={handleCreateShoppingListClick}>Create a shopping list</button>
      </div>
    </div>
  );
}

export default MyRecipes;
