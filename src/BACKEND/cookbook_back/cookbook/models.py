from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


class AddRecipe(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField()
    notes = models.TextField()
    photo = models.ImageField(upload_to='recipe_photos/', null=True, blank=True)
    tags = models.ManyToManyField('Tag', related_name='add_recipes', blank=True)
    ingredients = models.TextField()
    rating = models.FloatField(null=True, blank=True)
    difficulty = models.CharField(max_length=50, null=True, blank=True)
    prep_time = models.CharField(max_length=50, null=True, blank=True)
    cook_time = models.CharField(max_length=50, null=True, blank=True)
    number_of_portions = models.PositiveIntegerField(null=True, blank=True)
    tips = models.TextField(null=True, blank=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Recipe(models.Model):

    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    notes = models.TextField()
    photo = models.ImageField(upload_to='recipe_photos/', null=True, blank=True)
    tags = models.ManyToManyField('Tag', related_name='recipes', blank=True)
    ingredients = models.TextField()
    rating = models.FloatField(null=True, blank=True)
    difficulty = models.CharField(max_length=50, null=True, blank=True)
    prep_time = models.CharField(max_length=50, null=True, blank=True)
    cook_time = models.CharField(max_length=50, null=True, blank=True)
    number_of_portions = models.PositiveIntegerField(null=True, blank=True)
    tips = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name.name


class Tag(models.Model):

    tag_name = models.CharField(max_length=50)

    def __str__(self):
        return self.tag_name









