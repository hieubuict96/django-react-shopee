import re
import os
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView

from users.models import User
from .models import Product, Product_Image

# Create your views here.


class AddProduct(CreateAPIView):
    def post(self, request):
        try:
            user_id = request.data['shopId']
            product_name = request.data['productName']
            category_id_selected = request.data['categoryIdSelected']
            price = request.data['price']
            quantity = request.data['quantity']
            img_products = request.FILES.getlist('productImages')
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)
            
        if not user_id:
            return JsonResponse({'error': 'shopId'}, status=400)
        
        if not product_name:
            return JsonResponse({'error': 'productName'}, status=400)
        
        if not category_id_selected:
            return JsonResponse({'error': 'categoryIdSelected'}, status=400)
        
        if not price or price == "0" or not re.search('^[0-9]+$', price):
            return JsonResponse({'error': 'price'}, status=400)
        
        if not quantity or quantity == "0" or not re.search('^[0-9]+$', quantity):
            return JsonResponse({'error': 'quantity'}, status=400)
        
        if not img_products:
            return JsonResponse({'error': 'imgProducts'}, status=400)
            
        try:
            price_sale = request.data['priceSale']
        except:
            price_sale = None
            
        try:
            quantity_sale = request.data['quantitySale']
        except:
            quantity_sale = None
            
        try:
            desc = request.data['desc']
        except:
            desc = None
            
        if re.search('[a-z]', price_sale):
            return JsonResponse({'error': 'priceSale'}, status=400)
        
        if re.search('[a-z]', quantity_sale):
            return JsonResponse({'error': 'quantitySale'}, status=400)
        
        user_id_number_type = float(user_id)
        category_id_selected_number_type = float(category_id_selected)
        price_number_type = float(price)
        quantity_number_type = float(quantity)
        if price_sale:
            price_sale_number_type = float(price_sale)
        else:
            price_sale_number_type = None
        
        if quantity_sale:
            quantity_sale_number_type = float(quantity_sale)
        else:
            quantity_sale_number_type = None
            
        user = User.objects.get(pk=user_id_number_type)
        
        new_product = Product.objects.create(name=product_name, price=price_number_type, quantity=quantity_number_type, price_sale=price_sale_number_type, quantity_sale=quantity_sale_number_type, description=desc, category_id=category_id_selected_number_type, shop_id=user.shop_id)
        
        for img_product in img_products:
            Product_Image.objects.create(url=img_product, product_id=new_product.id)
            
        product_response = {
            '_id': new_product.id,
            'name': new_product.name,
            'slug': new_product.name.replace(" ", "-"),
            'price': new_product.price,
            'quantity': new_product.quantity,
            'category': new_product.category_id,
            'shop': new_product.shop_id,
        }
        
        if new_product.description:
            product_response['description'] = new_product.description
            
        product_image = list(new_product.product_image_set.all().values())
        
        product_response['productImages'] = []
        
        for imgg in product_image:
            product_response['productImages'].append(os.path.join('/static', imgg["url"]))
            
        product_response['order'] = []
        product_response['reviews'] = []
        
        return JsonResponse({'product': product_response}, status=200)
    

class GetFlashSale(ListAPIView):
    def get(self, request):
        try:
            is_verify_fail = request.headers.is_verify_fail
        except Exception as e:
            is_verify_fail = False
            
        products = list(Product.objects.all().values())
        
        products_sale = filter(lambda x: True if x['price_sale'] and x['price'] > x['price_sale'] else False, products)
        
        return JsonResponse({'productsSale': list(products_sale), 'isVerifyFail': is_verify_fail}, status=200)
    

class GetAllProducts(ListAPIView):
    def get(self, request):
        try:
            user_id = request.query_params['userId']
        except:
            return JsonResponse({'error': 'userId'}, status=400)

        user = User.objects.get(pk=user_id)
        products_queryset = user.shop.product_set.all()
        
        product_response = []
        
        for product in products_queryset:
            p = {
                '_id': product.id,
                'name': product.name,
                'slug': product.name.replace(' ', '-'),
                'price': product.price,
                'quantity': product.quantity,
                'description': product.description,
                'category': product.category_id,
                'shop': product.shop_id,
            }
            
            if product.price_sale:
                p['priceSale'] = product.price_sale
                
            if product.quantity_sale:
                p['quantitySale'] = product.quantity_sale
            
            if product.product_image_set.all():
                p['productImages'] = []
                for record in product.product_image_set.all():
                    p['productImages'].append(os.path.join('/static', record.url.name))
                  
            p['order'] = []
                    
            if product.review_set.all():
                p['reviews'] = []
                
                for review in product.review_set.all():
                    p['reviews'].append({
                        'userId': review.user_id,
                        'rate': review.rate,
                        'review': review.review
                    })
                    
            product_response.append(p)
        
        return JsonResponse({"productsListSeller": product_response}, status=200)
    
    
class GetAllProductsCustomer(ListAPIView):
    def get(self, request):
        products_queryset = Product.objects.all()
        products_response = []
        for product in products_queryset:
            p = {
                '_id': product.id,
                'name': product.name,
                'slug': product.name.replace(' ', '-'),
                'price': product.price,
                'quantity': product.quantity,
            }
            
            if product.price_sale:
                p['priceSale'] = product.price_sale
                
            if product.quantity_sale:
                p['quantitySale'] = product.quantity_sale
                
            if product.description:
                p['description'] = product.description
        
            p['category'] = product.category_id
            p['shop'] = product.shop_id
            
            p['productImages'] = []
            
            for image in product.product_image_set.all():
                p['productImages'].append(os.path.join('/static', image.url.name))
            
            p['order'] = []
                
            p['reviews'] = []
            
            for review in product.review_set.all():
                p['reviews'].append({
                    'userId': review.user_id,
                    'rate': review.rate,
                    'review': review.review
                })
                
            products_response.append(p)
            
        return JsonResponse({'products': products_response}, status=200)
    
    
class GetProduct(ListAPIView):
    def get(self, request, id):
        product = Product.objects.get(id=id)
        product_response = {
            '_id': product.id,
            'name': product.name,
            'price': product.price,
            'slug': product.name.replace(' ', '-'),
            'quantity': product.quantity,
            'category': product.category_id
        }
        
        if product.price_sale:
            product_response['priceSale'] = product.price_sale
            
        if product.quantity_sale:
            product_response['quantitySale'] = product.quantity_sale

        if product.description:
            product_response['description'] = product.description
            
        product_response['shop'] = {
            '_id': product.shop.user.id,
            'firstName': product.shop.user.first_name,
        }
        
        if product.shop.user.last_name:
            product_response['shop']['lastName'] = product.shop.user.last_name
            
        if product.shop.user.email:
            product_response['shop']['email'] = product.shop.user.email
            
        if product.shop.user.phone_number:
            product_response['shop']['phoneNumber'] = product.shop.user.phone_number
            
        if product.shop.user.user_id_facebook:
            product_response['shop']['userIdFacebook'] = product.shop.user.user_id_facebook
            
        if product.shop.user.address:
            product_response['shop']['address'] = product.shop.user.address
            
        if product.shop.user.img_buyer:
            product_response['shop']['imgBuyer'] = product.shop.user.img_buyer.name
            
        product_response['shop']['shop'] = {}
            
        if product.shop.img_shop:
            product_response['shop']['shop']['imgShop'] = os.path.join('/static', product.shop.img_shop.name)
            
        product_response['shop']['shop']['shopName'] = product.shop.shop_name
        
        product_response['shop']['shop']['categories'] = []
        
        for category in product.shop.category_set.all():
            product_response['shop']['shop']['categories'].append(category.id)
            
        product_response['order'] = []
            
        product_response['productImages'] = []
        
        for image in product.product_image_set.all():
            product_response['productImages'].append(os.path.join('/static', image.url.name))
            
        product_response['reviews'] = []
        for review in product.review_set.all():
            re = {
                'rate': review.rate,
                'review': review.review,
            }
            
            re['userId'] = {
                'firstName': review.user.first_name,
                'lastName': review.user.last_name,
            }

            product_response['reviews'].append(re)
        
        return JsonResponse({'product': product_response}, status=200)