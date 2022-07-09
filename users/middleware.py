from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from .token import Jwt


class AuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.get_full_path() == "/api/user/profile/update" or request.get_full_path() == "/api/user/profile/update/email/send-code" or request.get_full_path() == "/api/user/profile/update/email/verify-code" or request.get_full_path() == "/api/category/get-category" or request.get_full_path() == "/api/products/flash-sale" or request.get_full_path() == "/api/products/seller/get-all" or request.get_full_path() == "/api/products/seller/add-product" or request.get_full_path() == "/api/products/get-all-products-customer" or request.get_full_path() == "/api/order/get-list-order" or request.get_full_path() == "/api/cart/add-to-cart" or request.get_full_path() == "/api/cart/get-cart" or request.get_full_path() == "/api/cart/reduce-qtt" or request.get_full_path() == "/api/cart/increase-qtt" or request.get_full_path() == "/api/cart/delete-product" or request.get_full_path() == "/api/cart/add-to-order":
            try:
                is_next = request.headers["is-next"]
            except Exception as e:
                is_next = None

            try:
                authorization = request.headers['authorization']
                if len(authorization.split(" ")) > 1:
                    token = authorization.split(" ")[1]
                    Jwt.verify_token(token)
                else:
                    raise Exception("")
            except Exception as e:
                if not is_next:
                    return JsonResponse({'error': 'verifyFail'}, status=400)

                request.headers.is_verify_fail = True
            
            