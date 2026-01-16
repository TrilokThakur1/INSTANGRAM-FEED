from django.db import models

# Create your models here.
class UserModel(models.Model):
    fullName = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    avatar = models.CharField(max_length=200)


    def __str__(self):
        return self.email