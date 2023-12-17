//Authors: Murad Mikogaziev

import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Favorite() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    return (
        <div className="favorite-recipes">
            <h1>Favorite Recipes</h1>
            <ul className="recipe-list">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map((recipe) => (
                        <li className="recipe-item" key={recipe.id}>
                            <h2>{recipe.name}</h2>
                            <p>{recipe.description}</p>
                        </li>
                    ))
                ) : (
                    <p>No favorite recipes found.</p>
                )}
            </ul>
            <Link to="/">Back to Main Page</Link>
        </div>
    );
}

export default Favorite;
