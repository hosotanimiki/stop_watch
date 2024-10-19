import logging

from django.contrib.auth import login
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LoginSerializers

logger = logging.getLogger(__name__)


class LoginView(APIView):
    serializera_class = "LoginSerializers"
    permission_classes = [AllowAny]  # ログインしていないユーザーでも可

    def post(self, request):
        serializer = LoginSerializers(
            data=request.data
        )  # ログインシリアライザーのインスタンスの初期化

        # raise_exceptionを導入、例外の時自動生成
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response(
            {"message": "ログイン成功"}, status=status.HTTP_200_OK
        )  # 認証成功時→遷移ページはreactに記述
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
