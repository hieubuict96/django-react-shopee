# Generated by Django 4.0.5 on 2022-06-15 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_alter_product_image_product_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='product_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='products.product'),
        ),
    ]
