//Authors: Murad Mikogaziev, Oleg Borshch, Nikita Vetluzhskikh

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Grid.css';

export default function Grid() {
  const navigate = useNavigate();

  const navigateAddRecipe = () => {
    navigate('/addrecipe');
  };

  const navigateMyRecipes = () => {
    navigate('/myrecipes');
  };

  const navigateSearch = () => {
    navigate('/search');
  };

  const navigateTags = () => {
    navigate('/tags');
  };

  const navigateFavorites = () => {
    navigate('/favorites');
  };

  const navigateSettings = () => {
    navigate('/settings');
  };

  const navigateMealPlanner = () => {
    navigate('/meal-planner');
  };

  const navigateMyMeals = () => {
    navigate('/my-meals');
  };

  return (
    <div>
      <div className="grid-container">
      <Header /> {/* Include the Header component */}
        <button className="grid-button" onClick={navigateAddRecipe}>
          Add recipe
        </button>
        <button className="grid-button" onClick={navigateMyRecipes}>
          My recipes
        </button>
        <button className="grid-button" onClick={navigateSearch}>
          Search
        </button>
        <button className="grid-button" onClick={navigateTags}>
          Tags
        </button>
        <button className="grid-button" onClick={navigateFavorites}>
          Favorites
        </button>
        <button className="grid-button" onClick={navigateSettings}>
          Settings
        </button>
        <button className="grid-button" onClick={navigateMealPlanner}>
          Meal planner
        </button>
        <button className="grid-button" onClick={navigateMyMeals}>
          My meals
        </button>
      </div>
    </div>
  );
}
