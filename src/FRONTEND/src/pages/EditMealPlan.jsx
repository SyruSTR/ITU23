// Authors: Nikita Vetluzhskikh
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const EditMealPlan = () => {
  const { id } = useParams();
  const [mealPlanner, setMealPlanner] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({ date: '', meal_type: '', recipes: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealPlannerResponse = await fetch(`http://127.0.0.1:8000/api/meal-planner/${id}/`);
        const mealPlannerData = await mealPlannerResponse.json();
        setMealPlanner(mealPlannerData);

        const recipesResponse = await fetch('http://127.0.0.1:8000/api/add-recipes/');
        const recipesData = await recipesResponse.json();
        setRecipes(recipesData);


        setFormData({
          date: mealPlannerData.date,
          meal_type: mealPlannerData.meal_type,
          recipes: mealPlannerData.recipes,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => {
      if (type === 'checkbox') {

        if (prevFormData.recipes.includes(value)) {
          return {
            ...prevFormData,
            recipes: prevFormData.recipes.filter((id) => id !== value),
          };
        } else {
          return {
            ...prevFormData,
            recipes: [...prevFormData.recipes, value],
          };
        }
      } else {
        // Handle other input changes
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleUpdateMealPlanner = async () => {
    try {

      const updatedFormData = {
        ...formData,
        recipes: formData.recipes.map(id => Number(id)),
      };

      const response = await fetch(`http://127.0.0.1:8000/api/meal-planner/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        console.log('Meal Planner updated successfully');

        navigate(`/meal-planner/my-meals/meal-details/${id}`);
      } else {
        console.error('Failed to update Meal Planner');
      }
    } catch (error) {
      console.error('Error updating Meal Planner:', error);
    }
  };

  const handleBackToMeal = () => {
    navigate(`/meal-planner/my-meals/meal-details/${id}`);
  };

  if (!mealPlanner || !recipes.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <Header /> {/* Include the Header component */}
      <h1>Edit Meal Plan</h1>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} />

      <label htmlFor="mealType">Meal Type:</label>
      <select id="mealType" name="meal_type" value={formData.meal_type} onChange={handleInputChange}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>

      <label htmlFor="recipes">Recipes:</label>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <label>
              <input
                type="checkbox"
                id={`recipe-${recipe.id}`}
                name="recipes"
                value={String(recipe.id)}
                checked={formData.recipes.includes(String(recipe.id))}
                onChange={handleInputChange}
              />
              {recipe.name}
            </label>
          </li>
        ))}
      </ul>
      <div className="recipe-actions">
        <button onClick={handleBackToMeal}>Back to meal</button>
        <button onClick={handleUpdateMealPlanner}>Save</button>
      </div>
    </div>
  );
};

export default EditMealPlan;
