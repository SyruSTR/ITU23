""" Author: Oleg Borshch """

from rest_framework import viewsets
from .serializers import AddRecipeSerializer, TagSerializer, ShoppingListSerializer, MealPlannerSerializer, \
    FavouriteRecipeSerializer
from .models import AddRecipe, Tag, ShoppingList, MealPlanner, FavouriteRecipe
from rest_framework import status
from rest_framework.response import Response


# View for handling AddRecipe model operations (CRUD)
class AddRecipeView(viewsets.ModelViewSet):
    # Uncomment the line below to enforce authentication for this view
    # permission_classes = [IsAuthenticated]

    serializer_class = AddRecipeSerializer
    queryset = AddRecipe.objects.all()

    def create(self, request, *args, **kwargs):
        # Override create method to handle POST requests
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        # Override update method to handle PUT/PATCH requests
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        # Override destroy method to handle DELETE requests
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FavouriteRecipeView(viewsets.ModelViewSet):

    queryset = FavouriteRecipe.objects.all()
    serializer_class = FavouriteRecipeSerializer


# View for handling Tag model operations (CRUD)
class TagView(viewsets.ModelViewSet):

    serializer_class = TagSerializer
    queryset = Tag.objects.all()


# View for handling ShoppingList model operations (CRUD)
class ShoppingListView(viewsets.ModelViewSet):
    serializer_class = ShoppingListSerializer
    queryset = ShoppingList.objects.all()


# View for handling MealPlanner model operations (CRUD)
class MealPlannerView(viewsets.ModelViewSet):
    serializer_class = MealPlannerSerializer
    queryset = MealPlanner.objects.all()

