import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setRecipeData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else if (e.key === 'Enter' && e.target.tagName.toLowerCase() === 'textarea') {
      e.preventDefault();
      const updatedValue = `${value}\n`;
      setRecipeData((prevData) => ({ ...prevData, [name]: updatedValue }));
    } else {
      setRecipeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in recipeData) {
      formData.append(key, recipeData[key]);
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
            onChange={handleInputChange}
            required
        />

        <label htmlFor="description">Description</label>
        <input
            type="text"
            id="description"
            name="description"
            value={recipeData.description}
            onChange={handleInputChange}
            required
        />

        <label htmlFor="notes">Notes</label>
        <input
            type="text"
            id="notes"
            name="notes"
            value={recipeData.notes}
            onChange={handleInputChange}
        />

        <label htmlFor="ingredients">Ingredients</label>
        <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleInputChange}
        />

        <label htmlFor="rating">Rating</label>
        <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={recipeData.rating}
            onChange={handleInputChange}
        />

        <label htmlFor="difficulty">Difficulty</label>
        <select
            id="difficulty"
            name="difficulty"
            value={recipeData.difficulty}
            onChange={handleInputChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="prep-time">Prep time (minutes)</label>
        <input
            type="number"
            id="prep-time"
            name="prep_time"
            value={recipeData.prep_time}
            onChange={handleInputChange}
        />

        <label htmlFor="cook-time">Cook time (minutes)</label>
        <input
            type="number"
            id="cook-time"
            name="cook_time"
            value={recipeData.cook_time}
            onChange={handleInputChange}
        />

        <label htmlFor="portions">Amount of portions</label>
        <input
            type="number"
            id="portions"
            name="number_of_portions"
            value={recipeData.number_of_portions}
            onChange={handleInputChange}
        />

        <label htmlFor="picture">Picture</label>
        <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleInputChange}
        />

        <button className="button" type="submit">
          Submit Recipe
        </button>
      </form>
      <button className="button" onClick={handleBackToMainClick}>
        Back to Main Page
      </button>
    </div>
  );
}

export default AddRecipe;
