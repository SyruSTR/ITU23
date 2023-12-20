
//Authors: Murad Mikogaziev


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleToggleFavorite = async (recipeId) => {
    try {
      const url = favoritesApiUrl;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipe: recipeId}),
      });

      if (!response.ok) {
        console.error('Failed to add recipe to favorites');
        return;
      }

      // Fetch updated user favorites after adding to favorites
      const updatedResponse = await fetch(favoritesApiUrl);
      const updatedData = await updatedResponse.json();

      setUserFavorites(updatedData.map((favorite) => favorite.recipe));

      // Show success message
      toast.success('Recipe added to favorites!', {autoClose: 2000});
    } catch (error) {
      console.error('Error while adding recipe to favorites', error);

      // Show error message
      toast.error('Failed to add recipe to favorites');
    }
  };

  const handleRemoveFromFavorites = async (favoriteId) => {
  try {
    const url = `${favoritesApiUrl}${favoriteId}/`;

    console.log('Delete URL:', url); // Log the delete URL

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Delete Response:', response); // Log the delete response

    if (!response.ok) {
      console.error('Failed to remove recipe from favorites');
      return;
    }

    // Filter out the removed favorite by id
    const updatedUserFavorites = userFavorites.filter((favorite) => favorite.id !== favoriteId);

    console.log('Updated User Favorites:', updatedUserFavorites); // Log the updated userFavorites

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
                  {userFavorites.includes(recipe.id) ? (
                    <button onClick={() => handleRemoveFromFavorites(recipe.id)}>
                      Remove from Favourites
                    </button>
                  ) : (
                    <button onClick={() => handleToggleFavorite(recipe.id)}>
                      Add to Favourites
                    </button>
                  )}
                </div>
              </li>
          ))}
        </ul>
        <div className="navigation-links">
          <button onClick={handleBackToMainClick}>Back to Main Page</button>
          <button onClick={handleCreateShoppingListClick}>Create a shopping list</button>
        </div>

        {/* Toastify container for notifications */}
        <ToastContainer/>
      </div>
  );
}


export default MyRecipes;
