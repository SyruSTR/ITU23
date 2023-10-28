import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // Simulated search functionality (replace with actual search logic)
        const results = [
            {
                id: 1,
                name: 'Spaghetti Carbonara',
                description: 'Classic Italian pasta dish',
            },
            {
                id: 2,
                name: 'Chicken Stir-Fry',
                description: 'Delicious stir-fried chicken and vegetables',
            },
        ];
        setSearchResults(results);
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
