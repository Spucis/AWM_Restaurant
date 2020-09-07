from rest_framework import serializers
from django.contrib.auth.models import User, Group, Permission
from .models import *

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['codename']

    def to_representation(self, value):
        return str(value.codename)

class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)
    class Meta:
        model = Group
        fields = '__all__'

class PlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = '__all__'

class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)

class PlateDetailsSerializer(serializers.ModelSerializer):
    plate = PlateSerializer()

    class Meta:
        model = PlateDetails
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    waiter = WaiterSerializer()
    pds = PlateDetailsSerializer(source='platedetails_set', many=True)

    class Meta:
        model = Order
        fields = '__all__'
