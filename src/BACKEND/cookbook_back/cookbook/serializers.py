from rest_framework import serializers
from .models import AddRecipe, Tag, ShoppingList, MealPlanner


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'tag_name')


class AddRecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AddRecipe
        fields = ('id', 'name', 'description', 'notes', 'photo', 'tags', 'ingredients', 'rating', 'difficulty',
                  'prep_time', 'cook_time', 'number_of_portions', 'added_by')


class ShoppingListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShoppingList
        fields = ('id', 'user', 'ingredients', 'created_at')


class MealPlannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = MealPlanner
        fields = ('id', 'user', 'recipes', 'date', 'meal_type')











