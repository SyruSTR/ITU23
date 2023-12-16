import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AddRecipe() {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    notes: '',
    tags: [],
    photo: null,
    ingredients: '',
    rating: 1,
    difficulty: 'easy',
    prep_time: 0,
    cook_time: 0,
    number_of_portions: 1,
    tips: '',
  });

  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    // Fetch available tags from the API endpoint
    fetch('http://127.0.0.1:8000/api/tags/')
      .then((response) => response.json())
      .then((data) => {
        setAvailableTags(data);
      })
      .catch((error) => console.error('Error fetching tags:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRecipeData((prevData) => ({ ...prevData, photo: file }));
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setRecipeData((prevData) => ({ ...prevData, tags: selectedTags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in recipeData) {
      if (key === 'tags') {
        recipeData[key].forEach((tag) => {
          formData.append('tags', tag);
        });
      } else {
        formData.append(key, recipeData[key]);
      }
    }

    fetch('http://127.0.0.1:8000/api/add-recipes/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add recipe');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Recipe added successfully:', data);
      })
      .catch((error) => console.error('Error adding recipe:', error));
  };

  return (
    <body>
      <div className="container">
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

          <label htmlFor="tags">Tags</label>
          <select
            id="tags"
            name="tags"
            multiple
            value={recipeData.tags}
            onChange={handleTagChange}
          >
            {availableTags.map((tag) => (
              <option key={tag.id} value={tag.tag_name}>
                {tag.tag_name}
              </option>
            ))}
          </select>

          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
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

          <label htmlFor="tips">Tips</label>
          <input
            type="text"
            id="tips"
            name="tips"
            value={recipeData.tips}
            onChange={handleInputChange}
          />

          <button className="button" type="submit">
            Submit Recipe
          </button>
        </form>
        <Link to="/">Back to Main Page</Link>
      </div>
    </body>
  );
}

export default AddRecipe;
