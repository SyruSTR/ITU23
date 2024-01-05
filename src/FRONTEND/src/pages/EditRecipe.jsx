// Author: Oleg Borshch
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

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

  return (
    <div className="container">
      <Header /> {/* Include the Header component */}
      {editedRecipe && (
        <>
          <h1>Edit Recipe</h1>
            <label htmlFor="editedName">Name</label>
            <input
                type="text"
                id="editedName"
                name="name"
                value={editedRecipe.name}
                onChange={handleInputChange}
            />

            <label htmlFor="editedDescription">Description</label>
            <input
                type="text"
                id="editedDescription"
                name="description"
                value={editedRecipe.description}
                onChange={handleInputChange}
            />

            <label htmlFor="editedNotes">Notes</label>
            <input
                type="text"
                id="editedNotes"
                name="notes"
                value={editedRecipe.notes}
                onChange={handleInputChange}
            />

            <label htmlFor="editedIngredients">Ingredients</label>
            <input
                type="text"
                id="editedIngredients"
                name="ingredients"
                value={editedRecipe.ingredients}
                onChange={handleInputChange}
            />

            <label htmlFor="editedRating">Rating</label>
            <input
                type="text"
                id="editedRating"
                name="rating"
                value={editedRecipe.rating}
                onChange={handleInputChange}
            />

            <label htmlFor="editedDifficulty">Difficulty</label>
            <select
                id="difficulty"
                name="difficulty"
                value={editedRecipe.difficulty}
                onChange={handleInputChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <label htmlFor="editedPreptime">Prep time</label>
            <input
                type="number"
                id="editedPreptime"
                name="prep_time"
                value={editedRecipe.prep_time}
                onChange={handleInputChange}
            />

            <label htmlFor="editedCooktime">Cook time</label>
            <input
                type="number"
                id="editedCooktime"
                name="cook_time"
                value={editedRecipe.cook_time}
                onChange={handleInputChange}
            />

            <label htmlFor="editedPortions">Number of portions</label>
            <input
                type="number"
                id="editedPortions"
                name="number_of_portions"
                value={editedRecipe.number_of_portions}
                onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleBackToMyRecipes}>Back to My Recipes</button>
          </>
      )}
    </div>
  );
};

export default EditRecipe;
