from rest_framework.generics import CreateAPIView, ListAPIView
import os
from django.http import JsonResponse

from .models import Category


# Create your views here.


class CreateCategory(CreateAPIView):
    def post(self, request):
        try:
            name = request.data['name']
            category_image = request.data['imgCategory']
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)
        
        new_category = Category.objects.create(name=name, category_image=category_image)
        
        return JsonResponse({'success': 'success'}, status=200)
    
    
class GetCategory(ListAPIView):
    def get(self, request):
        try:
            is_verify_fail = request.headers.is_verify_fail
        except Exception as e:
            is_verify_fail = False
        
        categories = Category.objects.all().values()
        categories_response = []
        for category in list(categories):
            categories_response.append({
                '_id': category['id'],
                'name': category['name'],
                'slug': category['name'].replace(" ", "-"),
                'categoryImage': os.path.join('/static', category["category_image"])
            })
        
        return JsonResponse({
            'categories': categories_response,
            'isVerifyFail': is_verify_fail
            }, status=200)
        