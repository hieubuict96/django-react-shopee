from http import HTTPStatus
import os
import random
import re
import time
from django.http import JsonResponse
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from twilio.rest import Client
import bcrypt
from categories.models import Category

from categories.serializers import CategorySerializer
from .token import Jwt
from .serializers import ShopSerializer, UserSerializer
from .models import Code, Shop, User


def user_response(user):
    userresponse = {
        '_id': user.id,
        'firstName': user.first_name
    }

    if user.last_name:
        userresponse["lastName"] = user.last_name

    if user.email:
        userresponse["email"] = user.email

    if user.phone_number:
        userresponse["phoneNumber"] = user.phone_number

    if user.address:
        userresponse["address"] = user.address

    if user.img_buyer:
        if not re.search('^http', user.img_buyer.name):
            userresponse['imgBuyer'] = os.path.join('/static', user.img_buyer.name)
        else:
            userresponse["imgBuyer"] = user.img_buyer

    userresponse['shop'] = {}
    
    if user.shop:
        userresponse['shop']['shopName'] = user.shop.shop_name
        if user.shop.img_shop:
            userresponse['shop']['imgShop'] = os.path.join('/static', user.shop.img_shop.name)
        
        shop = Shop.objects.get(pk=user.shop_id)
        categorySerializer = CategorySerializer(shop.category_set.all(), many=True)
        categories = []
        
        for category in categorySerializer.data:
            categories.append(category["id"])
            
        userresponse['shop']['categories'] = categories
    else:
        userresponse['shop'] = {
            'categories': []
        }
        
    return userresponse


class SendPhoneNumber(CreateAPIView):
    def post(self, request):
        try:
            phone_number = request.data['phoneNumber']
            if not isinstance(phone_number, str):
                raise Exception("phoneNumber")
        except:
            return JsonResponse({'error': 'phoneNumber'}, status=400)

        is_phone_number_valid = re.search('^\+[0-9]+$', phone_number)
        if not is_phone_number_valid:
            return JsonResponse({'error': 'phoneNumber'}, status=HTTPStatus.BAD_REQUEST)

        try:
            is_phone_number_already_use = User.objects.get(
                phone_number=phone_number)
            return JsonResponse({'error': 'phoneNumberAlreadyUse'}, status=400)
        except User.DoesNotExist:
            code = str(random.random())[6: 12]
            time_send_code = time.time()

            # message = f"Mã xác minh của bạn là {code}"
            # client = Client(os.getenv("TWILIO_ACCOUNT_SID"),
            #                 os.getenv("TWILIO_AUTH_TOKEN"))
            # client.messages.create(to="+84383207498", from_=os.getenv("TWILIO_NUMBER"), body=message)

            try:
                exist_code_data = Code.objects.get(phone_number=phone_number)
                exist_code_data.code = code
                exist_code_data.time_send_code = time_send_code
                exist_code_data.save()
            except Code.DoesNotExist:
                data = Code(phone_number=phone_number, code=code,
                            time_send_code=time_send_code)
                data.save()

            return JsonResponse({'success': 'success'}, status=200)


class SendCode(CreateAPIView):
    def post(self, request):
        try:
            phone_number = request.data['phoneNumber']
            code = request.data['code']
            if not isinstance(phone_number, str):
                raise Exception("phoneNumber")

            if not isinstance(code, str):
                raise Exception("code")
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)

        try:
            record = Code.objects.get(phone_number=phone_number)
            time_verify_code = time.time()
            if time_verify_code - record.time_send_code < 300:
                if code == record.code:
                    return JsonResponse({'success': 'verifySuccess'}, status=200)
                else:
                    return JsonResponse({'error': 'codeIncorrect'}, status=400)
            else:
                return JsonResponse({'error': 'timeoutVerifyCode'}, status=400)
        except Code.DoesNotExist:
            return JsonResponse({'error': 'serverError'}, status=500)


class ResendCode(CreateAPIView):
    def post(self, request):
        try:
            phone_number = request.data['phoneNumber']
            if not isinstance(phone_number, str):
                raise Exception("phoneNumber")
        except:
            return JsonResponse({'error': 'phoneNumber'}, status=400)

        code = str(random.random())[6: 12]
        time_send_code = time.time()

        # message = f"Mã xác minh của bạn là {code}"
        # client = Client(os.getenv("TWILIO_ACCOUNT_SID"),
        #                 os.getenv("TWILIO_AUTH_TOKEN"))
        # client.messages.create(to="+84383207498", from_=os.getenv("TWILIO_NUMBER"), body=message)

        try:
            exist_code_data = Code.objects.get(phone_number=phone_number)
            exist_code_data.code = code
            exist_code_data.time_send_code = time_send_code
            exist_code_data.save()
        except Code.DoesNotExist:
            data = Code(phone_number=phone_number, code=code,
                        time_send_code=time_send_code)
            data.save()

        return JsonResponse({'success': 'success'}, status=200)


class Signup(CreateAPIView):
    def post(self, request):
        try:
            first_name = request.data["firstName"]
            last_name = request.data['lastName']
            password = request.data['password']
            phone_number = request.data['phoneNumber']

            if not isinstance(first_name, str):
                raise Exception("firstName")

            if not isinstance(last_name, str):
                raise Exception("lastName")

            if not isinstance(password, str):
                raise Exception("password")

            if not isinstance(phone_number, str):
                raise Exception("phoneNumber")

            is_password_valid = re.search(
                "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$", password)
            if not is_password_valid:
                raise Exception("password")
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)

        byte_pwd = password.encode('utf-8')
        hash_pwd = bcrypt.hashpw(byte_pwd, bcrypt.gensalt())

        user = User.objects.create(first_name=first_name, last_name=last_name,
                                   hash_password=hash_pwd.decode('utf-8'), phone_number=phone_number)

        token = Jwt.create_token(user.id, 2592000)

        return JsonResponse({'user': {
            '_id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'phoneNumber': user.phone_number
        }, 'accessToken': token}, status=201)


class Signin(CreateAPIView):
    def post(self, request):
        try:
            a = request
            user = request.data['user']
            password = request.data['password']
            if not isinstance(user, str):
                raise Exception("user")

            if not isinstance(password, str):
                raise Exception("password")
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)

        if re.search("@", user):
            try:
                user_data = User.objects.get(email=user)
                byte_pwd = password.encode('utf-8')
                is_password = bcrypt.checkpw(
                    byte_pwd, user_data.hash_password.encode('utf-8'))
                if not is_password:
                    return JsonResponse({'error': 'signinFail'}, status=400)

                token = Jwt.create_token(user_data.id, 2592000)
            except User.DoesNotExist as e:
                return JsonResponse({'error': 'signinFail'}, status=400)
        else:
            try:
                user_data = User.objects.get(phone_number=user)
                byte_pwd = password.encode('utf-8')
                is_password = bcrypt.checkpw(
                    byte_pwd, user_data.hash_password.encode('utf-8'))
                if not is_password:
                    return JsonResponse({'error': 'signinFail'}, status=400)

                token = Jwt.create_token(user_data.id, 2592000)
            except User.DoesNotExist as e:
                return JsonResponse({'error': 'signinFail'}, status=400)

        return JsonResponse({
            'user': user_response(user_data),
            'accessToken': token
        }, status=200)


class SigninWithGoogle(CreateAPIView):
    def post(self, request):
        try:
            email = request.data['data']['profileObj']['email']
            familyName = request.data['data']['profileObj']['familyName']
            givenName = request.data['data']['profileObj']['givenName']
            imageUrl = request.data['data']['profileObj']['imageUrl']
            if not isinstance(email, str):
                raise Exception("email")

            if not isinstance(familyName, str):
                raise Exception("familyName")

            if not isinstance(givenName, str):
                raise Exception("givenName")

            if not isinstance(imageUrl, str):
                raise Exception("imageUrl")
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist as e:
            new_user = User.objects.create(
                email=email, first_name=givenName, last_name=familyName, img_buyer=imageUrl)
            token = Jwt.create_token(new_user.id, 2592000)

            return JsonResponse({
                'user': user_response(new_user),
                "accessToken": token}, status=201)

        token = Jwt.create_token(user.id, 2592000)

        return JsonResponse({
            'user': user_response(user),
            'accessToken': token
        })


class SigninWithFacebook(CreateAPIView):
    def post(self, request):
        try:
            name = request.data["data"]["name"]
            userID = request.data["data"]["userID"]
            img = request.data["data"]["picture"]["data"]["url"]

            if not isinstance(name, str):
                raise Exception("name")

            if not isinstance(userID, str):
                raise Exception("userID")

            if not isinstance(img, str):
                raise Exception("img")

        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)

        try:
            user = User.objects.get(user_id_facebook=userID)
        except User.DoesNotExist as e:
            new_user = User.objects.create(
                first_name=name, last_name="", img_buyer=img, user_id_facebook=userID)
            token = Jwt.create_token(new_user.id, 2592000)

            return JsonResponse({
                'user': user_response(new_user),
                'accessToken': token
            }, status=201)

        token = Jwt.create_token(user.id, 2592000)

        return JsonResponse({
            'user': user_response(user),
            'accessToken': token
        })


class GetData(ListAPIView):
    def get(self, request):
        try:
            authorization = request.headers['authorization']
            if not isinstance(authorization, str):
                raise Exception("")
        except Exception as e:
            return JsonResponse({"error": "bad request"}, status=400)

        access_token = authorization.split(" ")[1]

        try:
            get_data = Jwt.verify_token(access_token)
        except Exception as e:
            return JsonResponse({'error': 'verifyFail'}, status=400)

        id = get_data["id"]
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist as e:
            return JsonResponse({'error': "serverError"}, status=500)

        return JsonResponse({
            'user': user_response(user),
        }, status=200)


class UpdateProfile(UpdateAPIView):
    def put(self, request):
        try:
            id = request.data["_id"]
        except:
            return JsonResponse({'error': "_id"}, status=400)

        try:
            first_name = request.data["firstName"]
            if not isinstance(first_name, str):
                raise Exception("")
        except:
            return JsonResponse({'error': "firstName"}, status=400)

        try:
            last_name = request.data["lastName"]
            if not isinstance(last_name, str):
                raise Exception("")
        except:
            return JsonResponse({'error': "lastName"}, status=400)

        try:
            address = request.data["address"]
            if not isinstance(address, str):
                return JsonResponse({'error': 'address'}, status=400)
        except:
            address = None

        try:
            shop_name = request.data['shopName']
            if not isinstance(shop_name, str):
                return JsonResponse({'error': 'shopName'}, status=400)
        except:
            shop_name = None

        try:
            img_buyer = request.FILES['imgBuyer']
            # if not isinstance(img_buyer, str):
            #     return JsonResponse({'error': 'imgBuyer'}, status=400)
        except:
            img_buyer = None

        try:
            img_shop = request.FILES["imgShop"]
            # if not isinstance(img_shop, str):
            #     return JsonResponse({'error': 'imgShop'}, status=400)
        except:
            img_shop = None

        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist as e:
            return JsonResponse({'error': 'serverError'}, status=500)

        user.first_name = first_name
        user.last_name = last_name
        if address:
            user.address = address

        if img_buyer:
            user.img_buyer = img_buyer

        if shop_name:
            if user.shop:
                shop = Shop.objects.get(id=user.shop.id)
                shop.shop_name = shop_name
                shop.img_shop = img_shop
                shop.save()
            else:
                shop = Shop.objects.create(
                    img_shop=img_shop, shop_name=shop_name)
                user.shop = shop

        user.save()
        new_user = User.objects.get(id=id)

        user_response = {}
        user_response['firstName'] = new_user.first_name

        if new_user.last_name:
            user_response['lastName'] = new_user.last_name

        if new_user.address:
            user_response['address'] = new_user.address

        if new_user.img_buyer:
            user_response['imgBuyer'] = os.path.join('/static', new_user.img_buyer.name)

        categoriesSerializer = CategorySerializer(
            shop.category.all(), many=True)
        categories = []
        for a in categoriesSerializer.data:
            categories.append(a['id'])

        if new_user.shop:
            shop_response = {
                'imgShop': os.path.join('/static', new_user.shop.img_shop.name),
                'shopName': new_user.shop.shop_name,
                'categories': categories
            }
        else:
            shop_response = {
                'categories': []
            }

        user_response['shop'] = shop_response

        return JsonResponse(user_response, status=200)


class UpdateEmail(UpdateAPIView):
    def put(self, request):
        try:
            id = request.data['_id']
            new_email = request.data['newEmail']
            password = request.data['password']
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)

        is_email_valid = re.search("^[^ ]+@[^ ]+\.[^ ]+$", new_email)

        if not is_email_valid:
            return JsonResponse({'error': 'newEmail'}, status=400)

        user = User.objects.get(pk=id)

        byte_pwd = password.encode('utf-8')
        is_password = bcrypt.checkpw(
            byte_pwd, user.hash_password.encode('utf-8'))

        if not is_password:
            return JsonResponse({'error': 'wrongPassword'}, status=401)

        try:
            is_email_already_use = User.objects.get(email=new_email)
            return JsonResponse({'error': 'newEmailAlreadyUse'}, status=400)
        except User.DoesNotExist as e:
            pass

        if user.email:
            code = str(random.random())[6: 12]
            time_send_code = time.time()

            try:
                data_code = Code.objects.get(email=user.email)
                data_code.code = code
                data_code.time_send_code = time_send_code
                data_code.save()
            except Code.DoesNotExist as e:
                Code.objects.create(email=user.email, code=code,
                                    time_send_code=time_send_code)

        code2 = str(random.random())[6: 12]
        time_send_code2 = time.time()

        try:
            data_code2 = Code.objects.get(email=new_email)
            data_code2.code = code2
            data_code2.time_send_code = time_send_code2
            data_code2.save()
        except Code.DoesNotExist as e:
            Code.objects.create(email=new_email, code=code2,
                                time_send_code=time_send_code2)

        return JsonResponse({'success': 'sendCodeToEmailSuccess'}, status=200)


class VerifyEmail(UpdateAPIView):
    def put(self, request):
        try:
            id = request.data['_id']
            old_email = request.data['oldEmail']
            code_old_email = request.data['codeOldEmail']
            new_email = request.data['newEmail']
            code_new_email = request.data['codeNewEmail']
        except Exception as e:
            return JsonResponse({'error': str(e).replace("'", "")}, status=400)
        
        if old_email:
            code_data_old = Code.objects.get(email=old_email)
            code_data_new = Code.objects.get(email=new_email)
            
            time_now = time.time()
            if time_now - code_data_old.time_send_code > 300 or time_now - code_data_new.time_send_code > 300:
                return JsonResponse({'error': 'timeoutVerifyCode'}, status=400)
                
            if not code_old_email == code_data_old.code or not code_new_email == code_data_new.code:
                return JsonResponse({'error': 'verifyCodeFail'}, status=400)
            
            user = User.objects.get(pk=id)
            user.email = new_email
            user.save()
            
            return JsonResponse({'success': 'updateEmailSuccess'}, status=200)
        else:
            code_data_new = Code.objects.get(email=new_email)
            time_now = time.time()
            
            if time_now - code_data_new.time_send_code > 300:
                return JsonResponse({'error': 'timeoutVerifyCode'}, status=400)
            
            if not code_new_email == code_data_new.code:
                return JsonResponse({'error': 'verifyCodeFail'}, status=400)
            
            new_doc = User.objects.get(pk=id)
            new_doc.email = new_email
            new_doc.save()
            
            return JsonResponse({'success': 'updateEmailSuccess'}, status=200)
        
        