
from django.urls import path
from . import views

urlpatterns = [
    path('list',views.postList),
    path('list/<int:pk>',views.postListOtherThenUser),
    path('list/user/<int:pk>',views.postListByUser),
    path('detail/<int:id>',views.postDetail),
    path('create',views.postCreate),
    path('update/<int:id>',views.postUpdate),
    path('delete/<int:id>',views.postDelete),
]
