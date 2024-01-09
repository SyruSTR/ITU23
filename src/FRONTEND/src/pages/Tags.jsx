//Authors: Murad Mikogaziev

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


function Tags() {
    const [tags, setTags] = useState(['Italian', 'Chicken', 'Dessert', 'Vegetarian', 'Healthy']);
    const [selectedTag, setSelectedTag] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);

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
        <div className="tags-page">
            <Header />
            <h1>Tags</h1>
            <div className="tag-list">
                <ul>
                    {tags.map((tag) => (
                        <li key={tag} className={selectedTag === tag ? 'selected' : ''} onClick={() => handleTagClick(tag)}>
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="search-results">
                <h2>Search Results</h2>
                <ul className="recipe-list">
                    {searchResults.map((recipe) => (
                        <li className="recipe-item" key={recipe.id}>
                            <h3>{recipe.name}</h3>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <Link to="/">Back to Main Page</Link>
        </div>
    );
}

export default Tags;
