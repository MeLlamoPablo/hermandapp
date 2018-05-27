from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from hermandapp.app.models import Brotherhood
from hermandapp.app.serializers import (
    UserSerializer, 
    GroupSerializer, 
    BrotherhoodSerializer,
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class BrotherhoodViewSet(viewsets.ModelViewSet):
    queryset = Brotherhood.objects.all()
    serializer_class = BrotherhoodSerializer

    """
    Allow anyone to register brotherhoods, but only allow authenticated
    users to query them.
    """
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]