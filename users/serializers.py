from rest_framework import serializers

from .models import Code, Shop, User
 
 
class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields =  '__all__'
        

class ShopSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Shop
        fields = '__all__'
        

class CodeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Code
        fields = '__all__'