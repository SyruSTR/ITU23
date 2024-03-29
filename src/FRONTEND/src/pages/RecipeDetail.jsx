//Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Rating from '../components/Rating';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate('/myrecipes');
  };

  const renderIngredients = () => {
    if (recipe && recipe.ingredients) {
      let ingredientsArray = recipe.ingredients.split('","');
      ingredientsArray = ingredientsArray.map(ingredient => ingredient.replace(/["[\]\s]/g, '').trim());

      return (
        <ul className="ul-ingrs-notes">
          {ingredientsArray.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <div className="ingredient-name">
                {ingredient}
              </div>
              <button
                className="add-to-list-button"
                onClick={() => handleAddToShoppingList(ingredient)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </ul>
      );
    }
    return null;
  };

  const renderNotes = () => {
    if (recipe && recipe.notes) {
      let notesArray = recipe.notes.split('","');
      notesArray = notesArray.map(note => note.replace(/["[\]\s]/g, '').trim());

      return (
        <ul className="ul-ingrs-notes">
          {notesArray.map((note, index) => (
            <div key={index} className="ingredient-item">
              <div className="ingredient-name">
                {note}
              </div>
            </div>
          ))}
        </ul>
      );
    }
    return null;
  };

  const handleAddToShoppingList = (ingredient) => {
    const newIngredient = {
      id: selectedIngredients.length + 1,
      ingredient: ingredient,
    };

    setSelectedIngredients([...selectedIngredients, newIngredient]);

    fetch('http://127.0.0.1:8000/api/shopping-list/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIngredient),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Ingredient added to shopping list:', data);
      })
      .catch((error) =>
        console.error('Error adding ingredient to shopping list:', error)
      );
  };

  const renderRating = () => {
    const rating = parseInt(recipe.rating, 10);
    const circles = Array.from({ length: rating }, (_, index) => (
      <span key={index} className="circle" style={{ backgroundColor: 'green' }} />
    ));

    return <div className="rating-container">{circles}</div>;
  };

  return (
    <div className="recipe-detail-container">
      <Header />
      {recipe && (
          <div className="recipe-details-wrapper">
            <div className="pic-desc">
              {recipe.picture && (<img src={recipe.picture} alt={recipe.name} className="recipe-detail-image"/>)}
              <div className="recipe-detail-description">
                <h1 className="recipe-detail-name">{recipe.name}</h1>
                <div className="dif-rat">
                  <div className="recipe-detail-difficulty">Difficulty: {recipe.difficulty}</div>
                  <div className="recipe-detail-rating">Rating: {renderRating()}</div>
                </div>
                <div className="prep-cook-port">
                  <div className="recipe-detail-prep-time">Prep: {recipe.prep_time} min</div>
                  <div className="recipe-detail-cook-time">Cook: {recipe.cook_time} min</div>
                  <div className="recipe-detail-portions">Portions: {recipe.number_of_portions}</div>
                </div>
              </div>
            </div>

            <div className="recipe-detail-bottom"></div>
            <div className="notes-ingr-title">
              <div>Ingredients</div>
              <div>Notes</div>
            </div>
            <div className="notes-ingr-desc">
              <div className="recipe-ingrs">{renderIngredients()}</div>
              <div className="recipe-notes">{renderNotes()}</div>
            </div>

            <div className="recipe-actions">
              <button className="button" onClick={handleEditClick}>Edit</button>
              <button className="button" onClick={handleBackClick}>Back to recipes</button>
            </div>
          </div>
      )}
    </div>
  );
};

export default RecipeDetail;
