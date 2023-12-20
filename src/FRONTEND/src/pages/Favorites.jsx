//Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';

const Favorite = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/favourite-recipe/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFavoriteRecipes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <ul>
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
