from django import forms
from .models import Table, Plate, Menu, Order
from django.contrib.auth.models import User

# definisco il form direttamente dal modello del tavolo
class MenuForm(forms.ModelForm):
    description = forms.CharField(max_length=100)

    class Meta:
        model = Menu
        fields = '__all__'

class TableForm(forms.ModelForm):
    number = forms.IntegerField(min_value=0)
    class Meta:
        model = Table
        fields = '__all__'

class OrderForm(forms.ModelForm):
    table = forms.IntegerField()
    date = forms.SplitDateTimeField()
    password = forms.CharField()

    class Meta:
        model = Order
        fields = '__all__'
        exclude = ['plates']

class UpdateOrderForm(forms.ModelForm):
    class Meta:
        model = Order
        exclude = '__all__'
        fields = ['plates']

class PlateForm(forms.ModelForm):
    class Meta:
        model = Plate
        fields = '__all__'
