from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

class LoginSerializers(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    def validate(self, data):
        email=data.get('email')
        password=data.get('password')
        if email and password:
            user =authenticate(username=email, password=password)
            if user is None:
                raise AuthenticationFailed('資格情報が無効です')
            if not user.is_active:
                raise AuthenticationFailed('ユーザーアカウントが無効です')
        else:
            raise serializers.ValidationError('メールアドレスとパスワードを入力してください')
        
        data['user']=user
        return data
        