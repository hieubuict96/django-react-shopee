import os
import time
from django.db import models

from users.models import Shop

# Create your models here.


def upload_category(instance, file_name):
    name = file_name.split('.')[0]
    ext_file = file_name.split('.')[1]
    new_file_name = f'{name}_{int(time.time())}.{ext_file}'
    return os.path.join("category", new_file_name)


class Category(models.Model):
    name = models.CharField(max_length=255)
    category_image = models.FileField(
        max_length=255, null=True, upload_to=upload_category)
    shop = models.ManyToManyField(Shop)

    def __str__(self):
        return self.name
    
    