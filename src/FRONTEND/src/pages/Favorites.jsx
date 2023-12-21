//Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';

const Favorite = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const favoriteResponse = await fetch('http://127.0.0.1:8000/api/favourite-recipe/');
        const recipesResponse = await fetch('http://127.0.0.1:8000/api/add-recipes/');

        if (!favoriteResponse.ok || !recipesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const favoriteData = await favoriteResponse.json();
        const recipesData = await recipesResponse.json();

        setFavoriteRecipes(favoriteData);
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipesData();
  }, []);


  const getRecipeNameById = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    return recipe ? recipe.name : 'Recipe not found';
  };

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <ul>
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.recipe}>
            {getRecipeNameById(recipe.recipe)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
