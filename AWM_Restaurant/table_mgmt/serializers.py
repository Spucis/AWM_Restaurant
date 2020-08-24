from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class PlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = '__all__'

class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)

class OrderSerializer(serializers.ModelSerializer):
    plates = PlateSerializer(many=True)
    client = UserSerializer()
    waiter = WaiterSerializer()

    class Meta:
        model = Order
        fields = '__all__'
