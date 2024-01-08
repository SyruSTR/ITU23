//Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

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
      <Header />
      {recipe && (
        <div className="grid-container">
          <h1>{recipe.name}</h1>
          {/* Add the following lines to display the picture */}
          {recipe.picture && (
            <div className="grid-item recipe-detail-picture">
              <img src={recipe.picture} alt={recipe.name} className="recipe-image" />
            </div>
          )}
          <div className="grid-item recipe-detail-description">Description: {recipe.description}</div>
          <div className="grid-item recipe-detail-notes">Notes: {recipe.notes}</div>
          <div className="grid-item recipe-detail-ingredients">Ingredients: {recipe.ingredients}</div>
          <div className="grid-item recipe-detail-rating">Rating: {recipe.rating}</div>
          <div className="grid-item recipe-detail-difficulty">Difficulty: {recipe.difficulty}</div>
          <div className="grid-item recipe-detail-prep-time">Prep time: {recipe.prep_time} minutes</div>
          <div className="grid-item recipe-detail-cook-time">Cook time: {recipe.cook_time} minutes</div>
          <div className="grid-item recipe-detail-portions">Number of portions: {recipe.number_of_portions}</div>
          <div className="submit-main">
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
            <button className="edit-button" onClick={handleBackClick}>Back to recipes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
