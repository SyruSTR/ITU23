""" Author: Oleg Borshch """

from rest_framework import serializers
from .models import Tag, AddRecipe, ShoppingList, MealPlanner, FavouriteRecipe, UserProfile, User


# Serializer for the Tag model
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag

        fields = ('id', 'tag_name')


class UserProfileSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        user = User.objects.create(username=username)
        user.set_password(password)
        user.save()

        profile = UserProfile.objects.create(user=user, **validated_data)

        return profile


# Serializer for the AddRecipe model
class AddRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddRecipe

        fields = ('id', 'name', 'description', 'notes', 'ingredients', 'rating', 'difficulty',
                  'prep_time', 'cook_time', 'number_of_portions', 'is_favourite', 'picture')


class FavouriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteRecipe
        fields = '__all__'


# Serializer for the AddShoppingList model
class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList

        fields = ('id', 'ingredient')


# Serializer for the MealPlanner model
class MealPlannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlanner

        fields = ('id', 'recipes', 'date', 'meal_type')








