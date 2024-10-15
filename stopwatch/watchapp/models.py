from django.db import models


class User(models.Model):
    username = models.CharField(max_length=10, blank=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=20)  # passwordfieldを使う

    def __str__(self):
        return self.email
