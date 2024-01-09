// Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import {toast} from "react-toastify";


function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [apiUrl] = useState('http://localhost:8000/api/add-recipes/');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);



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
            setAllRecipes(data);
          } else {
            console.error('API response is not an array:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  }, [apiUrl]);

  const handleSearch = () => {
    const results = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleBackToMainClick = () => {
    navigate('/');
  };

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


      setAllRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
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
      body: JSON.stringify({ is_favourite: true }),
    });

    if (!response.ok) {
      console.error('Failed to add recipe to favorites');
      return;
    }


    const updatedRecipes = allRecipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, is_favourite: true };
      }
      return recipe;
    });

    setAllRecipes(updatedRecipes);


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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_favourite: false }),
    });

    if (!response.ok) {
      console.error('Failed to remove recipe from favorites');
      return;
    }


    const updatedRecipes = allRecipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, is_favourite: false };
      }
      return recipe;
    });

    const updatedFavoriteRecipes = favoriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );

    setAllRecipes(updatedRecipes);
    setFavoriteRecipes(updatedFavoriteRecipes);


    toast.success('Recipe removed from favorites!', { autoClose: 2000 });
  } catch (error) {
    console.error('Error while removing recipe from favorites', error);

    // Show error message
    toast.error('Failed to remove recipe from favorites');
  }
};

  return (
    <div className="search-page">
      <Header />
      <h1>Search Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 ? (
          <ul className="recipe-list">
            {searchResults.map((recipe) => (
                <li className="recipe-item" key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                    <div className="recipe-details">
                      {recipe.picture && <img src={recipe.picture} alt={recipe.name} className="recipe-image"/>}
                      <div className="text-details">
                        <h2 className="recipe-name">{recipe.name}</h2>
                        <p className="recipe-description">{recipe.description}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="recipe-actions" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleDeleteRecipe(recipe.id)}>
                      Delete
                    </button>
                    {recipe.is_favourite ? (
                        <button onClick={() => handleRemoveFromFavorites(recipe.id)}>
                          Remove from favorites
                        </button>
                    ) : (
                        <button onClick={() => handleToggleFavorite(recipe.id)}>
                          Add to favorites
                        </button>
                    )}
                  </div>
                </li>
            ))}
          </ul>
      ) : (
          <p>No results found</p>
      )}
      <div className="navigation-links">
        <button onClick={handleBackToMainClick}>Back to main page</button>
      </div>
    </div>
  );
}

export default Search;
