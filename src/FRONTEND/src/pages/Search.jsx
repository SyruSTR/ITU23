// Authors: Murad Mikogaziev

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/add-recipes/');

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const recipes = await response.json();
        setAllRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleSearch = () => {
    const results = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="search-page">
      <Header />
      <h1>Search Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 ? (
        <ul className="search-results">
          {searchResults.map((recipe) => (
            <li className="search-result" key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              {/* Additional information can be displayed as needed */}
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Rating: {recipe.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      <Link to="/">Back to Main Page</Link>
    </div>
  );
}

export default Search;
