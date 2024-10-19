from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(
        max_length=10, blank=True, default="name"
    )  # ユーザー名必要ないのでデフォルト値設定
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=20)  # passwordfieldを使う

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
