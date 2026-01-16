
from django.urls import path
from . import views

urlpatterns = [
    path('register',views.userRegister),
    path('login',views.userLogin),
    path('detail/<int:id>',views.userDetail),
    # path('update/<int:id>',views.userUpdate),   
    # path('delete/<int:id>',views.userDelete),
]
