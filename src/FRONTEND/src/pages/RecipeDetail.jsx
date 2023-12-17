import React, { useState, useEffect } from 'react';

const RecipeDetail = ({ match }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details from the API using the recipe ID from the URL params
    fetch(`http://127.0.0.1:8000/api/recipes/${match.params.recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [match.params.recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{recipe.name}</h1>
      <p>Description: {recipe.description}</p>
      <p>Notes: {recipe.notes}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Rating: {recipe.rating}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <p>Prep Time: {recipe.prep_time} minutes</p>
      <p>Cook Time: {recipe.cook_time} minutes</p>
      <p>Number of Portions: {recipe.number_of_portions}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RecipeDetail;
