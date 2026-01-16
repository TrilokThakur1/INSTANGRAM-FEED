from rest_framework.serializers import ModelSerializer
from .models import PostModel
from UesrApp.serializers import UserSerializer
from UesrApp.models import UserModel
from rest_framework import serializers

class PostSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(), source='author', write_only=True
    )
    class Meta:
        model = PostModel
        fields = '__all__'