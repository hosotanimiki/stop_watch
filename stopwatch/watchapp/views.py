from django.shortcuts import render
from django.contrib.auth import authenticate, login

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import LoginSerializers

import logging
logger = logging.getLogger(__name__)

class LoginView(APIView):
    def post(self, request):
        serializer=LoginSerializers(data=request.data)#ログインシリアライザーのインスタンスの初期化
        if serializer.is_valid():
            user=serializer.validated_data['user']
            login(request, user)
            return Response({'message': 'ログイン成功'}, status=status.HTTP_200_OK)#認証成功時→遷移ページはreactに記述
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# from django.http import JsonResponse
# from django.views.decorators.csrf import ensure_csrf_cookie

# @ensure_csrf_cookie
# def get_csrf_token(request):
#     return JsonResponse({'detail': 'CSRF cookie set'})


# def stopwatch(request):
    
#     return render(request, "watchapp/stopwatch.html")