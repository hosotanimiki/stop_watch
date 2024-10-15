import logging

from django.contrib.auth import login
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
from rest_framework.views import APIView

from .serializers import LoginSerializers

logger = logging.getLogger(__name__)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializers(
            data=request.data
        )  # ログインシリアライザーのインスタンスの初期化
        # raise_exception
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            login(request, user)
            return Response(
                {"message": "ログイン成功"}, status=status.HTTP_200_OK
            )  # 認証成功時→遷移ページはreactに記述
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
