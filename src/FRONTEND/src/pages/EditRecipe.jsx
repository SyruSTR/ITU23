// Author: Oleg Borshch
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Rating from "../components/Rating";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const [editedRecipe, setEditedRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipe details from the API using the recipe ID from the URL params
    fetch(`http://127.0.0.1:8000/api/add-recipes/${recipeId}/`)
      .then((response) => response.json())
      .then((data) => {
        setEditedRecipe(data);
      })
      .catch((error) => console.error('Error fetching recipe details for editing:', error));
  }, [recipeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/add-recipes/${recipeId}/`, {
        method: 'PUT', // Use PUT for updating an existing resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      console.log('Recipe updated successfully');
      navigate(`/recipe/${recipeId}`); // Redirect to the RecipeDetail page after updating

    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleBackToMyRecipes = () => {
    navigate('/myrecipes');
  };

  const handleFileInputChange = (e) => {
    handleInputChange('picture', e.target.files[0]);
  };

  const handleBrowseClick = () => {
    // Trigger the file input when the styled button is clicked
    document.getElementById('fileInput').click();
  };

  const handleBackToMainClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <Header /> {/* Include the Header component */}
      {editedRecipe && (
          <>
            <h1>Edit Recipe</h1>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={editedRecipe.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
            />

            <label htmlFor="description">Description</label>
            <input
                type="text"
                id="description"
                name="description"
                value={editedRecipe.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
            />

            <label htmlFor="notes">Notes</label>
            <textarea
                id="notes"
                name="notes"
                value={editedRecipe.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
            />

            <label htmlFor="ingredients">Ingredients</label>
            <textarea
                id="ingredients"
                name="ingredients"
                value={editedRecipe.ingredients}
                onChange={(e) => handleInputChange('ingredients', e.target.value)}
            />

            <label htmlFor="picture">Picture</label>
            <div className="file-input-container">
              <button
                  type="button"
                  className="file-input-button"
                  onClick={handleBrowseClick}
              >
                Choose PNG image
              </button>
              <input
                  type="file"
                  id="fileInput"
                  name="picture"
                  onChange={handleFileInputChange}
                  style={{display: 'none'}}
              />
            </div>

            <label htmlFor="rating">Rating</label>
            <Rating
                rating={editedRecipe.rating}
                onChange={(newRating) => handleInputChange('rating', newRating)}
            />

            <label htmlFor="difficulty">Difficulty</label>
            <div className="difficulty-options">
              <button
                  type="button"
                  className={`difficulty-button easy ${editedRecipe.difficulty === 'easy' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('difficulty', 'easy')}
              >
                Easy
              </button>

              <button
                  type="button"
                  className={`difficulty-button medium ${editedRecipe.difficulty === 'medium' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('difficulty', 'medium')}
              >
                Medium
              </button>

              <button
                  type="button"
                  className={`difficulty-button hard ${editedRecipe.difficulty === 'hard' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('difficulty', 'hard')}
              >
                Hard
              </button>
            </div>

            <label htmlFor="prep-time">Prep time (minutes)</label>
            <input
                type="number"
                id="prep-time"
                name="prep_time"
                value={editedRecipe.prep_time}
                onChange={(e) => handleInputChange('prep_time', e.target.value)}
            />

            <label htmlFor="cook-time">Cook time (minutes)</label>
            <input
                type="number"
                id="cook-time"
                name="cook_time"
                value={editedRecipe.cook_time}
                onChange={(e) => handleInputChange('cook_time', e.target.value)}
            />

            <label htmlFor="portions">Number of portions</label>
            <input
                type="number"
                id="portions"
                name="number_of_portions"
                value={editedRecipe.number_of_portions}
                onChange={(e) => handleInputChange('number_of_portions', e.target.value)}
            />

            <div className="recipe-actions">
              <button className="button" type="submit" onClick={handleSaveClick}>
                Save
              </button>
              <button className="button" onClick={handleBackToMainClick}>
                Back to main page
              </button>
            </div>
          </>
      )}
    </div>
  );
};

export default EditRecipe;
