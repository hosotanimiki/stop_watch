from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

# シリアライザーの存在意義
# Djangoの複雑のモデルデータ型をJSONという簡単に転送できる形式にする
# これによりバックエンドのデータをフロントエンドに送信することができる


# ログインシリアライザー
# ログインプロセスの一部としてユーザーの認証とバリデーションを行う
class LoginSerializers(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

# バリデーション
    def validate(self, data):
        email=data.get('email')
        password=data.get('password')
        if email and password:
            # authenticate(username(ユーザーを特定するための情報), password)
            user =authenticate(username=email, password=password)
            if user is None:
                raise AuthenticationFailed('資格情報が無効です')
            if not user.is_active:
                raise AuthenticationFailed('ユーザーアカウントが無効です')
        else:
            raise serializers.ValidationError('メールアドレスとパスワードを入力してください')
        
        data['user']=user
        return data
        