""" Author: Oleg Borshch """

from rest_framework import serializers
from .models import Tag, AddRecipe, ShoppingList, MealPlanner, FavouriteRecipe


# Serializer for the Tag model
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        # Specify the fields to include in the serialized representation
        fields = ('id', 'tag_name')


# Serializer for the AddRecipe model
class AddRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddRecipe
        # Specify the fields to include in the serialized representation
        fields = ('id', 'name', 'description', 'notes', 'ingredients', 'rating', 'difficulty',
                  'prep_time', 'cook_time', 'number_of_portions', 'is_favourite')


class FavouriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteRecipe
        fields = '__all__'


# Serializer for the ShoppingList model
class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList
        # Specify the fields to include in the serialized representation
        fields = ('id', 'user', 'ingredients', 'created_at')


# Serializer for the MealPlanner model
class MealPlannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlanner
        # Specify the fields to include in the serialized representation
        fields = ('id', 'recipes', 'date', 'meal_type')








