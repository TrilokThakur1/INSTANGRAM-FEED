from rest_framework.decorators import api_view
from rest_framework.response import Response    
from .models import PostModel
from .serializers import PostSerializer

@api_view(['GET'])
def postList(request):
    posts = PostModel.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)  


@api_view(['GET'])
def postListOtherThenUser(request,pk):
    posts = PostModel.objects.exclude(author=pk)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)       

@api_view(['GET'])
def postDetail(request,pk):
    post = PostModel.objects.get(id=pk)
    serializer = PostSerializer(post,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def postCreate(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def postUpdate(request,pk):
    post = PostModel.objects.get(id=pk)
    serializer = PostSerializer(instance = post, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['DELETE'])
def postDelete(request,id):
    try:
        post = PostModel.objects.get(id=id)
        post.delete()
        return Response("Deleted")
    except PostModel.DoesNotExist:
        return Response("Post not found", status=404)

@api_view(['GET'])
def postListByUser(request,pk):
    posts = PostModel.objects.filter(author=pk)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


