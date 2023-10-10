import React from "react";
import "./Grid.css"
import {useNavigate} from "react-router-dom";

export default function Grid () {
    const navigate = useNavigate();

    const navigateAddRecipe = () => {
        navigate("/addrecipe");
    }

    const navigateHome = () => {
        navigate("/")
    }

    const navigateMyRecipes = () => {
        navigate("/myrecipes")
    }

    const navigateSearch = () => {
        navigate("/search")
    }

    const navigateTags = () => {
        navigate("/tags")
    }

    const navigateFavorites = () => {
        navigate("/favorites")
    }

    const navigateSettings = () => {
        navigate("/settings")
    }

  return (
    <div className="container">
      <button onClick={navigateAddRecipe}>Add recipe</button>
      <button onClick={navigateMyRecipes}>My recipes</button>
      <button onClick={navigateSearch}>Search</button>
      <button onClick={navigateTags}>Tags</button>
      <button onClick={navigateFavorites}>Favorites</button>
      <button onClick={navigateSettings}>Settings</button>
    </div>
  )
}