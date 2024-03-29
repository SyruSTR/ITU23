from django.contrib import admin
from .models import AddRecipe, Tag
# Register your models here.


@admin.register(AddRecipe)
class AddRecipeAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'description', 'notes', 'ingredients', 'rating', 'difficulty',
                   'prep_time', 'cook_time', 'number_of_portions')
    list_display_links = ('id', 'name')
    ordering = ('id', )

    def description_short(self, obj: AddRecipe) -> str:
        if len(obj.description) < 48:
            return obj.description
        return obj.description[:48] + '...'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):

    list_display = ('id', 'tag_name',)



