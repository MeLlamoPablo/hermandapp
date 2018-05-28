import datetime
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from hermandapp.app.models import Brotherhood

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class BrotherhoodSerializer(serializers.HyperlinkedModelSerializer):
    """
    Forbid future dates
    """
    def validate_created_at(self, value):
        if value > datetime.datetime.now(datetime.timezone.utc):
            raise serializers.ValidationError("Cannot be a future date")

        return value

    class Meta:
        model = Brotherhood
        fields = ('url', 'name', 'manager_email', 'created_at')
