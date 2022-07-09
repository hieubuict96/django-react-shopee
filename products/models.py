import os
import time
from django.db import models
from categories.models import Category
from users.models import Shop, User
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    quantity = models.IntegerField()
    price_sale = models.FloatField(null=True)
    quantity_sale = models.IntegerField(null=True)
    description = models.TextField(null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)


def upload_product(instance, file_name):
    name = file_name.split('.')[0]
    ext_file = file_name.split('.')[1]
    new_file_name = f'{name}_{int(time.time() * 1000)}.{ext_file}'
    return os.path.join("product", new_file_name)
    

class Product_Image(models.Model):
    url = models.FileField(upload_to=upload_product)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    
class Review(models.Model):
    class Rate(models.IntegerChoices):
        one = 1, _('one')
        two = 2, _('two')
        three = 3, _('three')
        four = 4, _('four')
        five = 5, _('five')
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
    rate = models.IntegerField(choices=Rate.choices, default=Rate.five)
    review = models.TextField(null=True)
    
