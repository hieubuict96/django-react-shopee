import os
import time
from django.db import models

# Create your models here.


def upload_shop(instance, file_name):
    name = file_name.split('.')[0]
    ext_file = file_name.split('.')[1]
    new_file_name = f'{name}_{int(time.time() * 1000)}.{ext_file}'
    return os.path.join('user', "shop", new_file_name)


class Shop(models.Model):
    img_shop = models.FileField(
        max_length=255, null=True, upload_to=upload_shop)
    shop_name = models.CharField(max_length=255)

    def __str__(self):
        return self.shop_name


def upload_user(instance, file_name):
    name = file_name.split('.')[0]
    ext_file = file_name.split('.')[1]
    new_file_name = f'{name}_{int(time.time() * 1000)}.{ext_file}'
    return os.path.join("user", 'customer', new_file_name)


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, null=True)
    email = models.CharField(max_length=255, unique=True, null=True)
    hash_password = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=255, unique=True, null=True)
    address = models.CharField(max_length=255, null=True)
    img_buyer = models.FileField(
        max_length=255, null=True, upload_to=upload_user)
    user_id_facebook = models.CharField(max_length=32, unique=True, null=True)
    shop = models.OneToOneField(
        Shop, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return self.first_name


class Code(models.Model):
    phone_number = models.CharField(max_length=32, unique=True, null=True)
    email = models.CharField(max_length=255, unique=True, null=True)
    code = models.CharField(max_length=32)
    time_send_code = models.IntegerField()

    def __str__(self):
        return self.id

