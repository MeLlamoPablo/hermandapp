from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
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

    @action(methods=['put'], detail=True)
    def order(self, request, pk=None):
        queryset = Brotherhood.objects.all()

        pk_b=request.data.get('after_id', 0)

        brotherhood_a = get_object_or_404(queryset, pk=pk)

        # We don't have a second brotherhood;
        # put the first on top
        if pk_b == 0:
            brotherhood_a.top()
        # We do have a second brotherhood, put the first below the second
        else:
            brotherhood_b = get_object_or_404(queryset, pk=pk_b)

            if brotherhood_a.id == brotherhood_b.id:
                return Response({
                    'error': {
                        'code': 'ENTITIES_EQUAL',
                        'message': 'Cannot re-order the entity because it is being '
                                   'put after itself.'
                    }
                })

            brotherhood_a.below(brotherhood_b)

        return Response()