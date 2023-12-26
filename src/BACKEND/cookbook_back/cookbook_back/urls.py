"""
URL configuration for cookbook_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

"""Author: Oleg Borshch"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from cookbook import views
from cookbook_back import settings

router = routers.DefaultRouter()
router.register(r'add-recipes', views.AddRecipeView, 'add-recipe')
router.register(r'favourite-recipe', views.FavouriteRecipeView, 'favourite-recipe')
router.register(r'tags', views.TagView, 'tag')
router.register(r'shopping-list', views.ShoppingListView, 'shopping-list')
router.register(r'meal-planner', views.MealPlannerView, 'meal-planner')
router.register(r'user-profile', views.UserProfileView, 'user-profile')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
