from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AddRecipeSerializer, TagSerializer, ShoppingListSerializer, MealPlannerSerializer
from .models import AddRecipe, Tag, ShoppingList, MealPlanner
from rest_framework import status
from rest_framework.response import Response


# Create your views here.


class AddRecipeView(viewsets.ModelViewSet):

    # permission_classes = [IsAuthenticated]

    serializer_class = AddRecipeSerializer
    queryset = AddRecipe.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TagView(viewsets.ModelViewSet):

    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class ShoppingListView(viewsets.ModelViewSet):

    serializer_class = ShoppingListSerializer
    queryset = ShoppingList.objects.all()


class MealPlannerView(viewsets.ModelViewSet):

    serializer_class = MealPlannerSerializer
    queryset = MealPlanner.objects.all()

