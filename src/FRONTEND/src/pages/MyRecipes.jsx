import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const apiUrl = 'http://localhost:8000/api/add-recipes/'; // Replace with your API URL

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('API response is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  return (
    <div className="my-recipes">
      <h1>My Recipes</h1>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li className="recipe-item" key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Main Page</Link>
    </div>
  );
}

export default MyRecipes;
