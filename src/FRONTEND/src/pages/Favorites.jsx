// Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const apiUrl = 'http://localhost:8000/api/add-recipes/';
  const favoritesApiUrl = 'http://localhost:8000/api/favourite-recipe/';
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's favorite recipes
    fetch(favoritesApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUserFavorites(data.map((favorite) => favorite.recipe));
      })
      .catch((error) => {
        console.error('Error fetching user favorites:', error);
      });

    // Fetch all recipes
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
  }, [apiUrl, favoritesApiUrl]);

  const handleRemoveFromFavorites = async (favoriteId) => {
    try {
      const url = `${favoritesApiUrl}${favoriteId}/`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to remove recipe from favorites');
        return;
      }

      // Filter out the removed favorite by id
      const updatedUserFavorites = userFavorites.filter((favorite) => favorite.id !== favoriteId);
      setUserFavorites(updatedUserFavorites);

      // Show success message
      toast.success('Recipe removed from favorites!', { autoClose: 2000 });
    } catch (error) {
      console.error('Error while removing recipe from favorites', error);

      // Show error message
      toast.error('Failed to remove recipe from favorites');
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
      <Header /> {/* Include the Header component */}
      <h1>Favorite recipes</h1>
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
              <button onClick={() => handleRemoveFromFavorites(recipe.id)}>
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="navigation-links">
        <button onClick={handleBackToMainClick}>Back to Main Page</button>
        <button onClick={handleCreateShoppingListClick}>Create a shopping list</button>
      </div>

      {/* Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default MyRecipes;
