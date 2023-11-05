import "../App.css";
import {Link} from "react-router-dom";
import React from "react";

function AddRecipe () {
    return(
    <body>
        <div className="container">
            <h1>Add Recipe</h1>
            <form action="#" method="POST" encType="multipart/form-data">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" required></input>

                <label htmlFor="notes">Notes</label>
                <input type="text" id="notes" name="notes"></input>

                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" />

                <label htmlFor="photo">Photo</label>
                <input type="file" id="photo" name="photo" accept="image/*" />

                <label htmlFor="ingredient">Ingredients</label>
                <input type="text" id="ingredient" name="ingredient" />

                <label htmlFor="rating">Rating</label>
                <input type="number" id="rating" name="rating" min="1" max="5"/>

                <label htmlFor="difficulty">Difficulty</label>
                <select id="difficulty" name="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label htmlFor="prep-time">Prep time (minutes)</label>
                <input type="number" id="prep-time" name="prep-time" />

                <label htmlFor="cook-time">Cook time (minutes)</label>
                <input type="number" id="cook-time" name="cook-time" />

                <label htmlFor="portions">Amount of portions</label>
                <input type="number" id="portions" name="portions" />

                <label htmlFor="tips">Tips</label>
                <input type="text" id="tips" name="tips"></input>

                <button className="button" type="submit">Submit Recipe</button>
            </form>
            <Link to="/">Back to Main Page</Link>
        </div>
    </body>
    );
}

export default AddRecipe;