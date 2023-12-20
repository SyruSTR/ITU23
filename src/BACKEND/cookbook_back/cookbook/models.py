""" Author: Oleg Borshch """


from django.db import models
from django.contrib.auth import get_user_model

# Import the User model dynamically to support custom user models
User = get_user_model()


# Model representing a recipe
class AddRecipe(models.Model):
    # Fields for recipe details
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    ingredients = models.TextField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    difficulty = models.CharField(max_length=50, null=True, blank=True)
    prep_time = models.PositiveIntegerField(null=True, blank=True)
    cook_time = models.PositiveIntegerField(null=True, blank=True)
    number_of_portions = models.PositiveIntegerField(null=True, blank=True)
    tips = models.TextField(null=True, blank=True)
    is_favourite = models.BooleanField(default=False)

    def __str__(self):
        # Return a human-readable representation of the recipe
        return self.name


class FavouriteRecipe(models.Model):

    recipe = models.ForeignKey(AddRecipe, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.recipe.name}"


# Model representing a tag for categorizing recipes
class Tag(models.Model):
    # Field for tag name
    tag_name = models.CharField(max_length=50)

    def __str__(self):
        # Return a human-readable representation of the tag
        return self.tag_name


# Model representing a user's shopping list
class ShoppingList(models.Model):
    # Associate the shopping list with a user using a foreign key
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredients = models.TextField()  # Field for storing the list of ingredients
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set creation timestamp

    def __str__(self):
        # Return a human-readable representation of the shopping list
        return f"Shopping List for {self.user.username}"


# Model representing a meal planner for a user
class MealPlanner(models.Model):
    # Many-to-many relationship with AddRecipe for planned recipes
    recipes = models.ManyToManyField(AddRecipe, related_name='meal_planners')
    date = models.DateField()  # Field for specifying the date of the meal plan
    meal_type = models.CharField(max_length=50, choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner')])

    def __str__(self):
        # Return a human-readable representation of the meal planner
        return f"Meal Planner for {self.user.username} on {self.date} - {self.meal_type}"







