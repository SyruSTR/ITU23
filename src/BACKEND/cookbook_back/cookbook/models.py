
from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


class AddRecipe(models.Model):

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

    def __str__(self):
        return self.name


class Tag(models.Model):

    tag_name = models.CharField(max_length=50)

    def __str__(self):
        return self.tag_name


class ShoppingList(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredients = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shopping List for {self.user.username}"


class MealPlanner(models.Model):

    recipes = models.ManyToManyField(AddRecipe, related_name='meal_planners')
    date = models.DateField()
    meal_type = models.CharField(max_length=50, choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner')])

    def __str__(self):
        return f"Meal Planner for {self.user.username} on {self.date} - {self.meal_type}"







