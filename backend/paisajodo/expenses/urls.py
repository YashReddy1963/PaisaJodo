from django.urls import path
from .views import RegisterView, OTPVerificationView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('otp_verification/', OTPVerificationView.as_view(), name='otp_verification'),
    path('login/', LoginView.as_view(), name='login'),
]