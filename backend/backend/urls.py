
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('api/post/',include('PostApp.urls')),
    path('api/user/',include('UesrApp.urls')),
    path('admin/', admin.site.urls),
]
