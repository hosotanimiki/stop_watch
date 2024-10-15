from django.urls import path  # path() 関数をインポート

from .views import (
    LoginView,  # get_csrf_token  # ビュー関数を登録するため、views.py をインポート
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    # path("csrf/", get_csrf_token)
]
