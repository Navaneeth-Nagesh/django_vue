
from django.contrib import admin
from django.urls import path
from django_vuetify import views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', views.HelloWorldView.as_view(), name='hello_world'),
    path('login/', obtain_auth_token, name='login'),
    path('names/', views.names, name='names'),
    path('register/', views.Register.as_view(), name='register')
]
