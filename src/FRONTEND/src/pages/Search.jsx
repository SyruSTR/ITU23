//Authors: Murad Mikogaziev

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Make an API request to search recipes by name
      const response = await fetch(`http://127.0.0.1:8000/api/search-recipes?name=${searchTerm}`);

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-page">
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
      <ul className="search-results">
        {searchResults.map((recipe) => (
          <li className="search-result" key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Main Page</Link>
    </div>
  );
}

export default Search;
