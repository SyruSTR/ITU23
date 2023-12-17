//Authors: Murad Mikogaziev, Oleg Borshch, Nikita Vetluzhskikh

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

    const navigateRecipeDetail = () => {
        navigate("/addrecipe");
    }

    const navigateMealPlanner = () => {
        navigate("/meal-planner")
    }



  return (
    <div className="container">
      <button className={"grid-button"} onClick={navigateAddRecipe}>Add recipe</button>
      <button className={"grid-button"} onClick={navigateMyRecipes}>My recipes</button>
      <button className={"grid-button"} onClick={navigateSearch}>Search</button>
      <button className={"grid-button"} onClick={navigateTags}>Tags</button>
      <button className={"grid-button"} onClick={navigateFavorites}>Favorites</button>
      <button className={"grid-button"} onClick={navigateSettings}>Settings</button>
      <button className={"grid-button"} onClick={navigateMealPlanner}>Meal planner</button>
    </div>
  )
}