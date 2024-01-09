import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';

function Favorites() {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/add-recipes/');


  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const favorites = data.filter(recipe => recipe.is_favourite);
        setFavoriteRecipes(favorites);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);

  const handleRemoveFromFavorites = async (recipeId) => {
    try {
      const url = `http://127.0.0.1:8000/api/add-recipes/${recipeId}/`;
      const response = await fetch(url, {
        method: 'PATCH', // or 'PUT' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_favourite: false }),
      });

      if (!response.ok) {
        console.error('Failed to remove recipe from favorites');
        return;
      }

      const updatedFavoriteRecipes = favoriteRecipes.filter(recipe => recipe.id !== recipeId);
      setFavoriteRecipes(updatedFavoriteRecipes);

      toast.success('Recipe removed from favorites!', { autoClose: 2000 });
    } catch (error) {
      console.error('Error while removing recipe from favorites', error);

      toast.error('Failed to remove recipe from favorites');
    }
  };

  const handleBackToMainClick = () => {
    navigate('/');
  };

  return (
    <div className="my-recipes">
      <Header />
      <h1>My favorite recipes</h1>
      <ul className="recipe-list">
        {favoriteRecipes.map((recipe) => (
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
                <div className="recipe-actions">
                    <button onClick={() => handleRemoveFromFavorites(recipe.id)}>
                        Remove from favorites
                    </button>
                </div>
            </li>
            ))}
      </ul>
        <div className="navigation-links">
        <button className="button" onClick={handleBackToMainClick}>Back to Main Page</button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Favorites;
