import datetime
import os
from django.http import JsonResponse
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView

from carts.models import Cart, Products_In_Cart
from users.models import User

# Create your views here.


class AddToCart(CreateAPIView):
    def post(self, request):
        try:
            user_id = request.data['userId']
            quantity_buy = request.data['quantityBuy']
            product_id = request.data['productId']
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", '')}, status=400)

        try:
            cart = Cart.objects.get(user_id=user_id)
            for product in cart.products_in_cart_set.all():
                if product.product_id == product_id:
                    product.quantity += quantity_buy
                    product.save()
                    return JsonResponse({'success': 'addToCartSuccess'}, status=200)

            Products_In_Cart.objects.create(
                cart_id=cart.id, product_id=product_id, quantity=quantity_buy)

            return JsonResponse({'success': 'addToCartSuccess'}, status=200)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(user_id=user_id)
            Products_In_Cart.objects.create(
                cart_id=cart.id, product_id=product_id, quantity=quantity_buy)

            return JsonResponse({'success': 'addToCartSuccess'}, status=200)


class GetCart(ListAPIView):
    def get(self, request):
        try:
            user_id = request.query_params['userId']
        except:
            return JsonResponse({'error': 'userId'}, status=400)
            
        
        try:
            cart = Cart.objects.get(user_id=user_id)
        except Cart.DoesNotExist:
            return JsonResponse({'doc': None}, status=200)
            
        response = {
            'userId': user_id
        }

        response['products'] = []

        for product in cart.products_in_cart_set.all():
            p = {}
            p['quantity'] = product.quantity
            p['productId'] = {}
            p['productId']['_id'] = product.product.id
            p['productId']['name'] = product.product.name
            p['productId']['slug'] = product.product.name.replace(' ', '-')
            p['productId']['price'] = product.product.price
            p['productId']['quantity'] = product.product.quantity

            if product.product.price_sale:
                p['productId']['priceSale'] = product.product.price_sale

            if product.product.quantity_sale:
                p['productId']['quantitySale'] = product.product.quantity_sale

            if product.product.description:
                p['productId']['description'] = product.product.description

            p['productId']['category'] = product.product.category_id
            p['productId']['shop'] = product.product.shop_id

            p['productId']['order'] = []
            p['productId']['productImages'] = []

            for a in product.product.product_image_set.all():
                p['productId']['productImages'].append(
                    os.path.join('/static', a.url.name))

            p['productId']['reviews'] = []

            if product.product.review_set.all():
                for b in product.product.review_set.all():
                    p['productId']['reviews'].append({
                        'userId': b.user_id,
                        'rate': b.rate,
                        'review': b.review
                    })

            response['products'].append(p)

        return JsonResponse({'doc': response}, status=200)


class ReduceQtt(UpdateAPIView):
    def put(self, request):
        try:
            user_id = request.data['userId']
            product_id = request.data['productId']
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)
        
        cart = Cart.objects.get(user_id=user_id)
        for product in cart.products_in_cart_set.all():
            if product_id == product.product_id:
                product.quantity -= 1
                product.save()
                return JsonResponse({'success': 'reduceSuccess'}, status=200)
            
        return JsonResponse({'error': 'serverError'}, status=500)
        
        
class IncreaseQtt(UpdateAPIView):
    def put(self, request):
        try:
            user_id = request.data['userId']
            product_id = request.data['productId']
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)
        
        cart = Cart.objects.get(user_id=user_id)
        if cart.products_in_cart_set.all():
            for product in cart.products_in_cart_set.all():
                if product_id == product.product_id:
                    product.quantity += 1
                    product.save()
                    return JsonResponse({'success': 'reduceSuccess'}, status=200)
            
        return JsonResponse({'error': 'serverError'}, status=500)


class DeleteProduct(DestroyAPIView):
    def delete(self, request):
        try:
            user_id = request.query_params['userId']
            product_id = request.query_params['productId']
            product_id = int(product_id)
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)
        
        
        cart = Cart.objects.get(user_id=user_id)
        if cart.products_in_cart_set.all():
            for product in cart.products_in_cart_set.all():
                if product_id == product.product_id:
                    product.delete()
                    return JsonResponse({'success': "deleteProductSuccess"}, status=200)
                
        return JsonResponse({'error': 'serverError'}, status=500)
    
    
class AddToOrder(CreateAPIView):
    def post(self, request):
        return JsonResponse({'success': 'orderSuccess'}, status=200)
    
    
