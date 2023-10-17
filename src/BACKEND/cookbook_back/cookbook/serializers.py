from rest_framework import serializers
from .models import Recipe, AddRecipe, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'tag_name')


class AddRecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AddRecipe
        fields = ('id', 'name', 'description', 'notes', 'photo', 'tags', 'ingredients', 'rating', 'difficulty',
                  'prep_time', 'cook_time', 'number_of_portions', 'added_by')




class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'notes', 'photo', 'tags', 'ingredients', 'rating', 'difficulty',
                  'prep_time', 'cook_time', 'number_of_portions', 'added_by')
        read_only_fields = ('added_by',)






