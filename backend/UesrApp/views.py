from rest_framework.decorators import api_view              
from rest_framework.response import Response
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
    username = request.data['email']
    password = request.data['password']

    user = UserModel.objects.filter(email=username,password=password).first()
    if user:
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)
    else:
        return Response(False)
    
@api_view(['GET']) 
def userDetail(request,pk):
    user = UserModel.objects.get(id=pk)
    serializer= UserSerializer(user ,many=False)
    return Response(serializer.data)