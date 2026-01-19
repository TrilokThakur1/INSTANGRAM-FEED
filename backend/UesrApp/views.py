from rest_framework.decorators import api_view              
from rest_framework.response import Response
from rest_framework import status   
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from .models import UserModel    
from .serializers import UserSerializer

@api_view(['POST'])
def userRegister(request):
    serializer = UserSerializer(data= request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['POST'])
def userLogin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = UserModel.objects.get(email=email)
    except UserModel.DoesNotExist:
        return Response({"error": "Invalid Credentials"}, status=400)

    # 🔑 password verify
    if check_password(password, user.password):
        serializer = UserSerializer(user)
        return Response(serializer.data)

    return Response({"error": "Invalid Credentials"}, status=400)

    
@api_view(['GET']) 
def userDetail(request,pk):
    user = UserModel.objects.get(id=pk)
    serializer= UserSerializer(user ,many=False)
    return Response(serializer.data)