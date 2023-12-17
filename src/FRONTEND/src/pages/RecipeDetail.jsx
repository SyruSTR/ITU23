// RecipeDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipe details from the API using the recipe ID from the URL params
    fetch(`http://127.0.0.1:8000/api/add-recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [recipeId]);

  const handleEditClick = () => {
    navigate(`/recipe/${recipeId}/edit-recipe`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="recipe-detail-container">
      {recipe && (
        <div className="grid-container">
          <h1>{recipe.name}</h1>
          <div className="grid-item recipe-detail-description">Description: {recipe.description}</div>
          <div className="grid-item recipe-detail-notes">Notes: {recipe.notes}</div>
          <div className="grid-item recipe-detail-ingredients">Ingredients: {recipe.ingredients}</div>
          <div className="grid-item recipe-detail-rating">Rating: {recipe.rating}</div>
          <div className="grid-item recipe-detail-difficulty">Difficulty: {recipe.difficulty}</div>
          <div className="grid-item recipe-detail-prep-time">Prep Time: {recipe.prep_time} minutes</div>
          <div className="grid-item recipe-detail-cook-time">Cook Time: {recipe.cook_time} minutes</div>
          <div className="grid-item recipe-detail-portions">Number of Portions: {recipe.number_of_portions}</div>
          {/* Add more details as needed */}
          <div className="grid-item button-container">
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
            <button className="edit-button" onClick={handleBackClick}>Back to Main Page</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
