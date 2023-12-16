import './App.css';

import React, { Component } from 'react';
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
import ShoppingList from "./pages/Shopping-List";


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
                <Route path="/myrecipes/shopping-list" element={<ShoppingList />} />
            </Routes>
        </Router>
    );
}

export default App;
