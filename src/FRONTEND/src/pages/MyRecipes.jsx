//Authors: Murad Mikogaziev


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';


function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/add-recipes/'); // Use state for apiUrl
    const navigate = useNavigate();

  useEffect(() => {

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

const handleToggleFavorite = async (recipeId) => {
  try {
    const url = `http://localhost:8000/api/add-recipes/${recipeId}/`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_favourite: true }), // Set is_favourite to true
    });

    if (!response.ok) {
      console.error('Failed to add recipe to favorites');
      return;
    }

    // Update the state to reflect the changes
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, is_favourite: true };
      }
      return recipe;
    });

    setRecipes(updatedRecipes);

    // Show success message
    toast.success('Recipe added to favorites!', { autoClose: 2000 });
  } catch (error) {
    console.error('Error while adding recipe to favorites', error);

    // Show error message
    toast.error('Failed to add recipe to favorites');
  }
};


  const handleRemoveFromFavorites = async (recipeId) => {
  try {
    const url = `http://127.0.0.1:8000/api/add-recipes/${recipeId}/`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_favourite: false }),
    });

    if (!response.ok) {
      console.error('Failed to remove recipe from favorites');
      return;
    }

    // Update the state to reflect the changes in both recipes and favoriteRecipes
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, is_favourite: false };
      }
      return recipe;
    });

    const updatedFavoriteRecipes = favoriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );

    setRecipes(updatedRecipes);
    setFavoriteRecipes(updatedFavoriteRecipes);

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

  const handleSearch = () => {
    navigate('/myrecipes/search');
  };

return (
    <div className="my-recipes">
      <Header />
      <h1>My Recipes</h1>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li className="recipe-item" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <div className="recipe-details">
                {recipe.picture && <img src={recipe.picture} alt={recipe.name} className="recipe-image" />}
                <div className="text-details">
                  <h2 className="recipe-name">{recipe.name}</h2>
                  <p className="recipe-description">{recipe.description}</p>
                </div>
              </div>
            </Link>
              <div className="recipe-actions" onClick={(e) => e.stopPropagation()}>
                <button  onClick={() => handleDeleteRecipe(recipe.id)}>
                  Delete
                </button>
                {recipe.is_favourite ? (
                  <button onClick={() => handleRemoveFromFavorites(recipe.id)}>
                    Remove from favorites
                  </button>
                ) : (
                  <button  onClick={() => handleToggleFavorite(recipe.id)}>
                    Add to favorites
                  </button>
                )}
              </div>
          </li>
        ))}
      </ul>
      <div className="navigation-links">
        <button onClick={handleBackToMainClick}>Back to main page</button>
        <button onClick={handleSearch}>Recipe search</button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default MyRecipes;
