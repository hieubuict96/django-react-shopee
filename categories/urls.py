from django.urls import path

from .views import *

urlpatterns = [
    path('create-category', CreateCategory.as_view()),
    path("get-category", GetCategory.as_view())
]