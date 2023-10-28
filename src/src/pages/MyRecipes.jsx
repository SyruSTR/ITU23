import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);

    // Simulated recipe data (you can replace this with actual data)
    const initialRecipes = [
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

    useEffect(() => {
        // Simulated fetching of user's recipes (replace with actual API call)
        setRecipes(initialRecipes);
    }, []);

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
