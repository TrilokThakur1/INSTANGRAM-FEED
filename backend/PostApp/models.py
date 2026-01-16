from django.db import models
from UesrApp.models import UserModel

# Create your models here.
class PostModel(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.CharField(max_length=200)
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE)

