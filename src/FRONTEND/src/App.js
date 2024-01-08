//Authors: Murad Mikogaziev, Oleg Borshch, Nikita Vetluzhskikh

import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import Home from "./pages/Home"
import Search from "./pages/Search";
import Tags from "./pages/Tags";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import AddShoppingList from "./pages/AddShoppingList";
import RecipeDetail from "./pages/RecipeDetail";
import MealDetails from "./pages/MealDetails";
import MealPlanner from "./pages/MealPlanner"
import MyMeals from "./pages/MyMeals"
import EditMealPlan from "./pages/EditMealPlan";
import EditRecipe from "./pages/EditRecipe";

function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addrecipe" element={<AddRecipe />} />
                <Route path="/myrecipes" element={<MyRecipes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
                <Route path="/meal-planner" element={<MealPlanner />} />
                <Route path="/my-meals" element={<MyMeals />} />
                <Route path="/my-meals/meal-details/:id" element={<MealDetails />} />
                <Route path="/meal-planner/my-meals" element={<MyMeals />} />
                <Route path="/meal-planner/my-meals/meal-details/:id" element={<MealDetails />} />
                <Route path="/meal-planner/my-meals/meal-details/:id/edit-meal/:id" element={<EditMealPlan />} />
                <Route path="/myrecipes/recipe/:recipeId/add-shopping-list" element={<AddShoppingList />} />
                <Route path="/recipe/:recipeId/edit-recipe" element={<EditRecipe />} />
            </Routes>
        </Router>
    );
}

export default App;
