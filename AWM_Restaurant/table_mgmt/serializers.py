from rest_framework import serializers
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

class OrderSerializer(serializers.ModelSerializer):
    plates = PlateSerializer(many=True)
    client = UserSerializer()
    waiter = UserSerializer()

    class Meta:
        model = Order
        fields = '__all__'


    #def to_representation(self, instance):
        """ Modifies the standard behaviour of serializer """
        """ table, client, waiter and plates won't be serialized as codes 
            but as names """
    #    ret = super().to_representation(instance)

        """
        table = Table.objects.filter(number=int(ret['table'])).first()
        if table:
            ret['table'] = table
        else:
            ret['table'] = ""
        """
    """
        client = User.objects.filter(id=int(ret['client'])).first()
        if client:
            ret['client'] = client.username
        else:
            ret['client'] = ""

        waiter = User.objects.filter(id=int(ret['waiter'])).first()
        if waiter:
            ret['waiter'] = waiter.username
        else:
            ret['waiter'] = ""

        if ret['plates']:
            new_plates = []
            for plate_id in ret['plates']:
                plate = Plate.objects.filter(code=plate_id).first()
                if plate:
                    new_plates.append(str(plate.name))
                else:
                    new_plates.append("")
            ret['plates'] = new_plates

        return ret
    """
