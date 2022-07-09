from django.urls import path

from .views import *

urlpatterns = [
    path('seller/add-product', AddProduct.as_view()),
    path('flash-sale', GetFlashSale.as_view()),
    path('seller/get-all', GetAllProducts.as_view()),
    path('get-all-products-customer', GetAllProductsCustomer.as_view()),
    path('<int:id>', GetProduct.as_view()),
    
]