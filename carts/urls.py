from django.urls import path

from .views import *

urlpatterns = [
    path('add-to-cart', AddToCart.as_view()),
    path('get-cart', GetCart.as_view()),
    path('reduce-qtt', ReduceQtt.as_view()),
    path('increase-qtt', IncreaseQtt.as_view()),
    path('delete-product', DeleteProduct.as_view()),
    path('add-to-order', AddToOrder.as_view()),
]