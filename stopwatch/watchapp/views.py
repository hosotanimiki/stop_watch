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
        serializer=LoginSerializers(data=request.data)
        if serializer.is_valid():
            user=serializer.validated_data['user']
            login(request, user)
            return Response({'message': 'ログイン成功'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def stopwatch(request):
    
    return render(request, "watchapp/stopwatch.html")