from django.conf import settings
from django.urls import path

from .views import *

urlpatterns = [
    path('signup/send-phone-number', SendPhoneNumber.as_view()),
    path('signup/send-code', SendCode.as_view()),
    path('signup/resend-code', ResendCode.as_view()),
    path("signup", Signup.as_view()),
    path("signin", Signin.as_view()),
    path("signin-with-google", SigninWithGoogle.as_view()),
    path("signin-with-facebook", SigninWithFacebook.as_view()),
    path("get-data", GetData.as_view()),
    path("profile/update", UpdateProfile.as_view()),
    path('profile/update/email/send-code', UpdateEmail.as_view()),
    path('profile/update/email/verify-code', VerifyEmail.as_view())
]