
from django.shortcuts import render

from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class HelloWorldView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


def names(request):
    return JsonResponse({'names': ['William', 'Rod', 'Grant']})


class Register(APIView):

    def post(self, request):

        try:
            username = request.data['username']
            password = request.data['password']

        except:
            Response('bad request.', status=status.HTTP_400_BAD_REQUEST)

        if not User.objects.filter(username=username).exists():
            new_user = User.objects.create_user(
                username=username, password=password)

            new_token = Token.objects.create(user=new_user)
            context = dict()
            context['token'] = new_token.key
            context['user'] = new_user.username
            return Response(context)

        else:
            return Response('The user exists', status=status.HTTP_406_NOT_ACCEPTABLE)
