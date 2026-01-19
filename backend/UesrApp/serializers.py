from rest_framework import serializers
from .models import UserModel
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"

    def create(self, validated_data):
        # 🔐 password hash
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
