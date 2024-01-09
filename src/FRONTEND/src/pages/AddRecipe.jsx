// AddRecipe.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Rating from '../components/Rating';

function AddRecipe() {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    notes: '',
    ingredients: '',
    rating: 1,
    difficulty: 'easy',
    prep_time: 0,
    cook_time: 0,
    number_of_portions: 1,
    picture: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();


  const ingredientsArray = recipeData.ingredients.split('\n').map(ingredient => ingredient.trim());

  const formData = new FormData();


  for (const key in recipeData) {
    if (key === 'ingredients') {
      formData.append(key, JSON.stringify(ingredientsArray));
    } else {
      formData.append(key, recipeData[key]);
    }
  }

  try {
    const response = await fetch('http://localhost:8000/api/add-recipes/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }

    const responseData = await response.json();
    console.log('Recipe added successfully:', responseData);

    navigate('/recipe/' + JSON.stringify(responseData['id']));
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

  const handleBackToMainClick = () => {
    navigate('/');
  };

  const handleFileInputChange = (e) => {
    handleInputChange('picture', e.target.files[0]);
  };

  const handleBrowseClick = () => {

    document.getElementById('fileInput').click();
  };

  return (
    <div className="container">
      <Header />
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Name</label>
        <input
            type="text"
            id="name"
            name="name"
            value={recipeData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
        />

        <label htmlFor="description">Description</label>
        <input
            type="text"
            id="description"
            name="description"
            value={recipeData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
        />

        <label htmlFor="notes">Notes</label>
        <textarea
            id="notes"
            name="notes"
            value={recipeData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients</label>
        <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={(e) => handleInputChange('ingredients', e.target.value)}
        />

        <label htmlFor="picture">Picture</label>
        <div className="file-input-container">
          <button
              type="button"
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
            rating={recipeData.rating}
            onChange={(newRating) => handleInputChange('rating', newRating)}
        />

        <label htmlFor="difficulty">Difficulty</label>
        <div className="difficulty-options">
          <button
              type="button"
              className={`difficulty-button easy ${recipeData.difficulty === 'easy' ? 'selected' : ''}`}
              onClick={() => handleInputChange('difficulty', 'easy')}
          >
            Easy
          </button>

          <button
              type="button"
              className={`difficulty-button medium ${recipeData.difficulty === 'medium' ? 'selected' : ''}`}
              onClick={() => handleInputChange('difficulty', 'medium')}
          >
            Medium
          </button>

          <button
              type="button"
              className={`difficulty-button hard ${recipeData.difficulty === 'hard' ? 'selected' : ''}`}
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
            value={recipeData.prep_time}
            onChange={(e) => handleInputChange('prep_time', e.target.value)}
        />

        <label htmlFor="cook-time">Cook time (minutes)</label>
        <input
            type="number"
            id="cook-time"
            name="cook_time"
            value={recipeData.cook_time}
            onChange={(e) => handleInputChange('cook_time', e.target.value)}
        />

        <label htmlFor="portions">Number of portions</label>
        <input
            type="number"
            id="portions"
            name="number_of_portions"
            value={recipeData.number_of_portions}
            onChange={(e) => handleInputChange('number_of_portions', e.target.value)}
        />
        <div className="submit-main">
          <button className="button" type="submit">
            Submit recipe
          </button>
          <button className="button" onClick={handleBackToMainClick}>
            Back to main page
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
